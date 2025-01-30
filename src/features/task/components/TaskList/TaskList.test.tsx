import { TaskTypeEnum } from 'features/task/constants/task'

import { formatDate } from 'shared/utils/date'
import { hexToRGB } from 'shared/utils/hexToRGB'

import theme from 'styles/theme'

import { props, taskListItem } from '_tests_/features/tasks/components/TaskList/constants'
import { taskListTestUtils } from '_tests_/features/tasks/components/TaskList/taskListTestUtils'
import taskFixtures from '_tests_/fixtures/task'
import { render } from '_tests_/utils'

import TaskList, { taskTypeText } from './index'

describe('Список заявок', () => {
  test('Отображается верно количество', () => {
    render(<TaskList {...props} />)

    props.tasks.forEach((task) => {
      const listItem = taskListTestUtils.getListItem(task.id)
      expect(listItem).toBeInTheDocument()
    })
  })

  describe('Тип заявки', () => {
    test('Отображается', () => {
      render(<TaskList {...props} />)

      const type = taskListTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      expect(type).toBeInTheDocument()
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.Incident} отображается корректно`, () => {
      const taskListItem = taskFixtures.taskListItem({
        type: TaskTypeEnum.Incident,
      })

      render(<TaskList {...props} tasks={[taskListItem]} />)

      const type = taskListTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.fireOpal) })
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.IncidentTask} отображается корректно`, () => {
      const taskListItem = taskFixtures.taskListItem({
        type: TaskTypeEnum.IncidentTask,
      })

      render(<TaskList {...props} tasks={[taskListItem]} />)

      const type = taskListTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.darkTangerine) })
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.Request} отображается корректно`, () => {
      const taskListItem = taskFixtures.taskListItem({
        type: TaskTypeEnum.Request,
      })

      render(<TaskList {...props} tasks={[taskListItem]} />)

      const type = taskListTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.unitedNationsBlue) })
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.RequestTask} отображается корректно`, () => {
      const taskListItem = taskFixtures.taskListItem({
        type: TaskTypeEnum.RequestTask,
      })

      render(<TaskList {...props} tasks={[taskListItem]} />)

      const type = taskListTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.darkTangerine) })
    })
  })

  test('Объект отображается', () => {
    render(<TaskList {...props} />)

    const object = taskListTestUtils.getListItemChildByText(taskListItem.id, taskListItem.name!)

    expect(object).toBeInTheDocument()
  })

  test('Срок выполнения отображается', () => {
    render(<TaskList {...props} />)

    const olaNextBreachTime = taskListTestUtils.getListItemChildByText(
      taskListItem.id,
      formatDate(taskListItem.olaNextBreachTime),
    )

    expect(olaNextBreachTime).toBeInTheDocument()
  })

  test('Тема отображается', () => {
    render(<TaskList {...props} />)

    const theme = taskListTestUtils.getListItemChildByText(taskListItem.id, taskListItem.title)

    expect(theme).toBeInTheDocument()
  })

  test('Элемент списка можно сделать выбранным', () => {
    render(<TaskList {...props} selectedTaskId={taskListItem.id} />)

    const listItem = taskListTestUtils.getListItem(taskListItem.id)

    expect(listItem).toHaveClass('list-item-selected')
    expect(listItem).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.chineseWhite) })
  })

  test('По клику на элемент вызывается обработчик', async () => {
    const { user } = render(<TaskList {...props} />)

    await taskListTestUtils.clickListItem(user, taskListItem.id)

    expect(props.onClickTask).toBeCalledTimes(1)
    expect(props.onClickTask).toBeCalledWith(taskListItem.id)
  })
})
