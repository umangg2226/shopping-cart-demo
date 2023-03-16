import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    categories: [],
    brands: [],
    ranges: [],
  },
  sortBy: 0,
}

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      return {
        ...(state || {}),
        filters: { ...(action.payload || []) },
      }
    },
    setSortBy: (state, action) => {
      return {
        ...(state || {}),
        sortBy: action.payload,
      }
    },
  },
})

export const { setFilters, setSortBy } = filtersSlice.actions

export default filtersSlice.reducer
