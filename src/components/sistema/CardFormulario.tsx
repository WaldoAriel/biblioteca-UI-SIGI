// src/components/sistema/CardFormulario.tsx
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { themeTokens } from './theme';
interface Campo {
  label: string;
  valor: ReactNode | string | number;
}

interface CardFormularioProps {
  titulo?: string;
  campos: Campo[];
  columnas?: 1 | 2 | 3;
}

export const CardFormulario = ({ 
  titulo, 
  campos = [], 
  columnas = 2
}: CardFormularioProps) => {
  return (
    <Card 
      sx={{ 
        boxShadow: 0,
        border: themeTokens.colors.border,
        mb: 3,
        overflow: 'visible'
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {titulo && (
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600, 
              color: 'primary.main',
              mb: 2.5,
              pb: 1,
              borderBottom: '1px solid #eef2f6'  // ⚠️ Este también
            }}
          >
            {titulo}
          </Typography>
        )}
        
        <Grid container spacing={3}>
          {campos.map((campo, idx) => (
            <Grid item xs={12} sm={12/columnas} key={idx}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: 'text.secondary',
                  display: 'block',
                  mb: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.5px'
                }}
              >
                {campo.label}
              </Typography>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.primary',
                  fontWeight: 500,
                  wordBreak: 'break-word'
                }}
              >
                {campo.valor || '—'}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};