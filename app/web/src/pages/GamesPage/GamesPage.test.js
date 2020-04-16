import { render, cleanup } from '@testing-library/react'

import GamesPage from './GamesPage'

describe('GamesPage', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<GamesPage />)
    }).not.toThrow()
  })
})
