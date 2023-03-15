import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import AppRoutes from './containers/AppRoutes'
import useToggleTheme from './hooks/useToggleTheme'
import { Container } from '@mui/system'
import { darkTheme, lightTheme } from './containers/theme'

const App = () => {
  const { darkMode } = useToggleTheme()

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container maxWidth='xl'>
        <AppRoutes />
      </Container>
    </ThemeProvider>
  )
}

export default App
