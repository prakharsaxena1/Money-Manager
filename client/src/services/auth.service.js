import axios from 'axios'
const SERVER_URL = "http://localhost:4000/api";

export const login = async (data) => {
    try {
        const res = await axios.post(`${SERVER_URL}/login`, { ...data }, { withCredentials: true })
        return res;
    }
    catch (err) {
        return err;
    }
}
export const register = async (data) => {
    try {
        const res = await axios.post(`${SERVER_URL}/register`, { ...data }, { withCredentials: true })
        return res;
    }
    catch (err) {
        return err
    }
}

export const getUserInfo = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/user`, { withCredentials: true })
        return res;
    }
    catch (err) {
        return err
    }
}