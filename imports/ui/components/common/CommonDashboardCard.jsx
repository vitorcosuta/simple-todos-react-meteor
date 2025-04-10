import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export const CommonDashboardCard = ({ title, metric }) => {

    return (
        <Card sx={{ height: '30vh', width: '30vw' }}>
          <CardActionArea
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
                        <Typography variant="h5" component="div">
                        {title}
                        </Typography>
                        <Typography variant="h1" color="text.secondary">
                        {metric}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};