"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
//import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
//import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import { Box, FormHelperText, IconButton, Divider } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatStrikethrough,
  FormatListBulleted,
  FormatListNumbered,
  FormatQuote,
  Code,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
} from "@mui/icons-material";

const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 0.5,
        p: 1,
        backgroundColor: "grey.100",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBold().run()}
        color={editor.isActive("bold") ? "primary" : "default"}
      >
        <FormatBold fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        color={editor.isActive("italic") ? "primary" : "default"}
      >
        <FormatItalic fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        color={editor.isActive("underline") ? "primary" : "default"}
      >
        <FormatUnderlined fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        color={editor.isActive("strike") ? "primary" : "default"}
      >
        <FormatStrikethrough fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        color={editor.isActive("heading", { level: 1 }) ? "primary" : "default"}
      >
        <Box sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>H1</Box>
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        color={editor.isActive("heading", { level: 2 }) ? "primary" : "default"}
      >
        <Box sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>H2</Box>
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        color={editor.isActive("heading", { level: 3 }) ? "primary" : "default"}
      >
        <Box sx={{ fontSize: "0.75rem", fontWeight: "bold" }}>H3</Box>
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        color={editor.isActive("bulletList") ? "primary" : "default"}
      >
        <FormatListBulleted fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        color={editor.isActive("orderedList") ? "primary" : "default"}
      >
        <FormatListNumbered fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        color={editor.isActive("blockquote") ? "primary" : "default"}
      >
        <FormatQuote fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        color={editor.isActive("codeBlock") ? "primary" : "default"}
      >
        <Code fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        color={editor.isActive({ textAlign: "left" }) ? "primary" : "default"}
      >
        <FormatAlignLeft fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        color={editor.isActive({ textAlign: "center" }) ? "primary" : "default"}
      >
        <FormatAlignCenter fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        color={editor.isActive({ textAlign: "right" }) ? "primary" : "default"}
      >
        <FormatAlignRight fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        color={editor.isActive({ textAlign: "justify" }) ? "primary" : "default"}
      >
        <FormatAlignJustify fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <IconButton size="small" onClick={addLink}>
        <LinkIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" onClick={addImage}>
        <ImageIcon fontSize="small" />
      </IconButton>

      <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

      <IconButton
        size="small"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo fontSize="small" />
      </IconButton>
      <IconButton
        size="small"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default function RichTextEditor({
  value,
  onChange,
  error,
  helperText,
  placeholder = "Write your content here...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable extensions we don't want from StarterKit
      }),
      //Underline,
      TextStyle,
      Color,
     /*  Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline',
        },
      }), */
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none",
      },
    },
  });

  return (
    <Box>
      <Box
        sx={{
          border: error ? "1px solid #d32f2f" : "1px solid rgba(0, 0, 0, 0.23)",
          borderRadius: 1,
          "&:hover": {
            borderColor: error ? "#d32f2f" : "rgba(0, 0, 0, 0.87)",
          },
        }}
      >
        <MenuBar editor={editor} />
        <Box
          sx={{
            "& .ProseMirror": {
              minHeight: 300,
              p: 2,
              fontSize: "16px",
              fontFamily: "inherit",
              outline: "none",
              "& p": {
                margin: "0.5em 0",
              },
              "& h1": {
                fontSize: "2em",
                fontWeight: "bold",
                margin: "0.67em 0",
              },
              "& h2": {
                fontSize: "1.5em",
                fontWeight: "bold",
                margin: "0.75em 0",
              },
              "& h3": {
                fontSize: "1.17em",
                fontWeight: "bold",
                margin: "0.83em 0",
              },
              "& ul, & ol": {
                paddingLeft: "2em",
              },
              "& blockquote": {
                borderLeft: "3px solid #ccc",
                paddingLeft: "1em",
                marginLeft: 0,
                fontStyle: "italic",
              },
              "& pre": {
                backgroundColor: "#f5f5f5",
                padding: "1em",
                borderRadius: "4px",
                overflow: "auto",
              },
              "& code": {
                backgroundColor: "#f5f5f5",
                padding: "0.2em 0.4em",
                borderRadius: "3px",
                fontSize: "0.9em",
              },
              "& img": {
                maxWidth: "100%",
                height: "auto",
              },
            },
            "& .ProseMirror p.is-editor-empty:first-of-type::before": {
              content: `"${placeholder}"`,
              color: "text.disabled",
              pointerEvents: "none",
              height: 0,
              float: "left",
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </Box>
      {helperText && (
        <FormHelperText error={error} sx={{ ml: 2 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  );
}
