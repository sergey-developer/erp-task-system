import {
  generateDateString,
  generateId,
  generateInteger,
  generateWord,
} from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { TaskModel } from 'modules/task/models'

import taskFixtures from './index'

export const getTask = (
  props?: Partial<
    Pick<
      TaskModel,
      | 'id'
      | 'type'
      | 'status'
      | 'extendedStatus'
      | 'olaStatus'
      | 'workGroup'
      | 'assignee'
    >
  >,
): TaskModel => ({
  id: props?.id || generateId(),
  type: props?.type || TaskTypeEnum.Request,
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  workGroup: props?.workGroup || taskFixtures.getTaskWorkGroup(),
  assignee: props?.assignee || taskFixtures.getTaskAssignee(),

  recordId: generateWord(),
  name: generateWord(),
  title: generateWord(),
  initialImpact: generateInteger({
    min: 1,
    max: 4,
  }) as TaskModel['initialImpact'],
  severity: generateInteger({
    min: 1,
    max: 4,
  }) as TaskModel['severity'],
  priorityCode: generateInteger({
    min: 1,
    max: 4,
  }) as TaskModel['priorityCode'],
  contactService: generateWord(),
  createdAt: generateDateString(),
  productClassifier1: generateWord(),
  productClassifier2: generateWord(),
  productClassifier3: generateWord(),
  supportGroup: taskFixtures.getSupportGroup(),
  olaEstimatedTime: Date.now(),
})
