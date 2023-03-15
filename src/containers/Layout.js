import React from 'react'
import Header from './Header'
import { Box } from '@mui/system'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box marginTop={'20px'}>{children}</Box>
    </>
  )
}

export default Layout
