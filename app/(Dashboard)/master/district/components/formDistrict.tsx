'use client'
import { createCategory, createCategoryChild, updateCategory } from "@/apis/Catagory/api";
import { getDistrictById } from "@/apis/District/api";
import BackdropLoading from "@/app/(Dashboard)/components/loading/BackdropLoadng";
import Snackbar from "@/app/(Dashboard)/utilities/Snackbar/Snakbar";
import {Box, Button, FormControl, InputAdornment, InputLabel, LinearProgress, OutlinedInput, Stack, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
    id?: string
    onClose: Function
    isChildren?: boolean
}

type Alokasi = {
    kota: number
    provinsi: number
    pusat: number
}

export default function FormMasterDistrict({id, onClose, isChildren}:Props){
    const [IsLoding, setIsLoding] = useState(false)
    const [alokasi, setAlokasi] = useState<Alokasi>({
        kota: 0,
        provinsi: 0,
        pusat: 0,
    })
    const handleAlokasi = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numberValue = parseFloat(value) || 0;

        if(value.length > 3 && numberValue < 0 || numberValue > 100){
            return
        }
        
        setAlokasi(prevState => ({
            ...prevState,
            [name]: numberValue,
        }));
    };

    const {data, error, isLoading} = getDistrictById(id as string, isChildren as boolean)
    
    const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoding(true)
        let body:any = {}
        const data = new FormData(event.currentTarget)
        data.forEach((value,key)=>body[key]=value)
        body['alokasi'] = alokasi
        if(isChildren){
            body['parent_id'] = id
            const res = await createCategoryChild(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("Children Updated", res.ok)
            }
        }
        if(id){
            body['id'] = id
            const res = await updateCategory(body)
            if (res.ok){
                setIsLoding(false)
                return Snackbar("Catagory Updated", res.ok)
            }
        }else{
            const res = await createCategory(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("Catagory Created", res.ok)
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
                    defaultValue={data && data.nama}
                    margin="normal"
                    required
                    fullWidth
                    id="Catagory name"
                    type='text'
                    label="Catagory Name"
                    name="name"
                    autoFocus
                />
                <Stack direction='row' flex={1} gap={2}>
                    <FormControl fullWidth 
                        variant="outlined" 
                        margin="normal">
                        <InputLabel>
                            Alokasi Kota/Kab
                        </InputLabel>
                        <OutlinedInput
                            type={'text'}
                            defaultValue={data && data.provinsi}
                            value={alokasi.kota}
                            onChange={(e)=>handleAlokasi(e)}
                            required
                            fullWidth
                            label="Alokasi Kota/Kab"
                            name="kota"
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth 
                        variant="outlined" 
                        margin="normal">
                        <InputLabel>
                            Alokasi Provinsi
                        </InputLabel>
                        <OutlinedInput
                            defaultValue={data && data.provinsi}
                            value={alokasi.provinsi}
                            onChange={(e)=>handleAlokasi(e)}
                            required
                            id="Prov"
                            type="text"
                            label="Alokasi Provinsi"
                            name="provinsi"
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth 
                        variant="outlined" 
                        margin="normal">
                        <InputLabel>
                            Alokasi Pusat
                        </InputLabel>
                        <OutlinedInput
                            defaultValue={data && data.pusat}
                            value={alokasi.pusat}
                            onChange={(e)=>handleAlokasi(e)}
                            required
                            id="Pusat"
                            type="text"
                            label="Alokasi Pusat"
                            name="pusat"
                            endAdornment={
                                <InputAdornment position="end">
                                    %
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Stack>
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