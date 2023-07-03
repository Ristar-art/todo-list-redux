import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setRegistrationError,
  setRegistrationPending,
  resetRegistration,
} from './registrationSlice';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {

  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    error,
    isPending,
  } = useSelector((state) => state.registration);
//Use yup validator to validate  credentials
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required').min(5, 'First name must be at least 5 characters long'),
    lastName: yup.string().required('Last name is required').min(5, 'Last name must be at least 5 characters long'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setRegistrationPending(true));

      const profile = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
// post the data to JSON file
      fetch('http://localhost:7000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
        .then(() => {
          dispatch(resetRegistration());
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error('Error creating user:', error);
          dispatch(setRegistrationError('Failed to register user'));
          dispatch(setRegistrationPending(false));
        });
    },
  });
//put inputs
  return (
    <div className="Details">
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          required
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        
        <br />
        {formik.touched.firstName && formik.errors.firstName && <p>{formik.errors.firstName}</p>}
        <br />
        <input
          type="text"
          placeholder="Last Name"
          required
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <br />
        {formik.touched.lastName && formik.errors.lastName && <p>{formik.errors.lastName}</p>}
        <br />
        <input
          type="text"
          placeholder="Email"
          required
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />
        {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
        <br />
        <input
          type="password"
          placeholder="Password"
          required
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />
        {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>}
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
        />
        <br />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
        <br />

        {!isPending && <button type="submit">Register</button>}
        {isPending && <button type="submit" disabled>Loading...</button>}
      </form>
    </div>
  );
}

export default RegistrationPage;

