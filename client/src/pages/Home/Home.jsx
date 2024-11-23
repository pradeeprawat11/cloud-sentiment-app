import React, { useState } from 'react';
import axios from 'axios';

function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample tweets, product reviews, and conversations
  const tweets = {
    positive: [
      "Just finished a great workout! Feeling amazing! #blessed",
      "So happy to finally get my hands on the new iPhone! #excited #applefan",
      "Had an incredible vacation in Hawaii. Can’t wait to go back! #grateful",
    ],
    negative: [
      "I’m so frustrated with the customer service today. I’m done!",
      "My laptop crashed and I lost all my work. Worst day ever!",
      "I waited for an hour for my food and it was cold when it arrived.",
    ],
    neutral: [
      "Just finished my coffee and catching up on work.",
      "It’s raining outside. Just another typical day.",
      "I need to get groceries later, nothing exciting happening today.",
    ]
  };

  const reviews = {
    positive: [
      "This product is amazing! I can’t believe how well it works. Exceeded my expectations!",
      "I’m really impressed by the quality of this item. Totally worth the price.",
      "Love this product! It’s exactly what I needed, and it works perfectly.",
    ],
    negative: [
      "The product stopped working after two weeks. Really disappointed.",
      "The item doesn’t match the description, and the quality is poor.",
      "I regret purchasing this. It’s not worth the money at all.",
    ],
    neutral: [
      "It’s an okay product. Does the job, but nothing extraordinary.",
      "The product is fine, but I’ve seen better alternatives for the price.",
      "It’s a decent item, but I’m not wowed by it. Does what it says.",
    ]
  };

  const conversations = {
    positive: [
      "Customer: Hi, I’m having trouble with my recent order.",
      "Bot: Hi there! I’m happy to help. What seems to be the issue?",
      "Customer: I received the wrong item, but I love your customer support.",
      "Bot: I’m so sorry to hear that! Let’s get that sorted out right away.",
      "Customer: Thanks! I really appreciate how quickly you responded.",
      "Bot: You’re welcome! We’ll have the correct item shipped to you ASAP."
    ],
    negative: [
      "Customer: I’m really unhappy with my purchase. It didn’t work as expected.",
      "Bot: I’m sorry to hear that. Can you please explain what went wrong?",
      "Customer: The item broke within a week of use, and your customer service has been unhelpful.",
      "Bot: I truly apologize for the inconvenience. We’ll definitely assist you with a refund or replacement.",
      "Customer: I just want my money back. I’m never buying from you again.",
      "Bot: We understand your frustration, and we’ll work to resolve this as soon as possible."
    ],
    neutral: [
      "Customer: Hello, I need help with my account.",
      "Bot: Of course! What specific issue are you facing?",
      "Customer: I forgot my password and need to reset it.",
      "Bot: No problem. I’ll send you a link to reset your password.",
      "Customer: Thanks.",
      "Bot: You’re welcome. Let me know if you need further assistance."
    ]
  };

  const analyzeSentiment = async () => {
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/analyze-sentiment',
        { text }
      );

      const scaledScore = response.data.score * 10;
      let feeling = '';

      if (scaledScore > 5) {
        feeling = 'Very Positive 😊';
      } else if (scaledScore > 0) {
        feeling = 'Positive 🙂';
      } else if (scaledScore < -5) {
        feeling = 'Very Negative 😞';
      } else if (scaledScore < 0) {
        feeling = 'Negative 🙁';
      } else {
        feeling = 'Neutral 😐';
      }

      setResult({ ...response.data, scaledScore, feeling });
    } catch (error) {
      setError('Error analyzing sentiment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelection = (category, type) => {
    let selectedText;
    if (category === 'tweets') {
      selectedText = tweets[type].join(' ');
    } else if (category === 'reviews') {
      selectedText = reviews[type].join(' ');
    } else if (category === 'conversations') {
      selectedText = conversations[type].join(' ');
    }

    setText(selectedText);
    setResult(null);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzeSentiment();
  };

  return (
    <div className="h-screen bg-gray-50 flex flex-col md:flex-row p-6">
      {/* Left Column: Category Selection */}
      <div className="w-full h-full overflow-y-scroll scrollbar-hide  md:w-1/3 bg-white rounded-lg shadow-lg p-6 mr-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Choose a Sample</h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Tweets</h3>
            {['positive', 'negative', 'neutral'].map((type) => (
              <button
                key={type}
                onClick={() => handleSelection('tweets', type)}
                className="w-full p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition duration-300"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Tweet
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Product Reviews</h3>
            {['positive', 'negative', 'neutral'].map((type) => (
              <button
                key={type}
                onClick={() => handleSelection('reviews', type)}
                className="w-full p-3 bg-green-100 hover:bg-green-200 rounded-lg transition duration-300"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Review
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700">Conversations</h3>
            {['positive', 'negative', 'neutral'].map((type) => (
              <button
                key={type}
                onClick={() => handleSelection('conversations', type)}
                className="w-full p-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg transition duration-300"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Conversation
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Sentiment Analysis */}
      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-600">Sentiment Analysis</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            rows="6"
          />

          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
          </button>
        </form>

        {/* Results */}
        {result && (
          <div className={`p-6 rounded-lg ${result.scaledScore > 0 ? (result.scaledScore > 5 ? 'bg-green-200' : 'bg-green-100') : (result.scaledScore < -5 ? 'bg-red-200' : 'bg-red-100')}`}>
            <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
            <p><strong>Sentiment Score:</strong> {result.scaledScore.toFixed(2)}</p>
            <p><strong>Feeling:</strong> {result.feeling}</p>
            <p><strong>magnitude:</strong> {result.magnitude.toFixed(2)}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 text-red-600 border border-red-200 rounded-md bg-red-100">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
