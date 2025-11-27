export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY; // No VITE_ prefix!

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { prompt, isJson = false } = req.body;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: isJson ? { responseMimeType: "application/json" } : {}
    };

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || 'API Error');
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('No response from AI model');
    }

    res.status(200).json({
      success: true,
      response: text,
      isJson
    });

  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error.message || 'Failed to process AI request'
    });
  }
}