import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { AuthService } from '../services'

const LoginSuccessful = ({ user, setUser }) => {
    
    const navigate = useNavigate()

    useQuery({
        queryKey: ['userData'],
        queryFn: () => AuthService.getUserOnSuccess(),
        onSuccess: ({ data }) => {
            sessionStorage.setItem("user", JSON.stringify(data.user))
            setUser(data.user)
        }
    })
      
    useEffect(() => {
        let timeout = setTimeout(() => {
            navigate('/')
        }, 2e3)   
        return () => {
            clearTimeout(timeout)
        }
    })

    return (
        <div className='container-fluid'>
            <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: '100%' }}>
                <h3 className='m-2'>Login Successful</h3>
                <h5 className='m-2'>redirecting to file system</h5>
            </div>
        </div>
    )
}

export default LoginSuccessful