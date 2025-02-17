"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

import { TipTapEditor } from "@/components/ui/tiptap-editor";
import { ImageUpload } from "@/components/ui/image-upload";

export default function EditPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState({
    title: "",
    content: "",
    slug: "",
    thumbnail_url: "",
  });
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (params.id === "new") return;

      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("id", params.id)
        .single();

      if (data) {
        setPost(data);
      }
    };

    fetchPost();
  }, [params.id, supabase]);

  const handleImageUpload = async (file: File): Promise<string> => {
    const filename = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("blog-images")
      .upload(filename, file);

    if (error) {
      throw error;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("blog-images").getPublicUrl(filename);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isNew = params.id === "new";
    const { error } = isNew
      ? await supabase.from("posts").insert([{ ...post, published: false }])
      : await supabase.from("posts").update(post).eq("id", params.id);

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Post ${isNew ? "created" : "updated"} successfully`,
      });
      router.push("/admin");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        {params.id === "new" ? "Create Post" : "Edit Post"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">
            Thumbnail Image
          </label>
          <ImageUpload
            value={post.thumbnail_url}
            onChange={(url) => setPost({ ...post, thumbnail_url: url })}
            onUpload={handleImageUpload}
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">
            Slug
          </label>
          <Input
            id="slug"
            value={post.slug}
            onChange={(e) => setPost({ ...post, slug: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            Content
          </label>
          <TipTapEditor
            content={post.content}
            onChange={(content) => setPost({ ...post, content })}
            onImageUpload={handleImageUpload}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin")}
          >
            Cancel
          </Button>
          <Button type="submit">
            {params.id === "new" ? "Create" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}
