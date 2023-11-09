import { RouteEnum } from 'configs/routes'

import { IdType } from 'shared/types/common'

export const getTaskListPageLink = (viewTaskId?: IdType): string =>
  viewTaskId ? `${RouteEnum.TaskList}?viewTask=${viewTaskId}` : RouteEnum.TaskList
