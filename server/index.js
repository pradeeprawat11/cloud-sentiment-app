const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Route to forward the request to sentiment analysis API
app.post('/api/analyze-sentiment', async (req, res) => {
  try {
    const response = await axios.post(
      'your-cloud-function-api-url',
      { text: req.body.text }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error analyzing sentiment' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
