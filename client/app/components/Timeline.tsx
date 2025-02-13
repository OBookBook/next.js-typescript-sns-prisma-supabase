"use client";

import Post from "./Post";
import { useState } from "react";
import { PostType } from "../types/type";

const Timeline = () => {
  const [content, setContent] = useState<string>("");
  const [latestPosts, setLatestPosts] = useState<PostType[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/posts/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: (e.target as HTMLFormElement).content.value,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to post");
      }
      const data = await response.json();
      setLatestPosts((prevPosts) => [...prevPosts, data.user]);
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-xl rounded-xl p-6 mb-4 border border-zinc-100">
          <form onSubmit={handleSubmit}>
            <textarea
              name="content"
              className="w-full h-32 p-4 border border-zinc-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-transparent transition-all  text-zinc-800 placeholder-zinc-400"
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setContent(e.target.value);
              }}
              value={content}
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-zinc-900 hover:bg-zinc-800 duration-300 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              投稿
            </button>
          </form>
        </div>
        {latestPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default Timeline;
