import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, TextField, Divider, Chip, Rating, Tabs, Tab, Alert } from '@mui/material';
import { ShoppingCart, Favorite, Share, ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const product = {
  id: 1,
  name: 'Premium Dog Food',
  price: 29.99,
  category: 'food',
  rating: 4.5,
  reviews: 42,
  description: 'High-quality dog food made with natural ingredients to provide complete and balanced nutrition for your pet.',
  details: 'Ingredients: Chicken, brown rice, vegetables, vitamins and minerals. Suitable for all dog breeds.',
  image: '',
  images: ['', '', ''],
  inStock: true
};

const reviews = [
  { id: 1, user: 'PetLover123', rating: 5, date: '2023-05-15', comment: 'My dog loves this food! His coat is shinier and he has more energy.' },
  { id: 2, user: 'DogOwner456', rating: 4, date: '2023-04-22', comment: 'Good quality food at a reasonable price. My picky eater actually likes it.' },
  { id: 3, user: 'AnimalFriend', rating: 3, date: '2023-03-10', comment: 'Decent food but my dog seems to prefer another brand.' },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [tabValue, setTabValue] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    // In a real app, this would add the product to the cart
    console.log(`Added ${quantity} of product ${id} to cart`);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        component={Link} 
        to="/shop" 
        sx={{ mb: 2 }}
      >
        Back to Shop
      </Button>
      
      {addedToCart && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Product added to cart successfully!
        </Alert>
      )}
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="400"
              image={product.image || '/placeholder-product.jpg'}
              alt={product.name}
              sx={{ objectFit: 'contain' }}
            />
            
            <Box sx={{ display: 'flex', p: 1 }}>
              {product.images.map((img, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  height="80"
                  image={img || '/placeholder-product.jpg'}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  sx={{ 
                    width: 80, 
                    mr: 1, 
                    cursor: 'pointer',
                    border: '1px solid #ddd'
                  }}
                />
              ))}
            </Box>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Chip label={product.category} color="secondary" sx={{ mb: 1 }} />
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.rating.toFixed(1)} ({product.reviews} reviews)
              </Typography>
            </Box>
            
            <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
              ${product.price.toFixed(2)}
            </Typography>
            
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Quantity:
              </Typography>
              <TextField
                type="number"
                size="small"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                inputProps={{ min: 1 }}
                sx={{ width: 80, mr: 2 }}
              />
              <Typography variant="body1" color={product.inStock ? 'success.main' : 'error'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                sx={{ flexGrow: 1 }}
              >
                Add to Cart
              </Button>
              <Button variant="outlined" size="large">
                <Favorite />
              </Button>
              <Button variant="outlined" size="large">
                <Share />
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="product tabs">
          <Tab label="Description" />
          <Tab label="Details" />
          <Tab label={`Reviews (${reviews.length})`} />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Typography variant="body1">
              {product.description}
            </Typography>
          )}
          
          {tabValue === 1 && (
            <Typography variant="body1">
              {product.details}
            </Typography>
          )}
          
          {tabValue === 2 && (
            <Box>
              {reviews.map((review) => (
                <Box key={review.id} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="subtitle1">{review.user}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                  <Rating value={review.rating} precision={0.5} readOnly size="small" />
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {review.comment}
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
              ))}
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Write a Review
              </Typography>
              <TextField
                multiline
                rows={4}
                fullWidth
                placeholder="Share your thoughts about this product..."
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Rating precision={0.5} />
                <Button variant="contained">Submit Review</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetail;