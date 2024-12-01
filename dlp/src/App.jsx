'use client'

import React, { useState } from 'react'

export default function FakeNewsDetector() {
  const [formData, setFormData] = useState({
    statement: '',
    subjects: '',
    speaker: '',
    speakerJobTitle: '',
    stateInfo: '',
    partyAffiliation: ''
  })
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:5000/api/detect-fake-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error:', error)
      setResult(null)
    }
    setIsLoading(false)
  }

  const getResultColor = (title) => {
    const redColor = [220, 38, 38]
    const greenColor = [16, 185, 129]
    const t = (title - 1) / 4 // Normalize to 0-1 range
    const r = Math.round(redColor[0] + (greenColor[0] - redColor[0]) * t)
    const g = Math.round(redColor[1] + (greenColor[1] - redColor[1]) * t)
    const b = Math.round(redColor[2] + (greenColor[2] - redColor[2]) * t)
    return `rgb(${r}, ${g}, ${b})`
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            <span className="icon">📰</span>
            Fake News Detector
          </h2>
          <p className="card-description">Enter the details to check the authenticity of the news</p>
        </div>
        <form onSubmit={handleSubmit} className="card-content">
          <div className="input-group">
            <label htmlFor="statement">Statement</label>
            <textarea
              id="statement"
              name="statement"
              placeholder="Enter the news statement..."
              value={formData.statement}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-grid">
            <div className="input-group">
              <label htmlFor="subjects">Subject(s)</label>
              <input
                type="text"
                id="subjects"
                name="subjects"
                placeholder="Enter subject(s)"
                value={formData.subjects}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="speaker">Speaker</label>
              <input
                type="text"
                id="speaker"
                name="speaker"
                placeholder="Enter speaker's name"
                value={formData.speaker}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="speakerJobTitle">Speaker's Job Title</label>
              <input
                type="text"
                id="speakerJobTitle"
                name="speakerJobTitle"
                placeholder="Enter speaker's job title"
                value={formData.speakerJobTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="stateInfo">State Info</label>
              <input
                type="text"
                id="stateInfo"
                name="stateInfo"
                placeholder="Enter state information"
                value={formData.stateInfo}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group party-affiliation">
              <label htmlFor="partyAffiliation">Party Affiliation</label>
              <input
                type="text"
                id="partyAffiliation"
                name="partyAffiliation"
                placeholder="Enter party affiliation"
                value={formData.partyAffiliation}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Detect Fake News'}
          </button>
        </form>
        {result && (
          <div className="card-footer">
            <div className="result" style={{ backgroundColor: getResultColor(result.title) }}>
              <div className="result-header">
                <span className="icon" role="img" aria-label={result.title === 5 ? 'checkmark' : 'warning'}>
                  {result.title === 5 ? '✅' : '⚠️'}
                </span>
                <span className="result-text">
                  {result.title === 1 ? 'Highly Likely Fake News' :
                   result.title === 2 ? 'Likely Fake News' :
                   result.title === 3 ? 'Uncertain' :
                   result.title === 4 ? 'Likely Authentic' :
                   'Highly Likely Authentic'}
                </span>
              </div>
              <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
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
          font-family: 'Roboto', serif;
        }
        .card {
          width: 100%;
          max-width: 600px;
          background-color: rgba(31, 41, 55, 0.9);
          backdrop-filter: blur(4px);
          color: white;
          border-radius: 8px;
          overflow: hidden;
          padding-right:1rem;
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
          padding: 2rem;
        }
        .input-group {
          margin-bottom: 0; /* Update: Removed margin-bottom */
        }
        .input-group label {
          display: block;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
          color: #D1D5DB;
        }
        .input-group input,
        .input-group textarea {
          width: 100%;
          padding: 0.75rem;
          background-color: #374151;
          color: white;
          border: 1px solid #4B5563;
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
        }
        .input-group textarea {
          height: 6rem;
          resize: vertical;
        }
        .input-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem; /* Update: Increased gap */
        }
        @media (min-width: 640px) {
          .input-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .party-affiliation {
          grid-column: 1 / -1;
          max-width: 50%;
          margin-left: auto;
          margin-right: auto;
          margin-bottom:1rem;
        }
        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #3B82F6;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          font-family: inherit;
          font-size: 1rem;
          font-weight: bold;
        }
        button:hover:not(:disabled) {
          background-color: #2563EB;
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
        .result-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .result-text {
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

