"use client";

import { useState } from "react";
import { organizationsApi } from "@/lib/api/organizations";

interface Props {
  onClose?: () => void;
  onCreated?: () => void;
}

export default function CreateOrganizationForm({
  onCreated,
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
