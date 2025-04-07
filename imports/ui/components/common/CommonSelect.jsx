import React from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const CommonSelect = ({ value, label, options ,onChange }) => {

    return (
        <FormControl sx={{ flex: 1, minWidth: 0 }}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                onChange={onChange}
                input={<OutlinedInput label={label} />}
                fullWidth
            >
                {options.map((opt) => {
                    return (
                        <MenuItem key={opt} value={opt}>
                            {opt}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    ); 
};