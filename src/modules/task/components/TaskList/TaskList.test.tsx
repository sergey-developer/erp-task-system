import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TaskTypeEnum } from 'modules/task/constants/task'

import { IdType } from 'shared/types/common'
import { formatDate } from 'shared/utils/date'
import { hexToRGB } from 'shared/utils/hexToRGB'

import theme from 'styles/theme'

import taskFixtures from '_tests_/fixtures/task'
import { render } from '_tests_/utils'

import TaskList, { taskTypeText } from './index'
import { TaskListProps } from './types'

const taskListItem = taskFixtures.taskListItem()

const props: Readonly<TaskListProps> = {
  tasks: [taskListItem],
  selectedTaskId: null,
  onClickTask: jest.fn(),
}

const getContainer = () => screen.getByTestId('task-list')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getListItem = (id: IdType) => within(getContainer()).getByTestId(`task-list-item-${id}`)

const getListItemChildByText = (id: IdType, text: string) => {
  const listItem = getListItem(id)
  return within(listItem).getByText(text)
}

const queryListItemChildByText = (id: IdType, text: string) => {
  const listItem = getListItem(id)
  return within(listItem).queryByText(text)
}

const clickListItem = async (user: UserEvent, id: IdType) => {
  const listItem = getListItem(id)
  await user.click(listItem)
  return listItem
}

export const testUtils = {
  getContainer,
  getChildByText,

  getListItem,
  getListItemChildByText,
  queryListItemChildByText,

  clickListItem,
}

describe('Список заявок', () => {
  test('Отображается верно количество', () => {
    render(<TaskList {...props} />)

    props.tasks.forEach((task) => {
      const listItem = testUtils.getListItem(task.id)
      expect(listItem).toBeInTheDocument()
    })
  })

  describe('Тип заявки', () => {
    test('Отображается', () => {
      render(<TaskList {...props} />)

      const type = testUtils.getListItemChildByText(
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

      const type = testUtils.getListItemChildByText(
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

      const type = testUtils.getListItemChildByText(
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

      const type = testUtils.getListItemChildByText(
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

      const type = testUtils.getListItemChildByText(
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

    const object = testUtils.getListItemChildByText(taskListItem.id, taskListItem.name!)

    expect(object).toBeInTheDocument()
  })

  test('Срок выполнения отображается', () => {
    render(<TaskList {...props} />)

    const olaNextBreachTime = testUtils.getListItemChildByText(
      taskListItem.id,
      formatDate(taskListItem.olaNextBreachTime),
    )

    expect(olaNextBreachTime).toBeInTheDocument()
  })

  test('Тема отображается', () => {
    render(<TaskList {...props} />)

    const theme = testUtils.getListItemChildByText(taskListItem.id, taskListItem.title)

    expect(theme).toBeInTheDocument()
  })

  test('Элемент списка можно сделать выбранным', () => {
    render(<TaskList {...props} selectedTaskId={taskListItem.id} />)

    const listItem = testUtils.getListItem(taskListItem.id)

    expect(listItem).toHaveClass('list-item-selected')
    expect(listItem).toHaveStyle({ backgroundColor: hexToRGB(theme.colors.chineseWhite) })
  })

  test('По клику на элемент вызывается обработчик', async () => {
    const { user } = render(<TaskList {...props} />)

    await testUtils.clickListItem(user, taskListItem.id)

    expect(props.onClickTask).toBeCalledTimes(1)
    expect(props.onClickTask).toBeCalledWith(taskListItem.id)
  })
})
