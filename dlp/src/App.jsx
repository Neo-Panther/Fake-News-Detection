import React, { useState } from 'react'

export default function FakeNewsDetector() {
  const [newsText, setNewsText] = useState('')
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/detect-fake-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newsText, help:"Hello there" }),
      })
      const data = await response.json()
      setResult(data)
      console.log(data);
    } catch (error) {
      console.error('Error:', error)
      setResult(null)
    }
    setIsLoading(false)
  }


  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="icon">📰</span>
            Fake News Detector
          </h2>
          <p className="card-description">Enter a news article to check its authenticity</p>
        </div>
        <div className="card-content">
          <form onSubmit={handleSubmit}>
            <textarea
              placeholder="Paste your news article here..."
              value={newsText}
              onChange={(e) => setNewsText(e.target.value)}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Detect Fake News'}
            </button>
          </form>
        </div>
        {result && (
          <div className="card-footer">
            <div className={`result ${result.isFake ? 'fake' : 'authentic'}`}>
              <div className="result-header">
                <span className={`icon ${result.isFake ? 'fake' : 'authentic'}`}>
                  {result.isFake ? '⚠️' : '✅'}
                </span>
                <span className="result-text">
                  {result.isFake ? 'Potentially Fake News' : 'Likely Authentic'}
                </span>
              </div>
              <p>Confidence: {(result.confidence*100).toFixed(2)}%</p>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
          .container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-image: url('https://www.labellerr.com/blog/content/images/2024/02/fake.jpg');
            background-size: cover;
            background-position: center;
          }
          .card {
            width: 100%;
            max-width: 500px;
            background-color: rgba(31, 41, 55, 0.9);
            backdrop-filter: blur(4px);
            color: white;
            border-radius: 8px;
            overflow: hidden;
          }
          .card-header {
            padding: 1.5rem;
          }
          .card-title {
            font-size: 1.5rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .card-description {
            font-size: 0.875rem;
            color: #9CA3AF;
          }
          .card-content {
            padding: 2rem; /* Increased from 1.5rem */
          }
          textarea {
            width: 90%;
            height: 12rem;
            margin: 0 auto 1rem;
            padding: 0.75rem;
            background-color: #374151;
            color: white;
            border: 1px solid #4B5563;
            border-radius: 4px;
            font-family: 'Playfair Display', serif;
            font-size: 1rem;
            display: block;
          }
          button {
            width: auto;
            padding: 0.5rem 1.5rem;
            background-color: #3B82F6;
            color: white;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.1s ease;
            font-family: 'Playfair Display', serif;
            font-size: 0.9rem;
            margin: 0 auto;
            display: block;
          }
          button:hover:not(:disabled) {
            background-color: #2563EB;
            transform: translateY(-2px);
          }
          button:active:not(:disabled) {
            transform: translateY(0);
          }
          button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .card-footer {
            padding: 1.5rem;
          }
          .result {
            padding: 1rem;
            border-radius: 4px;
          }
          .result.fake {
            background-color: rgba(220, 38, 38, 0.5);
          }
          .result.authentic {
            background-color: rgba(16, 185, 129, 0.5);
          }
          .result-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
          }
          .result-text {
            font-weight: 600;
          }
          .container, button, textarea, .card-title, .card-description {
            font-family: 'Roboto', serif;
          }
        `}</style>
      </div>
  )
}