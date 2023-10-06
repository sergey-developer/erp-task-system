import { ExtendedFilterFormFields } from 'modules/task/components/ExtendedFilter/types'

import { StorageKeysEnum } from 'shared/constants/storage'
import { localStorageService } from 'shared/services/localStorage.service'
import { MaybeNull } from 'shared/types/utils'

type TaskListPageFiltersStorageState = Partial<
  Pick<ExtendedFilterFormFields, 'customers' | 'macroregions' | 'supportGroups'>
>

const getTaskListPageFilters = (): MaybeNull<TaskListPageFiltersStorageState> => {
  const state = localStorageService.getItem(StorageKeysEnum.TaskListPageFilters)
  return state ? JSON.parse(state) : null
}

const setTaskListPageFilters = (state: TaskListPageFiltersStorageState) =>
  localStorageService.setItem(StorageKeysEnum.TaskListPageFilters, JSON.stringify(state))

const deleteTaskListPageFilters = (filterName: keyof TaskListPageFiltersStorageState): boolean => {
  const state = getTaskListPageFilters()

  if (state?.[filterName]) {
    delete state[filterName]
    setTaskListPageFilters(state)
    return true
  }

  console.error(`Filter with name ${filterName} not found in local storage`)
  return false
}

export const taskLocalStorageService = {
  getTaskListPageFilters,
  setTaskListPageFilters,
  deleteTaskListPageFilters,
}
