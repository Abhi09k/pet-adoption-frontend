import React, { useState } from 'react';
import { Container, Typography, Box, Grid, TextField, Button, Card, CardContent, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Alert } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_publishable_key_here');

const donationOptions = [
  { value: '25', label: '$25 - Feed a pet for a week' },
  { value: '50', label: '$50 - Vaccinate a pet' },
  { value: '100', label: '$100 - Sponsor a pet for a month' },
  { value: 'custom', label: 'Custom Amount' },
];

const CheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: { clientSecret } } = await axios.post('/api/donations/create-payment-intent', {
        amount: amount * 100, // Convert to cents
      });

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement 
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Button
        type="submit"
        disabled={!stripe || loading}
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        {loading ? 'Processing...' : `Donate $${amount}`}
      </Button>
    </form>
  );
};

const Donation = () => {
  const [amount, setAmount] = useState('25');
  const [customAmount, setCustomAmount] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
  };

  const getDonationAmount = () => {
    return amount === 'custom' ? parseFloat(customAmount) || 0 : parseFloat(amount);
  };

  const donationAmount = getDonationAmount();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Support Our Mission
      </Typography>
      
      {success ? (
        <Box textAlign="center">
          <Alert severity="success" sx={{ mb: 3 }}>
            Thank you for your generous donation! Your support helps us care for pets in need.
          </Alert>
          <Button variant="contained" onClick={() => setSuccess(false)}>
            Make Another Donation
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Donation Makes a Difference
                </Typography>
                <Typography paragraph>
                  Every dollar you donate helps us provide food, shelter, and medical care for pets 
                  in need while we work to find them loving forever homes.
                </Typography>
                
                <FormControl component="fieldset" sx={{ mt: 2 }}>
                  <FormLabel component="legend">Select Donation Amount</FormLabel>
                  <RadioGroup
                    aria-label="donation amount"
                    name="donationAmount"
                    value={amount}
                    onChange={handleAmountChange}
                  >
                    {donationOptions.map((option) => (
                      <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
                
                {amount === 'custom' && (
                  <TextField
                    label="Custom Amount"
                    type="number"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    fullWidth
                    sx={{ mt: 2 }}
                    InputProps={{
                      startAdornment: '$',
                    }}
                  />
                )}
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  All donations are tax-deductible to the extent allowed by law.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Payment Information
                </Typography>
                {donationAmount > 0 ? (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm 
                      amount={donationAmount} 
                      onSuccess={() => setSuccess(true)} 
                    />
                  </Elements>
                ) : (
                  <Typography color="text.secondary">
                    Please select a donation amount
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Donation;