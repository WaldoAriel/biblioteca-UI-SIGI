// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // ← Importar
import { ThemeProvider } from '@mui/material/styles';
// import { SistemaDemo } from './pages/SistemaDemo';
import { sistemaTheme } from './components/sistema/theme';
import { Dashboard } from './components/sistema/Dashboard';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> 
      <ThemeProvider theme={sistemaTheme}>
        {/* <SistemaDemo /> */}
        <Dashboard />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);