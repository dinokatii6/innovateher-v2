import type { Metadata } from 'next'
import { Navbar } from '@/components/navbar'
import { RoleProvider } from '@/context/role'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'Backstage Beacon', template: '%s | Backstage Beacon' },
  description: 'Anonymous platform uplifting women in the arts.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <RoleProvider>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
        </RoleProvider>
      </body>
    </html>
  )
}
