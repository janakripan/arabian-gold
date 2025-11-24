import {
  EDIT_SCHEME,
  GET_SCHEME,
  GET_USERS,
  POST_SCHEME,
  USER_LOGIN,
  USER_LOGOUT,
} from "./endPoints";
import api from "./HttpRequest";

/////// auth services ////////

export const userLogin = (credentials) =>
  api
    .post(USER_LOGIN, {
      email: credentials.username,
      password: credentials.password,
    })
    .then((res) => res.data);

export const userLogout = async () => {
  const res = await api.post(USER_LOGOUT);
  return res.data;
};

////////// scheme services ////////

//get schemes

export const getScheme = async () => {
  const res = await api.get(GET_SCHEME);
  return res.data;
};

//// post scheme
export const postScheme = (data) =>
  api.post(POST_SCHEME, data ).then((res) => res.data);

//// edit scheme
export const editScheme = (data) =>
  api.put(EDIT_SCHEME,  data ).then((res) => res.data);



///////// USER SERVICES /////////////

// GER USER DETAILS 

export const getUsers =async ({pageNo, pageSize}) =>{
  const res = await api.get(GET_USERS,{
    params:{
      pageNo,
      pageSize,
    }
  });
  return res.data;
}