import React, {useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

function Nav() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { username } = useContext(UserContext);
  const { setUsername } = useContext(UserContext);
  const {setSignInStatus} = useContext(UserContext);
  // const {signInStatus} = useContext(UserContext);

  const handleDropdownOpen = () => {
    setDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownOpen(false);
  };

  const handleSignOut = () => {
    setUsername(''); 
    setSignInStatus(false);
    navigate('/signin')
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container justify-content-center">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/menu" className="nav-link">Menu</Link>
          </li>
          <li className="nav-item">
            <Link to="/bookingpage" className="nav-link">BookingPage</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          <li
            className={`nav-item dropdown ${dropdownOpen ? 'show' : ''}`}
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <Link
              to="/signin"
              className="nav-link"
              role="button"
              id="navbarDropdown"
              onClick={handleDropdownOpen}
            >
             {username ? username : 'Sign In'}
            </Link>
            <div
              className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}
              aria-labelledby="navbarDropdown"
              onMouseEnter={handleDropdownOpen}
              onMouseLeave={handleDropdownClose}
            >
              <Link to="/profile" className="dropdown-item">Profile</Link>
              <Link to="/payment" className="dropdown-item">Payment</Link>
              <button className="dropdown-item" onClick={handleSignOut}>Sign Out</button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
