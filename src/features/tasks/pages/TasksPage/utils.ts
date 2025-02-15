import { TasksDTO } from 'features/tasks/api/dto'
import { TasksFilterRequestArgs } from 'features/tasks/api/schemas'
import { TaskTableListItem } from 'features/tasks/components/TaskTable/types'
import { DEFAULT_SEARCH_FIELD } from 'features/tasks/components/TasksFilter/constants'
import { TasksFilterFormFields } from 'features/tasks/components/TasksFilter/types'
import { checkOlaStatusExpired } from 'features/tasks/helpers'
import { TasksFiltersStorageType } from 'features/tasks/services/taskLocalStorageService/taskLocalStorage.service'
import get from 'lodash/get'
import moment from 'moment-timezone'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { Nullable } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

/**
 * Преобразует объект с полями формы расширенной фильтрации в объект с
 * query параметрами расширенной фильтрации
 * @function mapFilterToRequest
 * @param {TasksFilterFormFields} fields - объект со значениями формы расширенной фильтрации
 * @returns {TasksFilterRequestArgs} объект с query параметрами расширенной фильтрации
 */

export const mapFilterToRequest = (
  fields: Partial<TasksFilterFormFields>,
): TasksFilterRequestArgs => {
  const { completeAt, creationDate, searchField, searchValue, ...restFields } = fields

  return {
    ...restFields,
    completeAtFrom: completeAt?.[0] ? formatDate(completeAt[0], DATE_FILTER_FORMAT) : undefined,
    completeAtTo: completeAt?.[1] ? formatDate(completeAt[1], DATE_FILTER_FORMAT) : undefined,
    dateFrom: creationDate?.[0] ? formatDate(creationDate[0], DATE_FILTER_FORMAT) : undefined,
    dateTo: creationDate?.[1] ? formatDate(creationDate[1], DATE_FILTER_FORMAT) : undefined,
    ...(searchField && searchValue && { [searchField]: searchValue }),
  }
}

export const getInitialTasksFilterValues = (
  tasksFiltersStorage?: Nullable<TasksFiltersStorageType>,
): Readonly<TasksFilterFormFields> => ({
  completeAt: [],
  creationDate: [],
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

export const getTasksByOlaNextBreachTime = (tasks: TasksDTO): TaskTableListItem[] => {
  const currentDate = moment()
  const granularity = 'day'
  const olaStatusExpiredTasks: TaskTableListItem[] = []
  const equalCurrentDateTasks: TaskTableListItem[] = []
  const moreThanCurrentDateTasks: TaskTableListItem[] = []
  const restTasks: TaskTableListItem[] = []

  tasks.forEach((task) => {
    const olaNextBreachTimeMoment = moment(task.olaNextBreachTime)

    if (checkOlaStatusExpired(task.olaStatus)) {
      olaStatusExpiredTasks.push(task)
    } else if (olaNextBreachTimeMoment.isSame(currentDate, granularity)) {
      equalCurrentDateTasks.push(task)
    } else if (olaNextBreachTimeMoment.isAfter(currentDate, granularity)) {
      moreThanCurrentDateTasks.push(task)
    } else {
      restTasks.push(task)
    }
  })

  const olaStatusExpiredTaskBoundary = olaStatusExpiredTasks.pop()
  const equalCurrentDateTaskBoundary = equalCurrentDateTasks.pop()

  return [
    ...olaStatusExpiredTasks,

    ...(olaStatusExpiredTaskBoundary
      ? [{ ...olaStatusExpiredTaskBoundary, isBoundary: true }]
      : []),

    ...equalCurrentDateTasks,

    ...(equalCurrentDateTaskBoundary
      ? [{ ...equalCurrentDateTaskBoundary, isBoundary: true }]
      : []),

    ...moreThanCurrentDateTasks,

    ...restTasks,
  ]
}
