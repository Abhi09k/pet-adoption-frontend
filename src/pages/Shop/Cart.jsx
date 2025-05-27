import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, TextField, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Delete, ArrowBack, ShoppingCartCheckout } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const cartItems = [
  { id: 1, name: 'Premium Dog Food', price: 29.99, quantity: 2, image: '' },
  { id: 2, name: 'Chew Toy Set', price: 14.99, quantity: 1, image: '' },
  { id: 3, name: 'Grooming Brush', price: 12.99, quantity: 1, image: '' },
];

const Cart = () => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (id, newQuantity) => {
    // In a real app, this would update the cart
    console.log(`Changed quantity of item ${id} to ${newQuantity}`);
  };

  const handleRemoveItem = (id) => {
    // In a real app, this would remove the item from the cart
    console.log(`Removed item ${id} from cart`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        component={Link} 
        to="/shop" 
        sx={{ mb: 2 }}
      >
        Continue Shopping
      </Button>
      
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      
      {cartItems.length === 0 ? (
        <Box textAlign="center" sx={{ py: 8 }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/shop"
            startIcon={<shoppingCart />}
          >
            Browse Products
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CardMedia
                            component="img"
                            image={item.image || '/placeholder-product.jpg'}
                            alt={item.name}
                            sx={{ width: 60, height: 60, mr: 2, objectFit: 'contain' }}
                          />
                          <Typography>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        ${item.price.toFixed(2)}
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="number"
                          size="small"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          inputProps={{ min: 1 }}
                          sx={{ width: 70 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleRemoveItem(item.id)}>
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping</Typography>
                  <Typography>${shipping.toFixed(2)}</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography>Tax</Typography>
                  <Typography>${tax.toFixed(2)}</Typography>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="subtitle1">Total</Typography>
                  <Typography variant="subtitle1">${total.toFixed(2)}</Typography>
                </Box>
                
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartCheckout />}
                  component={Link}
                  to="/checkout"
                >
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
            
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Have a Promo Code?
              </Typography>
              <Box sx={{ display: 'flex' }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Enter promo code"
                  sx={{ mr: 1 }}
                />
                <Button variant="outlined">Apply</Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;