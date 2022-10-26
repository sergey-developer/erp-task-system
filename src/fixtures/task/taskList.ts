import {
  generateDateString,
  generateId,
  generateInteger,
  generateString,
  generateWord,
} from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { TaskListItemModel } from 'modules/task/features/TaskList/models'

import { getWorkGroup } from '../workGroup'
import { getTaskAssignee } from './taskAssignee'

export const getTaskListItem = (
  props?: Partial<TaskListItemModel>,
): TaskListItemModel => ({
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  type: props?.type || TaskTypeEnum.Request,

  id: generateId(),
  assignee: getTaskAssignee(),
  lastComment: generateWord(),
  priorityCode: generateInteger({
    min: 1,
    max: 4,
  }) as TaskListItemModel['priorityCode'],
  severity: generateInteger({
    min: 1,
    max: 4,
  }) as TaskListItemModel['severity'],
  initialImpact: generateInteger({
    min: 1,
    max: 4,
  }) as TaskListItemModel['initialImpact'],
  createdAt: generateDateString(),
  recordId: generateString(),
  workGroup: getWorkGroup(),
  title: generateWord(),
  name: generateWord(),
  productClassifier1: generateString(),
  productClassifier2: generateString(),
  productClassifier3: generateString(),
  contactService: generateString(),
})
