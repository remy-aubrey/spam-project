import { useQuery } from '@tanstack/react-query'
import { getAboutText } from '../apis/about'

export function useAboutText() {
  const query = useQuery({
    queryKey: ['aboutText'],
    queryFn: getAboutText,
  })
  return { ...query }
}
