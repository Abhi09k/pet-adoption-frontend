import React from 'react';
import { Container, Typography, Box, Paper, Stepper, Step, StepLabel, Button, Grid, TextField, FormControlLabel, Checkbox, Alert } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const steps = ['Personal Information', 'Adoption Details', 'Review & Submit'];

const PersonalInfoForm = ({ formData, setFormData, nextStep }) => {
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('Zip code is required'),
  });

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData({ ...formData, ...values });
        nextStep();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="fullName"
                label="Full Name"
                error={touched.fullName && !!errors.fullName}
                helperText={<ErrorMessage name="fullName" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="email"
                label="Email"
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="phone"
                label="Phone Number"
                error={touched.phone && !!errors.phone}
                helperText={<ErrorMessage name="phone" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                name="address"
                label="Address"
                error={touched.address && !!errors.address}
                helperText={<ErrorMessage name="address" />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                fullWidth
                name="city"
                label="City"
                error={touched.city && !!errors.city}
                helperText={<ErrorMessage name="city" />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                fullWidth
                name="state"
                label="State"
                error={touched.state && !!errors.state}
                helperText={<ErrorMessage name="state" />}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Field
                as={TextField}
                fullWidth
                name="zipCode"
                label="Zip Code"
                error={touched.zipCode && !!errors.zipCode}
                helperText={<ErrorMessage name="zipCode" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const AdoptionDetailsForm = ({ formData, setFormData, nextStep, prevStep }) => {
  const validationSchema = Yup.object().shape({
    petType: Yup.string().required('Pet type is required'),
    petName: Yup.string().required('Pet name is required'),
    experience: Yup.string().required('Please share your experience'),
    homeType: Yup.string().required('Home type is required'),
    hasYard: Yup.boolean(),
    hasOtherPets: Yup.boolean(),
    agreement: Yup.boolean().oneOf([true], 'You must agree to the terms'),
  });

  return (
    <Formik
      initialValues={formData}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setFormData({ ...formData, ...values });
        nextStep();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="petType"
                label="Type of Pet You Want to Adopt"
                error={touched.petType && !!errors.petType}
                helperText={<ErrorMessage name="petType" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="petName"
                label="Name of Pet (if known)"
                error={touched.petName && !!errors.petName}
                helperText={<ErrorMessage name="petName" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                multiline
                rows={4}
                name="experience"
                label="Your Experience with Pets"
                error={touched.experience && !!errors.experience}
                helperText={<ErrorMessage name="experience" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                as={TextField}
                fullWidth
                name="homeType"
                label="Type of Home (Apartment, House, etc.)"
                error={touched.homeType && !!errors.homeType}
                helperText={<ErrorMessage name="homeType" />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="hasYard"
                    color="primary"
                  />
                }
                label="Do you have a yard?"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="hasOtherPets"
                    color="primary"
                  />
                }
                label="Do you have other pets?"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Field
                    as={Checkbox}
                    name="agreement"
                    color="primary"
                  />
                }
                label="I agree to provide a loving and safe home for the pet"
              />
              {errors.agreement && touched.agreement && (
                <Alert severity="error">{errors.agreement}</Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={prevStep} variant="outlined">
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

const ReviewForm = ({ formData, prevStep, submitForm }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Your Information
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Personal Information
        </Typography>
        <Typography>Name: {formData.fullName}</Typography>
        <Typography>Email: {formData.email}</Typography>
        <Typography>Phone: {formData.phone}</Typography>
        <Typography>Address: {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</Typography>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Adoption Details
        </Typography>
        <Typography>Pet Type: {formData.petType}</Typography>
        <Typography>Pet Name: {formData.petName}</Typography>
        <Typography>Experience: {formData.experience}</Typography>
        <Typography>Home Type: {formData.homeType}</Typography>
        <Typography>Has Yard: {formData.hasYard ? 'Yes' : 'No'}</Typography>
        <Typography>Has Other Pets: {formData.hasOtherPets ? 'Yes' : 'No'}</Typography>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={prevStep} variant="outlined">
          Back
        </Button>
        <Button onClick={submitForm} variant="contained" color="primary">
          Submit Application
        </Button>
      </Box>
    </Box>
  );
};

const AdoptionForm = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    petType: '',
    petName: '',
    experience: '',
    homeType: '',
    hasYard: false,
    hasOtherPets: false,
    agreement: false,
  });

  const nextStep = () => setActiveStep(activeStep + 1);
  const prevStep = () => setActiveStep(activeStep - 1);

  const submitForm = () => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Adoption application submitted successfully!');
    // Reset form or redirect
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Pet Adoption Application
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {activeStep === 0 && (
          <PersonalInfoForm formData={formData} setFormData={setFormData} nextStep={nextStep} />
        )}
        
        {activeStep === 1 && (
          <AdoptionDetailsForm 
            formData={formData} 
            setFormData={setFormData} 
            nextStep={nextStep} 
            prevStep={prevStep} 
          />
        )}
        
        {activeStep === 2 && (
          <ReviewForm 
            formData={formData} 
            prevStep={prevStep} 
            submitForm={submitForm} 
          />
        )}
      </Paper>
    </Container>
  );
};

export default AdoptionForm;