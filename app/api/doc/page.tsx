"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code } from "lucide-react";

export default function ApiDocsPage() {
  const [baseUrl, setBaseUrl] = useState(() => {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.host}`;
    }
    return "";
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">API Documentation</h1>
        <p className="text-muted-foreground mb-8">
          Use these endpoints to integrate with our blog content
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Base URL</h2>
          <div className="bg-muted p-4 rounded-md flex items-center">
            <Code className="mr-2 h-5 w-5 text-muted-foreground" />
            <code className="text-sm">{baseUrl}/api</code>
          </div>
        </div>

        <Tabs defaultValue="posts">
          <TabsList className="mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="post">Single Post</TabsTrigger>
            <TabsTrigger value="tags">Tags</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Get All Posts</CardTitle>
                <CardDescription>
                  Retrieve a list of published blog posts with optional
                  filtering and pagination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Endpoint</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">GET /api/posts</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Query Parameters</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Parameter</th>
                        <th className="text-left py-2 px-4">Type</th>
                        <th className="text-left py-2 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">
                          <code>tag</code>
                        </td>
                        <td className="py-2 px-4">string</td>
                        <td className="py-2 px-4">Filter posts by tag slug</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">
                          <code>page</code>
                        </td>
                        <td className="py-2 px-4">number</td>
                        <td className="py-2 px-4">Page number (default: 1)</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-2 px-4">
                          <code>limit</code>
                        </td>
                        <td className="py-2 px-4">number</td>
                        <td className="py-2 px-4">
                          Number of posts per page (default: 10)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Example Response</h3>
                  <pre className="bg-muted p-3 rounded-md overflow-auto text-sm">
                    {`{
  "posts": [
    {
      "id": "uuid",
      "title": "Post Title",
      "content": "Post content...",
      "slug": "post-slug",
      "published": true,
      "created_at": "2025-01-01T00:00:00.000Z",
      "updated_at": "2025-01-01T00:00:00.000Z",
      "thumbnail_url": "https://example.com/image.jpg",
      "post_tags": [
        {
          "tags": {
            "id": "uuid",
            "name": "Tag Name",
            "slug": "tag-slug"
          }
        }
      ]
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="post">
            <Card>
              <CardHeader>
                <CardTitle>Get Single Post</CardTitle>
                <CardDescription>
                  Retrieve a specific blog post by its slug
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Endpoint</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">GET /api/posts/{"{slug}"}</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Path Parameters</h3>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-4">Parameter</th>
                        <th className="text-left py-2 px-4">Type</th>
                        <th className="text-left py-2 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-2 px-4">
                          <code>slug</code>
                        </td>
                        <td className="py-2 px-4">string</td>
                        <td className="py-2 px-4">The post's slug</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Example Response</h3>
                  <pre className="bg-muted p-3 rounded-md overflow-auto text-sm">
                    {`{
  "id": "uuid",
  "title": "Post Title",
  "content": "Post content...",
  "slug": "post-slug",
  "published": true,
  "created_at": "2025-01-01T00:00:00.000Z",
  "updated_at": "2025-01-01T00:00:00.000Z",
  "thumbnail_url": "https://example.com/image.jpg",
  "post_tags": [
    {
      "tags": {
        "id": "uuid",
        "name": "Tag Name",
        "slug": "tag-slug"
      }
    }
  ]
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags">
            <Card>
              <CardHeader>
                <CardTitle>Get All Tags</CardTitle>
                <CardDescription>
                  Retrieve a list of all available tags
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Endpoint</h3>
                  <div className="bg-muted p-3 rounded-md">
                    <code className="text-sm">GET /api/tags</code>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Example Response</h3>
                  <pre className="bg-muted p-3 rounded-md overflow-auto text-sm">
                    {`[
  {
    "id": "uuid",
    "name": "Tag Name",
    "slug": "tag-slug",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
]`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Example Usage</h2>
          <Card>
            <CardHeader>
              <CardTitle>React Example</CardTitle>
              <CardDescription>
                How to fetch posts from another React application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-3 rounded-md overflow-auto text-sm">
                {`import { useEffect, useState } from 'react';

function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('${baseUrl}/api/posts');
        const data = await response.json();
        setPosts(data.posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Blog Posts</h1>
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
