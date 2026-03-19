'use client'

import { useState } from 'react'
import {
  MANUFACTURER_MODELS, MANUFACTURERS, CONDITIONS, FUELS,
  TRANSMISSIONS, DRIVES, TYPES, COLORS, TITLE_STATUSES,
  CURRENT_YEAR, MIN_YEAR
} from '../lib/constants'
import { predictPrice, CarInput } from '../lib/api'

const defaultManufacturer = 'ford'
const defaultModeli = MANUFACTURER_MODELS[defaultManufacturer] || []

const defaultForm: CarInput = {
  manufacturer: defaultManufacturer,
  model_vozila: defaultModeli[0] || 'other',
  year: 2018,
  condition: 'good',
  fuel: 'gas',
  odometer: 80000,
  title_status: 'clean',
  transmission: 'automatic',
  drive: '4wd',
  type_vozila: 'pickup',
  paint_color: 'unknown',
}

const selectClass = "w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-black"
const inputClass = "w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"

interface CarFormProps {
  onResult: (cijena: number) => void
  onLoading: (loading: boolean) => void
}

export default function CarForm({ onResult, onLoading }: CarFormProps) {
  const [form, setForm] = useState<CarInput>(defaultForm)
  const [modeli, setModeli] = useState<string[]>(defaultModeli)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === 'manufacturer') {
      const noviModeli = MANUFACTURER_MODELS[value] || []
      setModeli(noviModeli)
      setForm(prev => ({
        ...prev,
        manufacturer: value,
        model_vozila: noviModeli[0] || 'other',
      }))
      return
    }

    setForm(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'odometer' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onLoading(true)
    setError(null)

    try {
      const result = await predictPrice(form)
      onResult(result.cijena)
    } catch {
      setError('Greška — provjeri radi li FastAPI server')
    } finally {
      onLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <div className="grid grid-cols-2 gap-4">
        {/* Manufacturer */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Manufacturer</label>
          <select name="manufacturer" value={form.manufacturer} onChange={handleChange} className={selectClass}>
            {MANUFACTURERS.map(m => (
              <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Model</label>
          <select name="model_vozila" value={form.model_vozila} onChange={handleChange} className={selectClass}>
            {modeli.map(m => (
              <option key={m} value={m}>{m.toUpperCase()}</option>
            ))}
            <option value="other">OTHER</option>
          </select>
        </div>

        {/* Year */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Year</label>
          <input type="number" name="year" value={form.year} onChange={handleChange}
            min={MIN_YEAR} max={CURRENT_YEAR} className={inputClass} />
        </div>

        {/* Odometer */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Odometer (miles)</label>
          <input type="number" name="odometer" value={form.odometer} onChange={handleChange}
            min={1000} max={500000} className={inputClass} />
        </div>

        {/* Condition */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Condition</label>
          <select name="condition" value={form.condition} onChange={handleChange} className={selectClass}>
            {CONDITIONS.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Fuel</label>
          <select name="fuel" value={form.fuel} onChange={handleChange} className={selectClass}>
            {FUELS.map(f => (
              <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Transmission</label>
          <select name="transmission" value={form.transmission} onChange={handleChange} className={selectClass}>
            {TRANSMISSIONS.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Drive */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Drive</label>
          <select name="drive" value={form.drive} onChange={handleChange} className={selectClass}>
            {DRIVES.map(d => (
              <option key={d} value={d}>{d.toUpperCase()}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Type</label>
          <select name="type_vozila" value={form.type_vozila} onChange={handleChange} className={selectClass}>
            {TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Paint Color */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Paint Color</label>
          <select name="paint_color" value={form.paint_color} onChange={handleChange} className={selectClass}>
            {COLORS.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>

        {/* Title Status */}
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs font-medium text-zinc-500">Title Status</label>
          <select name="title_status" value={form.title_status} onChange={handleChange} className={selectClass}>
            {TITLE_STATUSES.map(t => (
              <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs text-center">
          {error}
        </div>
      )}

      {/* Submit */}
      <button type="submit"
        className="w-full bg-black text-white rounded-xl py-4 font-semibold text-sm hover:bg-zinc-800 transition-colors mt-2">
        Predict Price →
      </button>

    </form>
  )
}