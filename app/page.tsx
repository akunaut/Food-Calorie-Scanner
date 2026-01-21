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

// ============================================
// FOOD BACKGROUND COMPONENT (KONCEPT 3)
// ============================================
const FoodBackground = () => {
  const foodIcons = [
    { emoji: '🍕', top: '5%', left: '10%', size: '64px', rotation: -15, opacity: 0.15 },
    { emoji: '🥑', top: '15%', left: '85%', size: '48px', rotation: 25, opacity: 0.2 },
    { emoji: '🍓', top: '25%', left: '5%', size: '40px', rotation: -30, opacity: 0.25 },
    { emoji: '🥕', top: '8%', left: '75%', size: '56px', rotation: 45, opacity: 0.18 },
    { emoji: '🍎', top: '35%', left: '92%', size: '52px', rotation: -20, opacity: 0.22 },
    { emoji: '🥦', top: '45%', left: '8%', size: '48px', rotation: 35, opacity: 0.2 },
    { emoji: '🍊', top: '55%', left: '88%', size: '44px', rotation: -25, opacity: 0.18 },
    { emoji: '🍌', top: '65%', left: '12%', size: '50px', rotation: 15, opacity: 0.2 },
    { emoji: '🥗', top: '75%', left: '82%', size: '58px', rotation: -35, opacity: 0.16 },
    { emoji: '🍇', top: '85%', left: '15%', size: '46px', rotation: 20, opacity: 0.22 },
    { emoji: '🫐', top: '20%', left: '50%', size: '36px', rotation: -40, opacity: 0.15 },
    { emoji: '🍑', top: '70%', left: '50%', size: '42px', rotation: 30, opacity: 0.18 },
    { emoji: '🥝', top: '40%', left: '25%', size: '38px', rotation: -15, opacity: 0.2 },
    { emoji: '🍅', top: '50%', left: '70%', size: '44px', rotation: 25, opacity: 0.17 },
    { emoji: '🥒', top: '30%', left: '65%', size: '40px', rotation: -45, opacity: 0.19 },
    { emoji: '🌽', top: '60%', left: '35%', size: '48px', rotation: 15, opacity: 0.21 },
    { emoji: '🍆', top: '10%', left: '40%', size: '46px', rotation: -30, opacity: 0.16 },
    { emoji: '🥬', top: '80%', left: '60%', size: '52px', rotation: 35, opacity: 0.18 },
    { emoji: '🥔', top: '18%', left: '30%', size: '40px', rotation: -20, opacity: 0.2 },
    { emoji: '🍠', top: '90%', left: '40%', size: '44px', rotation: 25, opacity: 0.17 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {foodIcons.map((icon, index) => (
        <div
          key={index}
          className="absolute select-none"
          style={{
            top: icon.top,
            left: icon.left,
            fontSize: icon.size,
            opacity: icon.opacity,
            transform: `rotate(${icon.rotation}deg)`,
          }}
        >
          {icon.emoji}
        </div>
      ))}
    </div>
  )
}

// ============================================
// MAIN COMPONENT
// ============================================
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [containerSize, setContainerSize] = useState<string>('')
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
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  // Check cookie consent on mount
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowCookieBanner(true)
    }
  }, [])

  // Accept cookies
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowCookieBanner(false)
  }

  // Decline cookies
  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowCookieBanner(false)
  }

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
    const calorieMatch = text.match(/🔥\s*CALORIES:\s*(\d+)\s*kcal/i) ||
                        text.match(/(\d+)\s*(?:calories|kcal|cal)/i)
    return calorieMatch ? parseInt(calorieMatch[1]) : 0
  }

  // Extract food description from AI result
  const extractDescription = (text: string): string => {
    const foodMatch = text.match(/🍽️\s*FOOD:\s*(.+)/i)
    if (foodMatch) {
      return foodMatch[1].trim()
    }
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
          containerSize: containerSize || null,
          totalWeight: totalWeight || null,
          ingredients: ingredients.length > 0 ? ingredients : null
        }),
      })
      
      const data = await response.json()
      
      if (data.error) {
        setResult('Error: ' + data.error)
      } else {
        setResult(data.analysis)
        saveToHistory(data.analysis)
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
    setContainerSize('')
    setTotalWeight('')
    setIngredient1Name('')
    setIngredient1Weight('')
    setIngredient2Name('')
    setIngredient2Weight('')
    setIngredient3Name('')
    setIngredient3Weight('')
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 dark:from-zinc-900 dark:via-purple-900 dark:to-indigo-900 font-sans p-4 overflow-hidden">
      
      {/* Food background */}
      <FoodBackground />

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-lg z-50">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-700 dark:text-zinc-300">
              We use cookies for Google AdSense advertising. By continuing to use this site, you consent to our use of cookies. 
              See our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
            <div className="flex gap-2">
              <button
                onClick={declineCookies}
                className="px-4 py-2 text-sm bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="px-4 py-2 text-sm bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 py-16 px-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-sm rounded-2xl shadow-lg">
        <div className="text-6xl">🍎🍎🍎</div>
        
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            Food Calorie AI-Scanner
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Upload a photo of food and get calorie information
          </p>
          
          {/* UPDATED DISCLAIMER */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-xs text-yellow-800 dark:text-yellow-200">
            ⚠️ <strong>Estimates only</strong>
          </div>

          {/* NEW TIPS BOX */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm text-blue-800 dark:text-blue-200 w-full">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <div className="flex-1">
                <p className="font-semibold mb-2">Tips for better accuracy:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Place a coin (10 kr.) next to your food</li>
                  <li>Use good lighting</li>
                  <li>Take photo directly from above</li>
                  <li>Select container size below</li>
                </ul>
              </div>
            </div>
          </div>
          
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

            {/* NEW CONTAINER SIZE SELECTOR */}
            {!result && (
              <div className="w-full max-w-md bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                  📏 What's the food on? (optional)
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="small-plate-20cm"
                      checked={containerSize === 'small-plate-20cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Small plate (20cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="medium-plate-24cm"
                      checked={containerSize === 'medium-plate-24cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Medium plate (24cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="large-plate-28cm"
                      checked={containerSize === 'large-plate-28cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Large plate (28cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="small-pan-20cm"
                      checked={containerSize === 'small-pan-20cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Small pan (20cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="medium-pan-26cm"
                      checked={containerSize === 'medium-pan-26cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Medium pan (26cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="large-pan-30cm"
                      checked={containerSize === 'large-pan-30cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Large pan (30cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="bowl-15cm"
                      checked={containerSize === 'bowl-15cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Bowl (15cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="large-bowl-20cm"
                      checked={containerSize === 'large-bowl-20cm'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Large bowl (20cm)</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="container"
                      value="unknown"
                      checked={containerSize === 'unknown'}
                      onChange={(e) => setContainerSize(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Don't know</span>
                  </label>
                </div>
              </div>
            )}
            
            {/* Weight and ingredients (collapsed by default) */}
            {!result && (
              <details className="w-full max-w-md">
                <summary className="cursor-pointer text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white">
                  Advanced: Add weight & ingredients (optional)
                </summary>
                <div className="mt-4 space-y-4">
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
              </details>
            )}
            
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

      {/* Footer */}
      <footer className="relative z-10 mt-8 mb-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex gap-4 justify-center">
          <a href="/privacy" className="hover:text-black dark:hover:text-white hover:underline">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="/terms" className="hover:text-black dark:hover:text-white hover:underline">
            Terms of Service
          </a>
        </div>
        <p className="mt-2">© 2026 Food Calorie AI-Scanner. All rights reserved.</p>
      </footer>
    </div>
  )
}
