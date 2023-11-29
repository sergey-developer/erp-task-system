import { TaskStorageKeysEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { MaybeNull } from 'shared/types/utils'

export type TasksFiltersStorageData = Partial<{
  customers: IdType[]
  macroregions: IdType[]
  supportGroups: IdType[]
}>

const getTasksFilters = (): MaybeNull<TasksFiltersStorageData> => {
  const state = localStorage.getItem(TaskStorageKeysEnum.TasksFilters)
  return state ? JSON.parse(state) : null
}

const setTasksFilters = (state: TasksFiltersStorageData) =>
  localStorage.setItem(TaskStorageKeysEnum.TasksFilters, JSON.stringify(state))

const deleteTasksFilters = (name: keyof TasksFiltersStorageData): boolean => {
  const state = getTasksFilters()

  if (state?.[name]) {
    delete state[name]
    setTasksFilters(state)
    return true
  }

  console.error(`Tasks filter with name "${name}" not found in local storage`)
  return false
}

const clearTasksFilters = () => localStorage.removeItem(TaskStorageKeysEnum.TasksFilters)

export const taskLocalStorageService = {
  getTasksFilters,
  setTasksFilters,
  deleteTasksFilters,
  clearTasksFilters,
}
