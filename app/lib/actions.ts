'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { error } from 'console';
import { PostContentForm } from './definitions';


// オブジェクト生成時のスキーマ
const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  mainTag: z.string(),
  extraTag: z.array(z.string()),
  content: z.string(),
  dateTime: z.date(),
});

const CreatePost = FormSchema.omit({id: true, content: true ,dateTime: true});
const UpdatePost = FormSchema.omit({dateTime: true});


export type State = {
  errors?: {
    id?: string[];
    title?: string[];
    mainTag?: string[];
    extraTag?: string[];
    content?: string[];
    dateTime?: string[];
  };
  values?: {
    id?: string;
    title?: string;
    mainTag?: string;
    extraTag?: string[];
    content?: string;
    dateTime?: Date;
  }
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

export async function updatePost(prevState: State, formData: FormData) {
  const extraTagArray = (formData.get('extra_tag') as string).split(',');

  const validatedFields = UpdatePost.safeParse({
    id: formData.get('id'),
    title: formData.get('title'),
    mainTag: formData.get('main_tag'),
    extraTag: extraTagArray,
    content: formData.get('content'),
  });
  console.error("hoge")

  if(!validatedFields.success){
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '更新に失敗しました。'
    }
  }

  const { id, title, mainTag, extraTag, content} = validatedFields.data;

  const extraTagString = `{${extraTag.join(',')}}`;



  try {
    const result = await sql`
    UPDATE posts
    SET (title, main_tag, extra_tag, content)
    = (${title}, ${mainTag}, ${extraTagString}, ${content})
    WHERE id=${id}
    `
  } catch (error) {
    return {
      message: 'データベースで投稿の更新に失敗しました。',
    };
  }
  
      revalidatePath('/')
      revalidatePath(`/posts/[${id}]/edit/page.tsx`, "page")
      revalidatePath(`/posts/[${id}]/page.tsx`, "page")
    
      redirect(`/`)
      return {
        message: '投稿が更新されました。',
        errors: {} // エラーがないことを示すために空のエラーオブジェクトを設定する
      };
}

