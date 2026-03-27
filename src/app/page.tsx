import { EmailCapture } from "@/components/EmailCapture";
import { HeroTitle } from "@/components/HeroTitle";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";

export default function Home() {
  return (
    <div id="top" className="homepage-surface flex min-h-full flex-1 flex-col">
      <HeroVideoBackground />
      <div className="relative z-10 flex flex-1 flex-col">
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-24">
          <HeroTitle />
          <EmailCapture />
        </main>
      </div>
    </div>
  );
}
