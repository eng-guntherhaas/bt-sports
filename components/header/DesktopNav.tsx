import Link from "next/link";

type LinkItem = {
  label: string;
  href: string;
  className: string;
};

type Props = {
  links: LinkItem[];
};

export function DesktopNav({ links }: Props) {
  return (
    <div className="hidden lg:flex gap-x-8">
      {links.map((link) => (
        <Link key={link.href} href={link.href} className={link.className}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
