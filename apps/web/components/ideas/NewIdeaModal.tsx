// apps/web/components/ideas/NewIdeaModal.tsx
"use client";

import { useState } from "react";
import { useIdeasStore } from "@/stores/ideas";
import { Modal } from "@/components/ui/Modal";
import { IdeaCategory } from "@/types/ideas";

interface NewIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories: { value: IdeaCategory; label: string }[] = [
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "process", label: "Process" },
  { value: "research", label: "Research" },
  { value: "other", label: "Other" },
];

export default function NewIdeaModal({ isOpen, onClose }: NewIdeaModalProps) {
  const { createIdea } = useIdeasStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<IdeaCategory>("other");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    createIdea({
      title: title.trim(),
      description: description.trim(),
      category,
      status: "under_review",
      tags: tagList,
      author: "Kingsley", // This would come from auth
    });

    setTitle("");
    setDescription("");
    setCategory("other");
    setTags("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit a New Idea" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your idea a clear, descriptive title"
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your idea in detail. What problem does it solve? How would it work?"
            rows={4}
            className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as IdeaCategory)}
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-300">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="AI, Sustainability, Cost..."
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
            />
            <p className="mt-1 text-xs text-white/40">Comma separated</p>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex items-center justify-end gap-3 border-t border-[#FF6200]/10 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#FF6200]/20 px-4 py-2 text-sm text-zinc-400 hover:bg-[#FF6200]/10 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,138,0,0.3)]"
          >
            Submit Idea
          </button>
        </div>
      </form>
    </Modal>
  );
}