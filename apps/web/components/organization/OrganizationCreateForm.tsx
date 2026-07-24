"use client";

import { useState } from "react";
import { organizationsApi } from "@/lib/api/organizations";
import { useRouter } from "next/navigation";
import axios from "axios";

interface ApiErrorResponse {
  message?: string;
}

export default function OrganizationCreateForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const organization = await organizationsApi.create({
        name,
        description,
      });

      router.push(
        `/dashboard/organization?id=${organization.id}`
      );

    } catch (err: unknown) {

      if (axios.isAxiosError<ApiErrorResponse>(err)) {

        setError(
          err.response?.data?.message ||
          "Unable to create organization"
        );

      } else {

        setError(
          "Unable to create organization"
        );

      }

    } finally {

      setLoading(false);

    }
  }

  return (
    <form
      onSubmit={submit}
      className="
      max-w-xl
      space-y-5
      rounded-2xl
      border
      border-white/10
      bg-white/5
      p-8
      backdrop-blur-xl
      "
    >

      <h2 className="text-xl font-semibold">
        Create Engineering Workspace
      </h2>

      {error && (
        <p className="text-red-400 text-sm">
          {error}
        </p>
      )}

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Organization name"
        required
        className="
        w-full
        rounded-lg
        bg-black/30
        border
        border-white/10
        px-4
        py-3
        "
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="
        w-full
        rounded-lg
        bg-black/30
        border
        border-white/10
        px-4
        py-3
        "
      />

      <button
        disabled={loading}
        className="
        rounded-lg
        bg-blue-500
        px-6
        py-3
        font-medium
        disabled:opacity-50
        "
      >
        {loading ? "Creating..." : "Create Workspace"}
      </button>

    </form>
  );
}
