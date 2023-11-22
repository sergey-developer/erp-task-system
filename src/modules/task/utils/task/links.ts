import qs from 'qs'

import { RouteEnum } from 'configs/routes'

import { TaskCardTabsEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'

type Params = {
  viewTaskId?: IdType
  taskCardTab?: TaskCardTabsEnum
}

export const getTaskListPageLink = ({ viewTaskId, taskCardTab }: Params): string =>
  viewTaskId || taskCardTab
    ? `${RouteEnum.TaskList}?${qs.stringify({ viewTask: viewTaskId, taskCardTab })}`
    : RouteEnum.TaskList
