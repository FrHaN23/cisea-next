import { Auther, baseUrl, fetcher, fetcherToken, Pagination } from "@/const/const"
import useSWR, { mutate } from "swr"


export function getPenerimaanById(id: string){
    const { data, error, isLoading} = useSWR(
        [baseUrl + `/penerimaan/${id}`],
        ([url]) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}

export function getPenerimaans(paginate: Pagination){
    const queryParams = new URLSearchParams({
        name: "",
    })

    const { data, error, isLoading} = useSWR(
        baseUrl + `/penerimaan?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams,
        (url) => fetcherToken(url))
    const total = data ? data.count : 0
    return {
        data: data?.data,
        error,
        isLoading,
        total
    }
}

export async function createPenerimaan(body: any){
    const auth = await Auther()

    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/penerimaan`,
        {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            }
        }
    )
    if(res.ok){
        mutate(baseUrl + `/penerimaan?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}

export async function updatePenerimaan(body: any){
    const auth = await Auther()
    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: "",
    })
    const res = await fetch(baseUrl + `/penerimaan/${body.id}`,
        {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            }
        }
    )
    if(res.ok){
        mutate(baseUrl + `/penerimaan?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}