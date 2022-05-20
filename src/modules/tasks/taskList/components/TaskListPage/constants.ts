import qs from 'qs'
import { generatePath } from 'react-router-dom'

import { RoutesPathsEnum } from 'configs/routes'
import { FastFilterEnum, SmartSortEnum } from 'modules/tasks/models'

export const TASK_LIST_FILTER_KEY: string = 'filter'

export const taskListDefaultRoute: string = generatePath(
  RoutesPathsEnum.TaskList,
  {
    '*': qs.stringify(
      { [TASK_LIST_FILTER_KEY]: FastFilterEnum.All },
      { addQueryPrefix: true },
    ),
  },
)

export const DEFAULT_PAGE_LIMIT = 20

export const DATE_FILTER_FORMAT = 'YYYY[-]MM[-]DD'

export const SORTED_FIELDS = ['olaNextBreachTime', 'createdAt']

export const SMART_SORT_TO_FIELD_SORT_DIRECTIONS = {
  olaNextBreachTimeDescend: SmartSortEnum.ByOlaDesc,
  olaNextBreachTimeAscend: SmartSortEnum.ByOlaAsc,
  createdAtDescend: SmartSortEnum.ByCreatedDateDesc,
  createdAtAscend: SmartSortEnum.ByCreatedDateAsc,
}
