"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type AspectRatio = "16:9" | "4:3" | "21:9" | "auto";

type UploadImagemProps = {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  aspect?: AspectRatio;
};

export default function UploadImagem({
  label,
  value,
  onChange,
  aspect = "16:9",
}: UploadImagemProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [value]);

  const aspectClass =
    aspect === "16:9"
      ? "aspect-video"
      : aspect === "4:3"
        ? "aspect-[4/3]"
        : aspect === "21:9"
          ? "aspect-[21/9]"
          : "";

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-admin">
        {label}
      </label>

      {!value ? (
        <label
          className="
            flex cursor-pointer flex-col items-center justify-center
            rounded-md border-2 border-dashed border-border-muted
            bg-surface-muted p-6 text-center
            transition
            hover:border-brand hover:bg-brand-soft/30
            focus-within:ring-2 focus-within:ring-brand/30
          "
        >
          <span className="text-sm text-admin-muted">
            Arraste uma imagem aqui ou
          </span>

          <span
            className="
              mt-3 inline-block rounded-md
              bg-brand px-4 py-2
              text-sm font-medium text-on-brand
              transition hover:bg-brand-dark
            "
          >
            Escolher imagem
          </span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </label>
      ) : (
        <div className="space-y-3">
          {previewUrl && (
            <div className="max-w-sm">
              <div
                className={`
        relative w-full overflow-hidden
        rounded-md border border-default
        bg-black/5
        ${aspectClass}
      `}
              >
                <Image
                  src={previewUrl}
                  alt={`Preview ${label}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-sm font-medium text-danger hover:underline"
          >
            Remover imagem
          </button>
        </div>
      )}
    </div>
  );
}
