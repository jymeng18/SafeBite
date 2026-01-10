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
import NotFound from './pages/NotFound';
import Index from './pages/Index';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/app" element={<h1>hello</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

export default App
