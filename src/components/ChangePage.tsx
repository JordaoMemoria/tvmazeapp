import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import styles from '../common/styles'
import { ChangePageProps } from '../typescript/interfaces'

export default function ChangePage({ page, next, back }: ChangePageProps) {
  return (
    <FilterContainer>
      <SmallBlock />
      {page > 0 ? (
        <>
          <Button onPress={() => back()}>
            <Label>Back</Label>
          </Button>
          <SmallBlock />
        </>
      ) : null}
      <Button onPress={() => next()}>
        <Label>Next</Label>
      </Button>
      <SmallBlock />
    </FilterContainer>
  )
}

const FilterContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${styles.rowHeight}px;
  background-color: ${styles.colors.background};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
`
const SmallBlock = styled.View`
  width: 10px;
`
const Button = styled.TouchableOpacity`
  background-color: ${styles.colors.primary};
  flex: 1;
  align-items: center;
  height: 40px;
  justify-content: center;
  border-radius: 20px;
`
const Label = styled.Text`
  font-size: ${styles.fonts.big}px;
  color: ${styles.colors.background};
`
