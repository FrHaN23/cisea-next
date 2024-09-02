'use client'
import { Grid, Box, Paper, LinearProgress } from '@mui/material';
import PageContainer from '@/app/(Dashboard)/components/container/PageContainer';
import XYChart from './charts/XY_Chart';
import { getPenerimaanStat } from '@/apis/stats/api';
import { useState } from 'react';
import dayjs from 'dayjs';

const Dashboard = () => {
  const [year, setYear] = useState(dayjs().get('year'))
  const {data, isLoading} = getPenerimaanStat(2024)

  console.log(year)

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Paper>
            {
              !data && isLoading ? <LinearProgress />:
              <XYChart data={data} />
            }
          </Paper>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
