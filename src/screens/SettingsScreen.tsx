import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import RowSettings from '../components/RowSettings'
import TouchID from 'react-native-touch-id'
import { load, saveConfig } from '../db/storage'
import PINCodeCustom from '../components/PINCodeCustom'
import { Alert } from 'react-native'

export default function SettingsScreen() {
  const [availableID, setAvailableID] = useState('')
  const [authID, setAuthID] = useState('')
  const [pincode, setPincode] = useState('')

  const [pincodeScreen, setPincodeScreen] = useState(false)
  const [pincodeScreenMode, setPincodeScreenMode] = useState('choose') as any

  const onFinish = (settedCode: any) => {
    if (pincodeScreenMode === 'choose') {
      setPincode(settedCode)
      setPincodeScreen(false)
      saveConfig(settedCode, authID)
    } else if (pincodeScreenMode === 'enter') {
      setPincode('')
      setPincodeScreen(false)
      saveConfig('', authID)
    }
  }

  useEffect(() => {
    load('auth_config', (data: any) => {
      setPincode(data.pincode)
      setAuthID(data.authID)
    })
    TouchID.isSupported()
      .then((biometryType) => {
        if (biometryType === 'FaceID') {
          setAvailableID('Face ID')
        } else {
          setAvailableID('Touch ID')
        }
      })
      .catch(() => {})
  }, [])

  return pincodeScreen ? (
    <PINCodeCustom
      mode={pincodeScreenMode}
      pincode={pincode}
      onFinish={onFinish}
    />
  ) : (
    <Scroll>
      <RowSettings
        text='PIN number'
        activated={pincode !== '' ? true : false}
        onChange={(newValue: boolean) => {
          if (newValue) {
            setPincodeScreen(true)
            setPincodeScreenMode('choose')
          } else {
            setPincodeScreen(true)
            setPincodeScreenMode('enter')
          }
        }}
      />
      {availableID ? (
        <RowSettings
          text={availableID}
          activated={authID !== '' ? true : false}
          onChange={(newValue: boolean) => {
            if (newValue) {
              setAuthID(availableID)
              saveConfig(pincode, availableID)
            } else {
              TouchID.authenticate()
                .then(() => {
                  setAuthID('')
                  saveConfig(pincode, '')
                })
                .catch(() => {
                  Alert.alert('ID not recognized')
                })
            }
          }}
        />
      ) : null}
    </Scroll>
  )
}

const Scroll = styled.ScrollView``
