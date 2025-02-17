import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Button } from "./button";
import {
  Bold,
  Italic,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  onImageUpload: (file: File) => Promise<string>;
}

export function TipTapEditor({
  content,
  onChange,
  onImageUpload,
}: TipTapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getText());
    },
  });

  if (!editor) {
    return null;
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    try {
      const url = await onImageUpload(e.target.files[0]);
      editor.chain().focus().setImage({ src: url }).run();
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="border rounded-lg">
      <div className="border-b p-2 flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-muted" : ""}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-muted" : ""}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={addLink}
          className={editor.isActive("link") ? "bg-muted" : ""}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </Button>

        <label htmlFor="image-upload">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            title="Upload Image"
            asChild
          >
            <span>
              <ImageIcon className="h-4 w-4" />
            </span>
          </Button>
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      <EditorContent
        editor={editor}
        className="prose prose-sm max-w-none p-4 focus:outline-none"
      />
    </div>
  );
}
// "use client";

// import { useState, useEffect } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Image from "@tiptap/extension-image";
// import Link from "@tiptap/extension-link";
// import { Button } from "./button";
// import {
//   Bold,
//   Italic,
//   Image as ImageIcon,
//   Link as LinkIcon,
// } from "lucide-react";

// interface TipTapEditorProps {
//   content: string;
//   onChange: (content: string) => void;
//   onImageUpload: (file: File) => Promise<string>;
// }

// export function TipTapEditor({
//   content,
//   onChange,
//   onImageUpload,
// }: TipTapEditorProps) {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const editor = useEditor({
//     extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
//     content,
//     onUpdate: ({ editor }) => {
//       onChange(editor.getHTML());
//     },
//     editorProps: {
//       attributes: {
//         class: "prose prose-sm max-w-none p-4 focus:outline-none",
//       },
//     },
//     immediatelyRender: false, // ✅ Fix hydration mismatch
//   });

//   if (!isClient) return null; // Prevent SSR hydration mismatch

//   if (!editor) return null;

//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files?.[0]) return;

//     try {
//       const url = await onImageUpload(e.target.files[0]);
//       editor.chain().focus().setImage({ src: url }).run();
//     } catch (error) {
//       console.error("Upload error:", error);
//     }
//   };

//   const addLink = () => {
//     const url = window.prompt("Enter URL");
//     if (url) {
//       editor.chain().focus().setLink({ href: url }).run();
//     }
//   };

//   return (
//     <div className="border rounded-lg">
//       <div className="border-b p-2 flex flex-wrap gap-2">
//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleBold().run()}
//           className={editor.isActive("bold") ? "bg-muted" : ""}
//           title="Bold"
//         >
//           <Bold className="h-4 w-4" />
//         </Button>

//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={() => editor.chain().focus().toggleItalic().run()}
//           className={editor.isActive("italic") ? "bg-muted" : ""}
//           title="Italic"
//         >
//           <Italic className="h-4 w-4" />
//         </Button>

//         <Button
//           variant="ghost"
//           size="sm"
//           onClick={addLink}
//           className={editor.isActive("link") ? "bg-muted" : ""}
//           title="Add Link"
//         >
//           <LinkIcon className="h-4 w-4" />
//         </Button>

//         <label htmlFor="image-upload">
//           <Button
//             variant="ghost"
//             size="sm"
//             className="cursor-pointer"
//             title="Upload Image"
//             asChild
//           >
//             <span>
//               <ImageIcon className="h-4 w-4" />
//             </span>
//           </Button>
//         </label>
//         <input
//           id="image-upload"
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="hidden"
//         />
//       </div>

//       <EditorContent editor={editor} />
//     </div>
//   );
// }
