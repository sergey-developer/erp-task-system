import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'

import { iconTestUtils } from '_tests_/utils'

const getContainer = () => screen.getByTestId('tasks-filters-storage')
const queryContainer = () => screen.queryByTestId('tasks-filters-storage')

const getFilter = (filterName: keyof TasksFiltersStorageType) =>
  within(getContainer()).getByTestId(`tasks-filters-storage-${filterName}`)

const removeFilter = async (user: UserEvent, filterName: keyof TasksFiltersStorageType) => {
  const filter = getFilter(filterName)
  const closeButton = iconTestUtils.getIconByNameIn(filter, 'close')
  await user.click(closeButton)
}

export const testUtils = {
  queryContainer,

  getFilter,
  removeFilter,
}

test.todo('tasks-filters-storage')
