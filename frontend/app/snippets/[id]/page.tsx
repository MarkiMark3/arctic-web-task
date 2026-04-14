"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: string;
};

export default function SnippetPage() {
  const { id } = useParams();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState("note");

  const [snippet, setSnippet] = useState<Snippet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/snippets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSnippet(data);

        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(", "));
        setType(data.type);

        setLoading(false);
      });
  }, [id]);

  async function handleDelete() {
    const res = await fetch(`http://localhost:3000/snippets/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/");
    } else {
      alert("Delete failed");
    }
  }

  if (loading) return <p className="p-6">Loading...</p>;
  if (!snippet) return <p className="p-6">Not found</p>;

  async function handleUpdate() {
    const res = await fetch(`http://localhost:3000/snippets/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        type,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setSnippet(data);
      setIsEditing(false);
    } else {
      console.log(await res.text());
      alert("Update failed");
    }
  }

  console.log(tags);

  return (
    <div className="p-6 max-w-xl space-y-3">
      {isEditing ? (
        <div className="space-y-2">
          <input
            className="border p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="border p-2 w-full"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            className="border p-2 w-full"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="tags comma separated"
          />

          <select
            className="border p-2 w-full"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="note">note</option>
            <option value="link">link</option>
            <option value="command">command</option>
          </select>
        </div>
      ) : (
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{snippet?.title}</h1>
          <p>{snippet?.content}</p>
          <p>
            {" "}
            {snippet.tags?.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-200 rounded text-sm mr-4"
              >
                {tag}
              </span>
            ))}
          </p>
        </div>
      )}

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-4 py-2 rounded mr-4 cursor-pointer"
      >
        Delete
      </button>

      {!isEditing ? (
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Edit
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
          >
            Save
          </button>

          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded cursor-pointer"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
