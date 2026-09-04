/**
 * The image URLs point at Picsum (https://picsum.photos)
 * they are NOT real Cloudinary uploads
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('gallery').del()

  const users = await knex('users').select('auth0_id')

  if (users.length === 0) {
    console.warn(
      'gallery seed: no rows found in `users` — run the users seed first, skipping gallery seed.',
    )
    return
  }

  const images = [
    {
      image_url: 'https://picsum.photos/seed/spam-musubi/800/600',
      caption: 'Spam musubi, prepared with love and way too much rice',
    },
    {
      image_url: 'https://picsum.photos/seed/spam-can-opener/800/600',
      caption: 'The sacred unveiling of a fresh can of Spam',
    },
    {
      image_url: 'https://picsum.photos/seed/spam-fried-rice/800/600',
      caption: 'Spam fried rice, gone in under 5 minutes',
    },
    {
      image_url: 'https://picsum.photos/seed/spam-eating-contest/800/600',
      caption: 'Day 3 of the Spam eating contest, no regrets yet',
    },
    {
      image_url: 'https://picsum.photos/seed/spam-breakfast/800/600',
      caption: 'Sunday breakfast: eggs, toast, and glorious Spam',
    },
    {
      image_url: 'https://picsum.photos/seed/spam-tower/800/600',
      caption: 'My roommate built a tower out of Spam cans, send help',
    },
    {
      image_url: 'https://picsum.photos/seed/spam-hawaii/800/600',
      caption: 'Spam plate lunch, the true taste of Hawaii',
    },
    {
      image_url: 'https://picsum.photos/seed/spam-museum/800/600',
      caption: 'Made the pilgrimage to the Spam Museum, worth it',
    },
  ]

  const rows = images.map((image, index) => ({
    ...image,
    user_id: users[index % users.length].auth0_id,
  }))

  await knex('gallery').insert(rows)
}
