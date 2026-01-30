import Image from "next/image";

type Props = {
  name: string;
  href: string;
  imgMobile?: string;
  imgDesktop: string;
};

export function PartnerCard({ name, href, imgMobile, imgDesktop }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative flex items-center justify-center
        h-28 lg:h-32
        rounded-xl
        bg-surface-soft
        border border-transparent
        transition-all duration-300
        hover:bg-surface
        hover:border-brand
        hover:shadow-lg
        hover:-translate-y-1
        focus-ring-brand
        border-brand-hover
        bg-surface-hover
      "
    >
      <div className="relative w-full h-full p-6 lg:p-8">
        {imgMobile && (
          <Image
            src={imgMobile}
            alt={name}
            fill
            sizes="100vw"
            className="
              object-contain
              block lg:hidden
              transition-transform duration-300
              group-hover:scale-[0.92]
            "
          />
        )}

        <Image
          src={imgDesktop}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw"
          className={`
            object-contain
            transition-transform duration-300
            lg:group-hover:scale-[0.9]
            ${imgMobile ? "hidden lg:block" : "block"}
          `}
        />
      </div>
    </a>
  );
}
