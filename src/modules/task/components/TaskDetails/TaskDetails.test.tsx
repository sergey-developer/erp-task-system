import { screen } from '@testing-library/react'

import { fakeId, render, spinnerTestUtils } from '_tests_/utils'

import taskFixtures from '../../../../_tests_/fixtures/task'
import {
  mockGetTaskReclassificationRequestSuccess,
  mockGetTaskSuccess,
} from '../../../../_tests_/mocks/api'
import { TaskExtendedStatusEnum } from '../../constants/task'
import TaskDetails, { TaskDetailsProps } from './index'

const taskId = fakeId()

const props: TaskDetailsProps = {
  taskId,

  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),

  activeTab: undefined,
  onClose: jest.fn(),
}

const findContainer = () => screen.findByTestId('task-details')

const expectTaskLoadingStarted = spinnerTestUtils.expectLoadingStarted('task-loading')
const expectTaskLoadingFinished = spinnerTestUtils.expectLoadingFinished('task-loading')

const expectReclassificationRequestLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  'task-reclassification-request-loading',
)
const expectReclassificationRequestLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'task-reclassification-request-loading',
)

export const testUtils = {
  findContainer,

  expectTaskLoadingStarted,
  expectTaskLoadingFinished,
  expectReclassificationRequestLoadingStarted,
  expectReclassificationRequestLoadingFinished,
}

describe('Карточка заявки', () => {
  describe('Переклассификация заявки', () => {
    describe('Отмена запроса', () => {
      test('При нажатии на кнопку отмены в заявке открывается модалка подтверждения', async () => {
        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({
            id: props.taskId,
            extendedStatus: TaskExtendedStatusEnum.InReclassification,
          }),
        })

        mockGetTaskReclassificationRequestSuccess(props.taskId, {
          body: taskFixtures.reclassificationRequest(),
        })

        render(<TaskDetails {...props} />)

        await testUtils.expectTaskLoadingStarted()
        await testUtils.expectTaskLoadingFinished()
        // await testUtils.expectReclassificationRequestLoadingStarted()
        // await testUtils.expectReclassificationRequestLoadingFinished()
        // await taskReclassificationRequestTestUtils.findContainer()
      })
    })
  })
})
