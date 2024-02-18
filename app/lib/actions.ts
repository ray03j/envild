'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// オブジェクト生成時のスキーマ
const FormSchema = z.object({
  title: z.string(),
  mainTag: z.string(),
  extraTag: z.array(z.string()),
  content: z.string(),
  dateTime: z.date(),
});

const CreatePost = FormSchema.omit({content: true ,dateTime: true});

export type State = {
  errors?: {
    title?: string[];
    mainTag?: string[];
    extraTag?: string[];
    content?: string[];
  };
  message?: string | null;
}

export async function createPost(prevState: State, formData: FormData) {
  const extraTagArray = (formData.get('extra_tag') as string).split(',');
  
  
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    mainTag: formData.get('main_tag'),
    extraTag: extraTagArray,
  });
  
  if(!validatedFields.success){ 
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '投稿に失敗しました。'
    }
  }
  
  const {title, mainTag, extraTag} = validatedFields.data;
  
  const dateTime = new Date().toISOString().split('T')[0];
  const extraTagString = `{${extraTag.join(',')}}`;
  const content = ''
  
  console.error(extraTagString)

  try {
    const result = await sql`
    INSERT INTO posts (title, main_tag, extra_tag, content,  date_time)
    VALUES(${title}, ${mainTag}, ${extraTagString}, ${content}, ${dateTime})
    RETURNING id;
    `

    const {id} = result.rows[0].id;
    
    revalidatePath('/')
    revalidatePath(`/posts/[${id}]/edit/page.tsx`)
    revalidatePath(`/posts/[${id}]/page.tsx`)
  
    redirect(`/posts/[${id}]/edit/page.tsx`)
  } catch (error) {
    return{
      message:'データベースで投稿の作成に失敗しました。',
    };
  }
  
}