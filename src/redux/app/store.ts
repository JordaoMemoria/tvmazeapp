import { configureStore } from '@reduxjs/toolkit'
import favoriteSeriesReducer from '../slices/favoriteSeriesSlice'
import favoritePeopleReducer from '../slices/favoritePeopleSlice'

export default configureStore({
  reducer: {
    fs: favoriteSeriesReducer,
    fp: favoritePeopleReducer
  }
})
