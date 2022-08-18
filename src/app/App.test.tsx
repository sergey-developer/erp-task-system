import React from 'react'

import { render } from 'tests/test-utils'

import App from './App'

test('Render App without crash', () => {
  render(<App />)
})
