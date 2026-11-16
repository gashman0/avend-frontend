import api from "../../api/axios";
import routes from "../routes";

export const me = async () => {
    try{
        const response = await api.get(routes.dashboard.me);

        return response.data;
    }catch (error){
        throw error;
    }
}

export const dashboard = async () => {
    try{
        const response = await api.get(routes.dashboard.dashboard);

        return response.data;
    }catch(error){
        throw error;
    }
}

export const wallet = async () => {
    try{
        const response = await api.get(routes.dashboard.wallet);

        return response.data;
    }catch(error){
        throw error;
    }
}

export const investmentPlans = async () => {
    try {
        const response = await api.get(routes.dashboard.investmenstPlans);

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const userInvestments = async () => {
    try {
        const response = await api.get(routes.dashboard.userInvestments);

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const userTransactions = async () => {
    try {
        const response = await api.get(routes.dashboard.userTransactions);

        return response.data;
    } catch (error) {
        throw error;
    }
}