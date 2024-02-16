const dotenv = require('dotenv/config')
const { db } = require('@vercel/postgres');
const {post} = require('../app/lib/placeholder-data.js')
const bcrypt = require('bcrypt')


// seedUsers
async function seedPosts(client) {
  try {
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      main_tag VARCHAR(255) NOT NULL,
      extra_tag VARCHAR(255)[],
      content TEXT,
      date_time TIMESTAMP NOT NULL,
      ON CONFLICT (id) DO NOTHING
    );
    `; 
    // FOREIGN KEY(user_id) REFERENCES users(id)
    
    
    console.log(`Created "posts" table`)

    // Insert data into the "invoices" table
    const insertedPosts = await Promise.all(
      posts.map( async (post) => {
        const extraTagString = `{${post.extraTag.join(',')}}`;
        const query = await client.sql`
        INSERT INTO posts (id, title, main_tag, extra_tag, content, date_time)
        VALUES (${post.id}, ${post.title}, ${post.mainTag}, ${extraTagString}, ${post.content}, ${post.dateTime})
        ON CONFLICT (id) DO NOTHING;`
        return query
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
