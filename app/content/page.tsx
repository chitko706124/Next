"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PenSquare } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";

const POSTS_PER_PAGE = 5;

export default function ContentPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPosts = async () => {
      // Get total count
      const { count } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .eq("published", true);

      setTotalPosts(count || 0);

      // Get paginated posts
      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .range(
          (currentPage - 1) * POSTS_PER_PAGE,
          currentPage * POSTS_PER_PAGE - 1
        );

      setPosts(data || []);
    };

    fetchPosts();
  }, [currentPage, supabase]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">All Articles</h1>

      {posts.length > 0 ? (
        <>
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <article className="group bg-card rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.01]">
                  <div className="md:flex">
                    <div className="relative w-full md:w-64 h-48">
                      {post.thumbnail_url ? (
                        <Image
                          src={post.thumbnail_url}
                          alt={post.title}
                          fill
                          priority={true}
                          placeholder="empty"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-muted flex items-center justify-center">
                          <PenSquare className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1">
                      <h2 className="text-2xl font-semibold group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4">
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                      <div className="text-muted-foreground line-clamp-3">
                        {post.content.replace(/<[^>]*>/g, "").slice(0, 200)}...
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No articles available yet.</p>
        </div>
      )}
    </div>
  );
}
