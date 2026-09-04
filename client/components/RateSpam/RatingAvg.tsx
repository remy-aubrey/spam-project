import { useAvgRatingById } from '../../hooks/useRatings'
import { Rating } from '@mui/material'

export default function RatingAvg({ spamId }: { spamId: number }) {
  const { data: avgRating, isLoading, isError } = useAvgRatingById(spamId)
  if (isLoading) return null

  const handleChange = () => undefined // for add rating
  const ratingValue = isError || !avgRating ? 0 : Number(avgRating)
  return (
    <Rating
      name={`rating-${spamId}`}
      value={ratingValue}
      precision={0.5}
      onChange={handleChange} // for add rating
      readOnly
    />
  )
}
