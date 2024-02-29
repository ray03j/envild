import { sql } from '@vercel/postgres';
import { PostContentForm, PostPreview } from './definitions';

export async function fetchAllPosts() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {

    console.log('Fetching all post data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<PostPreview>`SELECT * FROM posts`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error 1:', error);
    throw new Error('Failed to fetch posts data. 1');
  }
}

// 最新の5つの投稿を取り出す
export async function fetchLatestPosts() {
  try {
    const data = await sql<PostPreview>`
      SELECT posts.title, posts.main_tag, posts.extra_tag, posts.date_time
      FROM posts
      ORDER BY invoices.date DESC
      LIMIT 5`;
    return data;
  } catch (error) {
    console.error('Database Error 2:', error);
    throw new Error('Failed to fetch the latest posts. 2 ');
  }
}


// 編集時に前回の入力を取り出す
export async function fetchPreviewOfPost(id: string) {
  try {
    console.log("hoge")
    
    // +{
    //     POSTGRES_URL: process.env.POSTGRES_URL,
    //     POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING
    // });

    const data = await sql<PostContentForm>`
    SELECT posts.title, posts.main_tag, posts.extra_tag, posts.date_time
    FROM posts
    WHERE posts.id = ${id}`;

    if (data.rows.length === 0) {
      throw new Error('Post not found');
    }


    return data.rows[0];

  } catch (error) {
    console.error('Database Error hoge: ', error);
    throw new Error('Failed to fetch the preview of the post.');
  }
}
