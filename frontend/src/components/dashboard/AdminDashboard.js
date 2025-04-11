import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { getDashboardMetrics, getLoanStatistics } from '../../services/api';

function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalLoans: 0,
    activeLoans: 0,
    totalClients: 0,
    repaymentRate: 0
  });

  const [chartData, setChartData] = useState({
    loans: {},
    payments: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const metricsData = await getDashboardMetrics();
        const statsData = await getLoanStatistics();

        setMetrics(metricsData);
        setChartData(statsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h6">Total Loans</Typography>
              <Typography variant="h4">${metrics.totalLoans.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h6">Active Loans</Typography>
              <Typography variant="h4">{metrics.activeLoans}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h6">Total Clients</Typography>
              <Typography variant="h4">{metrics.totalClients}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className="metric-card">
            <CardContent>
              <Typography variant="h6">Repayment Rate</Typography>
              <Typography variant="h4">{metrics.repaymentRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Loan Disbursement Trend</Typography>
              <Line data={chartData.loans} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Payment Collection Trend</Typography>
              <Bar data={chartData.payments} options={{ responsive: true }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default AdminDashboard;