import { Box, Button, Grid, IconButton, Paper, Stack, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef} from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/DeleteForeverRounded'
import { noData, Pagination } from '@/const/const';
import Link from 'next/link';
import BackdropLoading from '@/app/(Dashboard)/components/loading/BackdropLoadng';
import DialogLayout from '@/app/(Dashboard)/components/shared/Dialog';
import { deleteCategoryById, getCatagoryWithChild,} from '@/apis/Catagory/api';
import AddIcon from '@mui/icons-material/Add';
import ModalLayout from '@/app/(Dashboard)/components/shared/Modal';
import FormMasterCatalogue from '../../../components/formCatagory';
import Snackbar from '@/app/(Dashboard)/utilities/Snackbar/Snakbar';



type Props = {
    id?: string
}

export default function DetailsDataTables({id}:Props){
    const [Searchable, setSearchable] = useState("")
    const [AddModal, setAddModal] = useState(false)    
    
    const [paginationModel, setPaginationModel] = useState<Pagination>({
        pageSize: 25,
        page: 0,
    })

    const {data, error, isLoading, total} = getCatagoryWithChild(id as string, paginationModel)

    return (
        <>
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            >
            <Button  variant="contained" startIcon={<AddIcon />} onClick={()=>setAddModal(true)} >
                Add
            </Button>
        </Grid>
        <Paper sx={{marginY:"5px", zIndex:1, flexWrap: "warp"}} >
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
        <ModalLayout header='Add New Catalogue Children' isOpen={AddModal} onClose={()=>setAddModal(false)}>
            <FormMasterCatalogue onClose={()=>setAddModal(false)} id={id} isChildren={true}/>
        </ModalLayout>
        </>
    )
}

function ActionButton({id}:any){
    const [IsLoading, setIsLoading] = useState(false)
    const [DialogDelete, setDialogDelete] = useState(false)

    const handleDelete = async () => {
        setIsLoading(true)
        const res = await deleteCategoryById(id)
        if (res.ok){
            setDialogDelete(false)
            setIsLoading(false)
            return Snackbar("Catalogue Deleted", true)
        }
        setIsLoading(false)
        return Snackbar("Something went wrong", false)
    }

    return (
        <>
        <Stack direction={"row"} justifyContent={"center"}>
            <Tooltip title="Delete">
                <IconButton onClick={()=>setDialogDelete(true)} sx={{marginTop:"5px"}}>
                    <DeleteIcon color='error'/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Details">
                <Link passHref href={`/master/catalogue/details/${id}`}>
                    <IconButton sx={{marginTop:"5px"}} >
                        <VisibilityIcon color='primary'/>
                    </IconButton>
                </Link>
            </Tooltip>
        </Stack>
        <DialogLayout 
            title="DELETING DATA!"
            content={`Are you sure to delete this data?`}
            onAccept={handleDelete} 
            onClose={()=>setDialogDelete(false)}
            open={DialogDelete}/>
        <BackdropLoading isLoading={IsLoading}/>
        </>
    )
}


const columns: GridColDef[] = [
    {field: 'id', headerName: '', align:"center", sortable:false, headerAlign:"center", disableColumnMenu:true, width:200, headerClassName: "header",
    renderCell: ((params:any) => <ActionButton id={params.value} isFinished={params.row.is_finished}/>)},
    {field: 'name', headerName: 'Catagory', headerAlign:"center", width:400, headerClassName: "header"},
    {field: 'kota', headerName: 'Kota %', headerAlign:"center", width:180, headerClassName: "header"},
    {field: 'provinsi', headerName: 'Provinsi %', headerAlign:"center", width:180, headerClassName: "header"},
    {field: 'pusat', headerName: 'Pusat %', headerAlign:"center", width:180, headerClassName: "header"},
]