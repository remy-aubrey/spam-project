import { useQuery } from '@tanstack/react-query'
import { getAboutImages } from '../apis/about'

export function useAboutImages() {
  const query = useQuery({
    queryKey: ['aboutImages'],
    queryFn: getAboutImages,
  })
  return { ...query }
}
