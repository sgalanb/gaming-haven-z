import { H1, H2 } from '@/components/ui/Typography'

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-260px)] flex-col items-center justify-center px-6 py-12">
      <div className="text-center">
        <H1 className="gradient-text !text-9xl font-bold">404</H1>
        <div className="mt-4">
          <H2 className="gradient-text text-3xl font-semibold tracking-tight">
            Page not found
          </H2>
        </div>
      </div>
    </div>
  )
}
