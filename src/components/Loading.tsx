import React from 'react';
import styles from '../common/styles';
import styled from 'styled-components/native';

export default function Loading(props: any) {
  return <Indicator size="large" color={styles.colors.primary} {...props} />;
}

const Indicator = styled.ActivityIndicator`
  margin-top: ${(props: any) => {
    return props.margin;
  }}px;
`;
