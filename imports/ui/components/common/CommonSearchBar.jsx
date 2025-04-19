import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from '@mui/icons-material/Search';

export const CommonSearchBar = ({ value, onChange }) => {

    return (
        <OutlinedInput
            value={value}
            placeholder='Pesquisar...'
            onChange={onChange}
            endAdornment={
                <InputAdornment position='end'>
                    <SearchIcon />
                </InputAdornment>
            }
            sx={{
                borderRadius: '25px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '25px',
                }
            }}
        />
    );

};