import { HeroTitle } from "@/components/HeroTitle";
import { HeroVideoBackground } from "@/components/HeroVideoBackground";
import { MessageExperience } from "@/components/MessageExperience";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  return (
    <div id="top" className="homepage-imessage-surface flex min-h-full flex-1 flex-col">
      <HeroVideoBackground />
      <div className="relative z-10 flex flex-1 flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-16 sm:py-24">
          <HeroTitle />
          <section
            id="about"
            className="fadeIn-delay-1 fadeIn mt-16 max-w-md text-center text-sm leading-relaxed text-white/85"
          >
            <p>
              A space for faith and fitness — grounded in love and a sound mind. We’re putting
              finishing touches on the experience; check back soon.
            </p>
          </section>
          <section id="contact" className="fadeIn-delay-2 fadeIn mt-10 text-center">
            <a
              href="mailto:hello@example.com"
              className="font-headline text-sm font-medium text-sky-blue underline-offset-4 hover:text-white hover:underline"
            >
              Get in touch
            </a>
          </section>
        </main>
      </div>
      <MessageExperience />
    </div>
  );
}
