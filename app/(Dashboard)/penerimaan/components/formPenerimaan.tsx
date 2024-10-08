'use client'
import { getCategoryList, getCategoryListSub } from "@/apis/Catagory/api";
import { getDistrictList } from "@/apis/District/api";
import { createPenerimaan, getPenerimaanById, updatePenerimaan } from "@/apis/penerimaan/api";
import BackdropLoading from "@/app/(Dashboard)/components/loading/BackdropLoadng";
import Snackbar from "@/app/(Dashboard)/utilities/Snackbar/Snakbar";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Box, Button, FilledTextFieldProps, FormControl, InputLabel, LinearProgress, MenuItem, OutlinedTextFieldProps, Select, Stack, StandardTextFieldProps, TextField, TextFieldVariants } from "@mui/material";
import { Dayjs } from "dayjs";
import { useSession } from "next-auth/react";
import { forwardRef, JSX, SetStateAction, useEffect, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

type Props = {
    id?: string
    onClose: Function
    isChildren?: boolean
}

interface CustomFormatProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = forwardRef<NumericFormatProps, CustomFormatProps>(
    function NumericFormatCustom(props, ref) {
      const { onChange, ...other } = props;
  
      return (
        <NumericFormat
          {...other}
          
          getInputRef={ref}
          onValueChange={(values) => {
            onChange({
              target: {
                name: props.name,
                value: values.value,
              },
            })
          }}
          decimalSeparator={","}
          thousandSeparator={"."}
          valueIsNumericString
          prefix="Rp "
        />
      )
    },
)

export default function FormPenerimaan({id, onClose}:Props){
    const {data:session} = useSession()
    const [IsLoding, setIsLoding] = useState(false)
    const [value, setValue] = useState("")
    const [district, setDistrict] = useState(0)
    const [ct_parent, setCt_parent] = useState(0)
    const [category_id, setCategory_id] = useState(0)
    const [date, setDate] = useState<Dayjs | null>(null)

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setValue(e.target.value)
    }
    const handleChangeDistrict = (event: any) => {
        setDistrict(event.target.value as number);
    }
    const handleChangeCategoryParent = (event: any) => {
        setCt_parent(event.target.value as number);
    }
    const handleChangeCategoryValue = (event: any) => {
        setCategory_id(event.target.value as number);
    }
    const {data, error, isLoading} = getPenerimaanById(id as string)
    const districtList = getDistrictList()

    const category = getCategoryList()
    const categorySub = getCategoryListSub(ct_parent)

    useEffect(() => {
        if(data && !isLoading){
            !value && setValue(data.value)
            district === 0 && setDistrict(data.district_id)
            ct_parent === 0 && setCt_parent(data.category.parent_id)
            category_id === 0 && setCategory_id(data.category.id)
        }
    }, [data, isLoading])
    
    const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoding(true)
        let body:any = {}
        const data = new FormData(event.currentTarget)
        data.forEach((value,key)=>body[key]=value)
        body['user_id'] = session?.user.id
        if(session?.user.role === 1){
            body['district_id'] = district
        }else{
            body['district_id'] = session?.user.district_id
        }
        body['category_id'] = category_id
        const sanitized = parseInt(value.replace(/[^\d]/g, ''), 10);
        body['value'] = sanitized
        body['date'] = date?.toISOString()
        if(id){
            body['id'] = id
            const res = await updatePenerimaan(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("Penerimaan Updated", res.ok)
            }
        }else{
            const res = await createPenerimaan(body)
            if (res.ok){
                onClose()
                setIsLoding(false)
                return Snackbar("Penerimaan Created", res.ok)
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
                <Stack direction={'row'} >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            sx={{
                                marginTop: '15px',
                                marginRight: '8px'
                            }}
                            value={date}
                            label={'Date'} 
                            views={['month', 'year']}
                            onChange={(newValue: SetStateAction<Dayjs | null>) => {
                                if(!newValue) return
                                setDate(newValue)
                            }}
                            />
                    </LocalizationProvider>
                    {
                        session?.user.role === 1 &&
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
                                            <MenuItem id={v.id} value={v.id}>{v.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    }
                </Stack>
                <TextField
                    defaultValue={data && data.value}
                    onChange={handleChangeValue}
                    value={value}
                    margin="normal"
                    required
                    fullWidth
                    id="value"
                    type='text'
                    label="Value"
                    name="value"
                    InputProps={{
                        inputComponent: NumericFormatCustom as any,
                    }}
                />
                <Stack >
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="role-type-label">Category</InputLabel>
                        <Select
                            labelId="role-type-label"
                            id="use-select"
                            defaultValue={data && data.category.parent_id}
                            onChange={(e)=>handleChangeCategoryParent(e)}
                            label="Category"
                        >
                            {
                                category.data && 
                                !category.isLoading && 
                                category.data.map((v:any)=>{
                                    return (
                                        <MenuItem id={v.id} value={v.id}>{v.name}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    {
                        ct_parent !== 0 && <FormControl fullWidth margin="normal">
                            <InputLabel id="role-type-label">Category value</InputLabel>
                            <Select
                                labelId="role-type-label"
                                id="use-select"
                                defaultValue={data && data.category.id}
                                onChange={(e)=>handleChangeCategoryValue(e)}
                                label="Category value"
                            >
                                {
                                    categorySub.data && 
                                    !categorySub.isLoading && 
                                    categorySub.data.map((v:any)=>{
                                        return (
                                            <MenuItem id={v.id} value={v.id}>{v.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    }
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