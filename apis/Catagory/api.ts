/* eslint-disable react-hooks/rules-of-hooks */
import { Auther, baseUrl, fetcher, fetcherToken, Pagination } from "@/const/const"
import useSWR, { mutate } from "swr"


export function getCategoryById(layanan_id: string, isChildren: boolean,token?: string){
    if(isChildren){
        return {
            data: null,
            error: false,
            isLoading: false,
        }
    }
    const { data, error, isLoading} = useSWR(
        [baseUrl + `/category/${layanan_id}`],
        ([url]) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}

export async function deleteCategoryById(layanan_id: string, token?: string){
    const auth = await Auther()
    
    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/category/${layanan_id}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': auth,
            }
        }
    )
    if(res.ok){
        mutate(baseUrl + `/category?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}

export async function createCategory(body: any, token?: string){
    const auth = await Auther()

    const paginate: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/category`,
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
        mutate(baseUrl + `/category?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams)
    }
    return res
}

export async function createCategoryChild(body: any, token?: string){
    const auth = await Auther()

    const pagination: Pagination = {
        page: 0,
        pageSize: 25
    }
    const queryParams = new URLSearchParams({
        name: ''
    })
    const res = await fetch(baseUrl + `/category`,
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
        mutate(baseUrl + `/category/${body.parent_id}/details?offset=${pagination.page}&limit=${pagination.pageSize}&`+ queryParams)
    }
    return res
}

export async function updateCategory(body: any, token?: string){
    const auth = await Auther()
    
    const res = await fetch(baseUrl + `/category`,
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
        mutate([baseUrl + `/category/${body.id}`])
    }
    return res
}

export function getCategories(paginate: Pagination, token?: string){
    const queryParams = new URLSearchParams({
        name: "",
    })

    const { data, error, isLoading} = useSWR(
        baseUrl + `/category?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams,
        (url) => fetcherToken(url))
    const total = data ? data.count : 0
    return {
        data: data?.data,
        error,
        isLoading,
        total
    }
}

export function getCatagoryWithChild(id:string, paginate: Pagination, token?: string){
    const queryParams = new URLSearchParams({
        name: "",
    })
    const { data, error, isLoading} = useSWR(
        baseUrl + `/category/${id}/details?offeset=${paginate.page}&limit=${paginate.pageSize}&`+ queryParams,
        (url) => fetcherToken(url))
    const total = data ? data.count : 0
    return {
        data: data?.data,
        error,
        isLoading,
        total
    }
}


export function getCategoryList(token?: string){
    const { data, error, isLoading} = useSWR(
        baseUrl + `/category/list`,
        (url) => fetcherToken(url))
    return {
        data: data?.data,
        error,
        isLoading,
    }
}