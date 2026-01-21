import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ============================================
// RATE LIMITING
// ============================================
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }
  
  if (limit.count >= 10) { // Max 10 requests per minute
    return false
  }
  
  limit.count++
  return true
}

// ============================================
// IMAGE VALIDATION
// ============================================
function validateImage(base64Image: string): { valid: boolean; error?: string } {
  // Check if it's actually base64 image format
  if (!base64Image.startsWith('data:image/')) {
    return { valid: false, error: 'Invalid image format' }
  }
  
  // Check size (max 5MB)
  const sizeInBytes = (base64Image.length * 3) / 4
  const sizeInMB = sizeInBytes / (1024 * 1024)
  
  if (sizeInMB > 5) {
    return { valid: false, error: 'Image too large. Maximum 5MB allowed.' }
  }
  
  // Check format
  const validFormats = ['data:image/jpeg', 'data:image/png', 'data:image/jpg', 'data:image/webp']
  if (!validFormats.some(format => base64Image.startsWith(format))) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP formats allowed' }
  }
  
  return { valid: true }
}

// ============================================
// MAIN API ROUTE
// ============================================
export async function POST(request: Request) {
  try {
    // ============================================
    // 1. CHECK ENVIRONMENT
    // ============================================
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not set')
      return NextResponse.json(
        { error: 'Service configuration error' },
        { status: 500 }
      )
    }

    // ============================================
    // 2. CORS PROTECTION
    // ============================================
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://food-calorie-scanner-peach.vercel.app',
      'http://localhost:3000', // For development
      'http://localhost:3001'  // Backup dev port
    ]
    
    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Unauthorized origin' },
        { status: 403 }
      )
    }

    // ============================================
    // 3. RATE LIMITING
    // ============================================
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute before trying again.' },
        { status: 429 }
      )
    }

    // ============================================
    // 4. PARSE REQUEST BODY
    // ============================================
    const { image, containerSize, totalWeight, ingredients } = await request.json()

    // ============================================
    // 5. VALIDATE IMAGE
    // ============================================
    const validation = validateImage(image)
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      )
    }

    // ============================================
    // 6. BUILD CONTEXT INFO FOR AI
    // ============================================
    let contextInfo = ''
    
    if (containerSize && containerSize !== 'unknown') {
      const size = containerSize.replace(/-/g, ' ')
      contextInfo += `\n\n🔍 IMPORTANT CONTEXT: The food is on a ${size}. Use this for PRECISE portion estimation.`
    }
    
    if (totalWeight) {
      contextInfo += `\n📊 USER PROVIDED: Total weight is ${totalWeight}g`
    }
    
    if (ingredients && ingredients.length > 0) {
      contextInfo += `\n🥘 INGREDIENTS PROVIDED BY USER:`
      ingredients.forEach((ing: any) => {
        contextInfo += `\n  • ${ing.name}: ${ing.weight}g`
      })
    }

    // ============================================
    // 7. CREATE AI PROMPT
    // ============================================
    const prompt = `You are a professional nutritionist and calorie estimation expert.

${contextInfo}

YOUR TASK:
Analyze this food photo and provide PRECISE calorie estimation.

ESTIMATION GUIDELINES:
1. If you see a COIN (10 kr Danish = 27mm diameter), use it as scale reference
2. If container size is provided, use it for accurate volume calculation
3. Estimate portion sizes by comparing to standard serving sizes
4. Look at food density and depth to estimate weight
5. Be REALISTIC - don't underestimate portions

OUTPUT FORMAT (use EXACTLY this structure):

🍽️ FOOD: [dish name]
⚖️ WEIGHT: [total grams]g  
🔥 CALORIES: [total number] kcal
📊 CONFIDENCE: [1-10]/10

BREAKDOWN:
• [ingredient 1]: [grams]g ([calories] kcal)
• [ingredient 2]: [grams]g ([calories] kcal)
• [ingredient 3]: [grams]g ([calories] kcal)

RULES:
- Keep it SHORT and PRECISE
- No long explanations
- Be confident in your estimates
- Round to nearest 10 calories
- Use emojis as shown above
- Maximum 150 words total`

    // ============================================
    // 8. CALL OPENAI API
    // ============================================
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'image_url',
              image_url: {
                url: image,
              },
            },
          ],
        },
      ],
      max_tokens: 500, // Cost protection: limit tokens
    })

    const analysis = response.choices[0]?.message?.content || 'Could not analyze image'

    // ============================================
    // 9. EXTRACT STRUCTURED DATA
    // ============================================
    const calorieMatch = analysis.match(/🔥\s*CALORIES:\s*(\d+)\s*kcal/i) ||
                        analysis.match(/(\d+)\s*kcal/i)
    const calories = calorieMatch ? parseInt(calorieMatch[1]) : 0

    const weightMatch = analysis.match(/⚖️\s*WEIGHT:\s*(\d+)g/i) ||
                       analysis.match(/(\d+)g/i)
    const weight = weightMatch ? parseInt(weightMatch[1]) : 0

    const confidenceMatch = analysis.match(/📊\s*CONFIDENCE:\s*(\d+)\/10/i)
    const confidence = confidenceMatch ? parseInt(confidenceMatch[1]) : 5

    // ============================================
    // 10. RETURN RESPONSE
    // ============================================
    return NextResponse.json({
      analysis,
      calories,
      weight,
      confidence,
      calorieRange: {
        min: Math.max(0, calories - 50),
        max: calories + 50
      },
      reliability: confidence
    })

  } catch (error: any) {
    console.error('OpenAI API error:', error)
    
    // Handle specific errors without exposing internals
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { error: 'Service temporarily unavailable. Please try again later.' },
        { status: 503 }
      )
    }
    
    if (error.code === 'rate_limit_exceeded') {
      return NextResponse.json(
        { error: 'Service is busy. Please try again in a moment.' },
        { status: 429 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to analyze image. Please try again.' },
      { status: 500 }
    )
  }
}
