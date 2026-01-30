import Link from "next/link";

type Item = {
  label: string;
  href?: string;
  onClick?: () => void;
  className: string;
};

type Section = {
  title?: string;
  items: Item[];
};

type Props = {
  sections: Section[];
};

export function MobileMenu({ sections }: Props) {
  return (
    <div className="mt-6 space-y-6">
      {sections.map((section, i) => (
        <div key={i}>
          {section.title && (
            <p className="text-xs font-semibold uppercase opacity-60">
              {section.title}
            </p>
          )}

          <div className="mt-2 space-y-2">
            {section.items.map((item, j) =>
              item.href ? (
                <Link key={j} href={item.href} className={item.className}>
                  {item.label}
                </Link>
              ) : (
                <button
                  key={j}
                  onClick={item.onClick}
                  className={item.className}
                >
                  {item.label}
                </button>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
