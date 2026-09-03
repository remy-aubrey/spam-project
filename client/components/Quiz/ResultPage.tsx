import { QuizAnswers } from '../../../models/spam'
import { useQuery } from '@tanstack/react-query'
import calculateQuiz from '../../utils/calculateQuiz'
import { getQuizResult } from '../../apis/quiz'

interface Props {
  answers: QuizAnswers
}

function ResultPage({ answers }: Props) {
  const category = calculateQuiz(answers)

  const {
    data: result,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['quizResult', category],
    queryFn: () => getQuizResult(category),
    enabled: Boolean(category),
  })

  if (isLoading) return <p>Results loading...</p>
  if (isError) return <p>Error: {(error as Error).message}</p>

  if (result) {
    return (
      <section className="flex flex-col items-center justify-center p-5">
        <h1 className="pt-20 font-heading text-heading-lg font-heading-bold text-spamBlue">
          You are just like: {result.name}!
        </h1>
        <img
          src={`/images/hero_images/${result.image}`}
          alt={result.name}
        />
        <p className="m-4 mx-60 pb-20 font-body text-body-md">
          {result.info}
        </p>
      </section>
    )
  }

  return null
}

export default ResultPage