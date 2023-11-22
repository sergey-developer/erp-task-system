import qs from 'qs'

import { CommonRouteEnum } from 'configs/routes'

import { TaskCardTabsEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'

type Params = {
  viewTaskId?: IdType
  taskCardTab?: TaskCardTabsEnum
}

export const getTaskListPageLink = ({ viewTaskId, taskCardTab }: Params): string =>
  viewTaskId || taskCardTab
    ? `${CommonRouteEnum.DesktopTaskList}?${qs.stringify({ viewTask: viewTaskId, taskCardTab })}`
    : CommonRouteEnum.DesktopTaskList
