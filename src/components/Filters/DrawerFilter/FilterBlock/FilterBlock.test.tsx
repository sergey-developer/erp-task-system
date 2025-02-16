import { screen } from '@testing-library/react'

import { fakeWord, render } from '_tests_/helpers'

import FilterBlock, { FilterBlockProps } from './index'

const props: Readonly<FilterBlockProps> = {
  label: fakeWord(),
  onReset: jest.fn(),
}

describe('FilterBlock', () => {
  test('Отображается корректно', () => {
    render(
      <FilterBlock {...props}>
        <span>children</span>
      </FilterBlock>,
    )

    const children = screen.getByText('children')
    const label = screen.getByText(props.label)

    expect(children).toBeInTheDocument()
    expect(label).toBeInTheDocument()
  })

  describe('Кнопка "Сбросить"', () => {
    test('Отображается корректно', () => {
      render(
        <FilterBlock {...props}>
          <span>children</span>
        </FilterBlock>,
      )

      const resetButton = screen.getByRole('button', { name: 'Сбросить' })

      expect(resetButton).toBeInTheDocument()
      expect(resetButton).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <FilterBlock {...props}>
          <span>children</span>
        </FilterBlock>,
      )

      const resetButton = screen.getByRole('button', { name: 'Сбросить' })
      await user.click(resetButton)

      expect(props.onReset).toBeCalledTimes(1)
    })
  })
})
