import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { NumOrStr } from 'shared/interfaces/utils'

import { FastFilterEnum } from '../../../constants/common'
import { filterCheckedClass, filterDisabledClass } from './constants'

const getFastFilter = () => screen.getByTestId('filter-fast')

const getFilterTag = () => screen.getByTestId('filter-tag')

const getAllFilterTag = () => screen.getAllByTestId('filter-tag')

const getCheckableTag = (filter: FastFilterEnum) =>
  screen.getByTestId(`checkable-tag-${filter}`)

const getByTextInCheckableTag = (filter: FastFilterEnum, text: NumOrStr) =>
  within(getCheckableTag(filter)).getByText(text)

const userChangeFilter = async (
  user: UserEvent,
  filter: FastFilterEnum,
): Promise<HTMLElement> => {
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

const loadingStarted = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).toBeInTheDocument()
    })
  })
}

const loadingFinished = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).not.toBeInTheDocument()
    })
  })
}

const testUtils = {
  getFastFilter,
  getFilterTag,
  getAllFilterTag,
  getCheckableTag,
  getByTextInCheckableTag,
  userChangeFilter,
  expectFilterChecked,
  expectFilterNotChecked,
  expectFilterDisabled,
  expectFilterNotDisabled,
  loadingStarted,
  loadingFinished,
}

export default testUtils
