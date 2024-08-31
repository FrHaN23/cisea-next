import { Box, Container, Typography, Modal } from "@mui/material"

type Props = {
    header: string,
    isOpen: boolean,
    onClose: any,
    children: JSX.Element | JSX.Element[];
  };

export default function ModalLayout({isOpen, header ,onClose, children}: Props){
    return (
        <>
        <Modal sx={{
              overflow: 'scroll'
              }} 
              open={isOpen} 
              onClose={onClose} 
              aria-labelledby="modal-title" 
              aria-describedby="modal-description">
            <Container sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {header}
                </Typography>
                <Box id="modal-modal-description" className='mt-2'>
                    {children}
                </Box>
            </Container>
        </Modal>
        </>
    )
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',  // Use percentage for responsive width
    maxWidth: '1200px',  // Maximum width for larger screens
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
