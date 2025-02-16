import { fastFilterOptionTestUtils } from '_tests_/features/tasks/components/FastFilters/FastFilterOption/testUtils'
import { option, props } from '_tests_/features/tasks/components/FastFilters/constants'
import { render } from '_tests_/helpers'

import FastFilters from './index'

describe('Быстрый фильтр', () => {
  test('Отображаются', () => {
    render(<FastFilters {...props} />)

    props.options.forEach(({ label, value, counterKey }) => {
      const optionEl = fastFilterOptionTestUtils.getByTextInCheckableTag(value, label)
      const counterEl = fastFilterOptionTestUtils.getByTextInCheckableTag(
        value,
        props.counters![counterKey],
      )

      expect(optionEl).toBeInTheDocument()
      expect(counterEl).toBeInTheDocument()
    })
  })

  test('Можно скрыть отображение количества', () => {
    render(<FastFilters {...props} countersVisible={false} />)

    props.options.forEach(({ value, counterKey }) => {
      const counterEl = fastFilterOptionTestUtils.queryByTextInCheckableTag(
        value,
        props.counters![counterKey],
      )
      expect(counterEl).not.toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<FastFilters {...props} loading />)
    await fastFilterOptionTestUtils.expectLoadingStarted()
  })

  test('Обработчик onChange вызывается', async () => {
    const { user } = render(<FastFilters {...props} />)

    await fastFilterOptionTestUtils.setFilter(user, option.value)

    expect(props.onChange).toBeCalledTimes(1)
    expect(props.onChange).toHaveBeenCalledWith(option.value)
  })

  test('Правильно определяет выбранный элемент', () => {
    render(<FastFilters {...props} value={option.value} />)
    fastFilterOptionTestUtils.expectFilterChecked(
      fastFilterOptionTestUtils.getCheckableTag(option.value),
    )
  })

  test('Можно сделать все фильтры не активными', () => {
    render(<FastFilters {...props} disabled />)
    props.options.forEach((opt) => {
      fastFilterOptionTestUtils.expectFilterDisabled(
        fastFilterOptionTestUtils.getCheckableTag(opt.value),
      )
    })
  })
})
