/* eslint-disable react-hooks/rules-of-hooks */
import { baseUrl, fetcherToken } from "@/const/const"
import useSWR from "swr"

export function getPenerimaanStat(year: number){
    const queryParams = new URLSearchParams({
        year: year.toString(),
    })
    const { data, error, isLoading} = useSWR(
        baseUrl + `/penerimaan/stats?`+ queryParams,
        (url) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}