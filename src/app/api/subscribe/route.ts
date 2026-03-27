type SubscribePayload = {
  email?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.KLAVIYO_PRIVATE_API_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!apiKey || !listId) {
    return Response.json(
      { error: "Server not configured for subscriptions." },
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

  const klaviyoResponse = await fetch(
    "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
    {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        "Content-Type": "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: { email },
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
    return Response.json(
      { error: "Klaviyo subscription failed.", details: errorText },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
