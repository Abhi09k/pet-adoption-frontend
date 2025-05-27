import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero.jpg';
import pet1 from '../../assets/images/pet1.jpg';
import pet2 from '../../assets/images/pet2.jpg';
import pet3 from '../../assets/images/pet3.jpg';

const Home = () => {
  const featuredPets = [
    { id: 1, name: 'Max', type: 'Dog', age: '2 years', image: pet1 },
    { id: 2, name: 'Luna', type: 'Cat', age: '1 year', image: pet2 },
    { id: 3, name: 'Buddy', type: 'Dog', age: '3 years', image: pet3 },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Find Your Perfect Pet Companion
          </Typography>
          <Typography variant="h5" gutterBottom>
            Hundreds of pets are waiting for a loving home
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/adopt"
            sx={{ mt: 3 }}
          >
            Adopt Now
          </Button>
        </Box>
      </Box>

      {/* Featured Pets */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Featured Pets
        </Typography>
        <Grid container spacing={4}>
          {featuredPets.map((pet) => (
            <Grid item key={pet.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={pet.image}
                  alt={pet.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {pet.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {pet.type} • {pet.age}
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    component={Link}
                    to={`/adopt`}
                    sx={{ mt: 2 }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            How You Can Help
          </Typography>
          <Typography variant="body1" paragraph>
            Our organization relies on the generosity of donors to continue our mission of finding
            loving homes for pets in need.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/donate"
          >
            Make a Donation
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;