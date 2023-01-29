import * as api from '../api';

export const getUserData = async (access_token) => {
    try {
        const { data } = await api.getUserData(access_token);
        return data;
    } catch (error) {
        console.log(error);
    }
}