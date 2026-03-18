import { apiUsers } from "./api";

export const loginUser = async (credentials) => { // nueva función para el authContext
    const { data } = await apiUsers.post('/login', credentials);
    return data;
};

export const getUsers = () => apiUsers.get('/usuarios').then(res => res.data);
export const getUser = (id) => apiUsers.get(`/usuarios/${id}`).then(res => res.data);

export const createUser = (user) => apiUsers.post(`/usuarios`, user).then(res => res.data);

export const updateUser = (id, user) => apiUsers.put(`/usuarios/${id}`, user).then(res => res.data);
export const deleteUser = (id) => apiUsers.delete(`/usuarios/${id}`).then(res => res.data);

export const getUsersByOnline = (status) => apiUsers.get(`/online/${status}`).then(res => res.data);
export const getUsersByCountry = (country) => apiUsers.get(`/country/${country}`).then(res => res.data);

// export const getUsers = async () => {       // ----------------- Recordar comentar para usar API después

//   const users = [
//     {
//       id: 1,
//       name: "Carlos",
//       email: "carlos@admin.com",
//       age: 33,
//       role: "admin"
//     },
//     {
//       id: 2,
//       name: "Orlando",
//       email: "lando@test.com",
//       age: 31,
//       role: ""
//     },
//     {
//       id: 3,
//       name: "Carlos Papá",
//       email: "papa@test.com",
//       age: 57,
//       role: ""
//     },
//   ]

//   return {
//     data: users
//   }
// }