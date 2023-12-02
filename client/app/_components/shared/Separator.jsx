import React from 'react'

export default function Separator({ children }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t" />
      </div>
      <div className="relative flex justify-center">
          <span className="bg-background px-2">
            {children}
          </span>
        </div>
    </div>
  )
}
