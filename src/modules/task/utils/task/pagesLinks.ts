import { TasksRoutesEnum } from 'modules/task/constants/routes'
import { TaskDetailsTabsEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

type GetTasksPageLinkParams = {
  viewTask?: IdType
  tab?: TaskDetailsTabsEnum
}

export const getTasksPageLink = (params: GetTasksPageLinkParams): string =>
  getPathWithQs<GetTasksPageLinkParams>(TasksRoutesEnum.DesktopTasks, params)
