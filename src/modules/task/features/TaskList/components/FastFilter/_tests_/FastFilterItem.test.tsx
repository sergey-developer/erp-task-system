import { render, within } from '_tests_/utils'

import FastFilterItem from '../FastFilterItem'
import { filterCheckedClass, requiredProps } from './constants'
import { getFilterContainer, getFilterItem } from './utils'

describe('FastFilterItem', () => {
  test('Отображает состояние загрузки', () => {
    render(<FastFilterItem {...requiredProps} loading />)

    const container = getFilterContainer()
    const skeleton = container.querySelector('.ant-skeleton-active')

    expect(skeleton).toBeInTheDocument()
  })

  test('Отображает текст', () => {
    render(<FastFilterItem {...requiredProps} />)

    const container = getFilterContainer()
    expect(within(container).getByText(requiredProps.text)).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается если оно присутствует (включая "0")', () => {
      render(<FastFilterItem {...requiredProps} />)

      const container = getFilterContainer()

      expect(
        within(container).getByText(requiredProps.amount!),
      ).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FastFilterItem {...requiredProps} amount={null} />)

      const container = getFilterContainer()

      expect(
        within(container).queryByText(requiredProps.amount!),
      ).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FastFilterItem {...requiredProps} checked />)

    const filter = getFilterItem()
    expect(filter).toHaveClass(filterCheckedClass)
  })

  test('Можно сделать не выбранным', () => {
    render(<FastFilterItem {...requiredProps} checked={false} />)

    const filter = getFilterItem()
    expect(filter).not.toHaveClass(filterCheckedClass)
  })

  describe('"onChange"', () => {
    const onChange = jest.fn()

    afterEach(() => {
      onChange.mockReset()
    })

    test('Вызывается если элемент активный', async () => {
      const { user } = render(
        <FastFilterItem
          {...requiredProps}
          disabled={false}
          onChange={onChange}
        />,
      )

      const filter = getFilterItem()
      await user.click(filter)

      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(
        <FastFilterItem {...requiredProps} disabled onChange={onChange} />,
      )

      const filter = getFilterItem()
      await user.click(filter)

      expect(onChange).not.toBeCalled()
    })
  })
})
