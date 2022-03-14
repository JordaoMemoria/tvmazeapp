import React, { useState } from 'react'
import { FlatList } from 'react-native'
import CategoryRow from '../components/CategoryRow'
import SmallHeight from '../components/SmallHeight'
import Item from '../components/Item'
import { selectFavoriteSeries } from '../redux/slices/favoriteSeriesSlice'
import { selectFavoritePeople } from '../redux/slices/favoritePeopleSlice'
import { useSelector } from 'react-redux'
import { filterIDs, orderByName } from '../common/utils'

export default function FavoriteScreen() {
  const [category, setCategory] = useState('Series')
  const favoriteSeries = orderByName(useSelector(selectFavoriteSeries))
  const favoritePeople = orderByName(useSelector(selectFavoritePeople))
  const favoriteSeriesIDs = filterIDs(favoriteSeries)
  const favoritePeopleIDs = filterIDs(favoritePeople)
  return (
    <>
      <CategoryRow
        category={category}
        onChange={(c: string) => setCategory(c)}
      />
      <FlatList
        data={category === 'Series' ? favoriteSeries : favoritePeople}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const { id, name, image } = item
          let isFavorite = false
          if (category === 'Series') {
            isFavorite = favoriteSeriesIDs.includes(id) ? true : false
          } else {
            isFavorite = favoritePeopleIDs.includes(id) ? true : false
          }
          return (
            <Item
              id={id}
              canClick={true}
              name={name}
              image={image}
              favorite={isFavorite}
              showFavorite={true}
              category={category}
            />
          )
        }}
        ListFooterComponent={<SmallHeight />}
      />
    </>
  )
}
