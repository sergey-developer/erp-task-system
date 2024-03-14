import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { TaskDetailsTabsEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type GetTaskListPageLinkParams = {
  viewTask?: IdType
  taskDetailsTab?: TaskDetailsTabsEnum
}

export const getTaskListPageLink = (params: GetTaskListPageLinkParams): string =>
  getPathWithQs<GetTaskListPageLinkParams>(TasksRoutesEnum.DesktopTaskList, params)
