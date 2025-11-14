import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/characters");
  return res.data;
};
