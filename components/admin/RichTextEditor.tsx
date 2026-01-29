"use client";

import { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] },
      }),
      Image,
      Placeholder.configure({
        placeholder: "Comece a escrever seu conteúdo aqui…",
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  const buttonBase =
    "flex items-center justify-center h-9 px-3 rounded-md text-sm font-medium transition select-none";

  const buttonActive =
    "bg-brand/15 text-brand border border-brand/40 shadow-sm";

  const buttonInactive = "text-brand/70 hover:bg-brand/10 hover:text-brand";

  function handleImageUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run();
    };
    reader.readAsDataURL(file);
  }

  return (
    <div
      onClick={() => editor.commands.focus()}
      className="
        mt-2
        rounded-md
        border border-brand/40
        bg-surface
        cursor-text
        transition
        focus-within:border-brand
        focus-within:ring-2
        focus-within:ring-brand/30
      "
    >
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-brand/20 bg-surface px-2 py-1">
        {/* Negrito */}
        <button
          type="button"
          title="Negrito"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonBase} ${
            editor.isActive("bold") ? buttonActive : buttonInactive
          }`}
        >
          <span className="font-extrabold">B</span>
        </button>

        {/* Itálico */}
        <button
          type="button"
          title="Itálico"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonBase} ${
            editor.isActive("italic") ? buttonActive : buttonInactive
          }`}
        >
          <span className="italic font-semibold">I</span>
        </button>

        <div className="mx-1 h-5 w-px bg-brand/30" />

        {/* Título */}
        <button
          type="button"
          title="Título"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`${buttonBase} ${
            editor.isActive("heading", { level: 2 })
              ? buttonActive
              : buttonInactive
          }`}
        >
          Título
        </button>

        <div className="mx-1 h-5 w-px bg-brand/30" />

        {/* Lista */}
        <button
          type="button"
          title="Lista com marcadores"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonBase} ${
            editor.isActive("bulletList") ? buttonActive : buttonInactive
          }`}
        >
          • Lista
        </button>

        {/* Lista numerada */}
        <button
          type="button"
          title="Lista numerada"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonBase} ${
            editor.isActive("orderedList") ? buttonActive : buttonInactive
          }`}
        >
          1. Lista
        </button>

        <div className="mx-1 h-5 w-px bg-brand/30" />

        {/* Upload de imagem */}
        <button
          type="button"
          title="Inserir imagem"
          onClick={() => fileInputRef.current?.click()}
          className={`${buttonBase} ${buttonInactive}`}
        >
          🖼️ Inserir Imagem
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>

      {/* Área editável */}
      <EditorContent
        editor={editor}
        className="
          prose prose-admin max-w-none
          p-4
          min-h-[260px]
          leading-relaxed
          text-text
          caret-brand
          outline-none

          [&_.ProseMirror]:text-text
          [&_.ProseMirror]:focus:outline-none
          [&_.ProseMirror-empty::before]:text-muted
        "
      />
    </div>
  );
}
