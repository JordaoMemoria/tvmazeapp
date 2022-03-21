import React, { useState } from 'react'
import styles from '../common/styles'
import { Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import SearchBar from 'react-native-dynamic-search-bar'
import styled from 'styled-components/native'
import { SearchProps } from '../typescript/interfaces'
import CategoryRow from './CategoryRow'

export default function SearchBarMaze({
  searching,
  onType,
  onCancel,
  category,
}: SearchProps) {
  const SearchBarTypecript = SearchBar as any
  const [filter, setFilter] = useState(false)
  const [currentText, setCurrentText] = useState('')

  const onChangeText = (text: string) => {
    text.length === 0 ? setFilter(false) : setFilter(true)
    setCurrentText(text)
    onType(text, category)
  }

  const onCancelPressed = () => {
    setFilter(false)
    onCancel()
  }

  return (
    <>
      <SearchContainer>
        <SearchBarTypecript
          style={{
            width: Dimensions.get('screen').width - 20,
            height: 45,
            borderRadius: 20,
          }}
          fontSize={styles.fonts.big}
          fontColor={styles.colors.primary}
          placeholder='Search'
          searchIconComponent={
            <Ionicons name='search' size={24} color={styles.colors.primary} />
          }
          clearIconComponent={
            <MaterialIcons
              name='clear'
              size={24}
              color={styles.colors.primary}
            />
          }
          placeholderTextColor={styles.colors.primary}
          spinnerVisibility={searching}
          spinnerColor={styles.colors.primary}
          spinnerSize={20}
          onChangeText={onChangeText}
          onClearPress={onCancelPressed}
        />
      </SearchContainer>
      {filter ? (
        <CategoryRow
          category={category}
          onChange={(newCategory: string) => onType(currentText, newCategory)}
        />
      ) : null}
    </>
  )
}

const SearchContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  height: ${styles.rowHeight}px;
  background-color: ${styles.colors.primary};
  justify-content: center;
`
