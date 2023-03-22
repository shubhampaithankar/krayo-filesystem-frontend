import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import Button from '@mui/material/Button'

import ReactS3Client from '../modules/aws-sdk'
import { useMutation } from 'react-query'

const FileSystem = ({ user, setUser }) => {
  const mutation = useMutation({ mutationFn: (file, fileName) => {
    return ReactS3Client.uploadFile(file, fileName)
  }})
  const HandleSubmit = async (e) => {
    e.preventDefault()

    const file = e.target[0].files[0]
    const fileName = `${user.uid}/${file.name}`

    mutation.mutate({ file, fileName })
    
    e.target[0].value = ''
  }

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')))
  }, [setUser]) 
  
  return (
    !user ? <Navigate to={'/auth'} /> :
    <div className="container-fluid">
      <div className="row" style={{ height: '100%' }}>
        <div className="col-12">
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
            <form onSubmit={HandleSubmit}>
              <div className="form-group">
                <label>Upload your files</label>
                <input className='form-control' type="file" required/>
              </div>
              <div className="form-group">
                <Button type='submit' variant='primary'>Upload</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileSystem