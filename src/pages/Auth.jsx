import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

// import { signInWithPopup } from 'firebase/auth'
// import { auth, provider } from '../modules/firebase'

import Button from '@mui/material/Button'

import config from '../config.json'

const Auth = ({ user, setUser }) => {
    
    // const handleClick = async () => {
    //     try {
    //         const data = await signInWithPopup(auth, provider)
    //         setUser(data.user)
    //         sessionStorage.setItem('user', JSON.stringify(data.user))
    //     } catch (error) {
    //         return 
    //     }
    // }

    const handleClick = async () => {
        try {
            window.open(config.apiURL + `auth/google/callback`, '_self')
        } catch (error) {
            console.log(`Something went wrong`)
        }
    }

    useEffect(() => {
        setUser(JSON.parse(sessionStorage.getItem('user')))
    })

    return (
        user ? <Navigate to='/file-system' /> : (
            <div className='container-fluid'>
                <div className='d-flex align-items-center justify-content-center' style={{ height: '100%' }}>
                    <Button variant='contained' onClick={handleClick}>Sign in with Google</Button>
                </div>
            </div>
        )
    )
}

export default Auth