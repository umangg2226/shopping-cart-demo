import {
  toggleTheme as toggleThemeMethod,
  showSuccess,
} from '../features/theme'
import { useSelector, useDispatch } from 'react-redux'

const useToggleTheme = () => {
  const { darkMode, successMessage } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const toggleTheme = () => {
    dispatch(toggleThemeMethod())
  }

  const setSuccessMessage = (message) => {
    dispatch(showSuccess(message))
  }

  return {
    toggleTheme,
    darkMode,
    successMessage,
    setSuccessMessage,
  }
}

export default useToggleTheme
