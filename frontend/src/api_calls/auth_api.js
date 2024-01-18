import axios from "axios";

const apiUrl = `${REACT_APP_API_URL}`

export const loginCall = async (userCredentials) => {

    try{
        const res = await axios.post(apiUrl + "/login", userCredentials);

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
        const res = await axios.post(apiUrl + "/signup", userCredentials);

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
        const res = await axios.get(apiUrl + "/profile");

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