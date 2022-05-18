import qs from 'qs'
import { generatePath } from 'react-router-dom'

import { RoutesPathsEnum } from 'configs/routes'

export enum TaskListFiltersEnum {
  All = 'ALL',
  Mine = 'MINE',
  Overdue = 'OVERDUE',
  Free = 'FREE',
}

export const TASK_LIST_FILTER_KEY: string = 'filter'

export const taskListDefaultRoute: string = generatePath(
  RoutesPathsEnum.TaskList,
  {
    '*': qs.stringify(
      { [TASK_LIST_FILTER_KEY]: TaskListFiltersEnum.All },
      { addQueryPrefix: true },
    ),
  },
)

export const DEFAULT_PAGE_LIMIT = 20
