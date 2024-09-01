'use client'
import { createDistrict, getDistrictById, getDistrictList, updateDistrict } from "@/apis/District/api";
import { createUser, getUserById, updateUser } from "@/apis/user/api";
import BackdropLoading from "@/app/(Dashboard)/components/loading/BackdropLoadng";
import Snackbar from "@/app/(Dashboard)/utilities/Snackbar/Snakbar";
import {Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    id?: string
    onClose: Function
    isChildren?: boolean
}

export default function FormUser({id, onClose, isChildren}:Props){
    const [IsLoding, setIsLoding] = useState(false)
    const [role, setRole] = useState(0)
    const [district, setDistrict] = useState(0)
    const [username, setUsername] = useState<number>()
    const handleChangeRole = (event: any) => {
        setRole(event.target.value as number);
    };
    const handleChangeDistrict = (event: any) => {
        setDistrict(event.target.value as number);
    };
    const handleUsername = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target
        if (!isNaN(Number(value)) && value.length < 11) {
            setUsername(Number(value));
        }
    };

    const {data, error, isLoading} = getUserById(id as string)
    const districtList = getDistrictList()

    useEffect(() => {
        if(data && !isLoading){
            district === 0 && setDistrict(data.district_id)
            role === 0 && setRole(data.role)
        }
    }, [data, isLoading])
    
    const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoding(true)
        let body:any = {}
        const data = new FormData(event.currentTarget)
        data.forEach((value,key)=>body[key]=value)
        body["district_id"] = district
        body["role"] = role
        if(id){
            body['id'] = id
            const res = await updateUser(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("User Updated", res.ok)
            }
        }else{
            const res = await createUser(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("User Created", res.ok)
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
                    defaultValue={data && data.username}
                    onChange={(e)=>handleUsername(e)}
                    value={username}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    type='text'
                    label="Username"
                    name="username"
                    autoFocus
                />

                <TextField
                    defaultValue={data && data.password}
                    margin="normal"
                    fullWidth
                    id="password"
                    type='password'
                    label="Password"
                    name="password"
                />
                <TextField
                    defaultValue={data && data.nama}
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    type='text'
                    label="Name"
                    name="nama"
                    autoFocus
                />
                <FormControl fullWidth required margin="normal">
                    <InputLabel id="role-type-label">Role</InputLabel>
                    <Select
                        labelId="role-type-label"
                        id="use-select"
                        defaultValue={data && data.role}
                        onChange={(e)=>handleChangeRole(e)}
                        label="Role"
                    >
                        <MenuItem value="1">Admin</MenuItem>
                        <MenuItem value="2">User</MenuItem>
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="role-type-label">District</InputLabel>
                    <Select
                        labelId="role-type-label"
                        id="use-select"
                        defaultValue={data && data.district_id}
                        onChange={(e)=>handleChangeDistrict(e)}
                        label="District"
                    >
                        {
                            districtList.data && 
                            !districtList.isLoading && 
                            districtList.data.map((v:any)=>{
                                return (
                                    <MenuItem value={v.id}>{v.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                    </FormControl>
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