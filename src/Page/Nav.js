import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
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
        </ul>
      </div>
    </nav>
  );
}

export default Nav;

// function Nav() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container justify-content-center">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <a href="/" className="nav-link">Home</a>
//           </li>
//           <li className="nav-item">
//             <a href="/menu" className="nav-link">Menu</a>
//           </li>
//           <li className="nav-item">
//             <a href="/reservation" className="nav-link">Reservation</a>
//           </li>
//           <li className="nav-item">
//             <a href="/contact" className="nav-link">Contact</a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
