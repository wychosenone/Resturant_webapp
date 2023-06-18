import React from 'react';
import {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'

function SignUp() {
const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAccountCreated) {
      const timer = setTimeout(() => {
        navigate('/signin'); 
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isAccountCreated, navigate]);
  const handleSignUp = (e) => {
    e.preventDefault();
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      setErrorMessage('An account with this username already exists.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    const user = { username, password };
    localStorage.setItem(username, JSON.stringify(user));
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('Account created successfully!');
    setIsAccountCreated(true);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mx-auto">
        <div className="col-md-6">
          <h2 className="text-center mt-4 mb-4">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="username" className='mb-2'>Username</label>
              <input
                type="text"
                className="form-control mb-4"
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className=' mb-2'>Password</label>
              <input
                type="password"
                className="form-control mb-4"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className='mb-2'>Confirm Password</label>
              <input
                type="password"
                className="form-control mb-4"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <div className="text-center">
              <button type="submit" className="btn btn-primary mt-4 mb-4">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
