'use client'

import { useState } from 'react'

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      let imageFile = file

      // Konvertér HEIC til JPEG
      if (file.type === 'image/heic' || file.name.toLowerCase().endsWith('.heic')) {
        const heic2any = (await import('heic2any')).default
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.8,
        })
        imageFile = new File(
          [convertedBlob as Blob],
          file.name.replace(/\.heic$/i, '.jpg'),
          { type: 'image/jpeg' }
        )
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
        setResult(null)
      }
      reader.readAsDataURL(imageFile)
    } catch (error) {
      console.error('Fejl ved billedkonvertering:', error)
      alert('Kunne ikke læse billedet. Prøv et andet format.')
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    
    setAnalyzing(true)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: selectedImage }),
      })
      
      const data = await response.json()
      
      if (data.error) {
        setResult('Fejl: ' + data.error)
      } else {
        setResult(data.result)
      }
    } catch (error) {
      setResult('Kunne ikke forbinde til serveren')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black p-4">
      <main className="flex w-full max-w-2xl flex-col items-center gap-8 py-16 px-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-lg">
        <div className="text-6xl">🍎</div>
        
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            Food Calorie Scanner
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Upload et billede af mad og få kalorieoplysninger
          </p>
        </div>

        {!selectedImage ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <span className="text-4xl">📸</span>
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Klik for at uploade billede
              </span>
            </div>
            <input
              type="file"
              accept="image/*,.heic"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full">
            <img
              src={selectedImage}
              alt="Uploaded food"
              className="max-w-full h-64 object-contain rounded-xl"
            />
            
            {!result ? (
              <button
                onClick={analyzeImage}
                disabled={analyzing}
                className="flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50"
              >
                {analyzing ? 'Analyserer...' : 'Analysér billede'}
              </button>
            ) : (
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                  Resultat:
                </h2>
                <pre className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-sans">
                  {result}
                </pre>
              </div>
            )}
            
            <button
              onClick={() => {
                setSelectedImage(null)
                setResult(null)
              }}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            >
              Upload nyt billede
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
