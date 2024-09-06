import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { fakeWord, render, spinnerTestUtils } from '_tests_/utils'

import FastFilterOption, { FastFilterOptionProps } from './index'

const filterCheckedClass = 'ant-tag-checkable-checked'
const filterDisabledClass = 'ant-tag-checkable--disabled'

export const props: Readonly<
  Pick<FastFilterOptionProps, 'label' | 'checked' | 'counter' | 'value'>
> = {
  label: fakeWord(),
  value: fakeWord(),
  counter: 1,
  checked: false,
}

const getFilterTag = () => screen.getByTestId('fast-filters-option')
const getAllFilterTag = () => screen.getAllByTestId('fast-filters-option')

const getCheckableTag = (value: string): HTMLElement => screen.getByTestId(`checkable-tag-${value}`)

const queryCheckableTag = (value: string): MaybeNull<HTMLElement> =>
  screen.queryByTestId(`checkable-tag-${value}`)

const getByTextInCheckableTag = (value: string, label: NumberOrString) =>
  within(getCheckableTag(value)).getByText(label)

const queryByTextInCheckableTag = (value: string, label: NumberOrString) => {
  const tag = queryCheckableTag(value)
  return tag ? within(tag).queryByText(label) : null
}

const setFilter = async (user: UserEvent, value: string) => user.click(getCheckableTag(value))

const expectFilterChecked = (filter: HTMLElement) => expect(filter).toHaveClass(filterCheckedClass)

const expectFilterNotChecked = (filter: HTMLElement) =>
  expect(filter).not.toHaveClass(filterCheckedClass)

const expectFilterDisabled = (filter: HTMLElement) =>
  expect(filter).toHaveClass(filterDisabledClass)

const expectFilterNotDisabled = (filter: HTMLElement) =>
  expect(filter).not.toHaveClass(filterDisabledClass)

const expectLoadingStarted = async () =>
  spinnerTestUtils.expectLoadingStarted('fast-filters-option-counter-loading')

const expectLoadingFinished = async () =>
  spinnerTestUtils.expectLoadingFinished('fast-filters-option-counter-loading')

export const testUtils = {
  getFilterTag,
  getAllFilterTag,

  getCheckableTag,
  queryCheckableTag,
  getByTextInCheckableTag,
  queryByTextInCheckableTag,

  setFilter,

  expectLoadingStarted,
  expectLoadingFinished,

  expectFilterChecked,
  expectFilterNotChecked,

  expectFilterDisabled,
  expectFilterNotDisabled,
}

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
