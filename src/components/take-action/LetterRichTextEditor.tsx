"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Undo2,
  Redo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface LetterRichTextEditorHandle {
  focus: () => void;
}

interface LetterRichTextEditorProps {
  /** HTML content of the letter */
  value: string;
  onChange: (html: string) => void;
  className?: string;
  /** Visually highlight the editor (used by the Edit Letter button) */
  highlighted?: boolean;
  placeholder?: string;
}

const TOOLBAR_ACTIONS: { cmd: string; icon: typeof Bold; label: string }[] = [
  { cmd: "bold", icon: Bold, label: "Bold" },
  { cmd: "italic", icon: Italic, label: "Italic" },
  { cmd: "underline", icon: Underline, label: "Underline" },
  { cmd: "insertUnorderedList", icon: List, label: "Bullet list" },
  { cmd: "insertOrderedList", icon: ListOrdered, label: "Numbered list" },
  { cmd: "undo", icon: Undo2, label: "Undo" },
  { cmd: "redo", icon: Redo2, label: "Redo" },
];

/**
 * Lightweight rich text editor for the letter preview.
 * Prototype-grade: uses contentEditable + execCommand, which is fine for
 * demo formatting (bold/italic/lists/undo) without a heavy editor dependency.
 */
const LetterRichTextEditor = forwardRef<LetterRichTextEditorHandle, LetterRichTextEditorProps>(
  function LetterRichTextEditor({ value, onChange, className, highlighted, placeholder }, ref) {
    const editorRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        editorRef.current?.focus();
      },
    }));

    // Sync external value changes (template switch / reset) without
    // clobbering the caret while the user is typing.
    useEffect(() => {
      const el = editorRef.current;
      if (el && el.innerHTML !== value && document.activeElement !== el) {
        el.innerHTML = value;
      }
    }, [value]);

    const exec = (cmd: string) => {
      editorRef.current?.focus();
      document.execCommand(cmd);
      if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    return (
      <div
        className={cn(
          "flex flex-col rounded-lg border transition-all",
          highlighted
            ? "border-[#1877F2] ring-2 ring-[#1877F2]/20"
            : "border-transparent",
          className
        )}
      >
        <div
          role="toolbar"
          aria-label="Letter formatting"
          className={cn(
            "flex flex-wrap items-center gap-1 rounded-t-lg border-b border-slate-100 bg-slate-50/80 px-2 py-1.5",
            !highlighted && "rounded-lg"
          )}
        >
          {TOOLBAR_ACTIONS.map(({ cmd, icon: Icon, label }) => (
            <button
              key={cmd}
              type="button"
              title={label}
              aria-label={label}
              onMouseDown={(e) => {
                // Keep selection inside the editor
                e.preventDefault();
                exec(cmd);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white hover:text-slate-900 hover:shadow-sm active:scale-95"
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Edit your letter"
          data-placeholder={placeholder}
          onInput={() => {
            if (editorRef.current) onChange(editorRef.current.innerHTML);
          }}
          className={cn(
            "letter-rte min-h-[300px] flex-grow px-3 py-3 text-sm md:text-[15px] text-slate-800 leading-[1.8] font-medium focus:outline-none",
            "[&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6"
          )}
        />
      </div>
    );
  }
);

export default LetterRichTextEditor;
