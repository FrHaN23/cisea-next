import { Box, Grid, IconButton, Paper, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded'
import { noData, Pagination } from '@/const/const';
import Link from 'next/link';
import BackdropLoading from '@/app/(Dashboard)/components/loading/BackdropLoadng';
import DialogLayout from '@/app/(Dashboard)/components/shared/Dialog';
import { deleteCategoryById, getCategories } from '@/apis/Catagory/api';
import Snackbar from '@/app/(Dashboard)/utilities/Snackbar/Snakbar';
import { getDistricts } from '@/apis/District/api';
import { Edit } from '@mui/icons-material';
import ModalLayout from '@/app/(Dashboard)/components/shared/Modal';
import FormMasterDistrict from './formUser';
import FormUser from './formUser';
import { getUsers } from '@/apis/user/api';


type Props = {
    search?: string,
}

export default function DataTables({search}:Props){
    const [Searchable, setSearchable] = useState("")
    
    const [paginationModel, setPaginationModel] = useState<Pagination>({
        pageSize: 25,
        page: 0,
    })

    
    useEffect(() => {
        const onSearch = (search: string) => {
            if (search.length > 3){
                setPaginationModel({
                    ...paginationModel,
                    page: 0
                })
                setSearchable(search)
            }
        }
        onSearch(search as string)
    }, [search])

    const {data, error, isLoading, total} = getUsers(paginationModel)
    return (
        <>
        <Paper sx={{marginTop:"10px", zIndex:1, flexWrap: "warp"}} >
            <Box sx={{height:700,width:'100%','& .header': {
            fontWeight: '700',
            fontSize: 16}, flex: 1, overflow:"scroll"}}>
                <DataGrid
                    disableColumnFilter
                    disableColumnSorting
                    disableColumnMenu
                    sx={{overflow:"scroll", flex: 1}}
                    showCellVerticalBorder
                    showColumnVerticalBorder
                    rows={error ? noData : data}
                    pagination
                    paginationMode='server'
                    loading={isLoading}
                    columns={columns}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    slotProps={{
                        loadingOverlay:{
                            variant: 'skeleton',
                            noRowsVariant: 'skeleton'
                        }
                    }}
                    rowCount={total}
                />
            </Box>
        </Paper>
        </>
    )
}

function ActionButton({id}:any){
    const [IsLoading, setIsLoading] = useState(false)
    const [DialogDelete, setDialogDelete] = useState(false)
    const [editModal, setEditModal] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        const res = await deleteCategoryById(id)
        if (res.ok){
            setDialogDelete(false)
            setIsLoading(false)
            return Snackbar("Data Deleted", res.ok)
        }
        setIsLoading(false)
        return Snackbar("deleted Failed", res.ok)
    }

    return (
        <>
        <Stack direction={"row"} justifyContent={"center"}>
            <Tooltip title="Delete">
                <IconButton onClick={()=>setDialogDelete(true)} sx={{marginTop:"5px"}}>
                    <DeleteIcon color='error'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Edit" >
                <IconButton sx={{marginTop:"5px"}} onClick={()=>setEditModal(true)} >
                    <Edit color='primary'/>
                </IconButton>
            </Tooltip>
        </Stack>
        <DialogLayout 
            title="DELETING DATA!"
            content='Are you sure to delete this data?' 
            onAccept={handleDelete} 
            onClose={()=>setDialogDelete(false)}
            open={DialogDelete}/>
        <BackdropLoading isLoading={IsLoading}/>
        <ModalLayout header='Edit User' isOpen={editModal} onClose={()=>setEditModal(false)}>
            <FormUser onClose={()=>setEditModal(false)} id={id}/>
        </ModalLayout>
        </>
    )
}


const columns: GridColDef[] = [
    {field: 'id', headerName: '', align:"center", sortable:false, headerAlign:"center", disableColumnMenu:true, width:170, headerClassName: "header",
    renderCell: ((params:any) => <ActionButton id={params.value} isFinished={params.row.is_finished}/>)},
    {field: 'username', headerName: 'Username', headerAlign:"left", width:400, headerClassName: "header"},
    {field: 'nama', headerName: 'Nama', headerAlign:"left", width:400, headerClassName: "header"},
    {field: 'role', headerName: 'Role', headerAlign:"left", width:200, headerClassName: "header",
        renderCell: ((params: any) => params.value === 1 ? "Admin" : "User")
    },
    {field: 'district', headerName: 'Wilayah', headerAlign:"left", width:400, headerClassName: "header",
        renderCell: ((params: any) => params.value && params.value.name)
    },
]