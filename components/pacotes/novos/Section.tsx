export default function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-default bg-surface p-4 sm:p-6 shadow-sm">
      <div className="mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-admin">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-admin-muted">{description}</p>
        )}
      </div>

      <div className="space-y-4 sm:space-y-5">{children}</div>
    </section>
  );
}
