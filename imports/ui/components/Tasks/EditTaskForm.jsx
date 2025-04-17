import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { CommonFormInput } from "../common/CommonFormInput";
import { CommonFormTextbox } from "../common/CommonFormTextbox";
import { CommonTimePicker } from "../common/CommonTimePicker";
import { CommonDatePicker } from "../common/CommonDatePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone)

const today = dayjs().utc();
const todayStartOfTheDay = today.startOf('day');

export const EditTaskForm = ({ task }) => {

    const navigate = useNavigate();

    const name = task?.name ?? '';
    const description = task?.description ?? '';
    const date = dayjs(task?.date) ?? today;

    const [inputName, setInputName] = useState(name);
    const [inputDescription, setInputDescription] = useState(description);
    const [inputDate, setInputDate] = useState(date);

    const isToday = inputDate.isSame(today, 'day');

    useEffect(() => {
        setInputName(name);
        setInputDescription(description);
        setInputDate(date);
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(inputDate);

        let mergedDate = inputDate.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        if (!inputName || !mergedDate) return;

        console.log(mergedDate);

        await Meteor.callAsync('tasks.update', {
            _id: task._id,
            newText: inputName,
            newDescription: inputDescription,
            newDate: mergedDate,
        });

        navigate('/tasks/view', { replace: true });
    };

    const handleNameChange = (e) => setInputName(e.target.value);
    const handleDescriptionChange = (e) => setInputDescription(e.target.value);
    const handleDateChange = (newDate) => setInputDate(newDate);
    const handleCancelClick = () => navigate('/tasks/view');

    const disableTimePicking = (timeValue, view) => {
        
        if (!isToday) return false;
    
        const localToday = today.local(); // Converte 'today' para o fuso local
        const selectedHour = timeValue.hour(); // timeValue já está no fuso local
        const selectedMinute = timeValue.minute();
    
        if (view === "hours") {
            return selectedHour < localToday.hour(); // Bloqueia horas passadas
        }
    
        if (view === "minutes" && selectedHour === localToday.hour()) {
            return selectedMinute < localToday.minute(); // Bloqueia minutos passados se for a mesma hora
        }
    
        return false;
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: '80vw',
                margin: 'auto',
                pt: 10,
            }}
        >
            <Typography variant='h5'>Editar tarefa: {task?.name}</Typography>
            
            <CommonFormInput
                value={inputName} 
                label='Nome'
                placeholder={'Insira o nome da tarefa'}
                onChange={handleNameChange}
            />

            <CommonFormTextbox
                value={inputDescription}
                label='Descrição'
                onChange={handleDescriptionChange}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        gap: 2,
                    }} 
                >
                    <CommonDatePicker 
                        defaultValue={today}
                        value={inputDate}
                        onChange={handleDateChange}
                    />

                    <CommonTimePicker
                        defaultValue={todayStartOfTheDay}
                        value={inputDate}
                        onChange={handleDateChange}
                        disableFunc={disableTimePicking}
                    />
                </Box>
            </LocalizationProvider>

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
}