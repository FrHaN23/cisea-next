"use client";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography } from "@mui/material";
// components
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import Logo from "@/app/(Dashboard)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { useRouter } from "next/navigation";
import BackdropLoading from "@/app/(Dashboard)/components/loading/BackdropLoadng";
import dayjs from "dayjs";



export default function LoginPage({searchParams}: {searchParams:{callbackUrl?: string, error?: string}}){
  const router = useRouter()
  const {data:session, status} = useSession()
  if (status === "loading"){
    return <BackdropLoading isLoading={true} />
  }  

  if(Number(session?.expires) > dayjs().unix() && session){
    router.push("/")
    return (
        <div>
            You are logged in redirecting click 
            <Link href={"/"} className="text-blue-600 mx-1">
            here 
            </Link> 
            if not redirecting
        </div>
     )
  }
  if(Number(session?.expires) < dayjs().unix()|| !session?.expires){
    return(
      <>
      <PageContainer title="Login" description="this is Login page" >
        <Box
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Grid
            container
            spacing={0}
            justifyContent="center"
            sx={{ height: "100vh" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              lg={4}
              xl={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Card
                elevation={9}
                sx={{ p: 4, zIndex: 1, 
                  width: "100%", 
                  maxWidth: "500px" }}
              >
                <Box display="flex" alignItems="center" marginX={'auto'} justifyContent="center">
                  <Logo width={300} height={200}/>
                </Box>
                <AuthLogin
                  error={searchParams.error}
                  callbackUrl={searchParams.callbackUrl === "/authentication/login" ? "/" : searchParams.callbackUrl}
                  subtext={
                    <Typography
                      variant="subtitle1"
                      textAlign="center"
                      color="textSecondary"
                      mb={1}
                    >
                      
                    </Typography>
                  }
                />
              </Card>
            </Grid>
          </Grid>
        </Box>
      </PageContainer>
      </>
    )
  }
}
