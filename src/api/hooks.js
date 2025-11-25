import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getScheme,
  getUsers,
  postScheme,
  setActiveStatus,
  userLogin,
  userLogout,
} from "./services";

//////// auth hooks //////

export const useUserLogin = () =>
  useMutation({
    mutationKey: ["userLogin"],
    mutationFn: userLogin,
  });

export const useUserLogout = () =>
  useMutation({
    mutationFn: userLogout,
    mutationKey: ["userLogout"],
  });

/////// scheme hooks ////////

//get scheme
export const useGetScheme = () =>
  useQuery({
    queryKey: ["getScheme"],
    queryFn: getScheme,
  });

//post scheme

export const usePostScheme = () =>
  useMutation({
    mutationFn: postScheme,
    mutationKey: ["postScheme"],
  });

/////// user mamagement hooks ////////

///get users hook ///
export const useGetUsers = ({ pageNo, pageSize, token, filters }) =>
  useQuery({
    queryKey: ["getUsers", pageNo, pageSize, JSON.stringify(filters)],
    queryFn: () => getUsers({ pageNo, pageSize, filters }),
    enabled: !!token,
    keepPreviousData: true,
  });

///set user status hook ///

export const useSetActiveStatus = () =>
  useMutation({
    mutationFn: setActiveStatus,
    mutationKey: ["setActiveStatus"],
  });
