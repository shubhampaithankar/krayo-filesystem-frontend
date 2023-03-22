import React, { useEffect } from 'react'
import { signInWithPopup } from 'firebase/auth'

import { auth, provider } from '../modules/firebase'
import { Navigate } from 'react-router-dom'

import Button from '@mui/material/Button'

const Auth = ({ user, setUser }) => {
    
    const handleClick = async () => {
        try {
            const data = await signInWithPopup(auth, provider)
            setUser(data.user)
            sessionStorage.setItem('user', JSON.stringify(data.user))
        } catch (error) {
            return 
        }
    }

    useEffect(() => {
        setUser(sessionStorage.getItem('user'))
    })
    return (
        user ? <Navigate to='/file-system' /> : (
            <main className='container-fluid'>
                <div className='d-flex align-items-center justify-content-center' style={{ height: '100%' }}>
                    <Button variant='contained' onClick={handleClick}>Sign in with Google</Button>
                </div>
            </main>
        )
    )
}

export default Auth