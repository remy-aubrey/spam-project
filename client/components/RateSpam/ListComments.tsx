import { useParams } from 'react-router-dom'
import { useComments } from '../../hooks/useComments'

function ListComments() {
  const { id } = useParams<{ id: string }>()
  const { data: comments } = useComments(Number(id))

  return (
    <>
      <h4 className="mb-2 font-bold text-spamBlue">Comments</h4>
      {comments?.length === 0 && (
        <p className="rounded border p-3 text-gray-500">No comments yet!</p>
      )}
      <ul className="space-y-3">
        {comments?.map((comment) => (
          <li key={comment.id} className="rounded border p-3">
            <p>{comment.comment_text}</p>
            <p className="text-sm text-gray-500">
              Created on:{' '}
              {new Date(comment.created_date * 1000).toLocaleDateString()}
            </p>
            <br />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListComments
