import { screen, within } from '@testing-library/react'

import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants'

import { formatDate } from 'shared/utils/date'

import subTaskFixtures from 'fixtures/subTask'

import { render } from '_tests_/utils'

import {
  activeCancelButtonProps,
  activeReworkButtonProps,
  testUtils as subTaskTestUtils,
} from './SubTask.test'
import SubTaskList, { SubTaskListProps } from './index'

const requiredProps: Readonly<SubTaskListProps> = {
  list: subTaskFixtures.getSubTaskList(),
  isError: false,
  taskStatus: TaskStatusEnum.New,
  taskExtendedStatus: TaskExtendedStatusEnum.New,
  currentUserIsTaskAssignee: false,
  onClickCancel: jest.fn(),
  onClickRework: jest.fn(),
  taskSuspendRequestStatus: SuspendRequestStatusEnum.Denied,
}

const getContainer = () => screen.getByTestId('sub-task-list')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

export const testUtils = {
  getContainer,
  getChildByText,
}

describe('Список подзадач', () => {
  test('Отображает верное количество задач', () => {
    render(<SubTaskList {...requiredProps} />)

    expect(
      subTaskTestUtils.getAllContainerIn(testUtils.getContainer()),
    ).toHaveLength(requiredProps.list.length)
  })

  test('Верно отображает дату "olaNextBreachTime"', () => {
    render(<SubTaskList {...requiredProps} />)

    const formattedOlaNextBreachTime = formatDate(
      requiredProps.list[0].olaNextBreachTime,
    )

    expect(
      subTaskTestUtils.getChildByText(new RegExp(formattedOlaNextBreachTime)),
    ).toBeInTheDocument()
  })

  test('Верно отображает дату создания', () => {
    render(<SubTaskList {...requiredProps} />)

    const formattedCreatedAt = formatDate(requiredProps.list[0].createdAt)

    expect(
      subTaskTestUtils.getChildByText(new RegExp(formattedCreatedAt)),
    ).toBeInTheDocument()
  })

  test('Отображается соответствующее сообщение если список пуст', () => {
    render(<SubTaskList {...requiredProps} list={[]} />)
    expect(testUtils.getChildByText('Заданий нет')).toBeInTheDocument()
  })

  test('При ошибке получения списка отображается соответствующее сообщение', () => {
    render(<SubTaskList {...requiredProps} list={[]} isError />)

    expect(
      testUtils.getChildByText('Не удалось получить задания'),
    ).toBeInTheDocument()
  })

  describe('Отправка задания на доработку', () => {
    test('Обработчик кнопки вызывается корректно', async () => {
      const subTask = {
        ...subTaskFixtures.fakeSubTask(),
        status: activeReworkButtonProps.status,
      }

      const { user } = render(
        <SubTaskList
          {...requiredProps}
          list={[subTask]}
          taskStatus={activeReworkButtonProps.taskStatus}
          currentUserIsTaskAssignee={
            activeReworkButtonProps.currentUserIsTaskAssignee
          }
        />,
      )

      await subTaskTestUtils.clickReworkButton(user)

      expect(requiredProps.onClickRework).toBeCalledTimes(1)
      expect(requiredProps.onClickRework).toBeCalledWith(subTask)
    })
  })

  describe('Отмена задания', () => {
    test('Обработчик кнопки вызывается корректно', async () => {
      const subTask = {
        ...subTaskFixtures.fakeSubTask(),
        status: activeCancelButtonProps.status,
      }

      const { user } = render(
        <SubTaskList
          {...requiredProps}
          list={[subTask]}
          taskStatus={activeCancelButtonProps.taskStatus}
          currentUserIsTaskAssignee={
            activeCancelButtonProps.currentUserIsTaskAssignee
          }
        />,
      )

      await subTaskTestUtils.clickCancelButton(user)

      expect(requiredProps.onClickCancel).toBeCalledTimes(1)
      expect(requiredProps.onClickCancel).toBeCalledWith(subTask)
    })
  })
})
