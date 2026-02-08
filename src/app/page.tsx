'use client'
import Link from 'next/link'
import { useRole } from '@/context/role'

function RoleSelect() {
  const { setRole } = useRole()
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Backstage <span className="text-primary">Beacon</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          A platform where art speaks for itself. Post, discover, and support art from women in the creative community.
        </p>
      </div>

      <p className="text-sm font-medium text-gray-500">I am a...</p>

      <div className="grid gap-6 md:grid-cols-2">
        <button onClick={() => setRole('community')}
          className="group rounded-2xl border-2 border-gray-200 p-8 text-left transition hover:border-primary hover:shadow-lg">
          <div className="mb-3 text-4xl">🖼️</div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary">Art Lover</h2>
          <p className="mt-2 text-gray-600">
            Browse the gallery, discover new artists, and help keep art spaces safe.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-500">
            <li>• Browse the art gallery</li>
            <li>• Report incidents at art spaces</li>
          </ul>
        </button>

        <button onClick={() => setRole('artist')}
          className="group rounded-2xl border-2 border-gray-200 p-8 text-left transition hover:border-accent hover:shadow-lg">
          <div className="mb-3 text-4xl">🎨</div>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-accent">Artist</h2>
          <p className="mt-2 text-gray-600">
            Post your art, share your story, and connect with the community.
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-500">
            <li>• Post art to the gallery</li>
            <li>• Share the story behind your work</li>
            <li>• Post and read whispers</li>
            <li>• Report incidents at art spaces</li>
          </ul>
        </button>
      </div>
    </div>
  )
}

function CommunityHome() {
  return (
    <div className="space-y-16">
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Backstage <span className="text-primary">Beacon</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Discover art from the community. Every piece has a story.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/opportunities" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark">
            Browse Gallery
          </Link>
          <Link href="/report" className="rounded-lg border-2 border-danger px-6 py-3 font-semibold text-danger transition hover:bg-red-50">
            Report an Incident
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
          <div className="mb-3 text-3xl">🎨</div>
          <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
          <p className="mt-2 text-gray-600">
            Discover art from the community — digital art, pottery, graffiti, paintings, and more.
          </p>
          <Link href="/opportunities" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Explore gallery →</Link>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
          <div className="mb-3 text-3xl">🚨</div>
          <h2 className="text-xl font-bold text-gray-900">Report Incidents</h2>
          <p className="mt-2 text-gray-600">
            Experienced harassment or unfair treatment at an art space? Report it anonymously to protect others.
          </p>
          <Link href="/report" className="mt-4 inline-block text-sm font-medium text-danger hover:underline">File a report →</Link>
        </div>
      </section>
    </div>
  )
}

function ArtistHome() {
  return (
    <div className="space-y-16">
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Backstage <span className="text-accent">Beacon</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Post your art, share your story, and let your work speak for itself.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/opportunities" className="rounded-lg bg-primary px-6 py-3 font-semibold text-white transition hover:bg-primary-dark">
            Post Art
          </Link>
          <Link href="/whispers" className="rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary transition hover:bg-purple-50">
            Whispers
          </Link>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
          <div className="mb-3 text-3xl">🎨</div>
          <h2 className="text-xl font-bold text-gray-900">Gallery</h2>
          <p className="mt-2 text-gray-600">
            Post your pottery, digital art, paintings, graffiti, and more. Share the story behind each piece.
          </p>
          <Link href="/opportunities" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Post your art →</Link>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
          <div className="mb-3 text-3xl">💬</div>
          <h2 className="text-xl font-bold text-gray-900">Whispers</h2>
          <p className="mt-2 text-gray-600">
            Anonymous tips about pricing, techniques, supplies, and safety at art spaces.
          </p>
          <Link href="/whispers" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">Read whispers →</Link>
        </div>
        <div className="rounded-xl border border-gray-200 p-6 transition hover:shadow-md">
          <div className="mb-3 text-3xl">🚨</div>
          <h2 className="text-xl font-bold text-gray-900">Report Incidents</h2>
          <p className="mt-2 text-gray-600">
            Experienced harassment or unfair treatment at an art space? Report it anonymously.
          </p>
          <Link href="/report" className="mt-4 inline-block text-sm font-medium text-danger hover:underline">File a report →</Link>
        </div>
      </section>
    </div>
  )
}

export default function HomePage() {
  const { role } = useRole()
  if (!role) return <RoleSelect />
  if (role === 'artist') return <ArtistHome />
  return <CommunityHome />
}
