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

const Header = () => {
  const { darkMode, toggleTheme } = useToggleTheme()

  return (
    <AppBar position='sticky' disablegutters='true'>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ display: { xs: 'none', sm: 'block' } }}
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
          <IconButton size='large' color='inherit'>
            <Badge badgeContent={17} color='error'>
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
