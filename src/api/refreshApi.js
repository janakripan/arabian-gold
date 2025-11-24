import api from "./HttpRequest";


export const requestNewAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const res = await api.post("/auth/refresh-token", { refreshToken });
  return res.data; // expected { accessToken, refreshToken(optional) }
};
