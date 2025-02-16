import { props } from '_tests_/features/tasks/components/FastFilters/FastFilterOption/constants'
import { fastFilterOptionTestUtils as testUtils } from '_tests_/features/tasks/components/FastFilters/FastFilterOption/testUtils'
import { render } from '_tests_/helpers'

import FastFilterOption from './index'

describe('Элемент быстрого фильтра', () => {
  test('Отображает состояние загрузки', async () => {
    render(<FastFilterOption {...props} loading />)
    await testUtils.expectLoadingStarted()
  })

  test('Отображает текст и количество', () => {
    render(<FastFilterOption {...props} />)
    const label = testUtils.getByTextInCheckableTag(props.value, props.label)
    expect(label).toBeInTheDocument()
  })

  describe('Количество', () => {
    test('Отображается корректно', () => {
      render(<FastFilterOption {...props} />)
      const counter = testUtils.getByTextInCheckableTag(props.value, props.counter!)
      expect(counter).toBeInTheDocument()
    })

    test('Не отображается если оно отсутствует', () => {
      render(<FastFilterOption {...props} counter={undefined} />)
      const counter = testUtils.queryByTextInCheckableTag(props.value, props.counter!)
      expect(counter).not.toBeInTheDocument()
    })
  })

  test('Можно сделать выбранным', () => {
    render(<FastFilterOption {...props} checked />)
    testUtils.expectFilterChecked(testUtils.getCheckableTag(props.value))
  })

  test('Можно сделать не выбранным', () => {
    render(<FastFilterOption {...props} checked={false} />)
    testUtils.expectFilterNotChecked(testUtils.getCheckableTag(props.value))
  })

  test('Можно сделать не активным', () => {
    render(<FastFilterOption {...props} disabled />)
    testUtils.expectFilterNotChecked(testUtils.getCheckableTag(props.value))
  })

  test('Если элемент не активный, он перестаёт быть выбранным', () => {
    render(<FastFilterOption {...props} checked disabled />)
    testUtils.expectFilterNotChecked(testUtils.getCheckableTag(props.value))
  })

  describe('Обработчик onChange', () => {
    const onChange = jest.fn()

    afterEach(() => {
      onChange.mockReset()
    })

    test('Вызывается если элемент активный', async () => {
      const { user } = render(<FastFilterOption {...props} disabled={false} onChange={onChange} />)

      await testUtils.setFilter(user, props.value)
      expect(onChange).toBeCalledTimes(1)
    })

    test('Не вызывается если элемент не активный', async () => {
      const { user } = render(<FastFilterOption {...props} disabled onChange={onChange} />)
      await testUtils.setFilter(user, props.value)
      expect(onChange).not.toBeCalled()
    })
  })
})
