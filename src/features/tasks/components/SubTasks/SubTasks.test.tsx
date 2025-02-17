import { formatDate } from 'shared/utils/date'

import {
  showCancelButtonProps,
  showReworkButtonProps,
} from '_tests_/features/tasks/components/SubTasks/SubTask/constants'
import { subTaskTestUtils } from '_tests_/features/tasks/components/SubTasks/SubTask/testUtils'
import { props } from '_tests_/features/tasks/components/SubTasks/constants'
import { subTaskListTestUtils } from '_tests_/features/tasks/components/SubTasks/testUtils'
import tasksFixtures from '_tests_/fixtures/tasks'
import { render } from '_tests_/helpers'

import SubTasks from './index'

describe('Список подзадач', () => {
  test('Отображает верное количество задач', () => {
    render(<SubTasks {...props} />)

    expect(subTaskTestUtils.getAllContainerIn(subTaskListTestUtils.getContainer())).toHaveLength(
      props.list.length,
    )
  })

  test('Верно отображает дату "olaNextBreachTime"', () => {
    render(<SubTasks {...props} />)

    const formattedOlaNextBreachTime = formatDate(props.list[0].olaNextBreachTime)

    expect(
      subTaskTestUtils.getChildByText(new RegExp(formattedOlaNextBreachTime)),
    ).toBeInTheDocument()
  })

  test('Верно отображает дату создания', () => {
    render(<SubTasks {...props} />)
    const formattedCreatedAt = formatDate(props.list[0].createdAt)
    expect(subTaskTestUtils.getChildByText(new RegExp(formattedCreatedAt))).toBeInTheDocument()
  })

  test('Отображается соответствующее сообщение если список пуст', () => {
    render(<SubTasks {...props} list={[]} />)
    expect(subTaskListTestUtils.getChildByText('Заданий нет')).toBeInTheDocument()
  })

  test('При ошибке получения списка отображается соответствующее сообщение', () => {
    render(<SubTasks {...props} list={[]} isError />)
    expect(subTaskListTestUtils.getChildByText('Не удалось получить задания')).toBeInTheDocument()
  })

  describe('Отправка задания на доработку', () => {
    test('Обработчик кнопки вызывается корректно', async () => {
      const subTask = {
        ...tasksFixtures.subTask(),
        status: showReworkButtonProps.status,
      }

      const { user } = render(
        <SubTasks
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
        ...tasksFixtures.subTask(),
        status: showCancelButtonProps.status,
      }

      const { user } = render(
        <SubTasks
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
