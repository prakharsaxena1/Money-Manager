import axios from 'axios'
const SERVER_URL = "http://localhost:4000/api";

export const getUserTransactions = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/transaction`, { withCredentials: true });
        return res;
    }
    catch (err) {
        return err;
    }
};

export const getUserTransactionsQuery = async (data) => {
    try {
        const res = await axios.get(`${SERVER_URL}/transaction?category=${data.category}&startDate=${data.startDate}&endDate=${data.endDate}`, { withCredentials: true });
        return res;
    }
    catch (err) {
        return err;
    }
};

export const getFriendsOwes = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/transaction/friends`, { withCredentials: true });
        return res;
    }
    catch (err) {
        return err;
    }
};

export const addTransaction = async (data) => {
    try {
        const res = await axios.post(`${SERVER_URL}/transaction`, { ...data }, { withCredentials: true });
        return res;
    }
    catch (err) {
        return err;
    }
};

export const updateTransaction = async (id, data) => {
    try {
        const res = await axios.patch(`${SERVER_URL}/transaction/${id}`, { ...data }, { withCredentials: true });
        return res;
    }
    catch (err) {
        return err;
    }
};

export const deleteTransaction = async (id) => {
    try {
        const res = await axios.delete(`${SERVER_URL}/transaction/${id}`, { withCredentials: true });
        return res;
    }
    catch (err) {
        return err;
    }
};

export const updateBudgetInfo = async (data) => {
    try {
        const res = await axios.patch(`${SERVER_URL}/user/budget`, { ...data }, { withCredentials: true });
        return res;
    }
    catch (err) {
        return err;
    }
};