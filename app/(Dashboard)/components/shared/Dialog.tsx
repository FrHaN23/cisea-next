import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

type Props = {
    open: boolean,
    onClose: any,
    onAccept: any,
    content: string,
    title: string,
}


export default function DialogLayout({open, onClose, onAccept, content, title}:Props){
    return (
        <>
        <Dialog open={open} onClose={onClose} sx={{padding: "15px"}}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onAccept} variant="contained" color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>
        </>
      );
}