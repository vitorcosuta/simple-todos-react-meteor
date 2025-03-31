import { Meteor } from 'meteor/meteor';
import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone)

const today = dayjs().utc();
const todayStartOfTheDay = today.startOf('day');

export const TaskEditForm = ({ task }) => {

    const navigate = useNavigate();

    const name = task?.text ?? '';
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

    const handleTaskNameChange = (e) => setInputName(e.target.value);
    const handleTaskDescriptionChange = (e) => setInputDescription(e.target.value);
    
    return(
        <Fragment>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    alignItems: 'center',
                    flexDirection: "column",
                    gap: 2,
                    width: '90%',
                    margin: 'auto',
                }}
                >
                <Typography variant='h5'>Editar tarefa: {task?.text}</Typography>
                
                
                <TextField
                    label="Nome da tarefa"
                    name="nomeTarefa"
                    value={inputName}
                    onChange={handleTaskNameChange}
                    fullWidth
                />
                <TextField
                    label="Descrição"
                    name="descricaoTarefa"
                    value={inputDescription}
                    onChange={handleTaskDescriptionChange}
                    multiline
                    rows={2}
                    fullWidth
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack 
                        sx={{ width: '100%' }}
                        direction='row' spacing={2}
                    >
                        <DatePicker
                            sx={{ width: '50%' }}
                            defaultValue={today}
                            value={inputDate}
                            onChange={(newDate) => setInputDate(newDate)}
                            views={['year', 'month', 'day']}
                            format="DD/MM/YYYY"
                            disablePast
                        />
                        <TimePicker
                            sx={{ width: '50%' }}
                            defaultValue={todayStartOfTheDay}
                            value={inputDate}
                            onChange={(newDate) => setInputDate(newDate)}
                            ampm={false}
                            shouldDisableTime={(timeValue, view) => {
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
                            }}
                        />
                    </Stack>
                </LocalizationProvider>
                <Button
                    type="submit" 
                    variant="contained"
                >
                Atualizar dados
                </Button>
                
            </Box>
        </Fragment>
    );
}