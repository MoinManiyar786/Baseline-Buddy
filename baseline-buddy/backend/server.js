const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/check-feature', async (req, res) => {
  try {
    const { feature, featureData } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a web development expert. Explain if web features are Baseline-safe in 3-5 sentences. 
          Be friendly and beginner-friendly. Use ✅ for safe features and ⚠️ for unsafe features.
          Include specific browser version information when available.`
        },
        {
          role: "user",
          content: `Feature: ${feature}\nBaseline Data: ${JSON.stringify(featureData || 'Not found in baseline')}`
        }
      ],
      max_tokens: 350,
      temperature: 0.7
    });

    res.json({ 
      explanation: completion.choices[0].message.content,
      success: true
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate explanation',
      success: false 
    });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Baseline Buddy API is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});