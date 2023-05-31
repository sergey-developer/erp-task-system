import times from 'lodash/times'

import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { TaskTableListItem } from 'modules/task/features/TaskTable/interfaces'

import commonFixtures from 'fixtures/common'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'

import {
  fakeDateString,
  fakeId,
  fakeIdStr,
  fakeInteger,
  fakeName,
  fakeWord,
} from '_tests_/utils'

export const fakeTaskTableItem = (
  props?: Partial<
    Pick<TaskTableListItem, 'status' | 'extendedStatus' | 'olaStatus'>
  >,
): TaskTableListItem => ({
  id: fakeId(),
  name: fakeName(),
  title: fakeWord(),
  workGroup: workGroupFixtures.fakeWorkGroup(),
  supportGroup: commonFixtures.fakeSupportGroup(),
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  lastComment: fakeWord(),
  assignee: taskFixtures.fakeAssignee(),
  olaNextBreachTime: fakeDateString(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
  responseTime: taskFixtures.fakeTaskResponseTime(),

  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
})

export const fakeTaskTableItems = (
  length: number = 1,
): Array<TaskTableListItem> => times(length, () => fakeTaskTableItem())
