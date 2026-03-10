import { apiUsers } from "./api";

export const getUsers = () => apiUsers.get('/');
export const getUser = (id) => apiUsers.get(`/user/${id}`);
export const createUser = (user) => apiUsers.post(`/user`, user);
export const updateUser = (id, user) => apiUsers.put(`/user/${id}`, user);
export const deleteUser = (id) => apiUsers.delete(`/user/${id}`);
export const getUsersByOnline = (status) => apiUsers.get(`/online/${status}`);
export const getUsersByCountry = (country) => apiUsers.get(`/country/${country}`);

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