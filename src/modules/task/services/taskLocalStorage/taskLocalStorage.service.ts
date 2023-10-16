import { ExtendedFilterFormFields } from 'modules/task/components/ExtendedFilter/types'

import { StorageKeysEnum } from 'shared/constants/storage'
import { localStorageService } from 'shared/services/localStorage.service'
import { MaybeNull } from 'shared/types/utils'

export type TaskListPageFiltersStorage = Pick<
  ExtendedFilterFormFields,
  'customers' | 'macroregions' | 'supportGroups'
>

const getTaskListPageFilters = (): MaybeNull<TaskListPageFiltersStorage> => {
  const state = localStorageService.getItem(StorageKeysEnum.TaskListPageFilters)
  return state ? JSON.parse(state) : null
}

const setTaskListPageFilters = (state: TaskListPageFiltersStorage) =>
  localStorageService.setItem(StorageKeysEnum.TaskListPageFilters, JSON.stringify(state))

const deleteTaskListPageFilter = (name: keyof TaskListPageFiltersStorage): boolean => {
  const state = getTaskListPageFilters()

  if (state?.[name]) {
    delete state[name]
    setTaskListPageFilters(state)
    return true
  }

  console.error(`Filter with name ${name} not found in local storage`)
  return false
}

const clearTaskListPageFilters = () =>
  localStorageService.removeItem(StorageKeysEnum.TaskListPageFilters)

export const taskLocalStorageService = {
  getTaskListPageFilters,
  setTaskListPageFilters,
  deleteTaskListPageFilter,
  clearTaskListPageFilters,
}
