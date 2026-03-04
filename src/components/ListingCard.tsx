import React from 'react'
import { Listing } from '../types'

export default function ListingCard({ item }: { item: Listing }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="h-40 bg-gray-100 rounded-md overflow-hidden mb-3">
        {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover" /> : null}
      </div>
      <div className="font-semibold">{item.title}</div>
      <div className="text-sm text-gray-500">{item.location}</div>
      <div className="mt-2 font-medium">{item.currency || '₱'}{item.price.toLocaleString()} <span className="text-sm font-normal">/ night</span></div>
    </div>
  )
}
