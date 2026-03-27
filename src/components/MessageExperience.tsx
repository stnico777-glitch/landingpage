"use client";

import { useState } from "react";
import { FloatingMessageBubble } from "./FloatingMessageBubble";
import { WelcomeMessageBubble } from "./WelcomeMessageBubble";

export function MessageExperience() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FloatingMessageBubble onOpen={() => setOpen(true)} />
      <WelcomeMessageBubble open={open} onClose={() => setOpen(false)} />
    </>
  );
}
