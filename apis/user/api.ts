import { Auther, baseUrl, fetcher, fetcherToken, Pagination } from "@/const/const"
import useSWR, { mutate } from "swr"

export async function changePassword(body:any){
    const auth = await Auther()
    const res = await fetch(baseUrl + `/user/change`,
        {
            method: "POST",
            body: body,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            }
        }
    )
    return res
}

export function getUsers(paginate: Pagination){
    const queryParams = new URLSearchParams({
        name: "",
    })

    const { data, error, isLoading} = useSWR(
        baseUrl + `/user?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams,
        (url) => fetcherToken(url))
    const total = data ? data.count : 0
    return {
        data: data?.data,
        error,
        isLoading,
        total
    }
}

export async function createUser(body: any){
    const auth = await Auther()

    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/user`,
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
        mutate(baseUrl + `/user?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}

export async function updateUser(body: any){
    const auth = await Auther()
    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: "",
    })
    const res = await fetch(baseUrl + `/user/${body.id}`,
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
        mutate(baseUrl + `/user?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}

export function getUserById(id: string){
    const { data, error, isLoading} = useSWR(
        [baseUrl + `/user/${id}`],
        ([url]) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}