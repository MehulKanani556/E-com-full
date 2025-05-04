import {  Navigate } from 'react-router-dom'


export const OpenRoutes = ({children})=>{
    const getTokenFromLocalStorage =JSON.parse(localStorage.getItem("token"));
    return getTokenFromLocalStorage == null? children: (<Navigate to={'/'} replace={true}/>)
}