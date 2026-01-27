"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

type Props = {
  value: string;
  onChange: (html: string) => void;
  onInsertImage: () => void;
};

export default function RichTextEditor({
  value,
  onChange,
  onInsertImage,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-md border bg-white">
      <div className="flex gap-2 border-b bg-gray-50 p-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <b>B</b>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <i>I</i>
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • Lista
        </button>

        <button type="button" onClick={onInsertImage}>
          🖼 Galeria
        </button>
      </div>

      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
}
