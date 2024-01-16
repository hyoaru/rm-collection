import React from 'react'
import { Parentheses } from 'lucide-react'

export default function MetricCards(props) {
  const { label, value } = props
  return (
    <>
      <div className="grow border rounded-xl p-5 px-8 bg-secondary">
        <div className="flex items-center">
          <p className="font-semibold me-auto opacity-60">{label}</p>
          <Parentheses size={15} />
        </div>
        <h4 className="font-bold text-2xl mt-1">{value}</h4>
      </div>
    </>
  )
}
