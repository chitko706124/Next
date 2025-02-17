// "use client";

// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { PenSquare } from "lucide-react";
// import { Pagination } from "@/components/ui/pagination";

// const POSTS_PER_PAGE = 6;

// export default function Home() {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [session, setSession] = useState<any>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPosts, setTotalPosts] = useState(0);
//   const supabase = createClientComponentClient();

//   useEffect(() => {
//     const fetchData = async () => {
//       const [postsResponse, sessionResponse] = await Promise.all([
//         // Get total count
//         supabase
//           .from("posts")
//           .select("*", { count: "exact", head: true })
//           .eq("published", true),
//         supabase.auth.getSession(),
//       ]);

//       setTotalPosts(postsResponse.count || 0);
//       setSession(sessionResponse.data.session);

//       // Get paginated posts
//       const { data: paginatedPosts } = await supabase
//         .from("posts")
//         .select("*")
//         .eq("published", true)
//         .order("created_at", { ascending: false })
//         .range(
//           (currentPage - 1) * POSTS_PER_PAGE,
//           currentPage * POSTS_PER_PAGE - 1
//         );

//       setPosts(paginatedPosts || []);
//     };

//     fetchData();
//   }, [currentPage, supabase]);

//   const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* <div className="flex justify-between items-center mb-8">
//         <h1 className="text-4xl font-bold">Blog Posts</h1>
//         {session && (
//           <Link href="/admin">
//             <Button>
//               <PenSquare className="mr-2 h-4 w-4" />
//               Admin Dashboard
//             </Button>
//           </Link>
//         )}
//       </div> */}

//       {posts.length > 0 ? (
//         <>
//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {posts.map((post) => (
//               <Link key={post.id} href={`/posts/${post.slug}`}>
//                 <article className="group bg-card rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
//                   <div className="relative w-full h-48">
//                     {post.thumbnail_url ? (
//                       <Image
//                         src={post.thumbnail_url}
//                         alt={post.title}
//                         fill
//                         className="object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full bg-muted flex items-center justify-center">
//                         <PenSquare className="h-8 w-8 text-muted-foreground" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-6">
//                     <h2 className="text-xl font-semibold group-hover:text-primary transition-colors">
//                       {post.title}
//                     </h2>
//                     <p className="text-muted-foreground mt-2">
//                       {new Date(post.created_at).toLocaleDateString()}
//                     </p>
//                     <div className="mt-4 text-sm text-muted-foreground line-clamp-3">
//                       {post.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
//                     </div>
//                   </div>
//                 </article>
//               </Link>
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={setCurrentPage}
//             />
//           )}
//         </>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-muted-foreground">No posts available yet.</p>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  PenSquare,
  ArrowRight,
  BookOpen,
  Users,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const [postsResponse, sessionResponse] = await Promise.all([
        // Get only 3 latest posts
        supabase
          .from("posts")
          .select("*")
          .eq("published", true)
          .order("created_at", { ascending: false })
          .limit(3),
        supabase.auth.getSession(),
      ]);

      setPosts(postsResponse.data || []);
      setSession(sessionResponse.data.session);
    };

    fetchData();
  }, [supabase]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Welcome to Information Sharing
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover insightful articles, share knowledge, and join our
              community of learners and creators.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/content">
                <Button size="lg">
                  Explore Content
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-lg text-center">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Quality Content</h3>
              <p className="text-muted-foreground">
                Access well-researched articles and in-depth analysis on various
                topics.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Growing Community</h3>
              <p className="text-muted-foreground">
                Join a community of passionate learners and knowledge seekers.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-lg text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Easy Interaction</h3>
              <p className="text-muted-foreground">
                Engage with content creators and fellow readers through our
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-muted-foreground">
              Explore our most recent publications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {posts.map((post) => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
                <article className="group bg-card rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
                  <div className="relative w-full h-48">
                    {post.thumbnail_url ? (
                      <Image
                        src={post.thumbnail_url}
                        alt={post.title}
                        fill
                        loading="lazy"
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
                  <div className="p-6">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <div className="mt-4 text-sm text-muted-foreground line-clamp-3">
                      {post.content.replace(/<[^>]*>/g, "").slice(0, 150)}...
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/content">
              <Button size="lg">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Admin Link */}
      {session && (
        <div className="fixed bottom-4 right-4">
          <Link href="/admin">
            <Button>
              <PenSquare className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
