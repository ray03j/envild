'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// オブジェクト生成時のスキーマ
const FormSchema = z.object({
  title: z.string(),
  envTag: z.string(),
  tagsComponent: z.array(z.string()),
  dateTime: z.date(),
});

const CreatePost = FormSchema.omit({dateTime: true});

export type State = {
  errors?: {
    title?: string[];
    envTag?: string[];
    tagsComponent?: string[];
  };
  message?: string | null;
}

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    envTag: formData.get('env_tag'),
    tagsComponent: formData.get('tags_component'),
  });

  if(!validatedFields.success){ 
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: '投稿に失敗しました。'
    }
  }
  
  const {title, envTag, tagsComponent} = validatedFields.data;
  const tagsComponentString = `{${tagsComponent.join(',')}}`
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
    INSERT INTO posts (title, env_tag, tags_component, date)
    VALUES(${title}, ${envTag}, ${tagsComponentString});
    `
  } catch (error) {
    return{
      message:'データベースで登校の作成に失敗しました。',
    };
  }

  revalidatePath('/')
  redirect('/')
}