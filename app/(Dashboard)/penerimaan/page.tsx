'use client'
import { Grid, Button, TextField, IconButton } from "@mui/material"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import DataTables from "./components/Datatables";
import PageContainer from "../components/container/PageContainer";
import ModalLayout from "../components/shared/Modal";
import FormPenerimaan from "./components/formPenerimaan";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { exportPenerimaan } from "@/apis/penerimaan/api";

export default function CataloguePage(){
    const [Search, setSearch] = useState("")
    const [AddModal, setAddModal] = useState(false)    
    return (
        <>
        <PageContainer title="Penerimaan" description="User" >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                >
                <Grid item>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={()=>setAddModal(true)} >
                        Add
                    </Button>
                    <Button variant="contained" startIcon={<ExitToAppIcon />} sx={{marginX: '10px'}} onClick={exportPenerimaan} >
                        Export
                    </Button>
                </Grid>
                <TextField sx={{margin:"10px"}} label="Search" onChange={(e)=>setSearch(e.currentTarget.value)}/>
            </Grid>
            <div className="container w-screen">
                <DataTables search={Search}/>
            </div>
        </PageContainer>
        <ModalLayout header='Add Penerimaan' isOpen={AddModal} onClose={()=>setAddModal(false)}>
            <FormPenerimaan onClose={()=>setAddModal(false)} />
        </ModalLayout>
        </>
    )
}