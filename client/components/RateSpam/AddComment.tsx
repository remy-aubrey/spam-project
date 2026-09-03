import React, { useState } from 'react'
import { useAddComment } from '../../hooks/useComments'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'

export default function AddComment() {
  const [comment, setComment] = useState('')

  const { id } = useParams<{ id: string }>()
  const { getAccessTokenSilently } = useAuth0()

  const { mutate } = useAddComment(Number(id))
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setComment(event.target.value)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const token = await getAccessTokenSilently()
    if (id) {
      mutate({ comment, spamId: Number(id), token })
      setComment('')
    }
  }

  return (
    <>
      <div>Add Comment</div>
      <form onSubmit={handleSubmit}>
        <input
          className="rounded border  border-spamBlue p-2 text-sm text-spamBlue focus:outline-none focus:ring-2 focus:ring-spamBlue"
          aria-label="Add a comment"
          id="add-comment"
          value={comment}
          onChange={handleChange}
        ></input>
        <button
          className="ml-2 rounded bg-spamBlue px-4 py-2 text-spamYellow hover:bg-spamYellow hover:text-spamBlue"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  )
}
