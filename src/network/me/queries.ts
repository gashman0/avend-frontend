import { useQuery, useMutation } from "@tanstack/react-query";
import { me } from ".";
import { dashboard } from ".";
import queryKeys from "../query-keys";
import type{ MeResponse, DashboardSummaryResponse } from "./types";

export const useMe = () => {
    return useQuery<MeResponse>({
        queryKey: [queryKeys.users.getMe],
        queryFn: me,
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}

export const useDashboard = () => {
    return useQuery<DashboardSummaryResponse>({
        queryKey: [queryKeys.users.getDashboard],
        queryFn: dashboard,
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}