import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Stack } from "@mui/material";
import { TasksCollection } from "/imports/api/TasksCollection";

export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    await Meteor.callAsync('tasks.insert', {
        text: text.trim(),
        createdAt: new Date(),
    });

    setText('');
  };

  const handleChange = (e) => setText(e.target.value);

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
      <Stack direction="row" spacing={2}>
        <TextField
          sx={{ width: '80%' }}
          label="Nome da tarefa"
          name="nomeTarefa"
          value={text}
          onChange={handleChange}
          fullWidth
        />
        <Button
          sx={{ width: '20%' }}
          type="submit" 
          variant="contained"
        >
          Criar Tarefa
        </Button>
      </Stack>
    </Box>
  );
};