import React from 'react'
import styles from '../common/styles'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { CategoryRowProps } from '../typescript/interfaces'

export default function CategoryRow({ onChange, category }: CategoryRowProps) {
  return (
    <FilterContainer>
      <SmallBlock />
      {category === 'Series' ? (
        <>
          <ButtonOn>
            <LabelOn>Series</LabelOn>
          </ButtonOn>
          <SmallBlock />
          <ButtonOff
            onPress={() => {
              onChange('People')
            }}
          >
            <LabelOff>People</LabelOff>
          </ButtonOff>
        </>
      ) : (
        <>
          <ButtonOff
            onPress={() => {
              onChange('Series')
            }}
          >
            <LabelOff>Series</LabelOff>
          </ButtonOff>
          <SmallBlock />
          <ButtonOn>
            <LabelOn>People</LabelOn>
          </ButtonOn>
        </>
      )}
      <SmallBlock />
    </FilterContainer>
  )
}

const FilterContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${styles.rowHeight - 1}px;
  background-color: ${styles.colors.background};
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${styles.colors.primary};
  flex-direction: row;
  justify-content: space-around;
`
const SmallBlock = styled.View`
  width: 10px;
`
const ButtonOn = styled.TouchableOpacity`
  background-color: ${styles.colors.primary};
  flex: 1;
  align-items: center;
  height: 40px;
  justify-content: center;
  border-radius: 20px;
`
const LabelOn = styled.Text`
  font-size: ${styles.fonts.big}px;
  color: ${styles.colors.background};
`
const ButtonOff = styled.TouchableOpacity`
  background-color: ${styles.colors.background};
  flex: 1;
  align-items: center;
  height: 40px;
  justify-content: center;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${styles.colors.primary};
`
const LabelOff = styled.Text`
  font-size: ${styles.fonts.big}px;
  color: ${styles.colors.primary};
`
