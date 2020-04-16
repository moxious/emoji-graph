import { render, cleanup } from '@testing-library/react'

import EmojiMatrix from './EmojiMatrix'

describe('EmojiMatrix', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<EmojiMatrix />)
    }).not.toThrow()
  })
})
