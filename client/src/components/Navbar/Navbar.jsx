import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

export default function Navbar() {
  const { logout, isLogin } = useContext(AuthContext)

  return (
        <div className="container">
        <header className="d-flex justify-content-center py-3">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {
            isLogin ?
              <React.Fragment>
                  <li className="nav-item">
                    <Link to="/createL" className="nav-link">Creating link</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={logout}>Exit</Link>
                  </li>
              </React.Fragment> :
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/auth/login" className="nav-link">Sign in</Link>
                </li>
                <li className="nav-item">
                  <Link to="/auth/registration" className="nav-link">Sign up</Link>
                </li>
              </React.Fragment>
          }
        </ul>
        </header>
    </div>
  )
}
