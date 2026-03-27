type SubscribePayload = {
  email?: string;
};

/** Klaviyo returns JSON:API errors; surface the first detail for debugging. */
function summarizeKlaviyoError(body: string): string {
  try {
    const json = JSON.parse(body) as {
      errors?: Array<{ detail?: string; title?: string; code?: string }>;
    };
    const first = json.errors?.[0];
    if (first?.detail) return first.detail;
    if (first?.title) return first.title;
  } catch {
    /* ignore */
  }
  const trimmed = body.trim();
  return trimmed.length > 280 ? `${trimmed.slice(0, 277)}…` : trimmed;
}

export async function POST(request: Request) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY?.trim();
  const listId = process.env.KLAVIYO_LIST_ID?.trim();

  if (!apiKey || !listId) {
    return Response.json(
      {
        error:
          "Subscriptions are not configured on the server. Add KLAVIYO_PRIVATE_API_KEY and KLAVIYO_LIST_ID to your host (e.g. Vercel → Environment Variables), then redeploy.",
      },
      { status: 500 },
    );
  }

  let body: SubscribePayload;
  try {
    body = (await request.json()) as SubscribePayload;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const klaviyoHeaders = {
    Authorization: `Klaviyo-API-Key ${apiKey}`,
    Accept: "application/vnd.api+json",
    "Content-Type": "application/vnd.api+json",
    // Stable revision; must match payload shape (consent + subscriptions).
    revision: "2025-07-15",
  } as const;

  const klaviyoResponse = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: klaviyoHeaders,
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            custom_source: "awake + align landing page",
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email,
                    subscriptions: {
                      email: {
                        marketing: {
                          consent: "SUBSCRIBED",
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: { type: "list", id: listId },
            },
          },
        },
      }),
    },
  );

  if (!klaviyoResponse.ok) {
    const errorText = await klaviyoResponse.text();
    console.error(
      "[subscribe] Klaviyo error",
      klaviyoResponse.status,
      errorText.slice(0, 500),
    );
    const summary = summarizeKlaviyoError(errorText);
    const message =
      summary.length > 0
        ? `Could not subscribe: ${summary}`
        : "Klaviyo rejected the request.";
    return Response.json(
      process.env.NODE_ENV === "development"
        ? { error: message, details: errorText }
        : { error: message },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
