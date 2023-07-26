import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Authentication/auth';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from './loginSlice';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [firstErrorMessage, setFirstErrorMessage] = useState('');
  const [secondErrorMessage, setSecondErrorMessage] = useState('');
  const [thirdErrorMessage, setThirdErrorMessage] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.login.loading);
  const error = useSelector((state) => state.login.error);

  async function handleSubmit(event) {
    event.preventDefault();

    const credentials = {
      firstName: userName,
      email: Email,
      password: Password,
    };

    // Dispatch loginStart action
    dispatch(loginStart());

    // Simulating an asynchronous login process
    try {
      // Fetch profile data from the server
      const response = await fetch('http://localhost:8000/api/profiles', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const profile = await response.json();

      // Find user in the profile data
      const user = profile.find(
        (user) =>
          user.firstName === credentials.firstName &&
          user.email === credentials.email &&
          user.password === credentials.password
      );

      // Check if the user exists
      if (user) {
        // Dispatch loginSuccess action
        dispatch(loginSuccess());

        auth.login(userName);
        navigate(redirectPath, { replace: true });
      } else {
        // Dispatch loginFailure action with an error message
        dispatch(loginFailure('Invalid credentials'));
      }
    } catch (error) {
      // Dispatch loginFailure action with the error message
      dispatch(loginFailure('Error logging in user'));
      console.error('Error logging in user:', error); 
    }
  }

  return (
    <div className="Login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <p>{firstErrorMessage}</p>
        <br />

        <input
          type="text"
          placeholder="email"
          required
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <p>{secondErrorMessage}</p>
        <br />

        <input
          type="password"
          placeholder="Password"
          required
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <p>{thirdErrorMessage}</p>
        <br />

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginPage;
