import { generateId, generateIdStr, render } from '_tests_/utils'
import { screen } from '@testing-library/react'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'

import { testUtils as assigneeTestUtils } from '../AssigneeBlock/AssigneeBlock.test'
import { testUtils as workGroupTestUtils } from '../WorkGroupBlock/WorkGroupBlock.test'
import SecondaryDetails, { SecondaryDetailsProps } from './index'

const requiredProps: Omit<SecondaryDetailsProps, 'workGroup'> = {
  id: generateId(),
  recordId: generateIdStr(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  workGroupList: [],
  workGroupListIsLoading: false,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  assignee: null,
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
  hasSuspendRequest: false,
}

const getContainer = () => screen.getByTestId('task-card-secondary-details')

const queryContainer = () => screen.queryByTestId('task-card-secondary-details')

export const testUtils = {
  getContainer,
  queryContainer,
}

describe('Блок детальной информации заявки', () => {
  test('Отображается', () => {
    render(<SecondaryDetails {...requiredProps} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  describe('Блок исполнителя', () => {
    test('Отображается', () => {
      render(<SecondaryDetails {...requiredProps} />)
      expect(assigneeTestUtils.getContainer()).toBeInTheDocument()
    })
  })

  describe('Блок рабочей группы', () => {
    test('Отображается', () => {
      render(<SecondaryDetails {...requiredProps} />)
      expect(workGroupTestUtils.getContainer()).toBeInTheDocument()
    })
  })
})
