import { TextareaHTMLAttributes } from "react";
import { FormField } from "./FormField";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function FormTextarea({ label, ...props }: Props) {
  return (
    <FormField label={label} required={props.required}>
      <textarea
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
