import React from 'react'
import { Badge } from '@components/ui/badge'

export default function FormHeader(props) {
  const { category, title, description } = props
  return (
    <div className="grid grid-rows-1 gap-y-3 mb-8 justify-center text-center ">
      <div className="mx-auto">
        <Badge variant={'secondary'}>{category}</Badge>
      </div>
      <div className="space-y-1">
        <h1 className="text-4xl capitalize font-bold sm:mt-0">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
