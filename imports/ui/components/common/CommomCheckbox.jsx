import React from "react";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';

export const CommonCheckbox = ({ label, onChange }) => {
    
    return (
        <FormGroup>
            <FormControlLabel 
                control={
                    <Checkbox
                        defaultChecked
                        sx={{
                        color: pink[800],
                        '&.Mui-checked': {
                            color: pink[600],
                        },
                        }}
                        onChange={onChange}
                    />
                } 
                label={label} />
        </FormGroup>
    );
};
