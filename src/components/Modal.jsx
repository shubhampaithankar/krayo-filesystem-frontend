import React, { useContext, createContext } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  outline: 0
}

export const ModalContext = createContext()

const BasicModal = () => {
  const { modalOpen, setModalOpen, setModalTitle, setModalBody, modalTitle, modalBody } = useContext(ModalContext)
  const handleClose = () => {
    setModalTitle('')
    setModalBody('')
    setModalOpen(false)
  }

  return (
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { modalTitle }
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            { modalBody }
          </Typography>
        </Box>
      </Modal>
  )
}

export default BasicModal