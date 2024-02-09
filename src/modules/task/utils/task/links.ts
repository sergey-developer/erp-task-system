import qs from 'qs'

import { CommonRouteEnum } from 'configs/routes'

import { TaskDetailsTabsEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'

type Params = {
  viewTaskId?: IdType
  taskDetailsTab?: TaskDetailsTabsEnum
}

export const getTaskListPageLink = ({ viewTaskId, taskDetailsTab }: Params): string =>
  viewTaskId || taskDetailsTab
    ? `${CommonRouteEnum.DesktopTaskList}${qs.stringify(
        { viewTask: viewTaskId, taskDetailsTab },
        { addQueryPrefix: true },
      )}`
    : CommonRouteEnum.DesktopTaskList
