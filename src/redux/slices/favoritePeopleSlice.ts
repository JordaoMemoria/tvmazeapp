import { createSlice } from '@reduxjs/toolkit'
import { save } from '../../db/storage'

export const favoritePeopleSlice = createSlice({
  name: 'fp',
  initialState: {
    favoritePeople: [] as any
  },
  reducers: {
    loadFavoritePeople: (state, action) => {
      state.favoritePeople = action.payload
    },
    addFavoritePeople: (state, action) => {
      state.favoritePeople = [
        ...state.favoritePeople,
        {
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image
        }
      ]
      save(state.favoritePeople, 'favorite_people')
    },
    removeFavoritePeople: (state, action) => {
      state.favoritePeople = state.favoritePeople.filter(
        (fs: any) => fs.id !== action.payload.id
      )
      save(state.favoritePeople, 'favorite_people')
    }
  }
})

export const { addFavoritePeople, removeFavoritePeople, loadFavoritePeople } =
  favoritePeopleSlice.actions

export const addFavoritePeopleCallback = (action: any, callbalck: Function) => {
  return (dispatch: Function) => {
    dispatch(addFavoritePeople(action))
    callbalck()
  }
}

export const removeFavoritePeopleCallback = (
  action: any,
  callbalck: Function
) => {
  return (dispatch: Function) => {
    dispatch(removeFavoritePeople(action))
    callbalck()
  }
}

export const selectFavoritePeople = (state: any) => state.fp.favoritePeople
// state.{storeUserName} <- used to refer to this reducer

export default favoritePeopleSlice.reducer
