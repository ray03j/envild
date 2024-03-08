'use client'

import { useEffect, useState } from 'react';
import SimpleMde from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";
import { useFormState } from 'react-dom';
import { updatePost } from '@/app/lib/actions';
import { useParams, usePathname } from 'next/navigation';
import { fetchPreviewOfPost } from '@/app/lib/data';
import { State } from '@/app/lib/definitions';




export default function EditPostForm() {
  
  const [prevState, setPrevState] = useState<State>({message: null, values: {}, errors: {}});
  const [state, dispatch] = useFormState<State, FormData>(updatePost, prevState);
  
  // URLのパスを取得
  const pathname = usePathname();
  
  // 動的ルーティングのパラメータを取得
  const params = useParams();
  const id = params.id as string;
  
  useEffect(() => {
    const getPostPreview = async () => {
      try {
        const data = await fetchPreviewOfPost(id);
        console.log("data:",data)
        
        // const newState: Awaited<State> = {
        //   ...prevState,
        //   values: {
        //     title: data.title,
        //     mainTag: data.mainTag,
        //     extraTag: data.extraTag,
        //     content: data.content
        //   }
        // }

        const newState: Awaited<State> = {
          ...prevState,
          values: {
            ...data,
          }
        }

        setPrevState(newState);
        console.log("nw:",newState.values)

      } catch (error) {
        console.error('Failed to fetch post preview:', error);
      }
    }

    getPostPreview();

  }, []);
  
  useEffect(() => {
    console.log("new prevState:", prevState.values);
  }, [prevState]);

  if (state.errors?.content) {
    state.errors.content.forEach((error: string) => {
      console.error(error);
    });
  }

  return (
    <form action={dispatch} className="max-w-screen-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Create Post</h1>
{JSON.stringify(prevState)}
    <div className="mb-4">
      <label htmlFor="title" className="block text-sm font-semibold mb-1 text-black">Title</label>
      <input
        id="title"
        name="title"
        defaultValue={prevState?.values?.title || ""}
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
      />

      {state.errors?.title &&
        state.errors.title.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))
      }
      

    </div>

    <div className="mb-4">
      <label htmlFor="main_tag" className="block text-sm font-semibold mb-1 text-black">Env Tag</label>
      <input
        id="main_tag"
        name="main_tag"
        defaultValue={prevState?.values?.main_tag|| ""}
        type="text"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-black"
      />
      
      {state.errors?.main_tag &&
        state.errors.main_tag.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))
      }
      
    </div>

    <div className="mb-4">
      <label htmlFor="extra_tag" className="block text-sm font-semibold mb-1 text-black">Tags Component</label>
      <input
        id="extra_tag"
        name="extra_tag"
        defaultValue={prevState?.values?.extra_tag || ""}
        type="text"
        className="text-black w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      
      {state.errors?.extra_tag &&
        state.errors.extra_tag.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))
      }
      
    </div>


        <div className="mb-8">
          <label htmlFor="content" className="block text-lg font-semibold mb-2 text-gray-800">Content</label>
          <SimpleMde
            id="content"
            defaultValue={prevState?.values?.content}
            className="text-gray-800"
            placeholder="Write your article here..."
            />
            
          {state.errors?.content &&
            state.errors.content.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))
          }
        </div>
      
        <div className="mb-8 flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Create Post</button>
        </div>

      </div>
    </form>
  );
}
