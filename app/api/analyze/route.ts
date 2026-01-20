import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { image, totalWeight, ingredients } = await request.json()

    // Build prompt based on available information
    let prompt = 'Analyze this food and give me: 1) What it is, 2) Estimated calories per 100g, 3) Macronutrients (carbs, protein, fat). Answer ONLY in English and keep it brief.'
    
    if (ingredients && ingredients.length > 0) {
      // Detailed analysis with ingredients
      const ingredientList = ingredients.map((ing: any) => `${ing.name}: ${ing.weight}g`).join(', ')
      prompt = `Analyze this food based on the following ingredients: ${ingredientList}. ${totalWeight ? `Total weight: ${totalWeight}g. ` : ''}Give me: 1) Confirm what the dish is, 2) Total calories for the entire dish, 3) Total macronutrients (carbs, protein, fat in grams). Answer ONLY in English and keep it brief.`
    } else if (totalWeight) {
      // Only total weight specified
      prompt = `Analyze this food and give me: 1) What it is, 2) Estimated calories for ${totalWeight}g of this food, 3) Macronutrients for ${totalWeight}g (carbs, protein, fat in grams). Answer ONLY in English and keep it brief.`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a nutrition expert. Always respond in English, regardless of the user\'s language or location. Use clear, concise language.'
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: prompt,
            },
            {
              type: 'image_url',
              image_url: { url: image },
            },
          ],
        },
      ],
      max_tokens: 300,
    })

    return NextResponse.json({
      result: response.choices[0].message.content,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Could not analyze the image' },
      { status: 500 }
    )
  }
}
