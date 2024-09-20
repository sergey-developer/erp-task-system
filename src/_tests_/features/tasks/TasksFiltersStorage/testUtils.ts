import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'

import { iconTestUtils } from '_tests_/utils/index'

import { TestIdsEnum } from './constants'

const getContainer = () => screen.getByTestId(TestIdsEnum.TasksFiltersStorage)
const queryContainer = () => screen.queryByTestId(TestIdsEnum.TasksFiltersStorage)

const getFilter = (filterName: keyof TasksFiltersStorageType) =>
  within(getContainer()).getByTestId(`tasks-filters-storage-${filterName}`)

const removeFilter = async (user: UserEvent, filterName: keyof TasksFiltersStorageType) => {
  const filter = getFilter(filterName)
  const closeButton = iconTestUtils.getIconByNameIn(filter, 'close')
  await user.click(closeButton)
}

export const tasksFiltersStorageTestUtils = {
  queryContainer,

  getFilter,
  removeFilter,
}
