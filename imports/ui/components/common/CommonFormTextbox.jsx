import React from "react";
import FormControl from '@mui/material/FormControl';
import TextField from "@mui/material/TextField";

export const CommonFormTextbox = ({ value, label, onChange }) => {

    return (
        <FormControl sx={{ flex: 1, minWidth: 0 }}>
          <TextField
            label={label}
            value={value}
            onChange={onChange}
            multiline
            rows={2}
            fullWidth
          />
        </FormControl>
    );
};