'use client'
import { Grid, Button, TextField } from "@mui/material"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import FormMasterDistrict from "./components/formPenerimaan"
import DataTables from "./components/Datatables";
import PageContainer from "../components/container/PageContainer";
import ModalLayout from "../components/shared/Modal";
import FormPenerimaan from "./components/formPenerimaan";

export default function CataloguePage(){
    const [Search, setSearch] = useState("")
    const [AddModal, setAddModal] = useState(false)    
    return (
        <>
        <PageContainer title="User" description="User" >
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                >
                <Button variant="contained" startIcon={<AddIcon />} onClick={()=>setAddModal(true)} >
                    Add
                </Button>
                <TextField sx={{margin:"10px"}} label="Search" onChange={(e)=>setSearch(e.currentTarget.value)}/>
            </Grid>
            <div className="container w-screen">
                <DataTables search={Search}/>
            </div>
        </PageContainer>
        <ModalLayout header='Add New User' isOpen={AddModal} onClose={()=>setAddModal(false)}>
            <FormPenerimaan onClose={()=>setAddModal(false)} />
        </ModalLayout>
        </>
    )
}