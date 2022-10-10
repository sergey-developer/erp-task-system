import { render, within } from '_tests_/utils'

import FilterTag from '../FilterTag'
import {
  filterCheckedClass,
  filterTagRequiredProps as requiredProps,
} from './constants'
import { getFilterTag, getFilterTagContainer, waitStartLoading } from './utils'

describe('FilterTag', () => {
  test('Отображает состояние загрузки', () => {
    render(<FilterTag {...requiredProps} loading />)

    const container = getFilterTagContainer()
    waitStartLoading(container)
  })

  test('Отображает текст', () => {
    render(<FilterTag {...requiredProps} />)

    const container = getFilterTagContainer()
    expect(within(container).getByText(requiredProps.text)).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается если оно присутствует (включая "0")', () => {
      render(<FilterTag {...requiredProps} />)

      const container = getFilterTagContainer()

      expect(
        within(container).getByText(requiredProps.amount!),
      ).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FilterTag {...requiredProps} amount={null} />)

      const container = getFilterTagContainer()

      expect(
        within(container).queryByText(requiredProps.amount!),
      ).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FilterTag {...requiredProps} checked />)

    const filter = getFilterTag()
    expect(filter).toHaveClass(filterCheckedClass)
  })

  test('Можно сделать не выбранным', () => {
    render(<FilterTag {...requiredProps} checked={false} />)

    const filter = getFilterTag()
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

      const filter = getFilterTag()
      await user.click(filter)

      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled onChange={onChange} />,
      )

      const filter = getFilterTag()
      await user.click(filter)

      expect(onChange).not.toBeCalled()
    })
  })
})
