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
import { TaskDetailsModel } from 'modules/task/models'

import { getTaskAssignee } from './taskAssignee'
import { getTaskWorkGroup } from './taskWorkGroup'

export const getTask = (
  props?: Partial<
    Pick<
      TaskDetailsModel,
      | 'id'
      | 'type'
      | 'status'
      | 'extendedStatus'
      | 'olaStatus'
      | 'workGroup'
      | 'assignee'
    >
  >,
): TaskDetailsModel => ({
  id: props?.id || generateId(),
  type: props?.type || TaskTypeEnum.Request,
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  workGroup: props?.workGroup || getTaskWorkGroup(),
  assignee: props?.assignee || getTaskAssignee(),

  recordId: generateWord(),
  name: generateWord(),
  title: generateWord(),
  initialImpact: generateInteger({
    min: 1,
    max: 4,
  }) as TaskDetailsModel['initialImpact'],
  severity: generateInteger({
    min: 1,
    max: 4,
  }) as TaskDetailsModel['severity'],
  priorityCode: generateInteger({
    min: 1,
    max: 4,
  }) as TaskDetailsModel['priorityCode'],
  contactService: generateWord(),
  createdAt: generateDateString(),
  productClassifier1: generateWord(),
  productClassifier2: generateWord(),
  productClassifier3: generateWord(),
  supportGroup: { id: generateId(), name: generateWord() },
  olaEstimatedTime: Date.now(),
})
