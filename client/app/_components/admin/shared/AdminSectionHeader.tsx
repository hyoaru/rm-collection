import React from 'react'
import { Badge } from '@components/ui/badge'

type AdminSectionHeaderProps = {
  category: string
  title: string
  description: string
}

export default function AdminSectionHeader({ category, title, description }: AdminSectionHeaderProps) {
  return (
    <div className="grid grid-rows-1 gap-y-3 mb-8 justify-center text-center ">
      <div className="mx-auto">
        <Badge variant={'secondary'}>{category}</Badge>
      </div>
      <div className="space-y-1">
        <h1 className="text-3xl capitalize font-bold sm:mt-0 lg:text-4xl">{title}</h1>
        <p className="text-sm text-muted-foreground lg:text-base">{description}</p>
      </div>
    </div>
  )
}