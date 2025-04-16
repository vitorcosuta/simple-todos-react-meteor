import React from "react";
import { TimePicker } from "@mui/x-date-pickers";

export const CommonTimePicker = ({ defaultValue, value, onChange, disableFunc }) => { 

    return (
        <TimePicker
            sx={{ width: '50%' }}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            ampm={false}
            shouldDisableTime={disableFunc}
        />
    );
};