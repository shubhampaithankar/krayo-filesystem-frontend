import React from "react"
import CircularProgress from '@mui/material/CircularProgress'


const Loader = () => {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100%' }}>
        <CircularProgress />
      </div>
    )
}

export default Loader