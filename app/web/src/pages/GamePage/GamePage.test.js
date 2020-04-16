import { render, cleanup } from '@testing-library/react'

import GamePage from './GamePage'

describe('GamePage', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<GamePage />)
    }).not.toThrow()
  })
})
