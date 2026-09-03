import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AddComment, CommentData } from '../../models/spam'
import { getAllCommentsBySpamId } from '../apis/comments'

// TODO: Create custom hook for querying the comments by spamId

export function useComments(spamId: number) {
  return useQuery<CommentData[]>({
    queryKey: ['comments', spamId],
    queryFn: () => getAllCommentsBySpamId(spamId),
  })
}
// TODO: Create custom hook for adding a new comment
export function useAddComment(spamId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentObj: AddComment) => addComment(commentObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', spamId] })
    },
  })
}
