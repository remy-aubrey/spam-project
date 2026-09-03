import { useParams } from 'react-router-dom'
import { useComments } from '../../hooks/useComments'

function ListComments() {
  const { id } = useParams<{ id: string }>()
  const { data: comments } = useComments(Number(id))

  return (
    <>
      <h4>Comments</h4>
      {comments?.length === 0 && <p>No comments yet!</p>}
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <p>Comment text: {comment.comment_text}</p>
            <p>
              Created on:{' '}
              {new Date(comment.created_date * 1000).toLocaleString()}
            </p>
            <br />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListComments
