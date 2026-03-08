// import { apiUsers } from "./api";        ----------------- Recordar cambiar para usar API después

// export const getUsers = () => apiUsers.get('/');        ----------------- Recordar cambiar para usar API después
export const getUser = (id) => apiUsers.get(`/user/${id}`);
export const createUser = (user) => apiUsers.post(`/register`, user);
export const updateUser = (id, user) => apiUsers.put(`/user/${id}`, user);
export const deleteUser = (id) => apiUsers.delete(`/user/${id}`);
export const getUsersByOnline = (status) => apiUsers.get(`/online/${status}`);
export const getUsersByCountry = (country) => apiUsers.get(`/country/${country}`);

export const getUsers = async () => {       // ----------------- Recordar comentar para usar API después

  const users = [
    {
      id: 1,
      name: "Carlos",
      email: "carlos@test1.com"
    },
    {
      id: 2,
      name: "Orlando",
      email: "lando@test1.com"
    },
  ]

  return {
    data: users
  }
}