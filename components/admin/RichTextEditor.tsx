"use client";

import { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Image,
      TextStyle,
      Color,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
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

  const e = editor;

  const btn = "px-2 py-1 text-sm rounded hover:bg-brand/10 transition";

  function addLink() {
    const previousUrl = e.getAttributes("link").href || "";
    const url = window.prompt("URL do link:", previousUrl);

    if (url === null) return;

    if (url === "") {
      e.chain().focus().unsetLink().run();
      return;
    }

    const normalized =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;

    e.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: normalized, target: "_blank" })
      .run();
  }

  function handleImageUpload(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      e.chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run();
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="mt-2 border rounded-md bg-surface">
      <div className="flex flex-wrap gap-1 border-b p-2 bg-surface-muted">
        <button
          type="button"
          onClick={() => e.chain().focus().toggleBold().run()}
          className={btn}
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().toggleItalic().run()}
          className={btn}
        >
          <em>I</em>
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().toggleUnderline().run()}
          className={btn}
        >
          U
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().toggleStrike().run()}
          className={btn}
        >
          S
        </button>

        <div className="w-px bg-border mx-2" />

        <button
          type="button"
          onClick={() => e.chain().focus().setTextAlign("left").run()}
          className={btn}
        >
          ⬅
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().setTextAlign("center").run()}
          className={btn}
        >
          ⬌
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().setTextAlign("right").run()}
          className={btn}
        >
          ➡
        </button>

        <div className="w-px bg-border mx-2" />

        <input
          type="color"
          onChange={(ev) => e.chain().focus().setColor(ev.target.value).run()}
          className="w-8 h-8"
        />

        <select
          onChange={(ev) => {
            const value = ev.target.value;

            if (!value) {
              e.chain().focus().setParagraph().run();
              return;
            }

            const level = Number(value) as 1 | 2 | 3;

            e.chain().focus().toggleHeading({ level }).run();
          }}
          className="text-sm border rounded px-1"
        >
          <option value="">Parágrafo</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        <div className="w-px bg-border mx-2" />

        <button
          type="button"
          onClick={() => e.chain().focus().toggleBulletList().run()}
          className={btn}
        >
          •
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().toggleOrderedList().run()}
          className={btn}
        >
          1.
        </button>

        <button
          type="button"
          onClick={addLink}
          className={`${btn} ${
            e.isActive("link") ? "bg-brand/20 text-brand" : ""
          }`}
        >
          🔗
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().unsetLink().run()}
          disabled={!e.isActive("link")}
          className={`${btn} ${
            e.isActive("link")
              ? "text-danger hover:bg-danger/10"
              : "opacity-40 cursor-not-allowed"
          }`}
        >
          ✕🔗
        </button>

        <div className="w-px bg-border mx-2" />

        <button
          type="button"
          onClick={() => e.chain().focus().undo().run()}
          className={btn}
        >
          ↺
        </button>

        <button
          type="button"
          onClick={() => e.chain().focus().redo().run()}
          className={btn}
        >
          ↻
        </button>

        <div className="w-px bg-border mx-2" />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={btn}
        >
          🖼
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          accept="image/*"
          onChange={(ev) => {
            const file = ev.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>

      <EditorContent
        editor={e}
        className="
    prose max-w-none
    p-4
    min-h-55
    outline-none

    [&_.ProseMirror]:text-text

    [&_a]:text-brand
    [&_a]:underline
    [&_a]:decoration-2
    [&_a]:underline-offset-2
    [&_a]:decoration-brand/70
    [&_a]:font-medium
    [&_a]:transition

    [&_a:hover]:text-brand-dark
    [&_a:hover]:decoration-brand-dark
    [&_a:hover]:cursor-pointer
  "
      />
    </div>
  );
}
