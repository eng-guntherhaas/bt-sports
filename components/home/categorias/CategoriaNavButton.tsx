"use client";

type Props = {
  id: string;
  direction: "prev" | "next";
};

export default function CategoriaNavButton({ id, direction }: Props) {
  return (
    <button
      id={id}
      aria-label={direction === "prev" ? "Anterior" : "Próximo"}
      className="
        hidden lg:flex
        aspect-square w-20
        items-center justify-center
        rounded-lg
        bg-surface-muted
        border border-border-muted
        text-brand text-3xl
        transition
        hover:bg-brand/10
        hover:border-brand/40
      "
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}
