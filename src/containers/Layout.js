import React from 'react'
import Header from './Header'
import { Box } from '@mui/system'
import { Alert, Snackbar } from '@mui/material'
import useToggleTheme from '../hooks/useToggleTheme'

const Layout = ({ children, ...rest }) => {
  const { successMessage, setSuccessMessage } = useToggleTheme()

  const handleClose = () => {
    setSuccessMessage('')
  }

  return (
    <>
      <Header {...rest} />
      <Box marginTop={'20px'}>{children}</Box>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Layout
