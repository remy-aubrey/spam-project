import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AddComment, CommentData } from '../../models/spam'
import { addComment, getAllCommentsBySpamId } from '../apis/comments'

export function useComments(spamId: number) {
  return useQuery<CommentData[]>({
    queryKey: ['comments', spamId],
    queryFn: () => getAllCommentsBySpamId(spamId),
  })
}

export function useAddComment(spamId: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (commentObj: AddComment) => addComment(commentObj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', spamId] })
    },
  })
}
