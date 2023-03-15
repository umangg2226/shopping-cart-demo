import React from 'react'
import Header from './Header'
import { Box } from '@mui/system'

const Layout = ({ children, ...rest }) => {
  return (
    <>
      <Header {...rest} />
      <Box marginTop={'20px'}>{children}</Box>
    </>
  )
}

export default Layout
