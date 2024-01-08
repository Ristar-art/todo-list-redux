import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setRegistrationError,
  setRegistrationPending,
  resetRegistration,
} from "./registrationSlice";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(5, "First name must be at least 5 characters long"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(5, "Last name must be at least 5 characters long"),
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setRegistrationPending(true));

      const profile = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      };

      try {
        const response = await fetch("http://localhost:8000/api/profiles", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(profile),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to register user: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Registration success:", data);

        dispatch(resetRegistration());
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Error creating user:", error.message);
        dispatch(setRegistrationError(error.message));
      } finally {
        dispatch(setRegistrationPending(false));
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: "25vw",
          minHeight: "50vh",
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 5,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            required
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            style={{height:25,borderRadius:3, border:'none'}}
          />
          <br />
          {formik.touched.firstName && formik.errors.firstName && (
            <p>{formik.errors.firstName}</p>
          )}
          <br />
          <input
            type="text"
            placeholder="Last Name"
            required
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            style={{height:25,borderRadius:3, border:'none'}}
          />
          <br />
          {formik.touched.lastName && formik.errors.lastName && (
            <p>{formik.errors.lastName}</p>
          )}
          <br />
          <input
            type="text"
            placeholder="Email"
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            style={{height:25,borderRadius:3, border:'none'}}
          />
          <br />
          {formik.touched.email && formik.errors.email && (
            <p>{formik.errors.email}</p>
          )}
          <br />
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            style={{height:25,borderRadius:3, border:'none'}}
          />
          <br />
          {formik.touched.password && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}
          <br />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            style={{height:25,borderRadius:3, border:'none'}}
          />
          <br />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p>{formik.errors.confirmPassword}</p>
          )}
          <br />
          <div style={{width:"100%",flex:1,display: "flex", justifyContent:'center'}}>
          {!isPending ? (
            <button type="submit">Register</button>
          ) : (
            <button type="submit" disabled>
              Loading...
            </button>
          )}
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default RegistrationPage;
