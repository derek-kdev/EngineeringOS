"use client";

import CreateOrganizationForm from "@/components/dashboard/workspace/CreateOrganizationForm";

export default function CreateOrganizationPage() {
  return (
    <div className="mx-auto max-w-4xl p-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="mb-2 text-3xl font-bold">
          Create Engineering Organisation
        </h1>

        <p className="mb-8 text-white/60">
          Set up a new collaborative engineering workspace.
        </p>

        <CreateOrganizationForm />
      </div>
    </div>
  );
}
