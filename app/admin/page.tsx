"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }

      const { data } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      setPosts(data || []);
    };

    fetchPosts();
  }, [supabase, router]);

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    await supabase
      .from("posts")
      .update({ published: !currentStatus })
      .eq("id", id);

    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, published: !currentStatus } : post
      )
    );
  };

  const handleDelete = async (id: string) => {
    await supabase.from("posts").delete().eq("id", id);

    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      <div className="bg-card rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Created</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr key={post.id} className="border-b">
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">
                  <Button
                    variant={post.published ? "default" : "secondary"}
                    onClick={() => handleTogglePublish(post.id, post.published)}
                  >
                    {post.published ? "Published" : "Draft"}
                  </Button>
                </td>
                <td className="px-6 py-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link href={`/admin/posts/${post.id}`}>
                    <Button variant="outline" className="mr-2">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
