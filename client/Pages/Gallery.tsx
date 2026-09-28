import { GalleryImage } from '../../models/spam'
import { ErrorFallback } from '../components/ErrorFallback'
import { AddNewImage } from '../components/Forms/AddNewImage'
import { useGallery } from '../hooks/useGallery'

export default function Gallery() {
  function GetImages() {
    const { data, isError, isLoading } = useGallery()

    if (isError) {
      return <ErrorFallback />
    }

    if (isLoading) {
      return <p className="text-center text-spamBlue">Loading photos&hellip;</p>
    }

    if (data)
      return (
        <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4">
          {data.map((image: GalleryImage) => (
            <div
              key={image.id}
              className="flex flex-col items-center gap-4 rounded-2xl bg-spamBlue p-6"
            >
              <img
                className="w-full rounded-lg border-2 border-white object-cover"
                src={image.image_url}
                alt={image.caption ?? 'Gallery photo'}
              />
              {image.caption && (
                <p className="rounded-lg bg-yellow-400 px-6 py-2 text-center font-semibold text-spamBlue">
                  {image.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )
  }

  return (
    <div className="py-10">
      <h1 className="mb-8 text-center text-3xl font-extrabold text-spamBlue">
        Fan-Sumitted Gallery Images
      </h1>
      <AddNewImage />
      <GetImages />
    </div>
  )
}
