import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'Analysér denne mad og giv mig: 1) Hvad det er, 2) Estimerede kalorier pr. 100g, 3) Makronæringsstoffer (kulhydrater, protein, fedt). Svar på dansk og kort.',
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
      { error: 'Kunne ikke analysere billedet' },
      { status: 500 }
    )
  }
}
