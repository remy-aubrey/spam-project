import { useQuery } from '@tanstack/react-query'
import { CommentData } from '../../models/spam'
import { getAllCommentsBySpamId } from '../apis/comments'

// TODO: Create custom hook for querying the comments by spamId

export function useComments(spamId: number) {
  return useQuery<CommentData[]>({
    queryKey: ['comments', spamId],
    queryFn: () => getAllCommentsBySpamId(spamId),
  })
}
// TODO: Create custom hook for adding a new comment
