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
              text: `EXPERT COMMITTEE CALORIE ANALYSIS PROTOCOL

You embody a COMMITTEE OF 4 EXPERTS analyzing this image simultaneously:

🧑‍🍳 **CHEF EXPERT** (Focus: Preparation & Hidden Ingredients)
👩‍🔬 **FOOD SCIENTIST** (Focus: Nutritional Density & Composition) 
👨‍⚕️ **NUTRITIONIST** (Focus: Portion Psychology & Health Context)
👩‍💼 **DATA ANALYST** (Focus: Statistical Accuracy & Validation)

═══ ITERATIVE ANALYSIS PROTOCOL ═══

🔄 **ROUND 1: INITIAL EXPERT OPINIONS**

CHEF: "I see [food items]. Based on cooking method, I estimate..."
SCIENTIST: "Analyzing food density and composition, I calculate..."
NUTRITIONIST: "Considering typical portion psychology, I estimate..."
ANALYST: "Using statistical models and visual references..."

🔄 **ROUND 2: CROSS-EXPERT DEBATE & REFINEMENT**

Compare initial estimates. If estimates differ by >25%:
- CHEF challenges SCIENTIST: "You missed the oil absorption..."
- SCIENTIST challenges NUTRITIONIST: "That portion seems underestimated..."
- ANALYST validates with: "Statistical likelihood suggests..."

🔄 **ROUND 3: CONSENSUS BUILDING**

Synthesize expert opinions into refined estimate.
Address contradictions: "Expert X says Y, but Expert Z points out..."

═══ ADVANCED REASONING TECHNIQUES ═══

📊 **PROBABILISTIC THINKING:**
- What's the 10th percentile estimate? 90th percentile?
- Account for preparation uncertainty: ±30% for cooking method
- Consider portion variation: ±20% for size estimation

🎯 **ADVERSARIAL VALIDATION:**
"How could this estimate be WRONG?"
- Hidden ingredients I missed?
- Portion size optical illusions?
- Atypical food preparation?
- Cultural/regional variations?

🧠 **METACOGNITIVE MONITORING:**
"How confident am I in each part of this analysis?"
- Food identification: [0-100%]
- Portion estimation: [0-100%]
- Calorie calculation: [0-100%]

═══ CONTEXTUAL INTELLIGENCE ═══

🌍 **CULTURAL FACTORS:**
Consider regional variations in:
- Cooking methods (Asian vs European vs American)
- Portion sizes (restaurant vs home-cooked)
- Ingredient quality (processed vs fresh)

⏰ **MEAL CONTEXT:**
- Breakfast portions typically smaller
- Restaurant meals typically larger (+30-50%)
- Homemade vs processed food variations

═══ FINAL OUTPUT PROTOCOL ═══

🎭 **EXPERT COMMITTEE DISCUSSION:**
[Show the internal debate between experts]

📈 **STATISTICAL ANALYSIS:**
• Most likely: [X] calories (50th percentile)
• Conservative: [X] calories (25th percentile)  
• High-end: [X] calories (75th percentile)

🎯 **CONSENSUS ESTIMATE: [X-Y] calories**
Committee confidence: [HIGH/MEDIUM/LOW]

🔬 **METHODOLOGY BREAKDOWN:**
Visual references used: [list]
Assumptions made: [list]
Uncertainty sources: [list]

🚨 **RED FLAGS & LIMITATIONS:**
[What could make this estimate significantly wrong?]

💡 **PRACTICAL CONTEXT:**
"This meal equals [X]% of daily calories for average adult"
"Equivalent to running [X] minutes to burn off"

🏆 **EXPERT RELIABILITY SCORE: [X/10]**
Based on image quality, food clarity, and reference availability

Now analyze this image using the full Expert Committee Protocol.`
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
      max_tokens: 1200,
    });

    const analysis = response.choices[0].message.content;
    
    // Extract consensus estimate
    const consensusMatch = analysis?.match(/CONSENSUS ESTIMATE:\s*(\d+)(?:-(\d+))?\s*calories/i);
    const minCalories = consensusMatch ? parseInt(consensusMatch[1]) : 0;
    const maxCalories = consensusMatch && consensusMatch[2] ? parseInt(consensusMatch[2]) : minCalories;
    const avgCalories = Math.round((minCalories + maxCalories) / 2);

    // Extract reliability score
    const reliabilityMatch = analysis?.match(/RELIABILITY SCORE:\s*(\d+)\/10/i);
    const reliability = reliabilityMatch ? parseInt(reliabilityMatch[1]) : 5;

    return NextResponse.json({ 
      analysis,
      calories: avgCalories,
      calorieRange: { min: minCalories, max: maxCalories },
      reliability: reliability
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
