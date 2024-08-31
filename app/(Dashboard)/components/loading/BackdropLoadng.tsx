import { Backdrop, CircularProgress } from "@mui/material";

type Props = {
    isLoading: boolean
}

export default function BackdropLoading({isLoading}:Props){
    return(
    <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>

    </>
    )
}