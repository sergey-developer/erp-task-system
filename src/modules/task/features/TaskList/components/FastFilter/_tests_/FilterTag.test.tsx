import { loadingStartedBySkeletonIn, render } from '_tests_/utils'
import { screen } from '@testing-library/react'

import FilterTag from '../FilterTag'
import { requiredProps } from './constants'
import fastFilterTestUtils from './utils'

describe('FilterTag', () => {
  test('Отображает состояние загрузки', () => {
    render(<FilterTag {...requiredProps} loading />)

    loadingStartedBySkeletonIn(fastFilterTestUtils.getFilterTag())
  })

  test('Отображает текст', () => {
    render(<FilterTag {...requiredProps} />)

    expect(screen.getByText(requiredProps.text)).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается если оно присутствует (включая "0")', () => {
      const amount = 0
      render(<FilterTag {...requiredProps} amount={amount} />)

      expect(screen.getByText(amount)).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FilterTag {...requiredProps} amount={null} />)

      expect(screen.queryByText(requiredProps.amount!)).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FilterTag {...requiredProps} checked />)

    fastFilterTestUtils.expectFilterChecked(
      fastFilterTestUtils.getCheckableTag(requiredProps.value),
    )
  })

  test('Можно сделать не выбранным', () => {
    render(<FilterTag {...requiredProps} checked={false} />)

    fastFilterTestUtils.expectFilterNotChecked(
      fastFilterTestUtils.getCheckableTag(requiredProps.value),
    )
  })

  describe('Обработчик изменения', () => {
    const onChange = jest.fn()

    afterEach(() => {
      onChange.mockReset()
    })

    test('Вызывается если элемент активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled={false} onChange={onChange} />,
      )

      const filter = fastFilterTestUtils.getCheckableTag(requiredProps.value)
      await user.click(filter)

      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled onChange={onChange} />,
      )

      const filter = fastFilterTestUtils.getCheckableTag(requiredProps.value)
      await user.click(filter)

      expect(onChange).not.toBeCalled()
    })
  })
})
