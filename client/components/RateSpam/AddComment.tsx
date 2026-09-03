import React, { useState } from 'react'
import { useAddComment } from '../../hooks/useComments'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'

export default function AddComment() {
  const [comment, setComment] = useState('')

  const { id } = useParams<{ id: string }>()
  const { getAccessTokenSilently } = useAuth0()

  const { mutate, isPending, isError } = useAddComment(Number(id))
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setComment(event.target.value)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedComment = comment.trim()
    if (!trimmedComment || !id) {
      return
    }

    const token = await getAccessTokenSilently()
    mutate(
      { comment: trimmedComment, spamId: Number(id), token },
      { onSuccess: () => setComment('') },
    )
  }

  return (
    <>
      <div className="py-2 text-body-md font-bold text-spamBlue">
        Add Comment
      </div>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded border  border-spamBlue p-2 text-sm text-spamBlue focus:outline-none focus:ring-2 focus:ring-spamBlue"
          aria-label="Add a comment"
          id="add-comment"
          value={comment}
          onChange={handleChange}
          placeholder="Add a comment"
          disabled={isPending}
        ></input>
        <button
          className="ml-2 rounded bg-spamBlue px-4 py-2 text-spamYellow hover:bg-spamYellow hover:text-spamBlue disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={isPending || !comment.trim()}
        >
          {isPending ? 'Saving...' : 'Submit'}
        </button>
        {isError && (
          <p role="alert" className="mt-2 text-sm text-red-600">
            Failed to save comment. Please try again.
          </p>
        )}
      </form>
    </>
  )
}
