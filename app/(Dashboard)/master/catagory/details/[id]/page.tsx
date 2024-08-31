'use client'
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard"
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer"
import FormMasterCatalogue from "../../components/formCatagory"
import Details from "./details"

export default function detailsFormMaster({params}: {params: {id: string}}){

    return (
        <>
        <PageContainer title={'Details Catalogue'} description="details catalogue">
            <DashboardCard headtitle={"Catalogue Details"} title="Catalogue Details"> 
                <FormMasterCatalogue onClose={()=>undefined} id={params.id} />
            </DashboardCard>
            <DashboardCard title="Response Details Catalogue">
                <Details id={params.id}/>
            </DashboardCard>
        </PageContainer>
        </>
    )
}