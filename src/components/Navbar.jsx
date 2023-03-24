import React from 'react'
import { useLocation } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'

import { AuthService } from '../services'

const Navbar = ({ user, setUser }) => {

  const location = useLocation()

  const handleClick = () => {
    AuthService.logoutUser()
    sessionStorage.removeItem('user')
    setUser('')
  }

  return (
    <nav className="navbar navbar-dark bg-dark" style={{ height: '60px', position: 'fixed', width: '100%', zIndex: '5' }}>
      <div className="row align-items-center" style={{ width: '100%' }}>
        <div className="col-10">
          <header className="navbar-brand p-0 mx-3">File System</header>
        </div>
        { user && location.pathname !== '/auth/login/success' ? 
        <>
          <div className="col-2">
            <div className="d-flex align-items-center justify-content-evenly">
                <Avatar className='' src={user.picture} alt={user.displayName}/>
                <span className='' style={{ color: 'white' }}>{ user.displayName }</span>
              <button className='btn btn-secondary float-right' onClick={handleClick}>Log Out</button>
            </div>
          </div> 
        </> : null }
      </div>
    </nav>
  )
}

export default Navbar