import React, { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { Auth, FileSystem } from './pages/'
import { Loader } from './components'

const App = () => {
  const [user, setUser] = useState()
  const props = { user, setUser }
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
      <main style={{ height: '100%' }}>
        <Routes>
          <Route path='/'> 
            <Route path='/' element={<Navigate to='auth' />} />
            <Route path='auth' element={<Auth {...props} />} />
            <Route path='file-system' element={
              <PrivateRoute>
                <FileSystem {...props} />
              </PrivateRoute>
            }/>
          </Route>
          <Route path='*' element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </main>
      </BrowserRouter>
    </Suspense>
  )
}

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem('user')
  if (!user) return <Navigate to='/auth' replace />

  return children
}

export default App
