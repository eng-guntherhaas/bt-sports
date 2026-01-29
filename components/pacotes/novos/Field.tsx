export default function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-admin">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-admin-muted">{hint}</p>}
    </div>
  );
}
