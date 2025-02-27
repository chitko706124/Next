"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PenSquare, Tag } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const POSTS_PER_PAGE = 10;

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  // Reset page when tag changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await supabase.from("tags").select("*").order("name");

      setTags(data || []);
    };

    fetchTags();
  }, [supabase]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      let query = supabase
        .from("posts")
        .select(
          `
          *,
          post_tags!inner (
            tag_id,
            tags!inner (
              id,
              name,
              slug
            )
          )
        `,
          { count: "exact" }
        )
        .eq("published", true);

      if (selectedTag) {
        query = query.eq("post_tags.tags.slug", selectedTag);
      }

      const { data, count } = await query
        .order("created_at", { ascending: false })
        .range(
          (currentPage - 1) * POSTS_PER_PAGE,
          currentPage * POSTS_PER_PAGE - 1
        );

      setTotalPosts(count || 0);
      setPosts(data || []);
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentPage, selectedTag, supabase]);

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Skeleton for post items
  const PostSkeleton = () => (
    <div className="bg-card rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <Skeleton className="w-full md:w-64 h-48" />
        <div className="p-6 flex-1 space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-4 w-1/4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );

  // Skeleton for tags sidebar
  const TagsSkeleton = () => (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-16" />
        ))}
      </div>
    </div>
  );

  // Handle tag selection
  const handleTagSelect = (tagSlug: string) => {
    setSelectedTag(selectedTag === tagSlug ? null : tagSlug);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        {isLoading ? (
          <Skeleton className="h-12 w-64" />
        ) : selectedTag ? (
          `Articles tagged with "${
            tags.find((t) => t.slug === selectedTag)?.name
          }"`
        ) : (
          "All Articles"
        )}
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content - 70% */}
        <div className="w-full md:w-[70%]">
          {isLoading ? (
            <div className="grid gap-8">
              {Array.from({ length: POSTS_PER_PAGE }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : posts.length > 0 ? (
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
                          <div className="flex gap-2 mb-4">
                            {post.post_tags
                              ?.filter((pt: any) => pt.tags)
                              .map((pt: any) => (
                                <Badge
                                  key={pt.tags.id}
                                  variant={
                                    pt.tags.slug === selectedTag
                                      ? "default"
                                      : "secondary"
                                  }
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleTagSelect(pt.tags.slug);
                                  }}
                                >
                                  {pt.tags.name}
                                </Badge>
                              ))}
                          </div>
                          <p className="text-muted-foreground text-sm mb-4">
                            {new Date(post.created_at).toLocaleDateString()}
                          </p>
                          <div className="text-muted-foreground line-clamp-3">
                            {post.content.replace(/<[^>]*>/g, "").slice(0, 200)}
                            ...
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {selectedTag
                  ? "No articles found with this tag."
                  : "No articles available yet."}
              </p>
            </div>
          )}
        </div>

        {/* Tags Sidebar - 30% */}
        <div className="w-full md:w-[30%]">
          {isLoading ? (
            <TagsSkeleton />
          ) : (
            <div className="bg-card rounded-lg shadow-md p-6 sticky top-4">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Tags</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTag === tag.slug ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => handleTagSelect(tag.slug)}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
              {selectedTag && (
                <button
                  onClick={() => setSelectedTag(null)}
                  className="text-sm text-muted-foreground hover:text-foreground mt-4 underline"
                >
                  Clear filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
