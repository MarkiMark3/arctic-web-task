"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewSnippetPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState("note");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags: tags.split(",").map((t) => t.trim()),
        type,
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/");
    } else {
      alert("Error creating snippet");
    }
  }

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">New Snippet</h1>

      <form onSubmit={handleSubmit} className="space-y-3 ">
        <input
          className="border p-2 w-full rounded-md"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="border p-2 w-full rounded-md"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full rounded-md"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded-md"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="note">note</option>
          <option value="link">link</option>
          <option value="command">command</option>
        </select>

        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer transition hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
}
