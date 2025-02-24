"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast";
import { TipTapEditor } from "@/components/ui/tiptap-editor";
import { ImageUpload } from "@/components/ui/image-upload";
import { Badge } from "@/components/ui/badge";
import { Tag, X } from "lucide-react";

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function EditPost({ params }: { params: { id: string } }) {
  const [post, setPost] = useState({
    title: "",
    content: "",
    slug: "",
    thumbnail_url: "",
  });
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const { toast } = useToast();

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.from("tags").select("*").order("name");

      setTags(data || []);
    };

    fetchTags();
  }, [supabase]);

  useEffect(() => {
    const fetchPost = async () => {
      if (params.id === "new") return;

      const { data: post } = await supabase
        .from("posts")
        .select(
          `
          *,
          post_tags (
            tags (
              id,
              name,
              slug
            )
          )
        `
        )
        .eq("id", params.id)
        .single();

      if (post) {
        setPost(post);
        setSelectedTags(post.post_tags.map((pt: any) => pt.tags.id));
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

    try {
      // First, insert/update the post
      const { data: postData, error: postError } = isNew
        ? await supabase
            .from("posts")
            .insert([{ ...post, published: false }])
            .select()
            .single()
        : await supabase
            .from("posts")
            .update(post)
            .eq("id", params.id)
            .select()
            .single();

      if (postError) throw postError;

      // Then, handle tags
      if (isNew) {
        // For new posts, just insert the selected tags
        if (selectedTags.length > 0) {
          const { error: tagError } = await supabase.from("post_tags").insert(
            selectedTags.map((tagId) => ({
              post_id: postData.id,
              tag_id: tagId,
            }))
          );

          if (tagError) throw tagError;
        }
      } else {
        // For existing posts, first delete all existing tags
        await supabase.from("post_tags").delete().eq("post_id", params.id);

        // Then insert the new selection
        if (selectedTags.length > 0) {
          const { error: tagError } = await supabase.from("post_tags").insert(
            selectedTags.map((tagId) => ({
              post_id: params.id,
              tag_id: tagId,
            }))
          );

          if (tagError) throw tagError;
        }
      }

      toast({
        title: "Success",
        description: `Post ${isNew ? "created" : "updated"} successfully`,
      });
      router.push("/admin");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
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
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex items-center gap-2 flex-wrap p-4 bg-muted rounded-lg">
            <Tag className="h-4 w-4 text-muted-foreground" />
            {tags.map((tag) => (
              <Badge
                key={tag.id}
                variant={
                  selectedTags.includes(tag.id) ? "default" : "secondary"
                }
                className="cursor-pointer"
                onClick={() => toggleTag(tag.id)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
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
