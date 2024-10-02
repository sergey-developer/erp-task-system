import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { fastFiltersConfig } from 'modules/task/components/FastFilters/config'
import { FastFilterEnum } from 'modules/task/constants/task/index'

import { MaybeNull, NumberOrString } from 'shared/types/utils'

import { filterCheckedClass, filterDisabledClass, TestIdsEnum } from '_tests_/features/tasks/components/FastFilters/constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.FastFilterList)

const getFilterTag = () => screen.getByTestId(TestIdsEnum.FastFilterListItem)
const getAllFilterTag = () => screen.getAllByTestId(TestIdsEnum.FastFilterListItem)

const getCheckableTag = (filter: FastFilterEnum): HTMLElement =>
  screen.getByTestId(`checkable-tag-${filter}`)

const queryCheckableTag = (filter: FastFilterEnum): MaybeNull<HTMLElement> =>
  screen.queryByTestId(`checkable-tag-${filter}`)

const getByTextInCheckableTag = (filter: FastFilterEnum, text: NumberOrString) =>
  within(getCheckableTag(filter)).getByText(text)

const queryByTextInCheckableTag = (filter: FastFilterEnum, text: NumberOrString) => {
  const tag = queryCheckableTag(filter)
  return tag ? within(tag).queryByText(text) : null
}

const setFilter = async (user: UserEvent, filter: FastFilterEnum): Promise<HTMLElement> => {
  const tag = getCheckableTag(filter)
  await user.click(tag)
  return tag
}

const expectFilterChecked = (filter: HTMLElement) => {
  expect(filter).toHaveClass(filterCheckedClass)
}

const expectFilterNotChecked = (filter: HTMLElement) => {
  expect(filter).not.toHaveClass(filterCheckedClass)
}

const expectFilterDisabled = (filter: HTMLElement) => {
  expect(filter).toHaveClass(filterDisabledClass)
}

const expectFilterNotDisabled = (filter: HTMLElement) => {
  expect(filter).not.toHaveClass(filterDisabledClass)
}

const expectLoadingStarted = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      // eslint-disable-next-line testing-library/no-node-access
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).toBeInTheDocument()
    })
  })
}

const expectLoadingFinished = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      // eslint-disable-next-line testing-library/no-node-access
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).not.toBeInTheDocument()
    })
  })
}

const expectAllFiltersDisabled = () => {
  fastFiltersConfig
    .filter((c) => !c.canShow)
    .forEach(({ filter }) => {
      expectFilterDisabled(getCheckableTag(filter))
    })
}

const expectAllFiltersNotDisabled = () => {
  fastFiltersConfig
    .filter((c) => !c.canShow)
    .forEach(({ filter }) => {
      expectFilterNotDisabled(getCheckableTag(filter))
    })
}

export const fastFilterListTestUtils = {
  getContainer,

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
  expectAllFiltersDisabled,
  expectAllFiltersNotDisabled,
}
