import { ArtistOnly } from '@/components/role-guard'

export default function WhispersLayout({ children }: { children: React.ReactNode }) {
  return <ArtistOnly>{children}</ArtistOnly>
}
