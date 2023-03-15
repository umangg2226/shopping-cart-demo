import { toggleTheme as toggleThemeMethod } from '../features/theme'
import { useSelector, useDispatch } from 'react-redux'

const useToggleTheme = () => {
  const { darkMode } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const toggleTheme = () => {
    dispatch(toggleThemeMethod())
  }

  return {
    toggleTheme,
    darkMode,
  }
}

export default useToggleTheme
