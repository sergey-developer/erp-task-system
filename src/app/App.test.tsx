import React from 'react'

import { render } from '__tests__/utils'

import App from './App'

test('Render App without crash', () => {
  render(<App />)
})
