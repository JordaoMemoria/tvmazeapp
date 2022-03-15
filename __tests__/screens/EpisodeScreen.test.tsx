import React from 'react'
import EpisodeScreen from '../../src/screens/EpisodeScreen'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

describe('<EpisodeScreen />', () => {
  it('Renders correctly', () => {
    const mockedParams = {
      route: {
        params: {
          id: 2,
          season: 1,
          number: 5,
          name: 'Rickverso',
          serieName: 'Rick and Morty',
        },
      },
      navigation: {
        setOptions: (props: { title: 'Rick and Morty' }) => {},
      },
    }

    const tree = renderer.create(<EpisodeScreen {...mockedParams} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
