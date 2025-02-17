import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'
import { TaskDTO } from 'features/tasks/api/dto'
import { GetTasksResponse } from 'features/tasks/api/schemas'
import times from 'lodash/times'

import commonFixtures from '_tests_/fixtures/common'
import supportGroupsFixtures from '_tests_/fixtures/supportGroups'
import tasksFixtures from '_tests_/fixtures/tasks/index'
import { fakeDateString, fakeId, fakeIdStr, fakeInteger, fakeWord } from '_tests_/helpers'

export const task = (
  props?: Partial<
    Pick<TaskDTO, 'status' | 'extendedStatus' | 'olaStatus' | 'type' | 'olaNextBreachTime'>
  >,
): TaskDTO => ({
  status: props?.status || TaskStatusEnum.New,
  extendedStatus: props?.extendedStatus || TaskExtendedStatusEnum.New,
  olaStatus: props?.olaStatus || TaskOlaStatusEnum.NotExpired,
  type: props?.type || TaskTypeEnum.Request,
  olaNextBreachTime: props?.olaNextBreachTime || fakeDateString(),

  responseTime: null,
  id: fakeId(),
  assignee: tasksFixtures.taskAssignee(),
  lastComment: fakeWord(),
  createdAt: fakeDateString(),
  recordId: fakeIdStr(),
  workGroup: tasksFixtures.taskWorkGroup(),
  supportGroup: supportGroupsFixtures.supportGroup(),
  title: fakeWord(),
  name: fakeWord(),
  subtasksCounter: { all: fakeInteger(), completed: fakeInteger() },
})

export const tasks = (length: number = 1): TaskDTO[] => times(length, () => task())

export const getTasksResponse = (list: GetTasksResponse['results']): GetTasksResponse =>
  commonFixtures.paginatedListResponse(list)
