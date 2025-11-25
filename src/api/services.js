import {
  EDIT_SCHEME,
  GET_SCHEME,
  GET_USERS,
  POST_SCHEME,
  SET_ACTIVE,
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

// get user details

export const getUsers = async ({ pageNo, pageSize, filters }) => {
  
  const cleanedFilters = {};

  if (filters.IsActive !== null  )
    cleanedFilters.IsActive = filters.IsActive;

  if (filters.KYCStatus) cleanedFilters.KYCStatus = filters.KYCStatus;

  if (filters.UserName) cleanedFilters.UserName = filters.UserName;

  if (filters.MobileNo) cleanedFilters.MobileNo = filters.MobileNo;

  if (filters.JoinedFrom) cleanedFilters.JoinedFrom = filters.JoinedFrom;

  if (filters.JoinedTo) cleanedFilters.JoinedTo = filters.JoinedTo;

  // ⬅️ Now cleanedFilters contains ONLY selected ones
console.log(JSON.stringify(cleanedFilters));

  const res = await api.get(GET_USERS, {
    params: {
      pageNo,
      pageSize,
      ...(Object.keys(cleanedFilters).length > 0 && {
        filtersJson: JSON.stringify(cleanedFilters),
      }),
    },
  });

  return res.data;
};

/// set user status



export const setActiveStatus = (data) =>
  api.post(SET_ACTIVE,data).then((res) => res.data);