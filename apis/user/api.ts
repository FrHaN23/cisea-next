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