import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, TextField, Select, MenuItem, FormControl, InputLabel, Pagination, Chip } from '@mui/material';
import { Search, FilterList, ShoppingCart } from '@mui/icons-material';

const products = [
  { id: 1, name: 'Premium Dog Food', price: 29.99, category: 'food', image: '', rating: 4.5 },
  { id: 2, name: 'Cat Litter Box', price: 24.99, category: 'accessories', image: '', rating: 4.2 },
  { id: 3, name: 'Pet Carrier', price: 39.99, category: 'travel', image: '', rating: 4.7 },
  { id: 4, name: 'Chew Toy Set', price: 14.99, category: 'toys', image: '', rating: 4.3 },
  { id: 5, name: 'Grooming Brush', price: 12.99, category: 'grooming', image: '', rating: 4.1 },
  { id: 6, name: 'Pet Bed', price: 34.99, category: 'beds', image: '', rating: 4.6 },
  { id: 7, name: 'Automatic Feeder', price: 49.99, category: 'feeders', image: '', rating: 4.4 },
  { id: 8, name: 'Dog Leash', price: 16.99, category: 'walking', image: '', rating: 4.0 },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'food', label: 'Food' },
  { value: 'toys', label: 'Toys' },
  { value: 'beds', label: 'Beds' },
  { value: 'walking', label: 'Walking' },
  { value: 'grooming', label: 'Grooming' },
  { value: 'travel', label: 'Travel' },
  { value: 'feeders', label: 'Feeders' },
  { value: 'accessories', label: 'Accessories' },
];

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (category === 'all' || product.category === category)
    )
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return b.rating - a.rating; // default sort by rating (popular)
    });

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handleAddToCart = (productId) => {
    // In a real app, this would add the product to the cart
    console.log(`Added product ${productId} to cart`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pet Supplies
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <TextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1 }} />,
          }}
          sx={{ width: 300 }}
        />
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              startAdornment={<FilterList sx={{ mr: 1 }} />}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="popular">Most Popular</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {paginatedProducts.length > 0 ? (
          paginatedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image || '/placeholder-product.jpg'}
                  alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip 
                      label={product.rating.toFixed(1)} 
                      size="small" 
                      color="primary" 
                      sx={{ mr: 1 }} 
                    />
                    <Typography variant="body2" color="text.secondary">
                      {product.category}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" align="center" sx={{ py: 4 }}>
              No products found matching your criteria
            </Typography>
          </Grid>
        )}
      </Grid>
      
      {filteredProducts.length > itemsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredProducts.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default Shop;