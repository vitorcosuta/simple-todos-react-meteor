import React, { useState } from "react";
import { Meteor } from 'meteor/meteor';
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CommonFormInput } from "../common/CommonFormInput";
import { CommonSelect } from "../common/CommonSelect";
import { CommonImgUploadButton } from "../common/CommonImgUploadButton";
import { useNavigate } from "react-router-dom";

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

export const EditProfileForm = ({ user }) => {

    const navigate = useNavigate();

    const name = user?.profile?.name;
    const email = user?.emails[0]?.address;
    const gender = user?.profile?.gender;
    const birthdate = user?.profile?.birthdate;
    const company = user?.profile?.company;
    const photo = user?.profile?.photo;

    const day = birthdate.getUTCDate();
    const month = birthdate.getUTCMonth();
    const year = birthdate.getUTCFullYear();

    const [inputName, setInputName] = useState(name);
    const [inputEmail, setInputEmail] = useState(email);
    const [inputGender, setInputGender] = useState(gender);
    const [inputDay, setInputDay] = useState(day);
    const [inputMonth, setInputMonth] = useState(MONTH_LIST[month]);
    const [inputYear, setInputYear] = useState(year);
    const [inputCompany, setInputCompany] = useState(company);
    const [inputPhoto, setInputPhoto] = useState(photo);

    const handleNameChange = (e) => setInputName(e.target.value);

    const handleEmailChange = (e) => setInputEmail(e.target.value);

    const handleCompanyChange = (e) => setInputCompany(e.target.value);

    const handleDayChange = (e) => setInputDay(e.target.value);

    const handleMonthChange = (e) => setInputMonth(e.target.value);

    const handleYearChange = (e) => setInputYear(e.target.value);

    const handleGenderChange = (e) => setInputGender(e.target.value);

    const handleCancelClick = () => navigate('/profile/view');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convertendo os dados do aniversário para data
        const dayInt = parseInt(inputDay);
        const monthInt = MONTH_LIST.indexOf(inputMonth);
        const yearInt = parseInt(inputYear);

        const date = new Date(yearInt, monthInt, dayInt);

        await Meteor.callAsync('users.update', {
            name: inputName,
            email: inputEmail,
            birthdate: date,
            gender: inputGender,
            company: inputCompany,
            photo: inputPhoto
        });

        navigate('/profile/view', { replace: true });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: '80%',
                borderRadius: '20px',
                backgroundColor: 'white',
                p: 4,
                mt: 5,
            }}
        >
            <Typography variant='h5'>Editar dados</Typography>

            <Avatar
                src={inputPhoto}
                alt={name}
                sx={{ width: '300px', height: '300px', margin: 'auto' }}
            />

            <CommonImgUploadButton setPhoto={setInputPhoto}>
                Carregar imagem de perfil
            </CommonImgUploadButton>
            
            <CommonFormInput
                value={inputName} 
                label='Nome'
                placeholder={'Insira o seu nome'}
                onChange={handleNameChange}
            />

            <CommonFormInput
                value={inputEmail} 
                label='E-mail'
                placeholder={'Insira o seu e-mail'}
                onChange={handleEmailChange}
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
                    value={inputDay}
                    label='Dia'
                    onChange={handleDayChange}
                />
                <CommonSelect 
                    value={inputMonth}
                    label='Mês'
                    options={MONTH_LIST}
                    onChange={handleMonthChange}
                />
                <CommonFormInput 
                    value={inputYear}
                    label='Ano'
                    onChange={handleYearChange}
                />
            </Box>

            <CommonSelect
                value={inputGender}
                label='Gênero'
                options={GENDER_LIST}
                onChange={handleGenderChange}
            />

            <CommonFormInput
                value={inputCompany} 
                label='Empresa'
                placeholder={'Insira o nome da empresa'}
                onChange={handleCompanyChange}
            />

            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}
            >
                <Button type="submit" variant="contained">
                    Salvar
                </Button>

                <Button 
                    color="error" 
                    variant="contained"
                    onClick={handleCancelClick}
                >
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
};