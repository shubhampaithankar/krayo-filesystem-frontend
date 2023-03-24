import React, { Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider, } from 'react-query'

import { Auth, LoginSuccessful, FileSystem } from './pages/'
import { Loader, Navbar, Modal } from './components/'

import { ModalContext } from './components/Modal'

const App = () => {
  const queryClient = new QueryClient()

  const [user, setUser] = useState()
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalBody, setModalBody] = useState('')

  const props = { user, setUser }

  const modalContextValue = {
    modalOpen, modalTitle, modalBody,
    setModalOpen, setModalTitle, setModalBody
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <ModalContext.Provider value={modalContextValue}>
        <BrowserRouter>
          <Modal />
          <Navbar {...props} />
          <Suspense fallback={<Loader />}>
            <main style={{ height: '100%', paddingTop: '65px' }}>
              <Routes>
                <Route path='/'> 
                  <Route path='/' element={<Navigate to='auth' />} />
                  <Route path='auth' element={<Auth {...props} />} />
                  <Route path='auth/login/success' element={<LoginSuccessful {...props} />}/>
                  <Route path='file-system' element={
                    <PrivateRoute>
                      <FileSystem {...props} />
                    </PrivateRoute>
                  }/>
                </Route>
                <Route path='*' element={<p>There's nothing here: 404!</p>} />
              </Routes>
            </main>
          </Suspense>
        </BrowserRouter>
      </ModalContext.Provider>
    </QueryClientProvider>
  )
}

const PrivateRoute = ({ children }) => {
  const user = sessionStorage.getItem('user')
  if (!user) return <Navigate to='/auth' replace />

  return children
}

export default App
