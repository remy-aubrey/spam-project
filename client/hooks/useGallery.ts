import { useQuery } from '@tanstack/react-query'
import { getFanImages } from '../apis/fan-gallery'

export function useGallery() {
  const query = useQuery({
    queryKey: ['galleryImages'],
    queryFn: getFanImages,
  })
  return { ...query }
}
