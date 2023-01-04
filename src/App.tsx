import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./Pages/Home"
import { Quiz } from "./Pages/Quiz"

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Quiz from Trivia API</h1>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
