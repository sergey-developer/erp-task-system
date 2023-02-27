import { generateWord, render } from '_tests_/utils'

import { testUtils } from '../FastFilter.test'
import FilterTag, { FilterTagProps } from '../FilterTag'
import { FastFilterEnum } from '../constants'

export const requiredProps: Readonly<
  Pick<FilterTagProps, 'text' | 'checked' | 'amount' | 'value'>
> = {
  text: generateWord(),
  value: FastFilterEnum.All,
  amount: 1,
  checked: false,
}

describe('Элемент быстрого фильтра', () => {
  test('Отображает состояние загрузки', async () => {
    render(<FilterTag {...requiredProps} loading />)
    await testUtils.loadingStarted()
  })

  test('Отображает текст', () => {
    render(<FilterTag {...requiredProps} />)

    expect(
      testUtils.getByTextInCheckableTag(
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
        testUtils.getByTextInCheckableTag(requiredProps.value, amount),
      ).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FilterTag {...requiredProps} amount={null} />)

      expect(
        testUtils.queryByTextInCheckableTag(
          requiredProps.value,
          requiredProps.amount!,
        ),
      ).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FilterTag {...requiredProps} checked />)

    testUtils.expectFilterChecked(
      testUtils.getCheckableTag(requiredProps.value),
    )
  })

  test('Можно сделать не выбранным', () => {
    render(<FilterTag {...requiredProps} checked={false} />)

    testUtils.expectFilterNotChecked(
      testUtils.getCheckableTag(requiredProps.value),
    )
  })

  test('Можно сделать не активным', () => {
    render(<FilterTag {...requiredProps} disabled />)

    testUtils.expectFilterNotChecked(
      testUtils.getCheckableTag(requiredProps.value),
    )
  })

  test('Если элемент не активный, он перестаёт быть выбранным', () => {
    render(<FilterTag {...requiredProps} checked disabled />)

    testUtils.expectFilterNotChecked(
      testUtils.getCheckableTag(requiredProps.value),
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

      await testUtils.userChangeFilter(user, requiredProps.value)
      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(
        <FilterTag {...requiredProps} disabled onChange={onChange} />,
      )

      await testUtils.userChangeFilter(user, requiredProps.value)
      expect(onChange).not.toBeCalled()
    })
  })
})
