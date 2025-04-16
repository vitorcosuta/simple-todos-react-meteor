import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { CommonFormInput } from "../common/CommonFormInput";
import { CommonFormTextbox } from "../common/CommonFormTextbox";
import { CommonTimePicker } from "../common/CommonTimePicker";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { CommonDatePicker } from "../common/CommonDatePicker";
import Button from "@mui/material/Button";

dayjs.extend(utc);
dayjs.extend(timezone)

const today = dayjs();
const todayStartOfTheDay = today.startOf('day');

export const AddTaskForm = ({ setOpen }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(today);

    const isToday = date.isSame(today, 'day');

    const handleSubmit = async (e) => {

        e.preventDefault();

        let mergedDate = date.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

        if (!name || !date) return;

        await Meteor.callAsync('tasks.insert', {
            name: name.trim(),
            description: description,
            date: mergedDate,
            createdAt: new Date(),
        });

        setOpen(false);
    };

    const handleNameChange = (e) => setName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleDateChange = (newDate) => setDate(newDate);
    const handleCancelClick = () => setOpen(false);

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
                width: '100%',
                margin: 'auto',
            }}
        >
            <Typography variant='h5'>Adicionar tarefa</Typography>

            <CommonFormInput
                value={name} 
                label='Nome'
                placeholder={'Insira o nome da tarefa'}
                onChange={handleNameChange}
            />

            <CommonFormTextbox
                value={description}
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
                        value={date}
                        onChange={handleDateChange}
                    />

                    <CommonTimePicker
                        defaultValue={todayStartOfTheDay}
                        value={date}
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
                    Criar tarefa
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