import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export const CommonButtonCard = ({ title, onClick }) => {

    return (
        <Card sx={{ height: '30vh', width: '30vw' }}>
          <CardActionArea
            onClick={onClick}
            sx={{
                height: '100%',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
            }}
          >
                <CardContent sx={{ height: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '80%',
                        }}
                    >
                        <Typography variant="h3" component="div" color="text.secondary">
                        {title}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};