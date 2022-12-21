import { render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import subTaskFixtures from 'fixtures/subTask'
import { TaskStatusEnum } from 'modules/task/constants/common'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import SubTaskList, { SubTaskListProps } from './index'
import { testUtils as subTaskTestUtils } from './SubTask.test'

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
})
