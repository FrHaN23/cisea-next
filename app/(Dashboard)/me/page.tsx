'use client'
import { useSession } from "next-auth/react"
import { useState } from "react"
import PageContainer from "../components/container/PageContainer"
import FormChangePassword from "./components/formChangePassword"
import { Paper } from "@mui/material"
import BackdropLoading from "../components/loading/BackdropLoadng"

export default function MePage({}:any){
    const [openLoading, setOpenLoading] = useState(false)
    return (
        <>
            <PageContainer title="Profile">
            <Paper>
                <FormChangePassword setOpenLoading={setOpenLoading}/>
            </Paper>
            </PageContainer>
            <BackdropLoading isLoading={openLoading}/>
        </>
    )
}