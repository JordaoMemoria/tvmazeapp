import React, { useEffect, useState } from 'react'
import Item from '../components/Item'
import styled from 'styled-components/native'
import Loading from '../components/Loading'
import { getPerson } from '../tvmaze/api'
import { NavigationProps } from '../typescript/interfaces'
import BlueSquare from '../components/BlueSquare'
import SmallHeight from '../components/SmallHeight'
import { useSelector } from 'react-redux'
import { selectFavoriteSeries } from '../redux/slices/favoriteSeriesSlice'
import { selectFavoritePeople } from '../redux/slices/favoritePeopleSlice'
import { filterIDs } from '../common/utils'

export default function PersonScreen({ route }: NavigationProps) {
  const { id, name, image } = route.params
  const [show, setShows] = useState<any[]>() as any
  const favoriteSeries = filterIDs(useSelector(selectFavoriteSeries))
  const favoritePeople = filterIDs(useSelector(selectFavoritePeople))

  const generateFlatList = () => {
    if (show === 'No series found') {
      return <BlueSquare text={show} />
    }
    let key = 1
    let components = []
    for (let e of show) {
      const isFavorite = favoriteSeries.includes(e.id) ? true : false
      components.push(
        <Item
          key={key}
          id={e.id}
          canClick={true}
          name={e.name}
          image={e.image}
          category='Series'
          showFavorite={true}
          favorite={isFavorite}
        />
      )
      key++
    }
    return components
  }

  useEffect(() => {
    getPerson(id, (data: any) => {
      setShows(data)
    })
  }, [])

  const isFavorite = favoritePeople.includes(id) ? true : false

  return (
    <Scroll>
      <Item
        category='People'
        id={id}
        canClick={false}
        favorite={isFavorite}
        showFavorite={true}
        name={name}
        image={image}
      />
      {show ? generateFlatList() : <Loading />}
      <SmallHeight />
    </Scroll>
  )
}

const Scroll = styled.ScrollView``
