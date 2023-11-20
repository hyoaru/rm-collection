import React from 'react'

export default function Layout({ children }) {
  return (
    <>
      <div className="px-4 container mb-8">
        <div className="mx-auto mt-10 sm:mt-16 w-11/12 sm:w-9/12 md:w-7/12">
          {children}
        </div>
      </div>
    </>
  )
}
