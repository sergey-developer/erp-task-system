import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants'
import { TaskModel, TaskResponseTimeModel } from 'modules/task/models'

import commonFixtures from 'fixtures/common'
import taskFixtures from 'fixtures/task'

import {
  fakeDateString,
  fakeEmail,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeLatitude,
  fakeLongitude,
  fakePhone,
  fakeWord,
} from '_tests_/utils'

export const taskResponseTime = (): TaskResponseTimeModel => {
  return {
    value: fakeDateString(),
    timedelta: 7200000, // 2h in milliseconds
    progress: 0.8,
  }
}

export const task = (
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
      | 'suspendRequest'
    >
  >,
): Omit<TaskModel, 'responseTime'> & {
  responseTime: TaskResponseTimeModel
} => ({
  id: props?.id || fakeId(),
  type: props?.type || TaskTypeEnum.Request,
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  workGroup: props?.workGroup || taskFixtures.workGroup(),
  assignee: props?.assignee || taskFixtures.assignee(),
  suspendRequest: props?.suspendRequest || null,

  attachments: [taskFixtures.attachment()],
  resolution: {
    attachments: [taskFixtures.attachment()],
  },
  responseTime: taskResponseTime(),
  recordId: fakeIdStr(),
  name: fakeWord(),
  title: fakeWord(),
  initialImpact: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskModel['initialImpact'],
  severity: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskModel['severity'],
  priorityCode: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskModel['priorityCode'],
  contactService: fakeWord(),
  createdAt: fakeDateString(),
  productClassifier1: fakeWord(),
  productClassifier2: fakeWord(),
  productClassifier3: fakeWord(),
  supportGroup: commonFixtures.supportGroup(),
  olaEstimatedTime: Date.now(),
  description: fakeWord(),
  contactPhone: fakePhone(),
  portablePhone: fakePhone(),
  address: fakeWord(),
  company: fakeWord(),
  contactType: fakeWord(),
  email: fakeEmail(),
  latitude: String(fakeLatitude()),
  longitude: String(fakeLongitude()),
  sapId: fakeIdStr(),
  olaNextBreachTime: fakeDateString(),
  weight: fakeInteger(),
  techResolution: fakeWord(),
  userResolution: fakeWord(),
})
