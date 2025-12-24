import {createContext, useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppContext=createContext()
const AppContextProvider=(props)=>{
    const[user,setUser]=useState(false);
    const[showLogin,setShowLogin]=useState(false);

    const [token,setToken]  =useState(localStorage.getItem("token")||"");
const [credits,setCredits]=useState(false);

const backendURL=import.meta.env.VITE_BACKEND_URL; 
const navigate=useNavigate();   

const loadCreditsData=async()=>{
try{
    const  {data}=await axios.get(backendURL+'/api/user/credits',{headers:{token}})
    if(data .success){
        setCredits(data.credits)
        setUser(data.user)
    }
}
catch(error){
    console.log(error)
    toast.error(error.message)

}
}
const generateImage = async (prompt) => {
    try {
        const { data } = await axios.post(
            backendURL + '/api/image/generate-image',
            { prompt },
            { headers: { token } }
        );

        if (data.success) {
            loadCreditsData();
            return data.resultImage;
       } else {
    toast.error(data.message);
    loadCreditsData();
    navigate('/buy');
}

        
    } catch (error) {
        toast.error(error.message);
    }
};


const logout=()=>{
localStorage.removeItem("token");
setToken("");
setUser(null);

}

useEffect(()=>{
    if(token){
        loadCreditsData();
    }
},[token])

    const value={
        user,setUser,showLogin,setShowLogin,backendURL,token,setToken,credits,setCredits,loadCreditsData,logout,generateImage

    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;