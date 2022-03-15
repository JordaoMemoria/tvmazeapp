import React from 'react'
import LoadingScreen from '../../src/screens/LoadingScreen'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

describe('<LoadingScreen />', () => {
  it('Renders correctly', () => {
    const tree = renderer.create(<LoadingScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
