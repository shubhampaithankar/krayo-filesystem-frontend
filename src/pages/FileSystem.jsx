import React, { useEffect, useContext,useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import DownloadIcon from '@mui/icons-material/Download'
import LinearProgress from '@mui/material/LinearProgress'

import { AuthService, FileService } from '../services'

import { ModalContext } from '../components/Modal'

const FileSystem = ({ user, setUser }) => {

  const navigate = useNavigate()

  const [fileList, setFileList] = useState([])
  const { setModalOpen, setModalTitle, setModalBody } = useContext(ModalContext)

  const { isLoading, refetch } =  useQuery({
    queryKey: 'getFileList',
    queryFn: () => FileService.getAllUserFiles(user?.id),
    onSuccess: ({ data }) => {
      setFileList(data.files)
    }, 
    onError: (err) => {
      if (err.response.status === 401) {
        AuthService.logoutUser()
        sessionStorage.removeItem('user')
        setUser('')
        navigate('/')
      }
    }
  })

  const uploadMutation = useMutation({
    mutationFn: (event) => {
      event.preventDefault()

      const file = event.target[0].files[0]

      const formData = new FormData()
      formData.append('file', file)
      formData.append('id', user.id)

      return FileService.uploadFile(formData)
    },
    onError: (err, variables, context) => {
      if (err.response.status === 401) {
        AuthService.logoutUser()
        sessionStorage.removeItem('user')
        setUser('')
        navigate('/')
      } else {
        setModalOpen(true)
        setModalTitle('Failed')
        setModalBody('There was an error')
      }
    },
    onSuccess: (data, variables, context) => {
      setModalOpen(true)
      setModalTitle('Success')
      setModalBody('File uploaded successfully')
      refetch()
    }, 
    onSettled: () => {
      console.log(`settled`)
    }
  })

  const downloadMutation = useMutation({
    mutationFn: (fileName) => {
      return FileService.downloadFile(fileName)
    },
    onError: (err, variables, context) => {
      if (err.response.status === 401) {
        AuthService.logoutUser()
        sessionStorage.removeItem('user')
        setUser('')
        navigate('/')
      }
    },
    onSuccess: ({ data: { url } } , variables, context) => {
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', variables.split('/')[1])
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    }
  })

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('user')))
  }, [setUser, fileList]) 
  
  return (
    !user ? <Navigate to={'/auth'} /> :
    <div className='container-fluid'>
      <div className='row' style={{ height: '100%' }}>
        <div className='col-12'>
          <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: '100%' }}>
            <form onSubmit={uploadMutation.mutate} className="form my-3" style={{ width: '50%' }} encType="multipart/form-data">
              <div className='form-group my-2'>
                <label className='text-center'>Upload your files</label>
                <input className='form-control' type='file' disabled={uploadMutation.isLoading} required />
                <Button className='btn' type='submit' variant='primary' disabled={uploadMutation.isLoading}>Upload</Button>
              </div>
              { uploadMutation.isLoading ? <LinearLoader text={'Uploading please wait...'}/> : null }
            </form>
            <table className='table table-striped' style={{ width: '75%' }}>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>FileName</th>
                  <th scope='col'>Last Updated</th>
                  <th scope='col'>Size</th>
                  <th scope='col'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  !isLoading ?
                  fileList.map((file, index) => {
                    return (
                      <tr key={file.ETag + `${index}`}>
                        <th scope='row'>{ index + 1 }</th>
                        <td>{ removeUserID(file.Key, user.id) }</td>
                        <td>{ file.LastModified.slice(0,10) }</td>
                        <td>{ formatFileSize(file.Size) }</td>
                        <td>
                          <button className='btn py-0 px-2' onClick={() => downloadMutation.mutate(file.Key)} disabled={uploadMutation.isLoading || downloadMutation.isLoading}>
                            <DownloadIcon />
                          </button>
                        </td>
                      </tr>
                    )
                  }) :
                  null
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

const removeUserID = (string, id) => string.replace(`${id}/`, '')

const formatFileSize = (bytes,decimalPoint) => {
  if(bytes === 0) return '0 Bytes'
  var k = 1000,
      dm = decimalPoint || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const LinearLoader = ({ text }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <div className='text-center mb-2'>
        { text }
      </div>
      <LinearProgress />
    </Box>
  )
}

export default FileSystem