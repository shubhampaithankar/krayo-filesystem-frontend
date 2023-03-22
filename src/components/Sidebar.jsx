import React, { useEffect } from 'react'

const Sidebar = ({ user, setUser }) => {

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')))
  }, [setUser]) 

  return (
    user ? 
    <aside style={{ width: '300px', position: 'fixed', paddingTop: '60px' }}>
      <h3 className="mx-auto my-2 text-center">File List</h3>
      <div style={{ overflowY: 'scroll', height: '750px' }}>
        <p>Dummy</p>
        <p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p><p>Dummy</p>
      </div>
    </aside> : null
  )
}

export default Sidebar