import { screen } from '@testing-library/react'

import { TaskExtendedStatusEnum, TaskStatusEnum } from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'

import { fakeId, fakeIdStr, render } from '_tests_/utils'

import { testUtils as assigneeTestUtils } from '../AssigneeBlock/AssigneeBlock.test'
import { testUtils as workGroupTestUtils } from '../WorkGroupBlock/WorkGroupBlock.test'
import SecondaryDetails, { SecondaryDetailsProps } from './index'

const props: Readonly<SecondaryDetailsProps> = {
  id: fakeId(),
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  transferTaskToSecondLine: jest.fn(),
  transferTaskToSecondLineIsLoading: false,
  transferTaskToFirstLine: jest.fn(),
  transferTaskToFirstLineIsLoading: false,
  assignee: null,
  takeTask: jest.fn(),
  takeTaskIsLoading: false,
  updateAssignee: jest.fn(),
  updateAssigneeIsLoading: false,
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
  workGroup: null,
}

const getContainer = () => screen.getByTestId('task-card-secondary-details')

const queryContainer = () => screen.queryByTestId('task-card-secondary-details')

export const testUtils = {
  getContainer,
  queryContainer,
}

describe('Блок детальной информации заявки', () => {
  test('Отображается', () => {
    render(<SecondaryDetails {...props} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  describe('Блок исполнителя', () => {
    test('Отображается', () => {
      render(<SecondaryDetails {...props} />)
      expect(assigneeTestUtils.getContainer()).toBeInTheDocument()
    })
  })

  describe('Блок рабочей группы', () => {
    test('Отображается', () => {
      render(<SecondaryDetails {...props} />)
      expect(workGroupTestUtils.getContainer()).toBeInTheDocument()
    })
  })
})
