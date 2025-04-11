import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { getClientLoans, getClientProfile } from '../../services/api';
import { toast } from 'react-toastify'; // from original code

function ClientDashboard() {
  const [loans, setLoans] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loansData, profileData] = await Promise.all([
          getClientLoans(),
          getClientProfile()
        ]);

        setLoans(loansData);
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching client data:', error);
        toast.error('Failed to load client data'); // from original code, for error handling
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Welcome, {profile.name || 'Guest'}</Typography> {/* Added default for name */}
              <Typography variant="body1">Account Status: {profile.status || 'Unknown'}</Typography> {/* Added default for status */}
            </CardContent>
          </Card>
        </Grid>

        {loans.map(loan => (
          <Grid item xs={12} md={6} key={loan.id}>
            <Card className="loan-card">
              <CardContent>
                <Typography variant="h6">Loan #{loan.id}</Typography>
                <Typography>Amount: ${loan.amount}</Typography>
                <Typography>Status: {loan.status}</Typography>
                <Typography>Due Date: {loan.dueDate ? new Date(loan.dueDate).toLocaleDateString() : 'N/A'}</Typography> {/*Handle missing dueDate*/}
                {loan.status === 'active' && (
                  <Button 
                    variant="contained" 
                    color="primary"
                    onClick={() => window.location.href = `/payment/${loan.id}`}
                  >
                    Make Payment
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ClientDashboard;