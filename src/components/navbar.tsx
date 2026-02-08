'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRole } from '@/context/role'

const communityLinks = [
  { href: '/opportunities', label: 'Gallery' },
  { href: '/report', label: 'Report' },
]

const artistLinks = [
  { href: '/opportunities', label: 'Gallery' },
  { href: '/whispers', label: 'Whispers' },
  { href: '/report', label: 'Report' },
]

export function Navbar() {
  const pathname = usePathname()
  const { role, clearRole } = useRole()

  if (!role) return null

  const links = role === 'artist' ? artistLinks : communityLinks

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-primary">Backstage Beacon</Link>
        <div className="flex items-center gap-6">
          <ul className="flex gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={`text-sm font-medium transition-colors ${pathname.startsWith(link.href) ? 'text-primary' : 'text-gray-600 hover:text-gray-900'}`}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={clearRole}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 transition hover:bg-gray-200">
            Switch Role
          </button>
        </div>
      </div>
    </nav>
  )
}
