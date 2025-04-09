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

const GENDER_LIST = [
  'Masculino',
  'Feminino',
  'Outro',
  'Prefiro não dizer'
];

export const SignupForm = () => {

  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
       
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSignupError('');

    // Convertendo os dados do aniversário para data
    const dayInt = parseInt(day);
    const monthInt = MONTH_LIST.indexOf(month);
    const yearInt = parseInt(year);

    const birthdate = new Date(yearInt, monthInt, dayInt);

    const signup = async () => {
      try {
        await Meteor.callAsync('users.signup', {
          name,
          email, 
          company, 
          birthdate, 
          gender, 
          password
        });

        // Limpar os dados do formulário
        setName('');
        setEmail('');
        setCompany('');
        setDay('');
        setMonth('');
        setYear('');
        setGender('');
        setPassword('');

        setSignupSuccess(true); // Habilitar aviso de sucesso
        
        setTimeout(() => navigate('/login', { replace: true }), 1000)

      } catch (err) {
        setSignupError(err.reason);
      } finally {
        setLoading(false);
      }
    }

    setTimeout(signup, 1000);
  };

  const handleNameChange = (e) => setName(e.target.value);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleCompanyChange = (e) => setCompany(e.target.value);

  const handleDayChange = (e) => setDay(e.target.value);

  const handleMonthChange = (e) => setMonth(e.target.value);

  const handleYearChange = (e) => setYear(e.target.value);

  const handleGenderChange = (e) => setGender(e.target.value);

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

        <CommonSelect
          value={gender}
          label={'Gênero'}
          options={GENDER_LIST}
          onChange={handleGenderChange}
        />
        
        <CommonPasswordFormInput 
          value={password} 
          onChange={handlePasswordChange}
        />

        {signupError && (
          <Alert severity="error">{signupError}</Alert>
        )}

        {signupSuccess && (
          <Alert severity="success">Usuário cadastrado com sucesso!</Alert>
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
          {loading ? <CircularProgress size={24} color="inherit" /> : "Cadastrar"}
        </Button>
      </Box>
  );
};