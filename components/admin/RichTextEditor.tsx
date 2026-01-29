"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image,
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const buttonBase = "rounded px-3 py-1 text-sm font-medium transition";

  const buttonActive = "bg-brand-soft text-brand";

  const buttonInactive = "text-admin hover-brand-soft";

  function inserirImagem() {
    const url = prompt("URL da imagem");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  }

  return (
    <div
      onClick={() => editor.commands.focus()}
      className="
        mt-2
        rounded-md
        border border-default
        bg-surface
        cursor-text
        transition
        focus-within:border-brand
        focus-within:ring-2
        focus-within:ring-brand/30
      "
    >
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b border-default bg-surface-muted p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonBase} ${
            editor.isActive("bold") ? buttonActive : buttonInactive
          }`}
        >
          <b>B</b>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonBase} ${
            editor.isActive("italic") ? buttonActive : buttonInactive
          }`}
        >
          <i>I</i>
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${buttonBase} ${
            editor.isActive("heading", { level: 2 })
              ? buttonActive
              : buttonInactive
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonBase} ${
            editor.isActive("bulletList") ? buttonActive : buttonInactive
          }`}
        >
          • Lista
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonBase} ${
            editor.isActive("orderedList") ? buttonActive : buttonInactive
          }`}
        >
          1. Lista
        </button>

        <button
          type="button"
          onClick={inserirImagem}
          className={`${buttonBase} ${buttonInactive}`}
        >
          🖼 Imagem
        </button>
      </div>

      {/* Área editável */}
      <EditorContent
        editor={editor}
        className="
          prose max-w-none
          p-4
          min-h-[220px]
          text-admin
          outline-none
        "
      />
    </div>
  );
}
