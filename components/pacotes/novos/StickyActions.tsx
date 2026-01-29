type StickyActionsProps = {
  loading: boolean;
  loadingMessage: string;
  onCancel: () => void;
};

export default function StickyActions({
  loading,
  loadingMessage,
  onCancel,
}: StickyActionsProps) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 sm:-mx-6 border-t border-default bg-surface/90 px-4 sm:px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-brand px-6 py-2 text-sm font-semibold text-on-brand disabled:opacity-60"
        >
          {loading ? loadingMessage : "Salvar pacote"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-md border border-default px-6 py-2 text-sm font-semibold text-admin disabled:opacity-50"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
