import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TasksFiltersStorageType } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'

import { iconTestUtils } from '_tests_/helpers/index'

import { TestIdsEnum } from '_tests_/features/tasks/components/TasksFiltersStorage/constants'

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
