import { screen } from '@testing-library/react'

import { fakeWord, render } from '_tests_/utils'

import { testUtils as fastFilterOptionTestUtils } from './FastFilterOption/FastFilterOption.test'
import FastFilters from './index'
import { FastFiltersProps } from './types'

const option = { label: fakeWord(), value: fakeWord() }

const props: Readonly<FastFiltersProps<string, Record<string, number>>> = {
  options: [option],
  counters: { [option.value]: 1 },
  countersVisible: true,
  disabled: false,
  loading: false,
  value: undefined,
  onChange: jest.fn(),
}

const getContainer = () => screen.getByTestId('fast-filters')

export const testUtils = {
  getContainer,
}

describe('Быстрый фильтр', () => {
  test('Отображаются', () => {
    render(<FastFilters {...props} />)

    props.options.forEach(({ label, value }) => {
      const optionEl = fastFilterOptionTestUtils.getByTextInCheckableTag(value, label)
      const counterEl = fastFilterOptionTestUtils.getByTextInCheckableTag(
        value,
        props.counters![value],
      )

      expect(optionEl).toBeInTheDocument()
      expect(counterEl).toBeInTheDocument()
    })
  })

  test('Можно скрыть отображение количества', () => {
    render(<FastFilters {...props} countersVisible={false} />)

    props.options.forEach(({ value }) => {
      const counterEl = fastFilterOptionTestUtils.queryByTextInCheckableTag(
        value,
        props.counters![value],
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
