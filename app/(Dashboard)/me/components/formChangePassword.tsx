import { changePassword } from "@/apis/user/api";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { Box, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText, Button} from "@mui/material";
import { useState } from "react";
import Snackbar from "../../utilities/Snackbar/Snakbar";

export default function FormChangePassword({setOpenLoading}:any){
    const [isPasswordShow, setIsPasswordShow] = useState({
        old: false,
        new: false,
        firmation: false,
    })
    const [oldPass, setOldPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [isPassValid, setIsPassValid] = useState(true)

    const handleCloseLoading = () => setOpenLoading(false)
    const handleOpenLoading = () => setOpenLoading(true)
    const handleToggleShowOldPassword = ()=>setIsPasswordShow(
        {
            ...isPasswordShow,
            old : !isPasswordShow.old
        }
    )
    const handleToggleShowNewPassword = ()=>setIsPasswordShow(
        {
            ...isPasswordShow,
            new : !isPasswordShow.new
        }
    )
    const handleToggleShowConfirmationPassword = ()=>setIsPasswordShow(
        {
            ...isPasswordShow,
            firmation : !isPasswordShow.firmation
        }
    )
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
      };
    
    const handleChangePassword = async(event: React.FormEvent<HTMLFormElement>)=> {
        event.preventDefault()
        if (confirmPass !== newPass){
            return Snackbar("Current Password and new password did not same", false)
        }
        let body:any = {}
        const data = new FormData(event.currentTarget)
        data.forEach((value,key)=>body[key]=value)
        handleOpenLoading()
        const res = await changePassword(body)
        if (res.ok) {
            handleCloseLoading()
            return Snackbar("Password has been change", true)
        }
        handleCloseLoading()
        return Snackbar("Password failed to change", false)
    }

    const handleConfirmPass = (e: React.KeyboardEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        if (!confirmPass || confirmPass === "") return
        if (confirmPass !== newPass){
            setIsPassValid(false)
        }else{
            setIsPassValid(true)
        }
    }
    return(
        <>
        <Box component={"form"} onSubmit={handleChangePassword} className="mx-4 flex flex-col">
                <FormControl margin="normal" >
                    <InputLabel  htmlFor="outlined-adornment-old-password">
                        Current Password
                    </InputLabel>
                    <OutlinedInput
                        value={oldPass}
                        onChange={(e)=>setOldPass(e.target.value)}  
                        id="old_pass"
                        label="Current Passsword"
                        name="old_pass"
                        type={isPasswordShow.old ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleToggleShowOldPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {isPasswordShow.old ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl margin="normal" >
                    <InputLabel  htmlFor="outlined-adornment-new-password" className={`${!isPassValid && 'text-red-700 font-semibold'}`}>
                        New Password
                    </InputLabel>
                    <OutlinedInput
                        value={newPass}
                        onChange={(e)=>setNewPass(e.target.value)}
                        onKeyUp={(e)=>handleConfirmPass(e)}
                        error={!isPassValid}   
                        id="new_pass"
                        label="New password"
                        name="new_pass"
                        type={isPasswordShow.new ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleToggleShowNewPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {isPasswordShow.new ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                </FormControl>
                <FormControl margin="normal" >
                    <InputLabel  htmlFor="outlined-adornment-confirmation-password" className={`${!isPassValid && 'text-red-700 font-semibold'}`}>
                        Password Confirmation
                    </InputLabel>
                    <OutlinedInput
                        value={confirmPass}
                        onChange={(e)=>setConfirmPass(e.target.value)}
                        onKeyUp={(e)=>handleConfirmPass(e)}
                        error={!isPassValid}   
                        id="confirm_pass"
                        label="Password Confirmation"
                        name="confirm_pass"
                        type={isPasswordShow.firmation ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleToggleShowConfirmationPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {isPasswordShow.firmation ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    <FormHelperText className="text-red-700 font-semibold" > {!isPassValid ? "Password confirmation must be same as new password" : ""} </FormHelperText>
                </FormControl>
                <div>
                    <Button
                        className='bg-pusri-primary float-right'
                        type="submit"
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Change password
                    </Button>
                </div>
                </Box>
        </>
    )
}