import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CommonFormInput } from "../common/CommonFormInput";
import { CommonSelect } from "../common/CommonSelect";
import { CommonPasswordFormInput } from "../common/CommonPasswordFormInput";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

  const MONTH_LIST = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ];

export const SignupForm = () => {

  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
       
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSignupError('');

    const login = () => {
      
    }

    setTimeout(login, 1000);
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleCompanyChange = (e) => setCompany(e.target.value);

  const handleDayChange = (e) => setDay(e.target.value);

  const handleMonthChange = (e) => setMonth(e.target.value);

  const handleYearChange = (e) => setYear(e.target.value);

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
        }}
      >

        <CommonFormInput
          value={name} 
          label={'Nome'}
          placeholder={'Insira seu nome'}
          onChange={handleNameChange}
        />

        <CommonFormInput
          value={email}
          label={'E-mail'}
          placeholder={'Insira seu e-mail'}
          onChange={handleEmailChange}
        />

        <CommonFormInput
          value={company}
          label={'Empresa'}
          placeholder={'Insira o nome da sua empresa'}
          onChange={handleCompanyChange}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 2,
          }}
        >
          <CommonFormInput 
            value={day}
            label={'Dia'}
            onChange={handleDayChange}
          />
          <CommonSelect 
            value={month}
            label={'Mês'}
            options={MONTH_LIST}
            onChange={handleMonthChange}
          />
          <CommonFormInput 
            value={year}
            label={'Ano'}
            onChange={handleYearChange}
          />
        </Box>
        
        <CommonPasswordFormInput 
          value={password} 
          onChange={handlePasswordChange}
        />

        {signupError && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>Dados inválidos.</Alert>
        )}

        <Button
          sx={{
            width: '100%',
            mx: 'auto',
            borderRadius: '999px',
            fontWeight: 'bold',
            paddingX: 3,
            paddingY: 1,
           }}
          type="submit" 
          variant="contained"
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Entrar"}
        </Button>
      </Box>
  );
};