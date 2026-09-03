import React, { useState } from 'react'
import { useAddComment } from '../../hooks/useComments'
import { useAuth0 } from '@auth0/auth0-react'
import { useParams } from 'react-router-dom'

export default function AddComment() {
  //  TODO: create form state
  const [comment, setComment] = useState('')

  //  TODO: get id from params
  const { id } = useParams<{ id: string }>()
  const { getAccessTokenSilently } = useAuth0()

  //  TODO: Call custom hook for addMutation
  const { mutate } = useAddComment(Number(id))
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setComment(event.target.value)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: get access token
    const token = await getAccessTokenSilently()
    // TODO: if the params id exists, call our custom hook mutation
    // and give it an object with: form data, spamId and token
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
