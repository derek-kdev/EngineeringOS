"use client";

import { useState } from "react";
import { organizationsApi } from "@/lib/api/organizations";

interface Props {
  onCreated?: () => void;
  onCancel?: () => void;
}

export default function CreateOrganizationForm({
  onCreated,
  onCancel,
}: Props) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  async function submit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      await organizationsApi.create({
        name,
        description,
      });


      setName("");
      setDescription("");

      onCreated?.();


    } catch (err) {

      console.error(err);

      setError(
        "Unable to create organisation."
      );

    } finally {

      setLoading(false);

    }
  }



  return (

    <form
      onSubmit={submit}
      className="space-y-5"
    >

      <div className="flex justify-between items-center">

        <h2 className="text-xl font-semibold">
          Create Organisation
        </h2>


        <button
          type="button"
          onClick={onCancel}
          className="
          text-white/60
          hover:text-white
          text-xl
          "
        >
          ✕
        </button>

      </div>



      <input
        value={name}
        onChange={
          e => setName(e.target.value)
        }
        placeholder="Organisation name"
        className="
        w-full
        rounded-lg
        bg-black/20
        border
        border-white/10
        px-4
        py-3
        text-white
        "
        required
      />



      <textarea

        value={description}

        onChange={
          e => setDescription(e.target.value)
        }

        placeholder="Description"

        className="
        w-full
        rounded-lg
        bg-black/20
        border
        border-white/10
        px-4
        py-3
        text-white
        "

      />



      <div className="flex gap-3">


        <button

          type="button"

          onClick={onCancel}

          className="
          rounded-xl
          border
          border-white/20
          px-6
          py-3
          "

        >

          Cancel

        </button>



        <button

          disabled={loading}

          className="
          rounded-xl
          bg-[#00D2FF]
          px-6
          py-3
          font-semibold
          text-black
          "

        >

          {
            loading
            ?
            "Creating..."
            :
            "Create Organisation"
          }

        </button>


      </div>



      {
        error &&
        <p className="text-red-400">
          {error}
        </p>
      }


    </form>

  );

}
