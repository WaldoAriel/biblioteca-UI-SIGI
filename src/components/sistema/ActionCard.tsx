// src/components/sistema/ActionCard.tsx
import { Paper, Typography, Button, Box } from '@mui/material';
import { ReactNode } from 'react';
import { themeTokens } from './theme';

interface ActionCardProps {
  title: string;
  description: string;
  buttonText: string;
  /** Color de la línea lateral y del botón */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Variante del botón (default: 'outlined') */
  buttonVariant?: 'text' | 'outlined' | 'contained';
  /** Icono opcional antes del texto del botón */
  buttonIcon?: ReactNode;
  onButtonClick?: () => void;
  /** Ancho máximo de la tarjeta */
  maxWidth?: string | number;
}

export const ActionCard = ({ 
  title, 
  description, 
  buttonText, 
  color = 'primary',
  buttonVariant = 'outlined',
  buttonIcon,
  onButtonClick,
  maxWidth
}: ActionCardProps) => {
  
  // Mapeo de colores a valores reales del theme
  const getBorderColor = () => {
    switch (color) {
      case 'primary': return themeTokens.colors.primary;
      case 'secondary': return themeTokens.colors.secondary;
      case 'error': return themeTokens.colors.error;
      case 'info': return themeTokens.colors.secondaryLight;
      case 'success': return '#2e7d32';
      case 'warning': return '#ed6c02';
      default: return themeTokens.colors.primary;
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 2, 
        borderLeft: `4px solid ${getBorderColor()}`,
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        maxWidth: maxWidth,
        width: '100%',
        transition: themeTokens.transitions.normal,
        '&:hover': {
          boxShadow: themeTokens.shadows.md,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: themeTokens.typography.weights.semibold,
            mb: 0.5
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: themeTokens.colors.textSecondary }}
        >
          {description}
        </Typography>
      </Box>
      
      <Button 
        variant={buttonVariant}
        color={color}
        onClick={onButtonClick}
        startIcon={buttonIcon}
        sx={{ 
          borderRadius: themeTokens.borderRadius.card,
          textTransform: 'none',
          minWidth: 'fit-content',
        }}
      >
        {buttonText}
      </Button>
    </Paper>
  );
};