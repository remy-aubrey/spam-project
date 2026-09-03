import connection from '../connection'
// GALLERY

// TODO: Get All Gallery Images
export async function getAllGalleryImages(db = connection) {
  return db('gallery')
}

// TODO: Create an Image:
export async function createGalleryImage(
  userId: string,
  imageUrl: string,
  caption: string,
  db = connection,
) {
  return db('gallery')
    .insert({
      user_id: userId,
      image_url: imageUrl,
      caption: caption,
    })
    .returning('*')
}
