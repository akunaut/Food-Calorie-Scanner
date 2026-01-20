import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface RequestBody {
  image: string;
  weight?: string;
  ingredients?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { image, weight, ingredients }: RequestBody = await request.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an expert nutritionist. Analyze this food image and provide:

1. FOOD IDENTIFICATION: What foods do you see?

2. PORTION ESTIMATION: Estimate the size using visual references

3. TOTAL CALORIES: Give calorie count for the ENTIRE portion shown (not per 100g)

4. CONFIDENCE: How confident are you? (High/Medium/Low)

5. BREAKDOWN: Main components and their calories

Be specific about the actual portion size you see, not theoretical per-100g numbers.

Format your response clearly with these sections.`
            },
            {
              type: "image_url",
              image_url: {
                url: image,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 500,
    });

    const analysis = response.choices[0].message.content;
    
    // Extract calorie estimate from response
    const calorieMatch = analysis?.match(/(\d+)\s*calories/i);
    const calories = calorieMatch ? parseInt(calorieMatch[1]) : 0;

    return NextResponse.json({ 
      analysis,
      calories,
      calorieRange: { min: calories - 50, max: calories + 50 },
      reliability: 7
    });

  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ 
      error: 'Failed to analyze image',
      analysis: 'Sorry, I could not analyze this image. Please try again.',
      calories: 0,
      reliability: 0
    }, { status: 500 });
  }
}
