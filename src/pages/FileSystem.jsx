import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import ReactS3Client from '../modules/aws-sdk'
import { useMutation } from 'react-query'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress'

const FileSystem = ({ user, setUser, modal }) => {

  const mutation = useMutation({
    mutationFn: ({ file, fileName }) => {
      return ReactS3Client.uploadFile(file, fileName)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const file = e.target[0].files[0]
    const fileName = `${user.uid}/${file.name}`

    mutation.mutate({ file, fileName })

    if (mutation.isSuccess) {
    }
    e.target[0].value = ''
  }

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')))
  }, [setUser]) 
  
  return (
    !user ? <Navigate to={'/auth'} /> :
    <div className="container-fluid">
      <div className="row" style={{ height: '100%', paddingLeft: '300px' }}>
        <div className="col-12">
          <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100%' }}>
            <form className='' onSubmit={handleSubmit}>
              <div className="form-group">
                <label className='text-center'>Upload your files</label>
                <input className='form-control' type="file" disabled={mutation.isLoading} required />
              </div>
              <Button type='submit' variant='primary' disabled={mutation.isLoading}>Upload</Button>
            </form>
            { mutation.isLoading ? <LinearLoader text={'Uploading please wait...'}/> : null }
          </div>
        </div>
      </div>
    </div>
  )
}

const LinearLoader = ({ text }) => {
  return (
    <Box sx={{ width: '50%' }}>
      <div className="text-center mb-2">
        { text }
      </div>
      <LinearProgress />
    </Box>
  )
}

export default FileSystem