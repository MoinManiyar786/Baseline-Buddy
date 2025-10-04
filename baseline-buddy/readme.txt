# Baseline Buddy

A web application that helps developers check if HTML, CSS, or JavaScript features are Baseline-safe with AI-powered explanations.

## Features

- Check web feature compatibility with Baseline data
- Get AI-powered explanations of feature support status
- View detailed browser support information
- Receive tips and alternatives for features
- Clean, responsive UI

## How to Use

1. Open `index.html` in a web browser
2. Enter a web feature in the input field (e.g., ":has()", "grid", "backdrop-filter")
3. Click "Check Compatibility" or press Enter
4. View the results including:
   - Baseline safety status
   - AI explanation
   - Browser support details
   - Tips and alternatives
   - Baseline information

## Project Structure

- `index.html` - Main HTML file
- `styles.css` - All styling
- `script.js` - Application logic
- `baseline-data.js` - Sample baseline features data

## Integration with Real APIs

To use this with real APIs:

1. **OpenAI API**: Replace the `generateAIExplanation` function in `script.js` with actual API calls
2. **Baseline Data**: Replace the sample data in `baseline-data.js` with the full dataset from `@web-features/web-features`

### Example OpenAI API Integration

```javascript
async function generateAIExplanation(feature, featureData) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a web development expert. Explain if a web feature is Baseline-safe in 3-5 sentences. Be friendly and beginner-friendly.'
                },
                {
                    role: 'user',
                    content: `Is ${feature} Baseline-safe? Baseline data: ${JSON.stringify(featureData)}`
                }
            ]
        })
    });
    
    const data = await response.json();
    return parseAIResponse(data.choices[0].message.content);
}