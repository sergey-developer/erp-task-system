import times from 'lodash/times'

import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import { GetTaskListSuccessResponse, TaskListItemModel } from 'modules/task/models'

import commonFixtures from '_tests_/fixtures/common'
import supportGroupFixtures from '_tests_/fixtures/supportGroup'
import taskFixtures from '_tests_/fixtures/task'
import {
  fakeAddress,
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeLatitude,
  fakeLongitude,
  fakePhone,
  fakeWord,
} from '_tests_/utils'

export const taskListItem = (props?: Partial<TaskListItemModel>): TaskListItemModel => ({
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  type: props?.type || TaskTypeEnum.Request,

  responseTime: null,
  id: fakeId(),
  assignee: taskFixtures.assignee(),
  lastComment: fakeWord(),
  priorityCode: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskListItemModel['priorityCode'],
  severity: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskListItemModel['severity'],
  initialImpact: fakeInteger({
    min: 1,
    max: 4,
  }) as TaskListItemModel['initialImpact'],
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  workGroup: taskFixtures.workGroup(),
  supportGroup: supportGroupFixtures.supportGroup(),
  title: fakeWord(),
  name: fakeWord(),
  productClassifier1: fakeWord(),
  productClassifier2: fakeWord(),
  productClassifier3: fakeWord(),
  contactService: fakeWord(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
  longitude: String(fakeLongitude()),
  latitude: String(fakeLatitude()),
  userResolution: fakeWord(),
  techResolution: fakeWord(),
  portablePhone: fakePhone(),
  olaNextBreachTime: fakeDateString(),
  description: fakeWord(),
  address: fakeAddress(),
  contactPhone: fakePhone(),
  parentInteractionExternalId: fakeWord(),
})

export const taskList = (length: number = 1): TaskListItemModel[] =>
  times(length, () => taskListItem())

export const taskListResponse = (
  list: GetTaskListSuccessResponse['results'],
): GetTaskListSuccessResponse => commonFixtures.paginatedListResponse(list)
