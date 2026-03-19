'use client'

import { useState } from 'react'
import CarForm from './components/CarForm'

export default function Home() {
  const [cijena, setCijena] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <main className="h-screen w-screen overflow-hidden bg-zinc-100 flex">

      {/* LIJEVA STRANA — forma */}
      <div className="flex-1 h-full overflow-y-auto px-10 py-10">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-2">
              Used Car Valuation
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-black">
              How much is your car worth?
            </h1>
          </div>
          <CarForm onResult={setCijena} onLoading={setLoading} />
        </div>
      </div>

      {/* DESNA STRANA — rezultat */}
      <div className="w-[420px] h-full bg-black flex flex-col items-center justify-center px-10 shrink-0">
        {loading ? (
          <div className="text-center">
            <div className="w-10 h-10 border-2 border-zinc-700 border-t-white rounded-full animate-spin mx-auto mb-6" />
            <p className="text-zinc-500 text-sm">Calculating...</p>
          </div>
        ) : cijena !== null ? (
          <div className="w-full text-center">
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-4">
              Estimated Value
            </p>
            <p className="text-white text-6xl font-black tracking-tight mb-3">
              ${cijena.toLocaleString('en-US', { maximumFractionDigits: 0 })}
            </p>
            <div className="w-12 h-px bg-zinc-700 mx-auto my-6" />
            <p className="text-zinc-600 text-xs leading-relaxed">
              Based on XGBoost model<br />trained on 200k+ listings
            </p>
          </div>
        ) : (
          <div className="w-full text-center">
            <p className="text-zinc-700 text-xs uppercase tracking-widest font-semibold mb-6">
              Estimated Value
            </p>
            <p className="text-zinc-700 text-6xl font-black tracking-tight mb-4">
              —
            </p>
            <p className="text-zinc-600 text-sm">
              Fill in the form and click<br />
              <span className="text-zinc-400">Predict Price</span>
            </p>
          </div>
        )}
      </div>

    </main>
  )
}