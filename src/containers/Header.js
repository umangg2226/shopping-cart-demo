import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
} from '@mui/material'
import { LightMode, DarkMode, ShoppingCart } from '@mui/icons-material'
import useToggleTheme from '../hooks/useToggleTheme'
import useCart from '../hooks/useCart'

const Header = ({ history }) => {
  const { darkMode, toggleTheme } = useToggleTheme()
  const { cartItems } = useCart()

  return (
    <AppBar position='sticky' disablegutters='true'>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ display: { xs: 'none', sm: 'block' } }}
          style={{ cursor: 'pointer' }}
          onClick={() => {
            history.push('/')
          }}
        >
          Shopping Task
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
            size='large'
            edge='end'
            onClick={toggleTheme}
            color='inherit'
          >
            {darkMode ? <LightMode /> : <DarkMode />}
          </IconButton>
          <IconButton
            size='large'
            color='inherit'
            onClick={() => {
              history.push('/cart')
            }}
          >
            <Badge badgeContent={cartItems?.length} color='error'>
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
