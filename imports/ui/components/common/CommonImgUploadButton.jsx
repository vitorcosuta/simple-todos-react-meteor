import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export const CommonImgUploadButton = ({ children, setPhoto }) => {

    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
            
            const validImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

            if (!validImageTypes.includes(selectedFile.type)) {
                alert("Por favor, selecione um arquivo de imagem válido (jpg, png, webp, gif).");
                return;
            }
        
            // Converter para base64 e salvar como preview
            const reader = new FileReader();

            reader.onloadend = () => {
                setPhoto(reader.result); // reader.result é a imagem em base64
            };
            
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ bgcolor: '#B5828C' }}
        >
            {children}
            <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                accept="image/*"
            />
        </Button>
    );
}