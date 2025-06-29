import Link from 'next/link'
import { Button } from '../ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">Welcome DevHub</h1>
          <Button asChild>
            <Link href="/developers" className="text-blue-600 hover:text-blue-800 text-sm">Go To Developers</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


