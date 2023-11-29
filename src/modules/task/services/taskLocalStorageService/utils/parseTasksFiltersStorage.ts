import isEmpty from 'lodash/isEmpty'

import { TasksFiltersStorageData } from '../taskLocalStorage.service'

type ParsedTasksFiltersStorageData = {
  name: keyof TasksFiltersStorageData
  value: NonNullable<TasksFiltersStorageData[keyof TasksFiltersStorageData]>
}

export const parseTasksFiltersStorage = (
  filters: TasksFiltersStorageData,
): ParsedTasksFiltersStorageData[] =>
  Object.entries(filters).reduce<ParsedTasksFiltersStorageData[]>((acc, [name, value]) => {
    if (!isEmpty(value)) {
      acc.push({ name: name as keyof TasksFiltersStorageData, value })
    }

    return acc
  }, [])
