import type { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-offwhite ring-1 ring-white/15">
      {children}
    </span>
  )
}
