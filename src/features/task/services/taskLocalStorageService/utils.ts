import isEmpty from 'lodash/isEmpty'

import { TasksFiltersStorageType } from './taskLocalStorage.service'

type ParsedTasksFilterStorageItem = {
  name: keyof TasksFiltersStorageType
  value: NonNullable<TasksFiltersStorageType[keyof TasksFiltersStorageType]>
}

export const parseTasksFiltersStorage = (
  filters: TasksFiltersStorageType,
): ParsedTasksFilterStorageItem[] =>
  Object.entries(filters).reduce<ParsedTasksFilterStorageItem[]>((acc, [name, value]) => {
    if (!isEmpty(value)) {
      acc.push({ name: name as keyof TasksFiltersStorageType, value })
    }

    return acc
  }, [])
