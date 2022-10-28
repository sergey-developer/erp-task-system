import { render } from '_tests_/utils'
import { within } from '@testing-library/react'

import FilterTag from '../FilterTag'
import { filterCheckedClass, requiredProps } from './constants'
import { getCheckableTag, getFilterTag, loadingStarted } from './utils'

describe('FilterTag', () => {
  test('Отображает состояние загрузки', () => {
    render(<FilterTag {...requiredProps} loading />)

    const container = getFilterTag()
    loadingStarted(container)
  })

  test('Отображает текст', () => {
    render(<FilterTag {...requiredProps} />)

    const container = getFilterTag()
    expect(within(container).getByText(requiredProps.text)).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается если оно присутствует (включая "0")', () => {
      render(<FilterTag {...requiredProps} />)

      const container = getFilterTag()

      expect(
        within(container).getByText(requiredProps.amount!),
      ).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FilterTag {...requiredProps} amount={null} />)

      const container = getFilterTag()

      expect(
        within(container).queryByText(requiredProps.amount!),
      ).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FilterTag {...requiredProps} checked />)

    const filter = getCheckableTag()
    expect(filter).toHaveClass(filterCheckedClass)
  })

  test('Можно сделать не выбранным', () => {
    render(<FilterTag {...requiredProps} checked={false} />)

    const filter = getCheckableTag()
    expect(filter).not.toHaveClass(filterCheckedClass)
  })

  describe('"onChange"', () => {
    const onChange = jest.fn()

    afterEach(() => {
      onChange.mockReset()
    })

    test('Вызывается если элемент активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled={false} onChange={onChange} />,
      )

      const filter = getCheckableTag()
      await user.click(filter)

      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled onChange={onChange} />,
      )

      const filter = getCheckableTag()
      await user.click(filter)

      expect(onChange).not.toBeCalled()
    })
  })
})
