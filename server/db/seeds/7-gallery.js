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
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/5/5b/9016Foods_of_Bulacan_06.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      caption:
        'I got diagnosed with high cholesterol. But thankfully I can still eat spam every day without worrying about my health',
    },
    {
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/8/8e/Can_of_Spam_on_a_log.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      caption: 'Can of Spam on a log. his name is Jimothy',
    },
    {
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/d/d7/Baked_Spam_with_Cloves.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      caption: 'honey baked spam with cloves. my children hate it',
    },
    {
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/c/cd/HK_Shanghai_Maling_%E4%B8%8A%E6%B5%B7%E6%A2%85%E6%9E%97%E9%A3%9F%E5%93%81_Canned_Ham_%E5%8D%88%E9%A4%90%E8%82%89_Luncheon_Meat_Egg_%E7%B2%9F%E7%B1%B3_Cream_Style_Corn_%E6%B9%AF_Soup_Dec-2015_DSC.JPG?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      caption: 'I love how chunky it is',
    },
    {
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/3/3b/Spam_dish.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      caption: 'Day 3 of trying to make my girlfriend break up with me',
    },
    {
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/6/64/SPAMARAMA_2004_Spam_Eating_Contest.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      caption:
        'Spam eating contest in Ohio. Did you hear? Some spam company sent their employees to participate and they all died. had to hire a whole new team',
    },
    {
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/9/9f/Two_SPAM_mascots_at_the_Minnesota_Wild_game_for_Mascot_Day_2025.jpg?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
      caption:
        'Anyone know where I can buy these costumes? Its for a sex thing.',
    },
  ]

  const rows = images.map((image, index) => ({
    ...image,
    user_id: users[index % users.length].auth0_id,
  }))

  await knex('gallery').insert(rows)
}
