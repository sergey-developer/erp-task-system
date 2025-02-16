import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { spinnerTestUtils } from '_tests_/helpers'

import { filterCheckedClass, filterDisabledClass, TestIdsEnum } from './constants'

const getFilterTag = () => screen.getByTestId(TestIdsEnum.FastFiltersOption)
const getAllFilterTag = () => screen.getAllByTestId(TestIdsEnum.FastFiltersOption)

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
  spinnerTestUtils.expectLoadingStarted(TestIdsEnum.FastFiltersOptionCounterLoading)

const expectLoadingFinished = async () =>
  spinnerTestUtils.expectLoadingFinished(TestIdsEnum.FastFiltersOptionCounterLoading)

export const fastFilterOptionTestUtils = {
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
