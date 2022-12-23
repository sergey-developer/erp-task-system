import { render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import subTaskFixtures from 'fixtures/subTask'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import SubTaskList, { SubTaskListProps } from './index'
import {
  activeCancelButtonProps,
  activeReworkButtonProps,
  testUtils as subTaskTestUtils,
} from './SubTask.test'

const requiredProps: SubTaskListProps = {
  list: subTaskFixtures.getSubTaskList(),
  isError: false,
  taskStatus: TaskStatusEnum.New,
  currentUserIsTaskAssignee: false,
  onClickCancel: jest.fn(),
  onClickRework: jest.fn(),
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
      DATE_TIME_FORMAT,
    )

    expect(
      subTaskTestUtils.getChildByText(new RegExp(formattedOlaNextBreachTime)),
    ).toBeInTheDocument()
  })

  test('Верно отображает дату создания', () => {
    render(<SubTaskList {...requiredProps} />)

    const formattedCreatedAt = formatDate(
      requiredProps.list[0].createdAt,
      DATE_TIME_FORMAT,
    )

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
        ...subTaskFixtures.getSubTask(),
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

      await subTaskTestUtils.userClickReworkButton(user)

      expect(requiredProps.onClickRework).toBeCalledTimes(1)
      expect(requiredProps.onClickRework).toBeCalledWith(subTask)
    })
  })

  describe('Отмена задания', () => {
    test('Обработчик кнопки вызывается корректно', async () => {
      const subTask = {
        ...subTaskFixtures.getSubTask(),
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

      await subTaskTestUtils.userClickCancelButton(user)

      expect(requiredProps.onClickCancel).toBeCalledTimes(1)
      expect(requiredProps.onClickCancel).toBeCalledWith(subTask)
    })
  })
})
