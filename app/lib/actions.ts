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
  dateTime: z.date(),
});

const CreatePost = FormSchema.omit({dateTime: true});

export type State = {
  errors?: {
    title?: string[];
    mainTag?: string[];
    extraTag?: string[];
  };
  message?: string | null;
}

export async function createPost(prevState: State, formData: FormData) {
  const extraTagString = formData.get('extra_tag') as string;
  const extraTagArray = extraTagString.split(',');
  
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    envTag: formData.get('env_tag'),
    tagsComponent: extraTagArray,
  });

  if(!validatedFields.success){ 
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '投稿に失敗しました。'
    }
  }
  
  const {title, mainTag, extraTag} = validatedFields.data;

  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
    INSERT INTO posts (title, env_tag, tags_component, date)
    VALUES(${title}, ${mainTag}, ${extraTagString});
    `
  } catch (error) {
    return{
      message:'データベースで投稿の作成に失敗しました。',
    };
  }

  revalidatePath('/')
  redirect('/')
}