interface PriceResultProps {
  cijena: number
}

export default function PriceResult({ cijena }: PriceResultProps) {
  return (
    <div className="mt-8 p-8 bg-black rounded-2xl text-center">
      <p className="text-zinc-400 text-sm font-medium uppercase tracking-widest mb-2">
        Predviđena cijena
      </p>
      <p className="text-white text-5xl font-bold tracking-tight">
        ${cijena.toLocaleString('en-US', { maximumFractionDigits: 0 })}
      </p>
      <p className="text-zinc-500 text-sm mt-3">
        Procjena bazirana na XGBoost modelu treniranom na 200k+ oglasa
      </p>
    </div>
  )
}