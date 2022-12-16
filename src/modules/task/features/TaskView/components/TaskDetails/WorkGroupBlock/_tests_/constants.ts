import { generateId, generateWord } from '_tests_/utils'
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { WorkGroupBlockProps } from '../index'

export const requiredProps: Omit<WorkGroupBlockProps, 'workGroup'> = {
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
}

// first line button
export const showFirstLineButtonProps: Pick<
  WorkGroupBlockProps,
  'workGroup' | 'status'
> = {
  workGroup: taskFixtures.getTaskWorkGroup(),
  status: TaskStatusEnum.New,
}

export const activeFirstLineButtonProps: Pick<
  WorkGroupBlockProps,
  'status' | 'extendedStatus'
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}

// second line button
export const showSecondLineButtonProps: Pick<WorkGroupBlockProps, 'workGroup'> =
  {
    workGroup: null,
  }

export const activeSecondLineButtonProps: Pick<
  WorkGroupBlockProps,
  'status' | 'extendedStatus'
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
}
