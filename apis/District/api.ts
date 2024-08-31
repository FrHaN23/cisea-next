/* eslint-disable react-hooks/rules-of-hooks */
import { Auther, baseUrl, fetcher, fetcherToken, Pagination } from "@/const/const"
import useSWR, { mutate } from "swr"


export function getDistrictById(layanan_id: string, isChildren: boolean,){
    if(isChildren){
        return {
            data: null,
            error: false,
            isLoading: false,
        }
    }
    const { data, error, isLoading} = useSWR(
        [baseUrl + `/district/${layanan_id}`],
        ([url]) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}

export async function deleteDistrictById(id: string){
    const auth = await Auther()
    
    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/district/${id}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            }
        }
    )
    if(res.ok){
        mutate(baseUrl + `/district?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}

export async function createDistrict(body: any){
    const auth = await Auther()

    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/district`,
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
        mutate(baseUrl + `/district?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}

export async function createDistrictChild(body: any){
    const auth = await Auther()

    const pagination: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/district`,
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
        mutate(baseUrl + `/district/${body.parent_id}/details?offset=${pagination.page}&limit=${pagination.pageSize}&`+ queryParams)
    }
    return res
}

export async function updateDistrict(body: any){
    const auth = await Auther()
    
    const res = await fetch(baseUrl + `/district`,
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
        mutate([baseUrl + `/district/${body.id}`])
    }
    return res
}

export function getDistricts(paginate: Pagination){
    const queryParams = new URLSearchParams({
        name: "",
    })

    const { data, error, isLoading} = useSWR(
        baseUrl + `/district?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams,
        (url) => fetcherToken(url))
    const total = data ? data.count : 0
    return {
        data: data?.data,
        error,
        isLoading,
        total
    }
}

export function getDistrticWithChild(id:string, paginate: Pagination){
    const queryParams = new URLSearchParams({
        name: "",
    })
    const { data, error, isLoading} = useSWR(
        baseUrl + `/district/${id}/details?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams,
        (url) => fetcherToken(url))
    const total = data ? data.count : 0
    return {
        data: data?.data,
        error,
        isLoading,
        total
    }
}


export function getDistrictList(){
    const { data, error, isLoading} = useSWR(
        baseUrl + `/district/list`,
        (url) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}