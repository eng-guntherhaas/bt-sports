import { InputHTMLAttributes } from "react";
import { FormField } from "./FormField";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function FormInput({ label, error, ...props }: Props) {
  return (
    <FormField label={label} required={props.required} error={error}>
      <input
        {...props}
        className="
          mt-2 w-full rounded-md
          bg-surface px-3.5 py-2
          border border-default
          focus-ring-brand
        "
      />
    </FormField>
  );
}
