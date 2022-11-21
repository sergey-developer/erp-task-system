import { generateId, generateWord } from '_tests_/utils'
import { taskFixtures } from 'fixtures/task'
import { workGroupFixtures } from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { WorkGroupProps } from '../index'

export const requiredProps: Omit<WorkGroupProps, 'workGroup'> = {
  id: generateId(),
  recordId: generateWord(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  workGroupList: workGroupFixtures.getWorkGroupList(),
  workGroupListIsLoading: false,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  hasReclassificationRequest: false,
}

// first line button
export const showFirstLineButtonProps: Pick<
  WorkGroupProps,
  'workGroup' | 'status'
> = {
  workGroup: taskFixtures.getTaskWorkGroup(),
  status: TaskStatusEnum.New,
}

export const activeFirstLineButtonProps: Pick<
  WorkGroupProps,
  'hasReclassificationRequest'
> = {
  hasReclassificationRequest: false,
}

// second line button
export const showSecondLineButtonProps: Pick<WorkGroupProps, 'workGroup'> = {
  workGroup: null,
}

export const activeSecondLineButtonProps: Pick<
  WorkGroupProps,
  'status' | 'extendedStatus' | 'hasReclassificationRequest'
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.Awaiting,
  hasReclassificationRequest: false,
}
