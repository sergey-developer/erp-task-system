import { screen } from '@testing-library/react'

import { fakeWord, render } from '_tests_/helpers'

import TableRowsErrors from './index'

describe('Список ошибок строк таблицы', () => {
  test('Отображает номер строки и ошибки', () => {
    const rowNumber = 1
    const error1 = fakeWord()
    const error2 = fakeWord()
    render(<TableRowsErrors errors={{ [rowNumber]: [error1, error2] }} />)

    const errorText = `Строка №${rowNumber}: ${error1}, ${error2}`
    const errorEl = screen.getByText(errorText)
    expect(errorEl).toBeInTheDocument()
  })
})
