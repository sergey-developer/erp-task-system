import {
  generateDateString,
  generateId,
  generateName,
  generateString,
  generateWord,
} from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { TaskTableListItem } from 'modules/task/features/TaskList/components/TaskTable/interfaces'

import { getWorkGroup } from '../workGroup'
import { getTaskAssignee } from './taskAssignee'

export const getTaskTableItem = (
  props?: Partial<
    Pick<TaskTableListItem, 'status' | 'extendedStatus' | 'olaStatus'>
  >,
): TaskTableListItem => ({
  id: generateId(),
  name: generateName(),
  title: generateWord(),
  workGroup: getWorkGroup(),
  createdAt: generateDateString(),
  recordId: generateString(),
  lastComment: generateWord(),
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.Awaiting,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  assignee: getTaskAssignee(),
  olaNextBreachTime: generateDateString(),
})
