import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark" style={{ height: '60px', position: 'fixed', width: '100%' }}>
      <div className="row" style={{ width: '100%' }}>
        <div className="col-3">
          <h1 className="navbar-brand m-2">File System</h1>
        </div>
      </div>
    </nav>
  )
}

export default Navbar