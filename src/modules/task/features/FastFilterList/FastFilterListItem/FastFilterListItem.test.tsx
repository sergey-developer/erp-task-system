import { fakeWord, render } from '_tests_/utils'

import { testUtils } from '../FastFilterList.test'
import { FastFilterEnum } from '../constants'
import FastFilterListItem, { FastFilterListItemProps } from './'

export const props: Readonly<
  Pick<FastFilterListItemProps, 'text' | 'checked' | 'amount' | 'value'>
> = {
  text: fakeWord(),
  value: FastFilterEnum.All,
  amount: 1,
  checked: false,
}

describe('Элемент быстрого фильтра', () => {
  test('Отображает состояние загрузки', async () => {
    render(<FastFilterListItem {...props} loading />)
    await testUtils.expectLoadingStarted()
  })

  test('Отображает текст', () => {
    render(<FastFilterListItem {...props} />)

    expect(
      testUtils.getByTextInCheckableTag(props.value, props.text),
    ).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      const amount = 0
      render(<FastFilterListItem {...props} amount={amount} />)

      expect(
        testUtils.getByTextInCheckableTag(props.value, amount),
      ).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FastFilterListItem {...props} amount={null} />)

      expect(
        testUtils.queryByTextInCheckableTag(props.value, props.amount!),
      ).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FastFilterListItem {...props} checked />)

    testUtils.expectFilterChecked(testUtils.getCheckableTag(props.value))
  })

  test('Можно сделать не выбранным', () => {
    render(<FastFilterListItem {...props} checked={false} />)

    testUtils.expectFilterNotChecked(testUtils.getCheckableTag(props.value))
  })

  test('Можно сделать не активным', () => {
    render(<FastFilterListItem {...props} disabled />)

    testUtils.expectFilterNotChecked(testUtils.getCheckableTag(props.value))
  })

  test('Если элемент не активный, он перестаёт быть выбранным', () => {
    render(<FastFilterListItem {...props} checked disabled />)

    testUtils.expectFilterNotChecked(testUtils.getCheckableTag(props.value))
  })

  describe('Обработчик onChange', () => {
    const onChange = jest.fn()

    afterEach(() => {
      onChange.mockReset()
    })

    test('Вызывается если элемент активный', async () => {
      const { user } = render(
        <FastFilterListItem {...props} disabled={false} onChange={onChange} />,
      )

      await testUtils.setFilter(user, props.value)
      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(
        <FastFilterListItem {...props} disabled onChange={onChange} />,
      )

      await testUtils.setFilter(user, props.value)
      expect(onChange).not.toBeCalled()
    })
  })
})
