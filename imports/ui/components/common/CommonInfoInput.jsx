import React from "react";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";

export const CommonInfoInput = ({ value, label, icon }) => {

    return (
        <FormControl variant='filled' sx={{ flex: 1 }}>
            <InputLabel
                sx={{
                    ml: 4,
                    color: 'rgba(22, 21, 21, 0.87)',
                    '&.Mui-focused': {
                      color: '#7b343f',
                    },
                }}
            >
                {label}
            </InputLabel>
            <FilledInput
                readOnly
                value={value}
                startAdornment={
                    <InputAdornment position="start">
                        {icon}
                    </InputAdornment>
                }
                sx={{
                    pt: 1,
                    '&.MuiFilledInput-root': {
                        backgroundColor: '#fff',
                    },
                    '&:after': {
                        borderBottom: '2px solid #7b343f', // custom color on focus
                    },
                    '&:before': {
                        borderBottom: '1px solid rgba(0,0,0,0.42)', // default underline
                    },
                    '&:hover:not(.Mui-disabled, .Mui-error):before': {
                        borderBottom: '2px solid #7b343f', // hover color
                    },
                }}
            />
        </FormControl>
    );
};