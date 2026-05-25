// src/components/sistema/TablaAvanzada.tsx
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Stack,
  Box,
  Typography
} from '@mui/material';
import { ReactNode } from 'react';
import { themeTokens } from './theme';

interface Accion {
  icono: ReactNode;
  label: string;
  onClick: (fila: any) => void;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface Columna {
  id: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
  formato?: 'fecha' | 'numero' | 'texto';
  multilinea?: boolean;
  render?: (value: any, row: any) => ReactNode;
}

interface TablaAvanzadaProps {
  columnas: Columna[];
  filas: any[];
  acciones?: Accion[];
  totalFilas?: number;
  paginacion?: boolean;
  filasPorPagina?: number;
  emptyMessage?: string;
  maxAltura?: string | number;
}

export const TablaAvanzada = ({
  columnas,
  filas,
  acciones = [],
  totalFilas,
  paginacion = true,
  filasPorPagina: filasPorPaginaDefault = 10,
  emptyMessage = 'No hay datos para mostrar',
  maxAltura
}: TablaAvanzadaProps) => {
  const [pagina, setPagina] = useState(0);
  const [filasPorPagina, setFilasPorPagina] = useState(filasPorPaginaDefault);

  const inicio = pagina * filasPorPagina;
  const fin = inicio + filasPorPagina;
  const filasMostradas = paginacion ? filas.slice(inicio, fin) : filas;
  const total = totalFilas || filas.length;

  const handleCambioPagina = (event: unknown, nuevaPagina: number) => {
    setPagina(nuevaPagina);
  };

  const handleCambioFilasPorPagina = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilasPorPagina(parseInt(event.target.value, 10));
    setPagina(0);
  };

  const formatearValor = (valor: any, formato?: string) => {
    if (valor === null || valor === undefined) return '—';
    
    if (formato === 'fecha') {
      try {
        const fecha = new Date(valor);
        return fecha.toLocaleDateString('es-AR');
      } catch {
        return valor;
      }
    }
    
    if (formato === 'numero') {
      return typeof valor === 'number' ? valor.toLocaleString('es-AR') : valor;
    }
    
    return valor;
  };

  return (
    <Paper 
      sx={{ 
        boxShadow: 0,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: themeTokens.colors.border,
        overflow: 'hidden'
      }}
    >
      <TableContainer sx={{ maxHeight: maxAltura }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columnas.map((col) => (
                <TableCell
                  key={col.id}
                  align={col.align || 'left'}
                  width={col.width}
                  sx={{
                    fontWeight: 600,
                    backgroundColor: themeTokens.colors.surfaceHover,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {col.label}
                </TableCell>
              ))}
              {acciones.length > 0 && (
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: 600,
                    backgroundColor: themeTokens.colors.surfaceHover,
                    whiteSpace: 'nowrap'
                  }}
                >
                  ACCIONES
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          
          <TableBody>
            {filasMostradas.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columnas.length + (acciones.length > 0 ? 1 : 0)} 
                  align="center"
                  sx={{ py: 4 }}
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              filasMostradas.map((fila, idx) => (
                <TableRow key={idx}>
                  {columnas.map((col) => (
                    <TableCell
                      key={col.id}
                      align={col.align || 'left'}
                      sx={{ 
                        py: col.multilinea ? 2 : 1.5
                      }}
                    >
                      {col.render ? (
                        col.render(fila[col.id], fila)
                      ) : col.multilinea ? (
                        <Box>
                          {String(formatearValor(fila[col.id], col.formato))
                            .split('\n')
                            .map((linea, i) => (
                              <Typography key={i} variant="body2" sx={{ lineHeight: 1.5 }}>
                                {linea}
                              </Typography>
                            ))}
                        </Box>
                      ) : (
                        formatearValor(fila[col.id], col.formato)
                      )}
                    </TableCell>
                  ))}
                  
                  {acciones.length > 0 && (
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        {acciones.map((accion, i) => (
                          <IconButton
                            key={i}
                            size="small"
                            onClick={() => accion.onClick(fila)}
                            color={accion.color || 'primary'}
                            title={accion.label}
                          >
                            {accion.icono}
                          </IconButton>
                        ))}
                      </Stack>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {paginacion && total > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={total}
          rowsPerPage={filasPorPagina}
          page={pagina}
          onPageChange={handleCambioPagina}
          onRowsPerPageChange={handleCambioFilasPorPagina}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          sx={{
            borderTop: `1px solid ${themeTokens.colors.border}`,
          }}
        />
      )}
    </Paper>
  );
};