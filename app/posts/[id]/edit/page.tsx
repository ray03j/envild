'use client'

import { useFormState } from "react-dom";
import { State, createPost } from "@/app/lib/actions";
import Link from "next/link";
import { PostPreview } from "@/app/lib/definitions";
import { CreatePost } from "@/app/ui/posts/buttons";

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState<State, FormData>(createPost, initialState);

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg" action={dispatch}>
      <h1 className="text-xl font-bold mb-4 text-black">Create Post</h1>

      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-semibold mb-1 text-black">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6} // テキストエリアの高さを設定
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
        />
        <div aria-live="polite" aria-atomic="true">
          {state.errors?.content &&
            state.errors.content.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div className="mb-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Create Post</button>
        {state.message && (
          <div className="text-red-600 text-sm" aria-live="polite">
            {state.message}
          </div>
        )}
      </div>

      <div>
        <Link href="/" className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
          Cancel
        </Link>
      </div>
    </form>
  );
}
