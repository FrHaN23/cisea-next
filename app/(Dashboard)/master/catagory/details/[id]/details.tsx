import { getCatalogueById } from "@/apis/Catagory/api"
import { LinearProgress } from "@mui/material"
import DetailsTextResponse from "./components/detailsTextResponse"
import DetailsFormResponse from "./components/detailsFormResponse"
import DetailsDataTables from "./components/detailsDatatablesListResponse"

export default function Details({id}:any){
    const {data, error, isLoading} = getCatalogueById(id as string, false)

    if(!data && isLoading){
        return <LinearProgress />
    }

    if(data && data.type == 'text'){
        return <DetailsTextResponse id={id}/>
    }

    if(data && data.type == 'form'){
        return <DetailsFormResponse id={id} />
    }

    if(data && data.type == 'list'){
        return <DetailsDataTables  id={id}/>
    }

    return <div className="text-center mx-auto">NO TYPE WERE FOUND</div>
}