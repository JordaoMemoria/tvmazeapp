import React from 'react';
import styled from 'styled-components/native';
import Loading from '../components/Loading';

export default function LoadingScreen() {
  return (
    <View>
      <Loading margin={0} />
    </View>
  );
}

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
