import { generateDateString, generateId, generateWord } from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'

import { getTaskAssignee } from './taskAssignee'
import { getTaskWorkGroup } from './taskWorkGroup'

export const getTask = (
  props?: Partial<
    Pick<
      TaskDetailsModel,
      'id' | 'type' | 'status' | 'extendedStatus' | 'olaStatus' | 'workGroup'
    >
  >,
): TaskDetailsModel => ({
  id: props?.id || generateId(),
  type: props?.type || TaskTypeEnum.Request,
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  workGroup: props?.workGroup || getTaskWorkGroup(),

  recordId: generateWord(),
  name: generateWord(),
  title: generateWord(),
  initialImpact: 1,
  severity: 1,
  priorityCode: 1,
  contactService: generateWord(),
  createdAt: generateDateString(),
  productClassifier1: generateWord(),
  productClassifier2: generateWord(),
  productClassifier3: generateWord(),
  supportGroup: { id: generateId(), name: generateWord() },
  assignee: getTaskAssignee(),
  olaEstimatedTime: Date.now(),
})
