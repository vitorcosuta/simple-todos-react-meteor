import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from "@mui/material/Button";
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import FormLabel from "@mui/material/FormLabel";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from "@mui/material/CircularProgress";

export const LoginForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
       
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');

    const login = () => {
      Meteor.loginWithPassword(email, password, (err) => {
        
        setLoading(false);

        if(err){
          setLoginError(err);
        }else{
          navigate('/tasks/dashboard', { replace: true });
        }
      });
    }

    setTimeout(login, 1000);
  };

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleMouseUpPassword = (e) => {
    e.preventDefault();
  };

  return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: '90%',
          margin: 'auto',
        }}
      >
        <FormControl>
          <FormLabel>E-mail</FormLabel>
          <OutlinedInput 
            id="outlined-adornment-email"
            placeholder="Insira seu e-mail"
            value={email}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            onChange={handleEmailChange}
          />
        </FormControl>

        <FormControl variant="outlined">
          <FormLabel>Senha</FormLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            placeholder="Insira sua senha"
            value={password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
            onChange={handlePasswordChange}
          />
        </FormControl>

        {loginError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>Dados inválidos.</Alert>
        )}

        <Button
          sx={{ 
            width: '20%',
            mx: 'auto',
           }}
          type="submit" 
          variant="contained"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
        </Button>
      </Box>
  );
};