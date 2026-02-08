import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-gray-600">Page not found.</p>
      <Link href="/" className="mt-6 inline-block text-primary underline">Go home</Link>
    </div>
  )
}
