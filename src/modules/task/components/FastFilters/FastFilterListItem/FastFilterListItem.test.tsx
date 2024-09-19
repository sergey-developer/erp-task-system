import { props } from '_tests_/features/tasks/FastFilters/FastFilterListItem/constants'
import { fastFilterListTestUtils } from '_tests_/features/tasks/FastFilters/testUtils'
import { render } from '_tests_/utils'

import FastFilterListItem from './'

describe('Элемент быстрого фильтра', () => {
  test('Отображает состояние загрузки', async () => {
    render(<FastFilterListItem {...props} loading />)
    await fastFilterListTestUtils.expectLoadingStarted()
  })

  test('Отображает текст', () => {
    render(<FastFilterListItem {...props} />)

    expect(
      fastFilterListTestUtils.getByTextInCheckableTag(props.value, props.text),
    ).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      const amount = 0
      render(<FastFilterListItem {...props} amount={amount} />)

      expect(
        fastFilterListTestUtils.getByTextInCheckableTag(props.value, amount),
      ).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FastFilterListItem {...props} amount={null} />)

      expect(
        fastFilterListTestUtils.queryByTextInCheckableTag(props.value, props.amount!),
      ).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FastFilterListItem {...props} checked />)

    fastFilterListTestUtils.expectFilterChecked(
      fastFilterListTestUtils.getCheckableTag(props.value),
    )
  })

  test('Можно сделать не выбранным', () => {
    render(<FastFilterListItem {...props} checked={false} />)

    fastFilterListTestUtils.expectFilterNotChecked(
      fastFilterListTestUtils.getCheckableTag(props.value),
    )
  })

  test('Можно сделать не активным', () => {
    render(<FastFilterListItem {...props} disabled />)

    fastFilterListTestUtils.expectFilterNotChecked(
      fastFilterListTestUtils.getCheckableTag(props.value),
    )
  })

  test('Если элемент не активный, он перестаёт быть выбранным', () => {
    render(<FastFilterListItem {...props} checked disabled />)

    fastFilterListTestUtils.expectFilterNotChecked(
      fastFilterListTestUtils.getCheckableTag(props.value),
    )
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

      await fastFilterListTestUtils.setFilter(user, props.value)
      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(<FastFilterListItem {...props} disabled onChange={onChange} />)

      await fastFilterListTestUtils.setFilter(user, props.value)
      expect(onChange).not.toBeCalled()
    })
  })
})
