import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { Pets, People, ShoppingCart, AttachMoney, CalendarToday, Edit, Delete } from '@mui/icons-material';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Pets', value: 142, icon: <Pets />, color: 'primary' },
    { title: 'Adoptions This Month', value: 28, icon: <Pets />, color: 'secondary' },
    { title: 'Registered Users', value: 356, icon: <People />, color: 'success' },
    { title: 'Total Donations', value: '$8,245', icon: <AttachMoney />, color: 'warning' },
  ];

  const recentAdoptions = [
    { id: 1, pet: 'Max (Dog)', user: 'john@example.com', date: '2023-07-15', status: 'completed' },
    { id: 2, pet: 'Luna (Cat)', user: 'sarah@example.com', date: '2023-07-12', status: 'completed' },
    { id: 3, pet: 'Buddy (Dog)', user: 'mike@example.com', date: '2023-07-10', status: 'pending' },
    { id: 4, pet: 'Milo (Cat)', user: 'emma@example.com', date: '2023-07-08', status: 'completed' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Adoption Fair', date: '2023-07-22', location: 'Main Shelter' },
    { id: 2, title: 'Vet Checkup Day', date: '2023-07-25', location: 'Clinic' },
    { id: 3, title: 'Volunteer Training', date: '2023-07-28', location: 'Community Center' },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: `${stat.color}.main`, color: `${stat.color}.contrastText` }}>
                    {stat.icon}
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3}>
        {/* Recent Adoptions */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Adoptions
              </Typography>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Pet</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentAdoptions.map((adoption) => (
                      <TableRow key={adoption.id}>
                        <TableCell>{adoption.pet}</TableCell>
                        <TableCell>{adoption.user}</TableCell>
                        <TableCell>{adoption.date}</TableCell>
                        <TableCell>
                          <chip 
                            label={adoption.status} 
                            color={adoption.status === 'completed' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton size="small">
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small">
                            <Delete fontSize="small" color="error" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button size="small">View All</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Upcoming Events */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday sx={{ mr: 1 }} /> Upcoming Events
              </Typography>
              
              <List>
                {upcomingEvents.map((event) => (
                  <React.Fragment key={event.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <CalendarToday />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.title}
                        secondary={`${event.date} • ${event.location}`}
                      />
                      <Button size="small">Details</Button>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button size="small">Add Event</Button>
              </Box>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card elevation={3} sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<Pets />}
                    sx={{ py: 1.5 }}
                  >
                    Add New Pet
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<People />}
                    sx={{ py: 1.5 }}
                  >
                    Manage Users
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<ShoppingCart />}
                    sx={{ py: 1.5 }}
                  >
                    Manage Shop
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    startIcon={<AttachMoney />}
                    sx={{ py: 1.5 }}
                  >
                    View Donations
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;