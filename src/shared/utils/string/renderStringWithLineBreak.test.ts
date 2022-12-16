import { render } from '@testing-library/react'

import renderStringWithLineBreak from './renderStringWithLineBreak'

test('Верно отображает строку с переносами', () => {
  render(renderStringWithLineBreak('q\nq\nq\n') as any)
  expect(document.body).toContainHTML('q<br/>q<br/>q<br/>')
})
