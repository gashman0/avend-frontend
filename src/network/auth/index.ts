import api from "../../api/axios";
import routes from "../routes";
import type{ loginPayload, signupPayload } from "./types";

export const signup = async (payload: signupPayload) => {
    const response = await api.post(
        routes.auth.signup, payload
    );

    return response?.data;
}

export const login = async (payload: loginPayload) => {
    const response = await api.post(
        routes.auth.login, payload
    );

    return response?.data;
}

export const logout = async () => {
    const reponse = await api.post(
        routes.auth.logout
    );

    return reponse?.data;
}