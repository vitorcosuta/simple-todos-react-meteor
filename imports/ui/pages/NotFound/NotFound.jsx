import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {

            /** navigate function (useNavigate)
             * 
             * Podemos passar como parâmetro uma url (por exemplo, "/" para sempre voltar
             * à página inicial), ou um número negativo k para voltar atrás k páginas na
             * navegação (-1 volta para a pág. anterior, -2 volta duas páginas ...)
            */
            navigate(-1)
        }, 1000)
    }, []);
    
    return (
        <>
            <h1>NOT FOUND</h1>
            <h2>You are being redirected to the home page.</h2>    
        </>
    );    
}