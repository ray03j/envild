'use client'

import { ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import SimpleMde from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useFormState } from 'react-dom';
import { State, updatePost } from '@/app/lib/actions';
import { useParams, usePathname } from 'next/navigation';
import { fetchPreviewOfPost } from '@/app/lib/data';
import { PostContentForm, PostPreview } from '@/app/lib/definitions';



export default function EditPostForm() {

  // URLのパスを取得
  const pathname = usePathname();
  console.log(pathname);
  
  // 動的ルーティングのパラメータを取得
  const params = useParams();
  const id = params.id[0];

  useEffect(() => {
    const getPostPreview = async () => {
      try {
        const data = await fetchPreviewOfPost(id);
      } catch (error) {
        console.error('Failed to fetch post preview:', error);
      }
    }
    
    
    getPostPreview();

    
  }, [id]);

  const prevState = {message: null, errors: {}};
  const [state, dispatch] = useFormState<State, FormData>(updatePost, prevState);
  // const [markdown, setMarkdown] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const formData = new FormData(event.currentTarget);
      formData.append('id', id as string); 
      
      await updatePost(state, formData);
    } catch (error) {
      console.error('更新処理に失敗しました:', error);
    }
  }
  
  if (state.errors?.content) {
    state.errors.content.forEach((error: string) => {
      console.error(error);
    });
  }

  return (
    <form action={dispatch} className="max-w-screen-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Create Post</h1>

    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-semibold mb-1 text-black">Title</label>
      <input
        id="title"
        name="title"
        value={state?.values?.title || ""}
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
        value={state?.values?.mainTag || ""}
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
      />
      <div  aria-live="polite" aria-atomic="true">
        {state.errors?.mainTag &&
          state.errors.mainTag.map((error: string) => (
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
        value={state?.values?.extraTag || ""}
        type="text"
        className="text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      <div  aria-live="polite" aria-atomic="true">
        {state.errors?.extraTag &&
          state.errors.extraTag.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </div>


        <div className="mb-8">
          <label htmlFor="content" className="block text-lg font-semibold mb-2 text-gray-800">Content</label>
          <SimpleMde
            id="content"
            value={state.values?.content}
            className="text-gray-800"
            placeholder="Write your article here..."
          />
        </div>
        <div aria-live="polite" aria-atomic="true">
        {state.errors?.content &&
          state.errors.content.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>


        <div className="mb-8 flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Create Post</button>
        </div>

      </div>
    </form>
  );
}
