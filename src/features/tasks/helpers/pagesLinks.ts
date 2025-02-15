import { TasksRoutesEnum } from 'features/tasks/routes/routes'

import { IdType } from 'shared/types/common'
import { getPathWithQs } from 'shared/utils/url'

import { TaskDetailsTabsEnum } from '../constants'

type MakeGetTasksPageLinkParams = {
  viewTask?: IdType
  tab?: TaskDetailsTabsEnum
}

export const makeGetTasksPageLink = (params: MakeGetTasksPageLinkParams): string =>
  getPathWithQs<MakeGetTasksPageLinkParams>(TasksRoutesEnum.DesktopTasks, params)
