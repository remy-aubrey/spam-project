import { FormEvent, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postFanImage } from '../../apis/fan-gallery'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB — server's multer limit
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif']

export function AddNewImage() {
  const [showForm, setShowForm] = useState(false)
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({
      image,
      caption,
    }: {
      image: File
      caption: string
    }) => {
      const token = await getAccessTokenSilently()
      return postFanImage({ image, caption, token })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['galleryImages'] })
      setShowForm(false)
    },
  })

  function handleOpen() {
    if (!isAuthenticated) {
      loginWithRedirect()
      return
    }
    setShowForm(true)
  }

  return (
    <div>
      <button
        onClick={handleOpen}
        className="mx-auto mb-6 block rounded-lg bg-yellow-400 px-5 py-2 font-semibold text-spamBlue transition hover:bg-yellow-300"
      >
        Upload Your Image!
      </button>
      {showForm && (
        <ImageForm
          onClose={() => setShowForm(false)}
          onSubmit={(image, caption) => mutation.mutate({ image, caption })}
          isSubmitting={mutation.isPending}
          errorMessage={
            mutation.isError
              ? 'Something went wrong uploading your image. Try again.'
              : null
          }
        />
      )}
    </div>
  )
}

interface ImageFormProps {
  onClose: () => void
  onSubmit: (image: File, caption: string) => void
  isSubmitting: boolean
  errorMessage: string | null
}

function ImageForm({
  onClose,
  onSubmit,
  isSubmitting,
  errorMessage,
}: ImageFormProps) {
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [fileError, setFileError] = useState<string | null>(null)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null

    if (!selected) {
      setFile(null)
      setFileError(null)
      return
    }

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setFile(null)
      setFileError('Please choose a JPEG, PNG, or GIF file.')
      return
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFile(null)
      setFileError('That file is too large — please choose one under 5MB.')
      return
    }

    setFile(selected)
    setFileError(null)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!file) {
      setFileError('Please choose an image to upload.')
      return
    }
    onSubmit(file, caption)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-black/50"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Upload a gallery image"
        className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 text-xl leading-none text-gray-400 hover:text-gray-600"
        >
          &times;
        </button>

        <h2 className="mb-4 text-lg font-bold text-spamBlue">
          Upload Your Image
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Please upload an image related to spam. ONLY FAMILY FRIENDLY SPAM
            IMAGES. Our moderaters are very tired and very underpaid.
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              className="rounded-md border border-gray-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-spamBlue file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
            Caption
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Say something about this photo"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-spamBlue focus:outline-none"
            />
          </label>

          {fileError && (
            <p role="alert" className="text-sm text-red-600">
              {fileError}
            </p>
          )}
          {errorMessage && (
            <p role="alert" className="text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-md bg-spamBlue py-2 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Uploading…' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  )
}
