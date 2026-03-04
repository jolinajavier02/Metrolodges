import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import SignupCTA from '../components/SignupCTA'
import ListingCard from '../components/ListingCard'
import { philippineListings } from '../utils/listings'

export default function Home() {
  return (
    <div>
      <Hero />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Popular in the Philippines</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {philippineListings.map((it) => (
            <ListingCard key={it.id} item={it} />
          ))}
        </div>
      </main>
      <Features />
      <SignupCTA />
    </div>
  )
}
