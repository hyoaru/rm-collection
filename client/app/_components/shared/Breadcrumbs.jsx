import React from 'react'
import Link from 'next/link'

export default function Breadcrumbs(props) {
  const { breadcrumbs } = props
  return (
    <>
      <div className="flex items-center justify-start">
        {breadcrumbs && breadcrumbs.map((breadcrumb) => (
          <small className='me-1 opacity-50 hover:opacity-80' key={`Breadcrumb-${breadcrumb.label}`}>
            <Link href={breadcrumb.link} className='capitalize'>{`${breadcrumb.label} /`}</Link>
          </small>
        ))}
      </div>
    </>
  )
}
