import { TaskListFiltersEnum } from './constants'

export const initSelectedFilterState = (
  filter: TaskListFiltersEnum,
): TaskListFiltersEnum => {
  return Object.values(TaskListFiltersEnum).includes(filter)
    ? filter
    : TaskListFiltersEnum.All
}
