/* eslint-disable react-hooks/rules-of-hooks */
import { baseUrl, fetcherToken } from "@/const/const"
import useSWR from "swr"

export function getTicketStatus(token?: string){
    const { data, error, isLoading} = useSWR(
        [baseUrl + `/stats/ticket/status`],
        ([url]) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}