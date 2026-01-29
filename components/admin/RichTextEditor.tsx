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
      StarterKit.configure({ heading: { levels: [2] } }),
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

  return (
    <div className="mt-2 rounded-md border border-brand/40 bg-surface focus-within:ring-2 focus-within:ring-brand/30">
      <div className="flex flex-wrap gap-1 border-b border-brand/20 px-2 py-1">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          B
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          I
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • Lista
        </button>
        <button onClick={() => fileInputRef.current?.click()}>🖼️ Imagem</button>
        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () =>
              editor
                .chain()
                .focus()
                .setImage({ src: reader.result as string })
                .run();
            reader.readAsDataURL(file);
          }}
        />
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-admin max-w-none p-3 sm:p-4 min-h-[180px] sm:min-h-[260px]"
      />
    </div>
  );
}
