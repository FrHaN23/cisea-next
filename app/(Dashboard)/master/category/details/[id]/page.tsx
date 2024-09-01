'use client'
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard"
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer"
import FormMasterCatalogue from "../../components/formCatagory"
import DetailsDataTables from "./components/detailsDatatablesListResponse"

export default function detailsFormMaster({params}: {params: {id: string}}){

    return (
        <>
        <PageContainer title={'Details Category'} description="details catalogue">
            <DashboardCard headtitle={"Category Details"} title="Catalogue Details"> 
                <FormMasterCatalogue onClose={()=>undefined} id={params.id} />
            </DashboardCard>
            <DashboardCard title="Child of Category">
                <DetailsDataTables id={params.id}/>
            </DashboardCard>
        </PageContainer>
        </>
    )
}