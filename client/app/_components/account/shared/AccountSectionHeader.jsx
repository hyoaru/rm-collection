import React from 'react'

export default function AccountSectionHeader(props) {
  const { title, description } = props
  return (
    <>
      <div className="grid grid-rows-1 gap-y-3 mb-8 justify-center text-center ">
        <div className="space-y-1">
          <h1 className="text-4xl capitalize font-bold sm:mt-0">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </>
  )
}
