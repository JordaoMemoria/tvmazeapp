import React from 'react'
import { formatSummary, filterIDs, orderByName } from '../../src/common/utils'
import renderer from 'react-test-renderer'

jest.useFakeTimers()

describe('Utils', () => {
  it('formatSummary', () => {
    expect(formatSummary('<p>Text format summary<tag></p>')).toBe(
      'Text format summary'
    )
  })
  it('filterIDs', () => {
    expect(
      filterIDs([
        { id: 1, rest: 'a' },
        { id: 2, rest: 'a' },
        { id: 3, rest: 'a' },
        { id: 4, rest: 'a' },
      ])
    ).toStrictEqual([1, 2, 3, 4])
  })
  it('orderByName', () => {
    expect(
      orderByName([
        { id: 1, name: 'Carlos' },
        { id: 2, name: 'Ana' },
        { id: 3, name: 'Berick' },
        { id: 4, name: 'Daniel' },
      ])
    ).toStrictEqual([
      { id: 2, name: 'Ana' },
      { id: 3, name: 'Berick' },
      { id: 1, name: 'Carlos' },
      { id: 4, name: 'Daniel' },
    ])
  })
})
