import times from 'lodash/times'

import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { TaskTableListItem } from 'modules/task/features/TaskTable/interfaces'

import { NonNullableObject } from 'shared/interfaces/utils'

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

export const getTaskTableItem = (
  props?: Partial<
    Pick<TaskTableListItem, 'status' | 'extendedStatus' | 'olaStatus'>
  >,
): NonNullableObject<TaskTableListItem> => ({
  id: fakeId(),
  name: fakeName(),
  title: fakeWord(),
  workGroup: workGroupFixtures.getWorkGroup(),
  supportGroup: commonFixtures.getSupportGroup(),
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  lastComment: fakeWord(),
  assignee: taskFixtures.getAssignee(),
  olaNextBreachTime: fakeDateString(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
  responseTime: {
    value: fakeDateString(),
    timedelta: 2398698985,
    progress: fakeInteger({
      min: 0,
      max: 1,
    }),
  },

  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
})

export const getTaskTableItems = (
  length: number = 1,
): Array<TaskTableListItem> => times(length, () => getTaskTableItem())
