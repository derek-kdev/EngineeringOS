// apps/web/components/research/DocumentUpload.tsx
"use client";

import { useState, useRef } from "react";
import { useResearchStore } from "@/stores/research";
import { Modal } from "@/components/ui/Modal";
import { Upload, File, X, Check, Loader2 } from "lucide-react";

interface DocumentUploadProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DocumentUpload({ isOpen, onClose }: DocumentUploadProps) {
  const { uploadDocument, isUploading, uploadProgress } = useResearchStore();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("other");
  const [authors, setAuthors] = useState("");
  const [tags, setTags] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      if (!title) setTitle(selected.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) {
      setFile(dropped);
      if (!title) setTitle(dropped.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const authorsList = authors.split(",").map((a) => a.trim()).filter(Boolean);
    const tagsList = tags.split(",").map((t) => t.trim()).filter(Boolean);

    await uploadDocument(file, {
      title: title || file.name,
      authors: authorsList.length > 0 ? authorsList : ["Unknown"],
      category: category as any,
      tags: tagsList,
    });

    setFile(null);
    setTitle("");
    setAuthors("");
    setTags("");
    setCategory("other");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Research Document" maxWidth="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Drag & Drop */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative rounded-lg border-2 border-dashed border-[#FF6200]/30 bg-[#1F1F1F]/50 p-8 text-center transition hover:border-[#FF8A00]"
        >
          {file ? (
            <div className="flex items-center justify-center gap-3">
              <File size={24} className="text-[#FFB300]" />
              <span className="text-sm text-white">{file.name}</span>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <>
              <Upload size={32} className="mx-auto text-[#FFB300]" />
              <p className="mt-2 text-sm text-white/60">Drag & drop your document here</p>
              <p className="text-xs text-white/30">or click to browse (PDF, DOCX, TXT)</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 rounded-full bg-white/10 px-4 py-1.5 text-xs text-white hover:bg-white/20 transition"
              >
                Browse Files
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt,.md"
                onChange={handleFileSelect}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* Metadata */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title..."
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white focus:border-[#FF8A00] focus:outline-none"
            >
              <option value="material_science">Material Science</option>
              <option value="thermodynamics">Thermodynamics</option>
              <option value="aerodynamics">Aerodynamics</option>
              <option value="structural">Structural</option>
              <option value="electrical">Electrical</option>
              <option value="software">Software</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Authors</label>
            <input
              type="text"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              placeholder="Sarah, Michael..."
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="thermal, composites, aerospace..."
              className="mt-1 w-full rounded-lg border border-[#FF6200]/20 bg-[#1F1F1F] px-4 py-2.5 text-sm text-white placeholder-white/40 focus:border-[#FF8A00] focus:outline-none"
            />
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/60">Uploading...</span>
              <span className="text-white/60">{uploadProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1F1F1F]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF6200] to-[#FFB300] transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Actions */}
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
            disabled={!file || isUploading}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FF6200] to-[#FFB300] px-6 py-2 text-sm font-semibold text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {isUploading ? "Uploading..." : "Upload Document"}
          </button>
        </div>
      </form>
    </Modal>
  );
}