import { formatDate } from 'shared/utils/date'

import {
  showCancelButtonProps,
  showReworkButtonProps,
} from '_tests_/features/tasks/SubTaskList/SubTask/constants'
import { subTaskTestUtils } from '_tests_/features/tasks/SubTaskList/SubTask/testUtils'
import { props } from '_tests_/features/tasks/SubTaskList/constants'
import { subTaskListTestUtils } from '_tests_/features/tasks/SubTaskList/testUtils'
import taskFixtures from '_tests_/fixtures/task'
import { render } from '_tests_/utils'

import SubTaskList from './index'

describe('Список подзадач', () => {
  test('Отображает верное количество задач', () => {
    render(<SubTaskList {...props} />)

    expect(subTaskTestUtils.getAllContainerIn(subTaskListTestUtils.getContainer())).toHaveLength(
      props.list.length,
    )
  })

  test('Верно отображает дату "olaNextBreachTime"', () => {
    render(<SubTaskList {...props} />)

    const formattedOlaNextBreachTime = formatDate(props.list[0].olaNextBreachTime)

    expect(
      subTaskTestUtils.getChildByText(new RegExp(formattedOlaNextBreachTime)),
    ).toBeInTheDocument()
  })

  test('Верно отображает дату создания', () => {
    render(<SubTaskList {...props} />)
    const formattedCreatedAt = formatDate(props.list[0].createdAt)
    expect(subTaskTestUtils.getChildByText(new RegExp(formattedCreatedAt))).toBeInTheDocument()
  })

  test('Отображается соответствующее сообщение если список пуст', () => {
    render(<SubTaskList {...props} list={[]} />)
    expect(subTaskListTestUtils.getChildByText('Заданий нет')).toBeInTheDocument()
  })

  test('При ошибке получения списка отображается соответствующее сообщение', () => {
    render(<SubTaskList {...props} list={[]} isError />)
    expect(subTaskListTestUtils.getChildByText('Не удалось получить задания')).toBeInTheDocument()
  })

  describe('Отправка задания на доработку', () => {
    test('Обработчик кнопки вызывается корректно', async () => {
      const subTask = {
        ...taskFixtures.subTask(),
        status: showReworkButtonProps.status,
      }

      const { user } = render(
        <SubTaskList
          {...props}
          list={[subTask]}
          taskStatus={showReworkButtonProps.taskStatus}
          currentUserIsTaskAssignee={showReworkButtonProps.currentUserIsTaskAssignee}
        />,
      )

      await subTaskTestUtils.clickReworkButton(user)

      expect(props.onClickRework).toBeCalledTimes(1)
      expect(props.onClickRework).toBeCalledWith(subTask)
    })
  })

  describe('Отмена задания', () => {
    test('Обработчик кнопки вызывается корректно', async () => {
      const subTask = {
        ...taskFixtures.subTask(),
        status: showCancelButtonProps.status,
      }

      const { user } = render(
        <SubTaskList
          {...props}
          list={[subTask]}
          taskStatus={showCancelButtonProps.taskStatus}
          currentUserIsTaskAssignee={showCancelButtonProps.currentUserIsTaskAssignee}
        />,
      )

      await subTaskTestUtils.clickCancelButton(user)

      expect(props.onClickCancel).toBeCalledTimes(1)
      expect(props.onClickCancel).toBeCalledWith(subTask)
    })
  })
})
