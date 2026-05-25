// src/components/sistema/CampoFecha.tsx
import { TextField, TextFieldProps } from '@mui/material';

export const CampoFecha = (props: TextFieldProps) => {
  return (
    <TextField
      type="date"
      size="small"
      fullWidth
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {},
        '& .MuiInputLabel-root': {
          color: 'text.secondary',
        },
      }}
      {...props}
    />
  );
};