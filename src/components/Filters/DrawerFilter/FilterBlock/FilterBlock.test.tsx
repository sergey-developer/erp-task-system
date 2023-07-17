import { screen } from '@testing-library/react'

import { fakeWord, render } from '_tests_/utils'

import FilterBlock, { FilterBlockProps } from './index'

const props: FilterBlockProps = {
  label: fakeWord(),
  onReset: jest.fn(),
}

describe('FilterBlock', () => {
  test('Отображает children', () => {
    render(
      <FilterBlock {...props}>
        <span>children</span>
      </FilterBlock>,
    )

    const children = screen.getByText('children')
    expect(children).toBeInTheDocument()
  })
})
