import React from 'react';
import styled from 'styled-components/native';
import RowSettings from '../components/RowSettings';

export default function SettingsScreen() {
  return (
    <Scroll>
      <RowSettings
        text="PIN number"
        activated={false}
        onChange={(newValue: boolean) => {}}
      />
      <RowSettings text="Fingetprint" activated={false} onChange={() => {}} />
      <RowSettings text="Face ID" activated={false} onChange={() => {}} />
    </Scroll>
  );
}

const Scroll = styled.ScrollView``;
