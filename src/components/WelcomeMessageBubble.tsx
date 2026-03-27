"use client";

import { useEffect } from "react";

type WelcomeMessageBubbleProps = {
  open: boolean;
  onClose: () => void;
};

export function WelcomeMessageBubble({ open, onClose }: WelcomeMessageBubbleProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close dialog"
        className="animate-modal-backdrop-in absolute inset-0 bg-black/50 backdrop-blur-[4px]"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-dialog-title"
        className="animate-welcome-bubble-in relative z-10 flex w-full max-w-[375px] flex-col overflow-hidden rounded-[2rem] shadow-2xl outline outline-1 outline-black/10"
        style={{
          height: "min(700px, calc(100vh - 3rem))",
          maxHeight: "calc(100vh - 3rem)",
        }}
      >
        <div className="imessage-glow-layer imessage-glow-pulse absolute inset-0 rounded-[inherit]" />
        <div className="relative flex min-h-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between border-b border-black/5 bg-[#F2F2F7]/95 px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ backgroundColor: "#C4B5D4" }}
                aria-hidden
              >
                A
              </div>
              <div>
                <p id="welcome-dialog-title" className="text-[15px] font-semibold leading-tight text-black">
                  awake + align
                </p>
                <p className="text-xs text-[#8E8E93]">iMessage</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-3 py-1.5 text-[15px] font-medium text-[#007AFF] hover:opacity-80"
            >
              Done
            </button>
          </header>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-transparent px-3 py-4">
            <p className="text-center text-xs text-[#8E8E93]">Today 9:41 AM</p>
            <div className="flex justify-start">
              <div
                className="max-w-[85%] rounded-[18px] px-3 py-2"
                style={{
                  backgroundColor: "#E5E5EA",
                  fontSize: 15,
                  lineHeight: 1.35,
                  color: "#000000",
                }}
              >
                Welcome — we’re almost here. power love sound mind.
              </div>
            </div>
            <div className="flex justify-end">
              <div
                className="max-w-[85%] rounded-[18px] px-3 py-2 text-white"
                style={{
                  backgroundColor: "#007AFF",
                  fontSize: 15,
                  lineHeight: 1.35,
                }}
              >
                Can’t wait to see what you’re building.
              </div>
            </div>
          </div>

          <footer className="shrink-0 border-t border-black/[0.06] bg-[#F2F2F7]/95 px-3 pb-4 pt-2 backdrop-blur-sm">
            <div
              className="flex items-end gap-2 rounded-[20px] border px-3 py-2"
              style={{ borderColor: "rgba(198, 198, 200, 0.5)" }}
            >
              <span className="min-h-[22px] flex-1 text-[15px] leading-[1.35] text-[#8E8E93]">
                Message
              </span>
              <button
                type="button"
                className="shrink-0 rounded-full px-2 py-1 text-[15px] font-medium"
                style={{ color: "#007AFF" }}
              >
                Send
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
