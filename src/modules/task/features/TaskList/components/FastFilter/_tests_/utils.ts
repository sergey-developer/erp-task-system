import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { NumOrStr } from 'shared/interfaces/utils'

import { FastFilterEnum } from '../../../constants/common'
import { filterCheckedClass, filterDisabledClass } from './constants'

export const getFastFilter = () => screen.getByTestId('filter-fast')

export const getFilterTag = () => screen.getByTestId('filter-tag')

export const getAllFilterTag = () => screen.getAllByTestId('filter-tag')

export const getCheckableTag = (filter: FastFilterEnum) =>
  screen.getByTestId(`checkable-tag-${filter}`)

export const getByTextInCheckableTag = (
  filter: FastFilterEnum,
  text: NumOrStr,
) => within(getCheckableTag(filter)).getByText(text)

export const userChangeFilter = async (
  user: UserEvent,
  filter: FastFilterEnum,
): Promise<HTMLElement> => {
  const tag = getCheckableTag(filter)
  await user.click(tag)
  return tag
}

export const expectFilterChecked = (filter: HTMLElement) => {
  expect(filter).toHaveClass(filterCheckedClass)
}

export const expectFilterNotChecked = (filter: HTMLElement) => {
  expect(filter).not.toHaveClass(filterCheckedClass)
}

export const expectFilterDisabled = (filter: HTMLElement) => {
  expect(filter).toHaveClass(filterDisabledClass)
}

export const expectFilterNotDisabled = (filter: HTMLElement) => {
  expect(filter).not.toHaveClass(filterDisabledClass)
}

export const loadingStarted = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).toBeInTheDocument()
    })
  })
}

export const loadingFinished = async () => {
  await waitFor(() => {
    getAllFilterTag().forEach((tag) => {
      const skeleton = tag.querySelector('.ant-skeleton-active')
      expect(skeleton).not.toBeInTheDocument()
    })
  })
}
