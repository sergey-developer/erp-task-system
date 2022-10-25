import { render } from '_tests_/utils'
import { screen } from '@testing-library/react'

import FilterBlock from './index'

describe('FilterBlock', () => {
  test('Отображает children', () => {
    render(
      <FilterBlock withDivider>
        <span>children</span>
      </FilterBlock>,
    )

    const children = screen.getByText('children')
    expect(children).toBeInTheDocument()
  })

  test('Отображает разделить если передать нужные данные', () => {
    render(
      <FilterBlock withDivider>
        <span>children</span>
      </FilterBlock>,
    )

    const separator = screen.getByRole('separator')
    expect(separator).toBeInTheDocument()
  })

  test('Не отображает разделить если не передать нужные данные', () => {
    render(
      <FilterBlock withDivider={false}>
        <span>children</span>
      </FilterBlock>,
    )

    const separator = screen.queryByRole('separator')
    expect(separator).not.toBeInTheDocument()
  })
})
