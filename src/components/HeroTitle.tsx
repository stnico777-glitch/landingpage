import Image from "next/image";

export function HeroTitle() {
  return (
    <div className="fadeIn mx-auto w-full max-w-2xl px-4 text-center sm:px-6">
      <h1 className="mb-2">
        <Image
          src="/wordmark.png"
          alt="awake + align — power love sound mind"
          width={966}
          height={187}
          unoptimized
          className="mx-auto h-auto w-full max-w-[min(90vw,18rem)] bg-transparent sm:max-w-sm md:max-w-md lg:max-w-lg"
          priority
        />
      </h1>
    </div>
  );
}
