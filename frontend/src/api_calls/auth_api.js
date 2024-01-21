import axios from "axios";

export const loginCall = async (userCredentials) => {

    try{

        const res = await axios.post(`${import.meta.env.VITE_API_URL}` + "/login", userCredentials);

        if ('error' in res.data){
            return {success: 0, error: res.data.error}
        }
        else{
            return {success: 1, accessToken: res.data.accessToken}
        }

    } catch(err){
        return {success: 0, error: err}
    }
}

export const signupCall = async (userCredentials) => {

    try{
        const res = await axios.post(`${import.meta.env.VITE_API_URL}`+ "/signup", userCredentials);

        if ('error' in res.data){
            return {success: 0, error: res.data.error}
        }
        else{
            return {success: 1}
        }

    } catch(err){
        return {success: 0, error: err}
    }
}

export const getProfileCall = async () => {

    try{
        const res = await axios.get(`${import.meta.env.VITE_API_URL}` + "/profile");

        if ('error' in res.data){
            return {success: 0, error: res.data.error}
        }
        else{
            return {success: 1, ...res.data}
        }

    } catch(err){
        return {success: 0, error: err}
    }
}