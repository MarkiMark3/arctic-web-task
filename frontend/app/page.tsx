"use client";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";

type Snippet = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  type: string;
};

export default function Home() {
  const [allSnippets, setAllSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/snippets")
      .then((res) => res.json())
      .then((data) => {
        setAllSnippets(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const snippets = useMemo(() => {
    let filtered = [...allSnippets];

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.content.toLowerCase().includes(q),
      );
    }

    if (tag) {
      const t = tag.toLowerCase();
      filtered = filtered.filter((s) =>
        s.tags?.some((x) => x.toLowerCase().includes(t)),
      );
    }

    return filtered;
  }, [allSnippets, search, tag]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-2xl font-bold mb-4">Snippet Vault</h1>

        <Link
          href="/snippets/new"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md border border-blue-700 hover:bg-blue-700 transition mb-4"
        >
          Add New Snippet
        </Link>

        <div className="flex gap-2 w-full max-w-md mb-4">
          <input
            className="border p-2 w-full rounded-md"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            className="border p-2 w-40 rounded-md"
            placeholder="Tag..."
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full">
        {snippets.length === 0 && <p>No snippets yet</p>}

        <div className="space-y-3">
          {snippets.map((s) => (
            <div key={s._id} className="border p-3 rounded">
              <h2 className="font-semibold">{s.title}</h2>
              <p className="text-sm text-gray-600 mb-1">{s.content}</p>

              <div className="flex gap-2 flex-wrap">
                {s.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-gray-200 rounded text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link href={`/snippets/${s._id}`}>
                <h2 className="font-semibold hover:underline">more...</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
