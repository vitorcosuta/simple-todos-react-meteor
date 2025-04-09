import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFormInput } from "../common/CommonFormInput";
import { CommonPasswordFormInput } from "../common/CommonPasswordFormInput";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export const LoginForm = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: '20vw',
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 2,
        mt: '5%'
      }}
    >
      <Typography 
        variant="h4"
        sx={{
            whiteSpace: 'pre-line',
            fontFamily: 'source-sans-pro-latin-400-normal, sans-serif',
            color: '#262423',
        }}
      >
      Autenticar-se
      </Typography>

      <CommonFormInput
        value={email}
        label={'E-mail'}
        placeholder={'Insira seu e-mail'}
        onChange={handleEmailChange}
      />
      
      <CommonPasswordFormInput 
        value={password} 
        onChange={handlePasswordChange}
      />

      {loginError && (
        <Alert severity="error">Dados inválidos!</Alert>
      )}

      <Button
        sx={{
          width: '100%',
          mx: 'auto',
          borderRadius: '999px',
          fontWeight: 'bold',
          paddingX: 3,
          paddingY: 1,
          backgroundColor: '#56021F',
          }}
        type="submit" 
        variant="contained"
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
      </Button>
    </Box>
  );
};