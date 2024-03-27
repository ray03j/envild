'use client'

import { useFormState } from "react-dom";
import { createPost } from "@/app/lib/actions";
import Link from "next/link";
import { PostPreview, State } from "@/app/lib/definitions";
import { CreatePost } from "@/app/ui/posts/buttons";
import { HomeButton } from "@/app/ui/posts/buttons";

type Optional = "id" | "userid" | "dateTime";
type PostForm = Omit<PostPreview, Optional>;

export default function PostForm() {
  const initialState = {message: null, errors: {}};
  const [state, dispatch] = useFormState<State, FormData>(createPost, initialState);

  return (
    <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg" action={dispatch}>
    <h1 className="text-xl font-bold mb-4 text-black">Create Post</h1>

    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-semibold mb-1 text-black">Title</label>
      <input
        id="title"
        name="title"
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
      />
      <div aria-live="polite" aria-atomic="true">
        {state.errors?.title &&
          state.errors.title.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="main_tag" className="block text-sm font-semibold mb-1 text-black">Env Tag</label>
      <input
        id="main_tag"
        name="main_tag"
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
      />
      <div  aria-live="polite" aria-atomic="true">
        {state.errors?.main_tag &&
          state.errors.main_tag.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>

    <div className="mb-4">
      <label htmlFor="extra_tag" className="block text-sm font-semibold mb-1 text-black">Tags Component</label>
      <input
        id="extra_tag"
        name="extra_tag"
        type="text"
        className="text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      <div  aria-live="polite" aria-atomic="true">
        {state.errors?.extra_tag &&
          state.errors.extra_tag.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>
    

    <div className="mb-4">
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">投稿</button>
      {state.message && (
        // aria-live="polite" は、動的に変化する要素をスクリーンリーダーに読み上げさせるための属性
        // これにより、エラーメッセージが表示されたときにスクリーンリーダーが読み上げる
        <div className="text-red-600 text-sm" aria-live="polite">
          {state.message}
        </div>
      )}        
    </div>

    <HomeButton>キャンセル</HomeButton>
  </form>
  );
}
