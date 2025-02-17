import { TaskTypeEnum } from 'features/tasks/api/constants'

import { formatDate } from 'shared/utils/date'
import { hexToRGB } from 'shared/utils/hexToRGB'

import theme from 'styles/theme'

import { props, taskListItem } from '_tests_/features/tasks/components/TasksFromMap/constants'
import { tasksFromMapTestUtils } from '_tests_/features/tasks/components/TasksFromMap/testUtils'
import tasksFixtures from '_tests_/fixtures/tasks'
import { render } from '_tests_/helpers'

import TasksFromMap, { taskTypeText } from './index'

describe('Список заявок', () => {
  test('Отображается верно количество', () => {
    render(<TasksFromMap {...props} />)

    props.tasks.forEach((task) => {
      const listItem = tasksFromMapTestUtils.getListItem(task.id)
      expect(listItem).toBeInTheDocument()
    })
  })

  describe('Тип заявки', () => {
    test('Отображается', () => {
      render(<TasksFromMap {...props} />)

      const type = tasksFromMapTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      expect(type).toBeInTheDocument()
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.Incident} отображается корректно`, () => {
      const taskListItem = tasksFixtures.task({
        type: TaskTypeEnum.Incident,
      })

      render(<TasksFromMap {...props} tasks={[taskListItem]} />)

      const type = tasksFromMapTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.fireOpal) })
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.IncidentTask} отображается корректно`, () => {
      const taskListItem = tasksFixtures.task({
        type: TaskTypeEnum.IncidentTask,
      })

      render(<TasksFromMap {...props} tasks={[taskListItem]} />)

      const type = tasksFromMapTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.darkTangerine) })
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.Request} отображается корректно`, () => {
      const taskListItem = tasksFixtures.task({
        type: TaskTypeEnum.Request,
      })

      render(<TasksFromMap {...props} tasks={[taskListItem]} />)

      const type = tasksFromMapTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.unitedNationsBlue) })
    })

    test(`Задний фон и текст для типа ${TaskTypeEnum.RequestTask} отображается корректно`, () => {
      const taskListItem = tasksFixtures.task({
        type: TaskTypeEnum.RequestTask,
      })

      render(<TasksFromMap {...props} tasks={[taskListItem]} />)

      const type = tasksFromMapTestUtils.getListItemChildByText(
        taskListItem.id,
        taskTypeText[taskListItem.type],
      )

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = type.parentNode!
      expect(wrapper).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.darkTangerine) })
    })
  })

  test('Объект отображается', () => {
    render(<TasksFromMap {...props} />)

    const object = tasksFromMapTestUtils.getListItemChildByText(taskListItem.id, taskListItem.name!)

    expect(object).toBeInTheDocument()
  })

  test('Срок выполнения отображается', () => {
    render(<TasksFromMap {...props} />)

    const olaNextBreachTime = tasksFromMapTestUtils.getListItemChildByText(
      taskListItem.id,
      formatDate(taskListItem.olaNextBreachTime),
    )

    expect(olaNextBreachTime).toBeInTheDocument()
  })

  test('Тема отображается', () => {
    render(<TasksFromMap {...props} />)

    const theme = tasksFromMapTestUtils.getListItemChildByText(taskListItem.id, taskListItem.title)

    expect(theme).toBeInTheDocument()
  })

  test('Элемент списка можно сделать выбранным', () => {
    render(<TasksFromMap {...props} selectedTaskId={taskListItem.id} />)

    const listItem = tasksFromMapTestUtils.getListItem(taskListItem.id)

    expect(listItem).toHaveClass('list-item-selected')
    expect(listItem).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.chineseWhite) })
  })

  test('По клику на элемент вызывается обработчик', async () => {
    const { user } = render(<TasksFromMap {...props} />)

    await tasksFromMapTestUtils.clickListItem(user, taskListItem.id)

    expect(props.onClickTask).toBeCalledTimes(1)
    expect(props.onClickTask).toBeCalledWith(taskListItem.id)
  })
})
