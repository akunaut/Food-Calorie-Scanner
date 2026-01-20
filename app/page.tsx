'use client'

import { useState, useEffect } from 'react'

interface CalorieEntry {
  id: string
  date: string
  time: string
  description: string
  calories: number
  weight?: string
  ingredients?: string
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [totalWeight, setTotalWeight] = useState('')
  const [ingredient1Name, setIngredient1Name] = useState('')
  const [ingredient1Weight, setIngredient1Weight] = useState('')
  const [ingredient2Name, setIngredient2Name] = useState('')
  const [ingredient2Weight, setIngredient2Weight] = useState('')
  const [ingredient3Name, setIngredient3Name] = useState('')
  const [ingredient3Weight, setIngredient3Weight] = useState('')
  const [loadingStep, setLoadingStep] = useState(0)
  const [calorieEntries, setCalorieEntries] = useState<CalorieEntry[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // Load saved entries on component mount
  useEffect(() => {
    const saved = localStorage.getItem('calorieEntries')
    if (saved) {
      setCalorieEntries(JSON.parse(saved))
    }
  }, [])

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calorieEntries', JSON.stringify(calorieEntries))
  }, [calorieEntries])

  // Loading animation
  const loadingSteps = [
    { emoji: '👨‍🍳', text: 'Chef is preparing...' },
    { emoji: '🔥', text: 'Heating up the pan...' },
    { emoji: '🍳', text: 'Analyzing your food...' },
    { emoji: '🍎', text: 'Yummy!' }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (analyzing) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length)
      }, 1500)
    } else {
      setLoadingStep(0)
    }
    return () => clearInterval(interval)
  }, [analyzing])

  // Extract calories from AI result
  const extractCalories = (text: string): number => {
    const calorieMatch = text.match(/(\d+)\s*(?:calories|kcal|cal)/i)
    return calorieMatch ? parseInt(calorieMatch[1]) : 0
  }

  // Extract food description from AI result
  const extractDescription = (text: string): string => {
    const lines = text.split('\n')
    const firstLine = lines[0] || text.substring(0, 50)
    return firstLine.replace(/^\d+\)\s*/, '').trim()
  }

  // Save analysis to history
  const saveToHistory = (aiResult: string) => {
    const now = new Date()
    const calories = extractCalories(aiResult)
    const description = extractDescription(aiResult)
    
    if (calories > 0) {
      const entry: CalorieEntry = {
        id: Date.now().toString(),
        date: now.toLocaleDateString('en-US'),
        time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        description,
        calories,
        weight: totalWeight || undefined,
        ingredients: [ingredient1Name, ingredient2Name, ingredient3Name]
          .filter(name => name.trim())
          .join(', ') || undefined
      }
      
      setCalorieEntries(prev => [entry, ...prev])
    }
  }

  // Calculate today's total calories
  const getTodaysCalories = () => {
    const today = new Date().toLocaleDateString('en-US')
    return calorieEntries
      .filter(entry => entry.date === today)
      .reduce((sum, entry) => sum + entry.calories, 0)
  }

  // Clear all data
  const clearAllData = () => {
    if (confirm('Are you sure you want to delete all calorie history?')) {
      setCalorieEntries([])
      localStorage.removeItem('calorieEntries')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      let imageFile = file

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
        setUploading(false)
      }
      reader.readAsDataURL(imageFile)
    } catch (error) {
      console.error('Image conversion error:', error)
      alert('Could not read the image. Please try a different format.')
      setUploading(false)
    }
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    
    setAnalyzing(true)
    
    try {
      const ingredients = []
      if (ingredient1Name && ingredient1Weight) {
        ingredients.push({ name: ingredient1Name, weight: ingredient1Weight })
      }
      if (ingredient2Name && ingredient2Weight) {
        ingredients.push({ name: ingredient2Name, weight: ingredient2Weight })
      }
      if (ingredient3Name && ingredient3Weight) {
        ingredients.push({ name: ingredient3Name, weight: ingredient3Weight })
      }

      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          image: selectedImage,
          totalWeight: totalWeight || null,
          ingredients: ingredients.length > 0 ? ingredients : null
        }),
      })
      
      const data = await response.json()
      
      if (data.error) {
        setResult('Error: ' + data.error)
      } else {
        setResult(data.result)
        // Save to history
        saveToHistory(data.result)
      }
    } catch (error) {
      setResult('Could not connect to server')
    } finally {
      setAnalyzing(false)
    }
  }

  const clearAll = () => {
    setSelectedImage(null)
    setResult(null)
    setTotalWeight('')
    setIngredient1Name('')
    setIngredient1Weight('')
    setIngredient2Name('')
    setIngredient2Weight('')
    setIngredient3Name('')
    setIngredient3Weight('')
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
            Upload a photo of food and get calorie information
          </p>
          
          {/* Today's calories */}
          {calorieEntries.length > 0 && (
            <div className="bg-green-100 dark:bg-green-900 px-4 py-2 rounded-lg">
              <p className="text-green-800 dark:text-green-200 font-medium">
                Today: {getTodaysCalories()} calories
              </p>
            </div>
          )}
        </div>

        {/* History toggle */}
        {calorieEntries.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg text-sm hover:bg-zinc-300 dark:hover:bg-zinc-600"
            >
              {showHistory ? 'Hide history' : `Show history (${calorieEntries.length})`}
            </button>
            <button
              onClick={clearAllData}
              className="px-4 py-2 bg-red-200 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm hover:bg-red-300 dark:hover:bg-red-800"
            >
              Clear data
            </button>
          </div>
        )}

        {/* History */}
        {showHistory && (
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl p-4 max-h-60 overflow-y-auto">
            <h3 className="font-bold text-black dark:text-white mb-3">Calorie History</h3>
            <div className="space-y-2">
              {calorieEntries.map((entry) => (
                <div key={entry.id} className="bg-white dark:bg-zinc-700 p-3 rounded-lg text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-black dark:text-white">{entry.description}</p>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        {entry.date} at {entry.time}
                      </p>
                      {entry.weight && (
                        <p className="text-zinc-500 dark:text-zinc-500 text-xs">Weight: {entry.weight}g</p>
                      )}
                      {entry.ingredients && (
                        <p className="text-zinc-500 dark:text-zinc-500 text-xs">Ingredients: {entry.ingredients}</p>
                      )}
                    </div>
                    <span className="font-bold text-green-600 dark:text-green-400">
                      {entry.calories} kcal
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedImage ? (
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <div className="flex flex-col items-center gap-2">
              {uploading ? (
                <>
                  <span className="text-4xl animate-spin">⏰</span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Loading image...
                  </span>
                </>
              ) : (
                <>
                  <span className="text-4xl">📸</span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Click to upload image
                  </span>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        ) : (
          <div className="flex flex-col items-center gap-6 w-full">
            <img
              src={selectedImage}
              alt="Uploaded food"
              className="max-w-full h-64 object-contain rounded-xl"
            />
            
            {/* Weight and ingredients */}
            <div className="w-full max-w-md space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                  Detailed analysis (optional)
                </h3>
              </div>
              
              {/* Total weight */}
              <div className="flex flex-col gap-2">
                <label className="text-sm text-zinc-600 dark:text-zinc-400">
                  Total weight (grams)
                </label>
                <input
                  type="number"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                  placeholder="e.g. 300"
                  className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white"
                />
              </div>

              {/* Ingredients */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Ingredients:
                </h4>
                
                {/* Ingredient 1 */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient1Name}
                    onChange={(e) => setIngredient1Name(e.target.value)}
                    placeholder="e.g. pasta"
                    className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
                  />
                  <input
                    type="number"
                    value={ingredient1Weight}
                    onChange={(e) => setIngredient1Weight(e.target.value)}
                    placeholder="grams"
                    className="w-20 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
                  />
                </div>

                {/* Ingredient 2 */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient2Name}
                    onChange={(e) => setIngredient2Name(e.target.value)}
                    placeholder="e.g. chicken"
                    className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
                  />
                  <input
                    type="number"
                    value={ingredient2Weight}
                    onChange={(e) => setIngredient2Weight(e.target.value)}
                    placeholder="grams"
                    className="w-20 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
                  />
                </div>

                {/* Ingredient 3 */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ingredient3Name}
                    onChange={(e) => setIngredient3Name(e.target.value)}
                    placeholder="e.g. sauce"
                    className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
                  />
                  <input
                    type="number"
                    value={ingredient3Weight}
                    onChange={(e) => setIngredient3Weight(e.target.value)}
                    placeholder="grams"
                    className="w-20 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-black dark:text-white text-sm"
                  />
                </div>
              </div>
            </div>
            
            {!result ? (
              <button
                onClick={analyzeImage}
                disabled={analyzing}
                className="flex h-12 w-full max-w-xs items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black font-medium transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50"
              >
                {analyzing ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl animate-bounce">
                      {loadingSteps[loadingStep].emoji}
                    </span>
                    <span className="text-sm">
                      {loadingSteps[loadingStep].text}
                    </span>
                  </div>
                ) : (
                  'Analyze image'
                )}
              </button>
            ) : (
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-xl p-6">
                <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                  Result:
                </h2>
                <pre className="text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap font-sans">
                  {result}
                </pre>
              </div>
            )}
            
            <button
              onClick={clearAll}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            >
              Upload new image
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
