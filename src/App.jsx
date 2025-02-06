// src/App.jsx
import { useState } from 'react'
import './App.css'

function App() {
  const [num1, setNum1] = useState('')
  const [num2, setNum2] = useState('')
  const [result, setResult] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Parse input values as floats (or integers if preferred)
    const sum = parseFloat(num1) + parseFloat(num2)
    setResult(sum)
  }

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Hello World PWA: Add Two Numbers</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Number 1"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          style={{ marginRight: '0.5rem' }}
          required
        />
        <input
          type="number"
          placeholder="Number 2"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          style={{ marginRight: '0.5rem' }}
          required
        />
        <button type="submit">Add</button>
      </form>
      {result !== null && <p>Result: {result}</p>}
    </div>
  )
}

export default App
