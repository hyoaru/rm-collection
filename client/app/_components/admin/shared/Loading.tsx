import { Skeleton } from '@components/ui/skeleton'

export default function Loading() {
  return (
    <Skeleton className='w-full h-[50svh] rounded-xl transition-all duration-700 ease-in-out' />
  )
}
