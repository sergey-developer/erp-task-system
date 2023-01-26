import {
  generateDateString,
  generateEmail,
  generateId,
  generateIdStr,
  generateInteger,
  generateLatitude,
  generateLongitude,
  generatePhone,
  generateWord,
} from '_tests_/utils'
import commonFixtures from 'fixtures/common'
import taskFixtures from 'fixtures/task'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { TaskModel } from 'modules/task/models'

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
      | 'suspendRequest'
    >
  >,
): TaskModel => ({
  id: props?.id || generateId(),
  type: props?.type || TaskTypeEnum.Request,
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  workGroup: props?.workGroup || taskFixtures.getWorkGroup(),
  assignee: props?.assignee || taskFixtures.getAssignee(),
  suspendRequest: props?.suspendRequest || null,

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
  supportGroup: commonFixtures.getSupportGroup(),
  olaEstimatedTime: Date.now(),

  description: generateWord(),
  contactPhone: generatePhone(),
  portablePhone: generatePhone(),
  address: generateWord(),
  company: generateWord(),
  contactType: generateWord(),
  email: generateEmail(),
  latitude: String(generateLatitude()),
  longitude: String(generateLongitude()),
  sapId: generateIdStr(),
  olaNextBreachTime: generateDateString(),
  weight: generateInteger(),
  techResolution: generateWord(),
  userResolution: generateWord(),
})
