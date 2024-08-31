'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(Dashboard)/components/container/PageContainer';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
