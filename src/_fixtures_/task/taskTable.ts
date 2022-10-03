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
import { getTaskListComment } from './taskList'

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
  comment: getTaskListComment(),
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  assignee: getTaskAssignee(),
  olaNextBreachTime: generateDateString(),
})
