import { getSession } from "next-auth/react"

export const noData: readonly any[] =  []
export const baseUrl = process.env.NEXT_PUBLIC_API_URL as string

export const fetcher = async (url:string) => await fetch(url).then(r => r.json())

export const fetcherToken = async (url:string) => {
    const authHeader = await Auther()
    return await fetch(url, {headers: {'Authorization' : authHeader}}).then(r => r.json())
}

export const Auther = async () => {
    const session = await getSession()
    if (!session){
        return ""
    }
    return ('Bearer '+ session?.accessToken)
    
}

export type Pagination = {
    pageSize: number,
    page: number
}
