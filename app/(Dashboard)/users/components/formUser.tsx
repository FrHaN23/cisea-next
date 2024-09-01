'use client'
import { createDistrict, getDistrictById, updateDistrict } from "@/apis/District/api";
import BackdropLoading from "@/app/(Dashboard)/components/loading/BackdropLoadng";
import Snackbar from "@/app/(Dashboard)/utilities/Snackbar/Snakbar";
import {Box, Button, LinearProgress, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    id?: string
    onClose: Function
    isChildren?: boolean
}

export default function FormUser({id, onClose, isChildren}:Props){
    const [IsLoding, setIsLoding] = useState(false)

    const {data, error, isLoading} = getDistrictById(id as string, isChildren as boolean)
    
    const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoding(true)
        let body:any = {}
        const data = new FormData(event.currentTarget)
        data.forEach((value,key)=>body[key]=value)
        if(id){
            body['id'] = id
            const res = await updateDistrict(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("District Updated", res.ok)
            }
        }else{
            const res = await createDistrict(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("District Created", res.ok)
            }
        }
        setIsLoding(false)
        return Snackbar("something went wrong", false)
    }

    if (!data && isLoading){
        return (
            <>
                <LinearProgress sx={
                    {justifyContent:"center", textAlign:"center"}
                }/>
            </>
        )
    }

    return(
        <>
            <Box component={'form'} onSubmit={handlePost}>
                <TextField
                    defaultValue={data && data.name}
                    margin="normal"
                    required
                    fullWidth
                    id="Catagory name"
                    type='text'
                    label="Nama Wilayah"
                    name="name"
                    autoFocus
                />
                <Button
                    color="primary"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 1 }}
                >
                    {
                       id ? 'Update' : 'Submit'
                    }
                </Button>
            </Box>
            <BackdropLoading isLoading={IsLoding}/>
        </>
    )
}