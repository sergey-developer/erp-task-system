import isEmpty from 'lodash/isEmpty'

import { TaskListPageFiltersStorage } from '../taskLocalStorage.service'

type ParsedTaskListPageFilter = {
  name: keyof TaskListPageFiltersStorage
  value: NonNullable<TaskListPageFiltersStorage[keyof TaskListPageFiltersStorage]>
}

export const parseTaskListPageFilters = (
  filters: TaskListPageFiltersStorage,
): ParsedTaskListPageFilter[] =>
  Object.entries(filters).reduce<ParsedTaskListPageFilter[]>((acc, [name, value]) => {
    if (!isEmpty(value)) {
      acc.push({ name: name as keyof TaskListPageFiltersStorage, value })
    }

    return acc
  }, [])
