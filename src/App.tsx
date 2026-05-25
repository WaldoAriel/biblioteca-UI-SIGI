// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SistemaDemo } from './pages/SistemaDemo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SistemaDemo />} />
        <Route path="/sistema/demo" element={<SistemaDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;