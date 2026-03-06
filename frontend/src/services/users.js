import { apiUsers } from "./api";

export const getUsers = () => apiUsers.get(`/`);
export const getUser = (id) => apiUsers.get(`/user/${id}`);
export const createUser = (user) => apiUsers.post(`/register`, user);
export const updateUser = (id, user) => apiUsers.put(`/user/${id}`, user);
export const deleteUser = (id) => apiUsers.delete(`/user/${id}`);
export const getUsersByOnline = (status) => apiUsers.get(`/online/${status}`);
export const getUsersByCountry = (country) => apiUsers.get(`/country/${country}`);