import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import WcIcon from '@mui/icons-material/Wc';
import CakeIcon from '@mui/icons-material/Cake';
import BusinessIcon from '@mui/icons-material/Business';
import { CommonInfoInput } from "../../components/common/CommonInfoInput";

export const ProfileData = ({ user }) => {

    const name = user?.profile?.name;
    const email = user?.emails[0]?.address;
    const gender = user?.profile?.gender;
    const birthdate = user?.profile?.birthdate;
    const company = user?.profile?.company;
    const photo = user?.profile?.photo;

    const formatDate = (dateObj) => {
        if (!(dateObj instanceof Date)) return '';

        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
        const year = dateObj.getUTCFullYear();

        return `${day}/${month}/${year}`;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                backgroundColor: '#f2dcd8',
                gap: 4,
            }}
        >  
            <Avatar
                src={photo}
                alt={name}
                sx={{ width: '30%', height: '30%', mb: 1 }}
            />
            
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '70%',
                    gap: 3,
                }}
            >
                <CommonInfoInput
                value={name}
                label='Nome'
                icon={<PersonIcon />}
                />

                <CommonInfoInput
                value={email}
                label='E-mail'
                icon={<EmailIcon />}
                />

                <Box 
                    sx={{ 
                        display: 'flex', 
                        flexDirection: 'row',
                        gap: 2,
                    }}
                >
                    <CommonInfoInput
                        value={gender}
                        label='Gênero'
                        icon={<WcIcon />}
                    />

                    <CommonInfoInput
                        value={formatDate(birthdate)}
                        label='Data de nascimento'
                        icon={<CakeIcon />}
                    />
                </Box>

                <CommonInfoInput
                    value={company}
                    label='Empresa'
                    icon={<BusinessIcon />}
                />
            </Box>
        </Box>
    );
}