/**
 * Filename: App.tsx
 * 
 * Desc: Main component
 * 
 * Author: JM
 */

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>hi</h1>} />
      <Route path="/app" element={<h1>hello</h1>} />
      <Route path="*" element={<h1>Hiii</h1>} />
    </Routes>
  </BrowserRouter>
)

export default App
