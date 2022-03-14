import React from 'react'
import styled from 'styled-components/native'
import styles from '../common/styles'
import Favorite from './Favorite'
import { ItemProp } from '../typescript/interfaces'
import { Dimensions } from 'react-native'
import {
  useNavigation,
  useRoute,
  useNavigationState
} from '@react-navigation/native'
// import { addFavoriteSerie, removeFavoriteSerie } from '../db/favoriteSeries'
// import { addFavoritePeople, removeFavoritePeople } from '../db/favoritePeople'
import WhiteSquare from './WhiteSquare'

import { useDispatch } from 'react-redux'
import {
  addFavoriteSerie,
  removeFavoriteSerie
} from '../redux/slices/favoriteSeriesSlice'
import {
  addFavoritePeople,
  removeFavoritePeople
} from '../redux/slices/favoritePeopleSlice'

export default function Item({
  id,
  name,
  image,
  favorite,
  category,
  showFavorite,
  canClick
}: ItemProp) {
  const navigation = useNavigation() as any
  const route = useRoute() as any

  const dispatch = useDispatch()
  const favoriteClicked = async (value: boolean) => {
    if (category === 'Series') {
      if (value) {
        dispatch(addFavoriteSerie({ id, name, image }))
      } else {
        dispatch(removeFavoriteSerie({ id }))
      }
    } else {
      if (value) {
        dispatch(addFavoritePeople({ id, name, image }))
      } else {
        dispatch(removeFavoritePeople({ id }))
      }
    }
  }

  const rowWithoutImage = () => {
    return (
      <RowWithoutImage>
        <NameViewWithoutImage>
          <Name>{name}</Name>
        </NameViewWithoutImage>
        {showFavorite ? (
          <Favorite
            value={favorite}
            onValueChange={favoriteClicked}
            absolute={false}
          />
        ) : null}
      </RowWithoutImage>
    )
  }

  const itemClicked = () => {
    if (category === 'Series') {
      const serieRoute =
        route.name === 'Favorites' || route.name === 'PersonF'
          ? 'SerieF'
          : 'Serie'
      navigation.navigate(serieRoute, { id, name, image })
    } else {
      const personRoute = route.name === 'Favorites' ? 'PersonF' : 'Person'
      navigation.navigate(personRoute, { id, name, image })
    }
  }

  return (
    <Button onPress={itemClicked} disabled={!canClick}>
      {image !== '' ? (
        <Image
          source={{ uri: image }}
          imageStyle={{
            borderRadius: 20
          }}
        >
          <WhiteSquare text={name} absolute />
          {showFavorite ? (
            <Favorite
              value={favorite}
              onValueChange={favoriteClicked}
              absolute={true}
            />
          ) : null}
        </Image>
      ) : (
        rowWithoutImage()
      )}
    </Button>
  )
}

const Image = styled.ImageBackground`
  width: ${Dimensions.get('screen').width - 20}px;
  margin-left: 10px;
  margin-top: 10px;
  height: ${Dimensions.get('screen').width - 20}px;
  justify-content: flex-end;
`
const RowWithoutImage = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
  border-width: 1px;
  border-color: ${styles.colors.primary};
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
  border-radius: 20px;
  padding-left: 10px;
`
const NameViewWithoutImage = styled.View`
  background-color: ${styles.colors.background};
`
const Name = styled.Text`
  font-size: 20px;
`
const Button = styled.TouchableWithoutFeedback``
