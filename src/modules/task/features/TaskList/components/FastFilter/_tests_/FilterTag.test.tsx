import { render } from '_tests_/utils'

import FilterTag from '../FilterTag'
import { filterTagRequiredProps as requiredProps } from './constants'
import fastFilterTestUtils from './utils'

describe('Элемент быстрого фильтра', () => {
  test('Отображает состояние загрузки', async () => {
    render(<FilterTag {...requiredProps} loading />)
    await fastFilterTestUtils.loadingStarted()
  })

  test('Отображает текст', () => {
    render(<FilterTag {...requiredProps} />)

    expect(
      fastFilterTestUtils.getByTextInCheckableTag(
        requiredProps.value,
        requiredProps.text,
      ),
    ).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      const amount = 0
      render(<FilterTag {...requiredProps} amount={amount} />)

      expect(
        fastFilterTestUtils.getByTextInCheckableTag(
          requiredProps.value,
          amount,
        ),
      ).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FilterTag {...requiredProps} amount={null} />)

      expect(
        fastFilterTestUtils.queryByTextInCheckableTag(
          requiredProps.value,
          requiredProps.amount!,
        ),
      ).not.toBeInTheDocument()
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

  test('Можно сделать не активным', () => {
    render(<FilterTag {...requiredProps} disabled />)

    fastFilterTestUtils.expectFilterNotChecked(
      fastFilterTestUtils.getCheckableTag(requiredProps.value),
    )
  })

  test('Если элемент не активный, он перестаёт быть выбранным', () => {
    render(<FilterTag {...requiredProps} checked disabled />)

    fastFilterTestUtils.expectFilterNotChecked(
      fastFilterTestUtils.getCheckableTag(requiredProps.value),
    )
  })

  describe('Обработчик onChange', () => {
    const onChange = jest.fn()

    afterEach(() => {
      onChange.mockReset()
    })

    test('Вызывается если элемент активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled={false} onChange={onChange} />,
      )

      await fastFilterTestUtils.userChangeFilter(user, requiredProps.value)
      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled onChange={onChange} />,
      )

      await fastFilterTestUtils.userChangeFilter(user, requiredProps.value)
      expect(onChange).not.toBeCalled()
    })
  })
})
