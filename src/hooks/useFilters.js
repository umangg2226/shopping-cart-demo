import {
  setFilters as setFiltersMethod,
  setSortBy as setSortByMethod,
} from '../features/filters'
import { useDispatch, useSelector } from 'react-redux'

const useFilters = () => {
  const dispatch = useDispatch()
  const { filters, sortBy } = useSelector((state) => state.filters)

  const setFilters = (items) => {
    if (typeof items === 'function') {
      dispatch(setFiltersMethod(items(filters)))
    } else {
      dispatch(setFiltersMethod(items))
    }
  }

  const setSortBy = (value) => {
    if (typeof value === 'function') {
      dispatch(setFiltersMethod(value(sortBy)))
    } else {
      dispatch(setSortByMethod(value))
    }
  }

  return { setFilters, setSortBy, filters, sortBy }
}

export default useFilters
