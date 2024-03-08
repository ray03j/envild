import dotenv from 'dotenv/config';
import { db } from '@vercel/postgres';
import { posts } from '../app/lib/placeholder-data.js';
import bcrypt from 'bcrypt';


// seedUsers
async function seedPosts(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      main_tag VARCHAR(255) NOT NULL,
      extra_tag VARCHAR(255)[] NOT NULL,
      content TEXT NOT NULL NOT NULL,
      date_time TIMESTAMP NOT NULL
    );
    `;
    // created_at TIMESTAMP NOT NULL
    // updated_at TIMESTAMP 
    
    // FOREIGN KEY(user_id) REFERENCES users(id)
    
    
    console.log(`Created "posts" table`)

    // Insert data into the "invoices" table
    const insertedPosts = await Promise.all(
      posts.map( async (post) => {
        const extraTagString = `{${post.extraTag.join(',')}}`;

        return client.sql`
        INSERT INTO posts (id, title, main_tag, extra_tag, content, date_time)
        VALUES ( uuid_generate_v4(), ${post.title}, ${post.mainTag}, ${extraTagString}, ${post.content}, ${post.dateTime})
        ON CONFLICT (id) DO NOTHING;
        `;
    }),
    );

  console.log(`Seeded ${posts.length} invoices`);

      return {
        createTable,
        posts: insertedPosts,
      };
    } catch (error) {
      console.error('Error seeding posts:', error);
      throw error;
    }
}


async function main(){
  const client = await db.connect()

  await seedPosts(client)
  // await seedUsers(client)
  // await seedTags(client)

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});