import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export const CommonPasswordFormInput = ({ value, onChange }) => {

    const [showPassword, setShowPassword] = useState(false);

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
      };
    
    const handleMouseUpPassword = (e) => {
    e.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <FormControl variant="outlined" fullWidth>
            <InputLabel>Senha</InputLabel>
            <OutlinedInput
                id="senha"
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    </InputAdornment>
                }
                label="Senha"
            />
        </FormControl>
    );
};