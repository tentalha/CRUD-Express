import { axiosInstance } from "./axiosConfig";

export const getAllUsers = async () => {
    return await axiosInstance.get('/users');
}

export const postUser = async (payload) => {
    return await axiosInstance.post('/users', payload);
}

export const editUser = async (payload) => {
    const { _id, ...rest } = payload;
    // const data = { name, age, interest }
    return await axiosInstance.patch(`/users/${_id}`, rest);
}

export const deleteUser = async (id) => {
    return await axiosInstance.delete(`/users/${id}`);
}

export const register_employee = async (payload) => {
    console.log(payload);
    return await axiosInstance.post(`/signup`, payload);
}

export const login_employee = async (payload) => {
    console.log(payload);
    return await axiosInstance.post(`/signin`, payload);
}


