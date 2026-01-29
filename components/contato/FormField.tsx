type Props = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, required, error, children }: Props) {
  return (
    <div>
      <label className="block text-sm font-semibold text-color-text">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>

      {children}

      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}
