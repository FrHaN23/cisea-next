'use client'
import { Grid, Box, Paper, LinearProgress } from '@mui/material';
import PageContainer from '@/app/(Dashboard)/components/container/PageContainer';
import XYChart from './charts/XY_Chart';
import { getPenerimaanStat } from '@/apis/stats/api';
import { SetStateAction, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Dashboard = () => {
  const [year, setYear] = useState<Dayjs | null>(dayjs())
  const {data, isLoading} = getPenerimaanStat(year?.get('year') as number)
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
        {
          !data && isLoading ? <LinearProgress />:
          <Paper >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    sx={{
                      margin: "15px"
                    }}
                    value={year}
                    label={'Year'} 
                    views={['year']}
                    onChange={(newValue: SetStateAction<Dayjs | null>) => {
                        if(!newValue) return
                        setYear(newValue)
                    }}
                    />
            </LocalizationProvider>

              <XYChart data={data} />
          </Paper>
          }
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
