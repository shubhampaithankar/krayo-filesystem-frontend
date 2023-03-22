import React, { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider, } from 'react-query'

import { Auth, FileSystem } from './pages/'
import { Loader, Navbar, Sidebar } from './components/'

const App = () => {
  const queryClient = new QueryClient()

  const [user, setUser] = useState()

  const props = { user, setUser }
  
  return (
    <Suspense fallback={<Loader />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
        <Navbar {...props} />
        <Sidebar {...props} />
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
      </QueryClientProvider>
    </Suspense>
  )
}

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem('user')
  if (!user) return <Navigate to='/auth' replace />

  return children
}

export default App
