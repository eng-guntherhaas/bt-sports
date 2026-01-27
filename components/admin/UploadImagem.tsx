"use client";

import { useEffect, useState } from "react";

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

  /* =========================
     PREVIEW COM CLEANUP
  ========================= */
  useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(value);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
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
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      {!value ? (
        <label className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center transition hover:border-gray-400">
          <span className="text-sm text-gray-500">
            Arraste uma imagem aqui ou
          </span>

          <span className="mt-2 inline-block rounded-md bg-gray-900 px-4 py-2 text-sm text-white">
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
            <img
              src={previewUrl}
              alt={`Preview ${label}`}
              className={`w-full rounded-md object-cover ${aspectClass}`}
            />
          )}

          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-sm text-red-600 hover:underline"
          >
            Remover imagem
          </button>
        </div>
      )}
    </div>
  );
}
