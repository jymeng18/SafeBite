/**
 * Filename: App.tsx
 * 
 * Desc: Main component
 * 
 * Author: JM
 */

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>hi</h1>} />
        <Route path="/app" element={<h1>hello</h1>} />
        <Route path="*" element={<h1>Hiii</h1>} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

export default App
