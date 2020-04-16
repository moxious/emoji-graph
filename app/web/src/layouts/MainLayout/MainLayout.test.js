import { render, cleanup } from '@testing-library/react'

import MainLayout from './MainLayout'

describe('MainLayout', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<MainLayout />)
    }).not.toThrow()
  })
})
