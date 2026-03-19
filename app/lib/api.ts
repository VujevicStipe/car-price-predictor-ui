const API_URL = 'http://127.0.0.1:8000'

export interface CarInput {
  manufacturer: string
  model_vozila: string
  year: number
  condition: string
  fuel: string
  odometer: number
  title_status: string
  transmission: string
  drive: string
  type_vozila: string
  paint_color: string
}

export interface PredictResponse {
  cijena: number
  valuta: string
}

export async function predictPrice(data: CarInput): Promise<PredictResponse> {
  const response = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Greška pri dohvaćanju cijene')
  }

  return response.json()
}