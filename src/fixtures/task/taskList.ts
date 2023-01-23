import times from 'lodash/times'

import {
  generateDateString,
  generateId,
  generateInteger,
  generateWord,
} from '_tests_/utils'
import commonFixtures from 'fixtures/common'
import workGroupFixtures from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import {
  GetTaskListSuccessResponse,
  TaskListItemModel,
} from 'modules/task/models'

import { getAssignee } from './assignee'

export const getTaskListItem = (
  props?: Partial<TaskListItemModel>,
): TaskListItemModel => ({
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  type: props?.type || TaskTypeEnum.Request,

  id: generateId(),
  assignee: getAssignee(),
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
  recordId: generateWord(),
  workGroup: workGroupFixtures.getWorkGroup(),
  supportGroup: commonFixtures.getSupportGroup(),
  title: generateWord(),
  name: generateWord(),
  productClassifier1: generateWord(),
  productClassifier2: generateWord(),
  productClassifier3: generateWord(),
  contactService: generateWord(),
})

export const getTaskList = (length: number = 1): Array<TaskListItemModel> =>
  times(length, () => getTaskListItem())

export const getTaskListResponse = (
  list: GetTaskListSuccessResponse['results'],
): GetTaskListSuccessResponse => commonFixtures.getPaginatedListResponse(list)
