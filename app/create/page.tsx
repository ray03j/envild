'use client'

import { useFormState } from "react-dom";
import { State, createPost } from "@/app/lib/actions";
import Link from "next/link";
import { PostInfo } from "../lib/definitions";
import { CreatePost } from "@/app/ui/posts/buttons";


export default function Form() {
  const initialState = {message: null, errors: {}};
  const [state, dispatch] = useFormState<State, FormData>(createPost, initialState);
  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg" onSubmit={dispatch}>
    <h1 className="text-xl font-bold mb-4 text-black">Create Post</h1>

    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-semibold mb-1 text-black">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="env_tag" className="block text-sm font-semibold mb-1 text-black">Env Tag</label>
      <input
        id="env_tag"
        name="env_tag"
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="tags_component" className="block text-sm font-semibold mb-1 text-black">Tags Component</label>
      <input
        id="tags_component"
        name="tags_component"
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>

    <div className="mb-4">
      <CreatePost type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Post</CreatePost>
    </div>

    <div>
      <Link href="/" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
        Cancel
      </Link>
    </div>
  </form>
  );
}
