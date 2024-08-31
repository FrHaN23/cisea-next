import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  IconButton,
  InputAdornment,
} from "@mui/material"
import {signIn} from "next-auth/react"
import Visibility  from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Snackbar from "@/app/(Dashboard)/utilities/Snackbar/Snakbar";
import { useEffect } from "react";
import CustomTextField from "@/app/(Dashboard)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string
  subtitle?: JSX.Element | JSX.Element[]
  subtext?: JSX.Element | JSX.Element[]
  callbackUrl: string | undefined
  error?: string
}

export default function AuthLogin({ title, subtext, callbackUrl, error }: loginType){
  const [isPasswordShow, setIsPasswordShow] = useState(false)
  const handleToggleShowOldPassword = ()=>setIsPasswordShow(!isPasswordShow)
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }
  useEffect(() => {
    if (error == "CredentialsSignin"){
      Snackbar("Username/password didn\'t match!", false)
    }
  }, [error])

  const handleLogin =  async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const username = data.get('username')
    const password = data.get('password')
    if(!username || !password) {
      return Snackbar("username/password cannot be empty", false)
    }
    const userData = {
      username: username,
      password: password,
      callbackUrl: !callbackUrl ? "/" : callbackUrl 
    }
    signIn('credentials', userData)
  }

  return(
    <>
      <Box component={'form'} onSubmit={handleLogin}>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      <Stack>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="username"
            mb="5px"
          >
            Username
          </Typography>
          <CustomTextField variant="outlined" name={'username'} fullWidth />
        </Box>
        <Box mt="25px">
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField 
            name={'password'}
            variant="outlined" 
            fullWidth 
            type={isPasswordShow ? 'text' : 'password'}
            endadornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggleShowOldPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                >
                {isPasswordShow? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>
            }
          />
        </Box>
        <Stack
          justifyContent="space-between"
          direction="row"
          alignItems="center"
          my={2}
        >
        </Stack>
      </Stack>
      <Box>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
        >
          Sign In
        </Button>
      </Box>
      </Box>

    </>
  )
} 

