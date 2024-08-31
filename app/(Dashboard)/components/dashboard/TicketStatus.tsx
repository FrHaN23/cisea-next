import { getTicketStatus } from "@/apis/stats/api"
import { Card, Grid, Skeleton, Typography } from "@mui/material"
import DashboardCard from "../shared/DashboardCard"

export default function TicketStatusStats(){
    const {data, isLoading} = getTicketStatus()

    if (isLoading && !data){
        return (
            <>  
                <Grid item>
                    <Skeleton width={'100%'} height={'50vh'}/>
                </Grid>
            </>
        )
    }
    return(
        <>
            <DashboardCard title={'Ticket Status'}>
                <Grid container justifyContent="center" >
                    <Grid item  >
                        <Card className="bg-green-400 text-center p-1 mx-2 w-48 my-2 border-collapse">
                            <Typography fontWeight={"bold"}>
                                OPEN
                            </Typography>
                            <Typography>
                                {data && data.open}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className="bg-yellow-400  text-center p-1 mx-2 w-48 my-2 border-collapse">
                            <Typography fontWeight={"bold"}>
                                ON-PROGRESS
                            </Typography>
                            <Typography>
                                {data && data.onGoing}
                            </Typography>
                        </Card>
                    </Grid>
                    <Grid item>
                        <Card className="bg-red-400 text-center p-1 mx-2 w-48  my-2 border-collapse">
                            <Typography fontWeight={"bold"}>
                                CLOSED
                            </Typography>
                            <Typography>
                                {data && data.closed}                            
                            </Typography>  
                        </Card>
                    </Grid>
                </Grid>
            </DashboardCard>
        </>
    )
}