import React from 'react'
import styles from '../common/styles'
import styled from 'styled-components/native'

export default function Loading() {
  return <Indicator size='large' color={styles.colors.primary} />
}

const Indicator = styled.ActivityIndicator`
  margin-top: 50px;
`
