import { useParams } from 'react-router-dom'
import { useComments } from '../../hooks/useComments'

function ListComments() {
  const { spamId } = useParams<{ spamId: string }>()
  const { data: comments } = useComments(Number(spamId))

  return (
    <>
      <h4>Comments</h4>
      <ul>
        {comments?.map((comment) => (
          <li key={comment.id}>
            <p>Comment text: {comment.comment_text}</p>
            <p>Created on: {new Date(comment.created_date).toLocaleString()}</p>
            <br />
          </li>
        ))}
      </ul>
    </>
  )
}

export default ListComments
