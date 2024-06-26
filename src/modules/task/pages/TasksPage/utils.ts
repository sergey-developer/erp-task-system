import get from 'lodash/get'
import moment from 'moment-timezone'

import { TaskTableListItem } from 'modules/task/components/TaskTable/types'
import { DEFAULT_SEARCH_FIELD } from 'modules/task/components/TasksFilter/constants'
import { TasksFilterFormFields } from 'modules/task/components/TasksFilter/types'
import { TasksFilterQueries, TasksModel } from 'modules/task/models'
import { TasksFiltersStorageType } from 'modules/task/services/taskLocalStorageService/taskLocalStorage.service'
import { checkOlaStatusExpired } from 'modules/task/utils/task'

import { DATE_FILTER_FORMAT } from 'shared/constants/dateTime'
import { Nullable } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

/**
 * Преобразует объект с полями формы расширенной фильтрации в объект с
 * query параметрами расширенной фильтрации
 * @function mapFilterToQueryArgs
 * @param {TasksFilterFormFields} fields - объект со значениями формы расширенной фильтрации
 * @returns {TasksFilterQueries} объект с query параметрами расширенной фильтрации
 */

export const mapFilterToQueryArgs = (
  fields: Partial<TasksFilterFormFields>,
): TasksFilterQueries => {
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

export const getTasksByOlaNextBreachTime = (tasks: TasksModel): TaskTableListItem[] => {
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
