import { useNavigate } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { signupPayload, loginPayload } from "./types";
import { signup, login, logout } from ".";
import { AxiosError } from "axios";
import queryKeys from "../query-keys";

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation<
    unknown,
    AxiosError<{message: string}>,
    signupPayload
  >({
    mutationFn: (payload: signupPayload) => signup(payload),
    onSuccess: () => {
        console.log("Signup was successful");
        navigate('/login');
    },
    onError: () => {
        console.log("There was error");
    },
  });
};

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<
        unknown,
        AxiosError<{message: string}>,
        loginPayload
    >({
        mutationFn: (payload: loginPayload) => login(payload),
        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: [queryKeys.users.getMe],
            });

            navigate('/dashboard');
        },
    });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<{ message: string }>,
    void
  >({
    mutationFn: () => logout(),

    onSuccess: () => {
      queryClient.setQueryData(
        [queryKeys.users.getMe],
        null
      );

      navigate("/");
    },
  });
};
