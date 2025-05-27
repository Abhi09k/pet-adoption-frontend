import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Pets, ShoppingCart, VideoCall, History, Favorite } from '@mui/icons-material';

const UserDashboard = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: 'January 2023',
    avatar: '',
    pets: [
      { name: 'Max', type: 'Dog', adoptedDate: '2023-03-15' },
      { name: 'Luna', type: 'Cat', adoptedDate: '2023-06-22' },
    ]
  };

  const recentActivities = [
    { id: 1, type: 'donation', amount: 50, date: '2023-07-10' },
    { id: 2, type: 'purchase', items: ['Dog Food', 'Toy'], date: '2023-07-05' },
    { id: 3, type: 'consultation', vet: 'Dr. Smith', date: '2023-06-28' },
  ];

  const upcomingAppointments = [
    { id: 1, vet: 'Dr. Johnson', date: '2023-07-20', time: '10:00 AM' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* User Profile */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{ 
                  width: 100, 
                  height: 100, 
                  mx: 'auto', 
                  mb: 2,
                  fontSize: 40 
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Typography variant="h6">{user.name}</Typography>
              <Typography color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Member since {user.joinDate}
              </Typography>
              
              <Button variant="outlined" sx={{ mt: 3 }}>
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          {/* My Pets */}
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Pets sx={{ mr: 1 }} /> My Pets
              </Typography>
              
              {user.pets.length > 0 ? (
                <List>
                  {user.pets.map((pet, index) => (
                    <React.Fragment key={index}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            {pet.type.charAt(0)}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={pet.name}
                          secondary={`${pet.type} • Adopted on ${pet.adoptedDate}`}
                        />
                      </ListItem>
                      {index < user.pets.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box textAlign="center" sx={{ py: 2 }}>
                  <Typography color="text.secondary">
                    You haven't adopted any pets yet
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ mt: 2 }}
                    startIcon={<Pets />}
                  >
                    Browse Pets
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Upcoming Appointments */}
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <VideoCall sx={{ mr: 1 }} /> Upcoming Appointments
              </Typography>
              
              {upcomingAppointments.length > 0 ? (
                <List>
                  {upcomingAppointments.map((appt, index) => (
                    <React.Fragment key={appt.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <VideoCall />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={`Consultation with ${appt.vet}`}
                          secondary={`${appt.date} at ${appt.time}`}
                        />
                        <Button size="small" variant="outlined">
                          Details
                        </Button>
                      </ListItem>
                      {index < upcomingAppointments.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box textAlign="center" sx={{ py: 2 }}>
                  <Typography color="text.secondary">
                    No upcoming appointments
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    sx={{ mt: 2 }}
                    startIcon={<VideoCall />}
                  >
                    Book Consultation
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <History sx={{ mr: 1 }} /> Recent Activity
              </Typography>
              
              {recentActivities.length > 0 ? (
                <List>
                  {recentActivities.map((activity, index) => (
                    <React.Fragment key={activity.id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            {activity.type === 'donation' ? (
                              <Favorite />
                            ) : activity.type === 'purchase' ? (
                              <ShoppingCart />
                            ) : (
                              <VideoCall />
                            )}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            activity.type === 'donation' ? `Donated $${activity.amount}` :
                            activity.type === 'purchase' ? `Purchased ${activity.items.join(', ')}` :
                            `Consultation with ${activity.vet}`
                          }
                          secondary={activity.date}
                        />
                      </ListItem>
                      {index < recentActivities.length - 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                  ))}
                </List>
              ) : (
                <Box textAlign="center" sx={{ py: 2 }}>
                  <Typography color="text.secondary">
                    No recent activity
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={4}>
              <Button 
                fullWidth 
                variant="contained" 
                startIcon={<Pets />}
                sx={{ py: 2 }}
              >
                Adopt a Pet
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button 
                fullWidth 
                variant="contained" 
                startIcon={<VideoCall />}
                sx={{ py: 2 }}
              >
                Book Vet
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Button 
                fullWidth 
                variant="contained" 
                startIcon={<ShoppingCart />}
                sx={{ py: 2 }}
              >
                Shop
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboard;