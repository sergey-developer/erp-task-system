import {
  generateBoolean,
  generateDateString,
  generateId,
  generateInteger,
  generateSentence,
  generateString,
  generateWord,
} from '_tests_/utils'
import {
  TaskCommentTypeEnum,
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
  updatedAt: generateDateString(),
  recordId: generateString(),
  workGroup: getWorkGroup(),
  title: generateWord(),
  name: generateWord(),
  productClassifier1: generateString(),
  productClassifier2: generateString(),
  productClassifier3: generateString(),
  businessOperation: generateString(),
  contactService: generateString(),
  supportingService: generateString(),
  itService: generateString(),
  isFailure: generateBoolean(),
  isMass: generateBoolean(),
  isOlaBreached: generateBoolean(),
  isSlaBreached: generateBoolean(),
  comment: null,
})

export const getTaskListComment = (): TaskListItemModel['comment'] => ({
  id: generateId(),
  type: TaskCommentTypeEnum.Common,
  task: generateId(),
  author: generateId(),
  text: generateSentence(),
  createdAt: generateDateString(),
  updatedAt: generateDateString(),
})
