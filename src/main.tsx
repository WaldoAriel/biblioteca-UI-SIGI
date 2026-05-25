import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { sistemaTheme } from './components/sistema/theme';
import App from './App';
import '@fontsource/poppins';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={sistemaTheme}>
      <CssBaseline />  {/* Resetea estilos CSS y aplica el fondo correcto */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);  