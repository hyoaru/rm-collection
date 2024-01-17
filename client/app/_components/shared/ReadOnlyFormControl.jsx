import React from 'react'

export default function ReadOnlyFormControl({ label, value }) {
  return (
    <>
      <div className="bg-secondary rounded-xl p-2 px-5">
        <p className="opacity-80 text-xs">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </>
  )
}