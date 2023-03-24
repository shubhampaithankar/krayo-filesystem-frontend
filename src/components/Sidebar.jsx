// eslint-disable-next-line
import React, { useEffect, useState, useContext } from 'react'
import { useQuery, useMutation } from 'react-query'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

// import ReactS3Client from '../modules/aws-sdk'

import DownloadIcon from '@mui/icons-material/Download'
// eslint-disable-next-line
import { ModalContext } from '../components/Modal'
import { FileService } from '../services'

const Sidebar = () => {

  const user = JSON.parse(sessionStorage.getItem('user'))

  const location = useLocation()
  const [fileList, setFileList] = useState([])
  // const { setModalOpen, setModalTitle, setModalBody } = useContext(ModalContext)

  useQuery({
    queryKey: ['fileList'],
    queryFn: () => user ? FileService.getAllUserFiles(user?.id): new Promise((res, rej) => res),
    onSuccess: ({ data }) => {
      setFileList(data.files)
    }, onError: (err) => {
      console.log(err)
    }
  })

  const mutation = useMutation({
    mutationFn: ({ file }) => {
      return axios({
        url: file.publicUrl,
        method: 'GET',
        responseType: 'blob'
      })
    },
    onError: (error, variables) => {
    },
    onSuccess: (data, variables) => {
      const file = data.data
      const url = window.URL.createObjectURL(new Blob([file]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', removeUserID(variables.file.Key, user.id))
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    }
  })

  const handleClick = async (file) => {
    mutation.mutate({ file })
  }

  useEffect(() => {
  }, [location.pathname]) 

  return (
    user && location.pathname !== '/auth/login/success' ?
    <aside style={{ width: '450px', height: '100%', position: 'fixed', paddingTop: '60px' }}>
      <h3 className="mx-auto my-2 text-center">File List</h3>
      <div className=''>
        <ul className="m-0 p-0 list-group">
          {
            fileList.length ? fileList.map(file => {
              return (
                <li key={file['ETag']} className='list-group-item'>
                  <span className="m-0" style={{ wordWrap: 'break-word' }}>{removeUserID(file.Key, user.id)}</span>
                  <button className="btn my-0 mx-2" onClick={() => handleClick(file)}>
                    <DownloadIcon />
                  </button>
                </li>
              )
            }) : null
          }
          <p></p>
        </ul>
      </div>
    </aside> : null
  )
}

const removeUserID = (string, id) => string.replace(`${id}/`, '')

export default Sidebar