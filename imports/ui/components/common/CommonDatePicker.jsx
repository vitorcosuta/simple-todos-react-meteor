import React from "react";
import { DatePicker } from "@mui/x-date-pickers";

export const CommonDatePicker = ({ defaultValue, value, onChange }) => {

    return (
        <DatePicker
            sx={{ width: '50%' }}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            views={['year', 'month', 'day']}
            format="DD/MM/YYYY"
            disablePast
        />
    );
};