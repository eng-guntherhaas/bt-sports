"use client";

type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  danger = false,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative z-10 w-full max-w-md rounded-xl bg-surface p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-admin">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-admin-muted">{description}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="
              rounded-md border border-default
              px-4 py-2 text-sm font-medium
              text-admin
              bg-surface-muted-hover
              border-muted-hover
              disabled:opacity-50
            "
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`
              rounded-md px-4 py-2 text-sm font-semibold text-white
              disabled:opacity-60
              ${
                danger
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-brand bg-brand-dark-hover"
              }
            `}
          >
            {loading ? "Processando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
