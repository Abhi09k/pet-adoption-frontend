import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Button, TextField, MenuItem, Avatar, Divider, Alert } from '@mui/material';
import { CalendarToday, Schedule, Payment } from '@mui/icons-material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const vets = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'General Practice', experience: '10 years', image: '' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Surgery', experience: '8 years', image: '' },
  { id: 3, name: 'Dr. Emily Wilson', specialty: 'Dermatology', experience: '6 years', image: '' },
];

const Booking = () => {
  const [selectedVet, setSelectedVet] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [reason, setReason] = useState('');
  const [step, setStep] = useState(1); // 1: select vet, 2: select time, 3: confirm
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleVetSelect = (vet) => {
    setSelectedVet(vet);
    setStep(2);
  };

  const handleDateTimeConfirm = () => {
    if (date && time) {
      setStep(3);
    }
  };

  const handleBookingSubmit = () => {
    // In a real app, this would send the booking to your backend
    console.log({
      vet: selectedVet,
      date,
      time,
      reason
    });
    setBookingSuccess(true);
  };

  if (bookingSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box textAlign="center">
          <Alert severity="success" sx={{ mb: 3 }}>
            Your consultation has been booked successfully! A confirmation has been sent to your email.
          </Alert>
          <Button 
            variant="contained" 
            onClick={() => {
              setBookingSuccess(false);
              setStep(1);
              setSelectedVet(null);
              setDate(null);
              setTime(null);
              setReason('');
            }}
          >
            Book Another Consultation
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Book a Vet Consultation
      </Typography>
      
      <stepper activeStep={step - 1} alternativeLabel sx={{ mb: 4 }}>
        <step><stepLabel>Select Vet</stepLabel></step>
        <step><stepLabel>Select Time</stepLabel></step>
        <step><stepLabel>Confirm</stepLabel></step>
      </stepper>

      {step === 1 && (
        <Grid container spacing={3}>
          {vets.map((vet) => (
            <Grid item xs={12} sm={6} md={4} key={vet.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  border: selectedVet?.id === vet.id ? '2px solid #4a148c' : 'none'
                }}
                onClick={() => handleVetSelect(vet)}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}>
                    {vet.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h6">{vet.name}</Typography>
                  <Typography color="text.secondary">{vet.specialty}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{vet.experience} experience</Typography>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Consultation fee: $50
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {step === 2 && selectedVet && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Select Date & Time with {selectedVet.name}
          </Typography>
          
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Select Date"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Select Time"
                  value={time}
                  onChange={(newValue) => setTime(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minutesStep={30}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Reason for Consultation"
                  multiline
                  rows={4}
                  fullWidth
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button 
              variant="contained" 
              onClick={handleDateTimeConfirm}
              disabled={!date || !time}
            >
              Continue
            </Button>
          </Box>
        </Box>
      )}

      {step === 3 && selectedVet && date && time && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Confirm Your Booking
          </Typography>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Veterinarian</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Avatar sx={{ mr: 2 }}>
                      {selectedVet.name.charAt(0)}
                    </Avatar>
                    <div>
                      <Typography>{selectedVet.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedVet.specialty}
                      </Typography>
                    </div>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Appointment Details</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <CalendarToday sx={{ mr: 1 }} />
                    <Typography>
                      {date.toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Schedule sx={{ mr: 1 }} />
                    <Typography>
                      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1">Reason for Visit</Typography>
                  <Typography sx={{ mt: 1 }}>{reason || 'Not specified'}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Payment
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Consultation Fee</Typography>
                <Typography>$50.00</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="subtitle1">$50.00</Typography>
              </Box>
            </CardContent>
          </Card>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={() => setStep(2)}>
              Back
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<Payment />}
              onClick={handleBookingSubmit}
            >
              Confirm & Pay
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Booking;