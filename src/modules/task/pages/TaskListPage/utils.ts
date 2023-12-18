import get from 'lodash/get'
import moment from 'moment-timezone'

import { DEFAULT_SEARCH_FIELD } from 'modules/task/components/ExtendedFilter/constants'
import { TasksFilterFormFields } from 'modules/task/components/ExtendedFilter/types'
import { TaskTableListItem } from 'modules/task/components/TaskTable/types'
import { FastFilterEnum } from 'modules/task/constants/task'
import { ExtendedFilterQueries, TaskListModel } from 'modules/task/models'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { UserRoleEnum } from 'modules/user/constants'
import { getUserRoleMap } from 'modules/user/utils'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { Nullable } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

/**
 * Преобразует объект с полями формы расширенной фильтрации в объект с
 * query параметрами расширенной фильтрации
 * @function mapFilterToQueryArgs
 * @param {TasksFilterFormFields} fields - объект со значениями формы расширенной фильтрации
 * @returns {ExtendedFilterQueries} объект с query параметрами расширенной фильтрации
 */

export const mapFilterToQueryArgs = (
  fields: Partial<TasksFilterFormFields>,
): ExtendedFilterQueries => {
  const { completeAt, searchField, searchValue, ...restFields } = fields

  return {
    ...restFields,
    completeAtFrom: completeAt?.[0] ? formatDate(completeAt[0], DATE_FILTER_FORMAT) : undefined,
    completeAtTo: completeAt?.[1] ? formatDate(completeAt[1], DATE_FILTER_FORMAT) : undefined,
    ...(searchField && searchValue && { [searchField]: searchValue }),
  }
}

export const getInitialFastFilter = (role?: UserRoleEnum): FastFilterEnum => {
  if (!role) return FastFilterEnum.All

  const { isFirstLineSupportRole, isEngineerRole } = getUserRoleMap(role)

  return isFirstLineSupportRole
    ? FastFilterEnum.FirstLine
    : isEngineerRole
    ? FastFilterEnum.Mine
    : FastFilterEnum.All
}

export const getInitialExtendedFilterFormValues = (
  tasksFiltersStorage?: Nullable<TasksFiltersStorageType>,
): Readonly<TasksFilterFormFields> => ({
  completeAt: [],
  searchField: DEFAULT_SEARCH_FIELD,
  searchValue: undefined,
  status: [],
  isOverdue: [],
  isAssigned: [],
  workGroupId: undefined,
  manager: undefined,
  customers: get(tasksFiltersStorage, 'customers', []),
  macroregions: get(tasksFiltersStorage, 'macroregions', []),
  supportGroups: get(tasksFiltersStorage, 'supportGroups', []),
})

export const getTasksByOlaNextBreachTime = (tasks: TaskListModel): TaskTableListItem[] => {
  const currentDate = new Date()
  const granularity = 'day'
  const lessThanCurrentDate: TaskTableListItem[] = []
  const equalCurrentDate: TaskTableListItem[] = []
  const moreThanCurrentDate: TaskTableListItem[] = []

  tasks.forEach((task) => {
    const olaNextBreachTimeMoment = moment(task.olaNextBreachTime)

    if (olaNextBreachTimeMoment.isBefore(currentDate, granularity)) {
      lessThanCurrentDate.push(task)
    } else if (olaNextBreachTimeMoment.isSame(currentDate, granularity)) {
      equalCurrentDate.push(task)
    } else if (olaNextBreachTimeMoment.isAfter(currentDate, granularity)) {
      moreThanCurrentDate.push(task)
    }
  })

  const lessThanCurrentDateTaskBoundary = lessThanCurrentDate.pop()
  const equalCurrentDateTaskBoundary = equalCurrentDate.pop()

  return [
    ...lessThanCurrentDate,

    ...(lessThanCurrentDateTaskBoundary
      ? [{ ...lessThanCurrentDateTaskBoundary, isBoundary: true }]
      : []),

    ...equalCurrentDate,

    ...(equalCurrentDateTaskBoundary
      ? [{ ...equalCurrentDateTaskBoundary, isBoundary: true }]
      : []),

    ...moreThanCurrentDate,
  ]
}
