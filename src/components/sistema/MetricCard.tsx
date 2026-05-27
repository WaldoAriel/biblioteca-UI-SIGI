import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';
import { themeTokens } from './theme';

interface MetricCardProps {
  /** Título de la métrica (ej: "Estudiantes", "Promedio") */
  title: string;
  /** Valor numérico o texto (ej: "1,234", "85%") */
  value: string | number;
  /** Icono a mostrar */
  icon: ReactNode;
  /** Color de la tarjeta (define icono y badge) */
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  /** Texto opcional de badge (ej: "ACTIVO", "+12%") */
  badgeText?: string;
  /** Mostrar badge a la izquierda o derecha */
  badgePosition?: 'left' | 'right';
  /** Tamaño del valor (h4 por defecto) */
  valueVariant?: 'h3' | 'h4' | 'h5' | 'h6';
}

export const MetricCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  badgeText, 
  badgePosition = 'right',
  valueVariant = 'h4'
}: MetricCardProps) => {
  
  // Mapeo de colores a estilos
  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return {
          bg: themeTokens.colors.primaryTenue,
          icon: themeTokens.colors.primary,
        };
      case 'secondary':
        return {
          bg: themeTokens.colors.secondaryLight,
          icon: themeTokens.colors.secondary,
        };
      case 'error':
        return {
          bg: '#FFEBEE',
          icon: themeTokens.colors.error,
        };
      case 'info':
        return {
          bg: themeTokens.colors.secondaryLight,
          icon: themeTokens.colors.primary,
        };
      case 'success':
        return {
          bg: '#E8F5E9',
          icon: '#2e7d32',
        };
      case 'warning':
        return {
          bg: '#FFF3E0',
          icon: '#ed6c02',
        };
      default:
        return {
          bg: themeTokens.colors.primaryTenue,
          icon: themeTokens.colors.primary,
        };
    }
  };

  const styles = getColorStyles();

  return (
    <Paper 
      sx={{ 
        p: 3, 
        borderRadius: themeTokens.borderRadius.card, 
        flex: 1, 
        minWidth: 180,
        transition: themeTokens.transitions.normal,
        '&:hover': {
          boxShadow: themeTokens.shadows.md,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2,
        flexDirection: badgePosition === 'left' ? 'row-reverse' : 'row',
      }}>
        <Box sx={{ 
          bgcolor: styles.bg, 
          borderRadius: themeTokens.borderRadius.button,
          p: 1, 
          display: 'inline-flex', 
          alignItems: 'center',
          justifyContent: 'center',
          color: styles.icon,
        }}>
          {icon}
        </Box>
        
        {badgeText && (
          <Box sx={{ 
            bgcolor: styles.bg, 
            px: 1.5, 
            py: 0.5, 
            borderRadius: themeTokens.borderRadius.paginacion,
          }}>
            <Typography 
              variant="caption" 
              sx={{ 
                fontWeight: themeTokens.typography.weights.semibold,
                color: styles.icon,
              }}
            >
              {badgeText}
            </Typography>
          </Box>
        )}
      </Box>
      
      <Typography 
        variant="body2" 
        sx={{ 
          color: themeTokens.colors.textSecondary,
          letterSpacing: '1px', 
          mb: 0.5,
          textTransform: 'uppercase',
          fontWeight: themeTokens.typography.weights.medium,
        }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant={valueVariant} 
        sx={{ 
          fontWeight: themeTokens.typography.weights.bold,
          color: styles.icon,
        }}
      >
        {value}
      </Typography>
    </Paper>
  );
};