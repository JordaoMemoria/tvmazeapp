import { createSlice } from '@reduxjs/toolkit'
import { save } from '../../db/storage'

export const favoriteSeriesSlice = createSlice({
  name: 'fs',
  initialState: {
    favoriteSeries: [] as any
  },
  reducers: {
    loadFavoriteSeries: (state, action) => {
      state.favoriteSeries = action.payload
    },
    addFavoriteSerie: (state, action) => {
      state.favoriteSeries = [
        ...state.favoriteSeries,
        {
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image
        }
      ]
      save(state.favoriteSeries, 'favorite_series')
    },
    removeFavoriteSerie: (state, action) => {
      state.favoriteSeries = state.favoriteSeries.filter(
        (fs: any) => fs.id !== action.payload.id
      )
      save(state.favoriteSeries, 'favorite_series')
    }
  }
})

export const { addFavoriteSerie, removeFavoriteSerie, loadFavoriteSeries } =
  favoriteSeriesSlice.actions

export const selectFavoriteSeries = (state: any) => state.fs.favoriteSeries

export default favoriteSeriesSlice.reducer
