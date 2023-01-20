import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import homeIcon from '../icons/Home.svg';
import logoutIcon from '../icons/Arrow_Export.svg';

function Navbar() {
  const handleLogout = () => {
    sessionStorage.removeItem('app-token');
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('FstName');
    sessionStorage.removeItem('LstName');
    window.location.replace("/login");
  }
  return (
    <div>
      <nav className="Navbar">
        <ul>
          <li>
            <div
              to="/logout"
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick = {handleLogout}
            >
              <img src={logoutIcon} alt="logout" />
              Log Out
            </div>
          </li>
          <li>
            <Link
              to="/home"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <img src={homeIcon} alt="home" />
              Home
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;