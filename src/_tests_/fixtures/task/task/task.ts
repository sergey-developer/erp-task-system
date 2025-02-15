import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { TaskDetailDTO, TaskResponseTimeDTO } from 'features/tasks/api/dto'
import isUndefined from 'lodash/isUndefined'

import { SystemEnum } from 'shared/constants/enums'

import taskFixtures from '_tests_/fixtures/task'
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

export const taskResponseTime = (): TaskResponseTimeDTO => {
  return {
    value: fakeDateString(),
    timedelta: 7200000, // 2h in milliseconds
    progress: 0.8,
  }
}

export const task = (
  props?: Partial<
    Pick<
      TaskDetailDTO,
      | 'id'
      | 'type'
      | 'status'
      | 'extendedStatus'
      | 'olaStatus'
      | 'workGroup'
      | 'assignee'
      | 'suspendRequest'
      | 'hasRelocationTasks'
      | 'previousDescription'
      | 'isDescriptionChanged'
      | 'previousOlaNextBreachTime'
      | 'isOlaNextBreachTimeChanged'
      | 'fiscalAccumulator'
      | 'infrastructureProject'
      | 'workType'
      | 'system'
      | 'createdBy'
    >
  >,
): Omit<TaskDetailDTO, 'responseTime'> & {
  responseTime: TaskResponseTimeDTO
} => ({
  id: props?.id || fakeId(),
  system: props?.system || SystemEnum.ITSM,
  type: props?.type || TaskTypeEnum.Request,
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  workGroup: isUndefined(props?.workGroup) ? taskFixtures.workGroup() : props!.workGroup,
  assignee: isUndefined(props?.assignee) ? taskFixtures.assignee() : props!.assignee,
  suspendRequest: isUndefined(props?.suspendRequest)
    ? taskFixtures.suspendRequest()
    : props!.suspendRequest,
  hasRelocationTasks: isUndefined(props?.hasRelocationTasks) ? true : props!.hasRelocationTasks,
  fiscalAccumulator: isUndefined(props?.fiscalAccumulator)
    ? { isRequestApproved: false, isRequestSent: false }
    : props!.fiscalAccumulator,
  previousDescription: isUndefined(props?.previousDescription)
    ? fakeWord()
    : props!.previousDescription,
  isDescriptionChanged: isUndefined(props?.isDescriptionChanged)
    ? false
    : props!.isDescriptionChanged,
  previousOlaNextBreachTime: isUndefined(props?.previousOlaNextBreachTime)
    ? fakeDateString()
    : props!.previousOlaNextBreachTime,
  isOlaNextBreachTimeChanged: isUndefined(props?.isOlaNextBreachTimeChanged)
    ? false
    : props!.isOlaNextBreachTimeChanged,
  infrastructureProject: isUndefined(props?.infrastructureProject)
    ? null
    : props!.infrastructureProject,
  workType: isUndefined(props?.workType) ? null : props!.workType,
  createdBy: isUndefined(props?.createdBy) ? null : props!.createdBy,

  observers: null,
  parentTask: null,
  shop: { id: fakeId(), title: fakeWord() },
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
  }) as TaskDetailDTO['initialImpact'],
  severity: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskDetailDTO['severity'],
  priorityCode: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskDetailDTO['priorityCode'],
  contactService: fakeWord(),
  createdAt: fakeDateString(),
  productClassifier1: fakeWord(),
  productClassifier2: fakeWord(),
  productClassifier3: fakeWord(),
  supportGroup: taskFixtures.supportGroup(),
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
  parentInteractionExternalId: fakeWord(),
})
