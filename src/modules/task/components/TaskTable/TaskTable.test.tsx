import { parseResponseTime } from 'modules/task/components/TaskDetails/MainDetails/utils'
import { TaskExtendedStatusEnum, taskStatusDict, TaskStatusEnum } from 'modules/task/constants/task'
import { DEFAULT_PAGE_SIZE } from 'modules/task/pages/TasksPage/constants'
import { getShortUserName } from 'modules/user/utils'

import { formatDate } from 'shared/utils/date'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import { taskStatusTestUtils } from '_tests_/features/tasks/components/TaskStatus/testUtils'
import { paginationProps, props, taskTableItem } from '_tests_/features/tasks/components/TaskTable/constants'
import { taskTableTestUtils } from '_tests_/features/tasks/components/TaskTable/testUtils'
import taskFixtures from '_tests_/fixtures/task'
import { render, tableTestUtils } from '_tests_/utils'

import TaskTable from './index'

afterEach(() => {
  const onRow = props.onRow as jest.Mock
  const onChange = props.onChange as jest.Mock

  onRow.mockReset()
  onChange.mockReset()
})

describe('Таблица заявок', () => {
  test('Отображается', () => {
    const tableItems = taskFixtures.taskTableItems(2)
    render(<TaskTable {...props} dataSource={tableItems} />)

    const table = taskTableTestUtils.getContainer()
    tableTestUtils.expectPaginationEnabledIn(table)

    expect(table).toBeInTheDocument()
    tableItems.forEach((item) => {
      const row = taskTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Статус заявки', () => {
    describe('Отображается по статусу заявки', () => {
      test(`${TaskStatusEnum.New}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.New,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskStatusEnum.New)
        expect(status).toBeInTheDocument()
      })

      test(`${TaskStatusEnum.InProgress}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.InProgress,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskStatusEnum.InProgress)
        expect(status).toBeInTheDocument()
      })

      test(`${TaskStatusEnum.Completed}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.Completed,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskStatusEnum.Completed)
        expect(status).toBeInTheDocument()
      })

      test(`${TaskStatusEnum.Awaiting}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.Awaiting,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskStatusEnum.Awaiting)
        expect(status).toBeInTheDocument()
      })

      test(`${TaskStatusEnum.Closed}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.Closed,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskStatusEnum.Closed)
        expect(status).toBeInTheDocument()
      })
    })

    describe('Отображается по расширенному статусу заявки', () => {
      test(`${TaskExtendedStatusEnum.Returned}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.New,
                extendedStatus: TaskExtendedStatusEnum.Returned,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskExtendedStatusEnum.Returned)
        expect(status).toBeInTheDocument()
      })

      test(`${TaskExtendedStatusEnum.InReclassification}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.New,
                extendedStatus: TaskExtendedStatusEnum.InReclassification,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskExtendedStatusEnum.InReclassification)
        expect(status).toBeInTheDocument()
      })

      test(`${TaskExtendedStatusEnum.FirstLineReturned}`, () => {
        render(
          <TaskTable
            {...props}
            dataSource={[
              {
                ...taskTableItem,
                status: TaskStatusEnum.New,
                extendedStatus: TaskExtendedStatusEnum.FirstLineReturned,
              },
            ]}
          />,
        )

        const status = taskStatusTestUtils.getContainer(TaskExtendedStatusEnum.FirstLineReturned)
        expect(status).toBeInTheDocument()
      })
    })
  })

  describe('Заявка', () => {
    test('Отображает заголовок и значение', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Заявка')).toBeInTheDocument()
      expect(taskTableTestUtils.getChildByText(String(taskTableItem.id))).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Заявка')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Заявка')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Заявка')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Заявка')
      const headCol = taskTableTestUtils.getHeadCol('Заявка')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Заявка')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Внешний номер', () => {
    test('Отображает заголовок и значение', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Внеш.номер')).toBeInTheDocument()
      expect(taskTableTestUtils.getChildByText(taskTableItem.recordId)).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Внеш.номер')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Внеш.номер')
      const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')

      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Внеш.номер')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Объект', () => {
    test('Отображает заголовок и значение если оно есть', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Объект')).toBeInTheDocument()
      expect(taskTableTestUtils.getChildByText(taskTableItem.name!)).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Объект')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Объект')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Объект')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Объект')
      const headCol = taskTableTestUtils.getHeadCol('Объект')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Объект')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Тема', () => {
    test('Отображает заголовок и значение', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Тема')).toBeInTheDocument()
      expect(taskTableTestUtils.getChildByText(taskTableItem.title)).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Тема')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Тема')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Тема')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Тема')
      const headCol = taskTableTestUtils.getHeadCol('Тема')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Тема')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Исполнитель', () => {
    test('Отображает заголовок и значение если оно есть', () => {
      render(<TaskTable {...props} />)

      expect(taskTableTestUtils.getColTitle('Исполнитель')).toBeInTheDocument()
      expect(
        taskTableTestUtils.getChildByText(getShortUserName(taskTableItem.assignee!)),
      ).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Исполнитель')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Исполнитель')
      const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Исполнитель')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Рабочая группа', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Рабочая группа')).toBeInTheDocument()
    })

    test('Отображает значение если оно присутствует', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getChildByText(taskTableItem.workGroup!.name)).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)
      await taskTableTestUtils.clickColTitle(user, 'Рабочая группа')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Рабочая группа')
      const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Рабочая группа')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Группа поддержки', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Группа поддержки')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...props} />)
      expect(
        taskTableTestUtils.getChildByText(taskTableItem.supportGroup!.name),
      ).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Группа поддержки')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Группа поддержки')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)
      await taskTableTestUtils.clickColTitle(user, 'Группа поддержки')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Группа поддержки')
      const headCol = taskTableTestUtils.getHeadCol('Группа поддержки')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Группа поддержки')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Срок реакции', () => {
    test('Заголовок отображается', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Срок реакции')).toBeInTheDocument()
    })

    test('Значение отображается если нет исполнителя и рабочей группы', () => {
      const fakeTaskTableItem: typeof taskTableItem = {
        ...taskTableItem,
        workGroup: null,
        assignee: null,
      }

      render(<TaskTable {...props} dataSource={[fakeTaskTableItem]} />)

      const responseTime = parseResponseTime(
        fakeTaskTableItem.responseTime!,
        fakeTaskTableItem.workGroup,
      )
      expect(taskTableTestUtils.getChildByText(responseTime!.value)).toBeInTheDocument()
    })

    describe('Значение не отображается', () => {
      test('Если есть исполнитель и нету рабочей группы', () => {
        const fakeTaskTableItem: typeof taskTableItem = {
          ...taskTableItem,
          workGroup: null,
          assignee: taskFixtures.assignee(),
        }

        render(<TaskTable {...props} dataSource={[fakeTaskTableItem]} />)

        const responseTime = parseResponseTime(
          fakeTaskTableItem.responseTime!,
          fakeTaskTableItem.workGroup!,
        )

        expect(taskTableTestUtils.queryChildByText(responseTime!.value)).not.toBeInTheDocument()
      })

      test('Если есть рабочая группа и нет исполнителя', () => {
        const fakeTaskTableItem: typeof taskTableItem = {
          ...taskTableItem,
          workGroup: taskFixtures.workGroup(),
          assignee: null,
        }

        render(<TaskTable {...props} dataSource={[fakeTaskTableItem]} />)

        const responseTime = parseResponseTime(
          fakeTaskTableItem.responseTime!,
          fakeTaskTableItem.workGroup!,
        )

        expect(responseTime).toBeNull()
      })
    })

    test('Сортировка отключена', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Срок реакции')
      expect(headCol).not.toHaveClass(columnWithSortingClass)
    })
  })

  describe('Выполнить до', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Выполнить до')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...props} />)

      expect(
        taskTableTestUtils.getChildByText(formatDate(taskTableItem.olaNextBreachTime)),
      ).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)
      const headCol = taskTableTestUtils.getHeadCol('Выполнить до')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Имеет корректное значение сортировки по умолчанию', () => {
      render(<TaskTable {...props} sort='ola_next_breach_time' />)
      const headCol = taskTableTestUtils.getHeadCol('Выполнить до')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)
      await taskTableTestUtils.clickColTitle(user, 'Выполнить до')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Выполнить до')
      const headCol = taskTableTestUtils.getHeadCol('Выполнить до')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Выполнить до')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Статус', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...props} />)

      expect(taskTableTestUtils.getColTitle('Статус')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...props} />)

      expect(
        taskTableTestUtils.getChildByText(taskStatusDict[taskTableItem.status!]),
      ).toBeInTheDocument()
    })

    // Временно отключена сортировка
    test('Сортировка отключена', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Статус')
      expect(headCol).not.toHaveClass(columnWithSortingClass)
    })

    test.skip('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Статус')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })
  })

  describe('Задания', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...props} />)
      expect(taskTableTestUtils.getColTitle('Задания')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...props} />)

      expect(
        taskTableTestUtils.getChildByText(
          `${taskTableItem.subtasksCounter!.completed}/${taskTableItem.subtasksCounter!.all}`,
        ),
      ).toBeInTheDocument()
    })

    test('Сортировка отключена', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Задания')
      expect(headCol).not.toHaveClass(columnWithSortingClass)
    })
  })

  describe('Комментарий', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...props} />)

      expect(taskTableTestUtils.getColTitle('Комментарий')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...props} />)

      expect(taskTableTestUtils.getChildByText(taskTableItem.lastComment!)).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Комментарий')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Комментарий')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Комментарий')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Комментарий')
      const headCol = taskTableTestUtils.getHeadCol('Комментарий')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Комментарий')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Дата создания', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...props} />)

      expect(taskTableTestUtils.getColTitle('Дата создания')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...props} />)

      expect(
        taskTableTestUtils.getChildByText(formatDate(taskTableItem.createdAt)),
      ).toBeInTheDocument()
    })

    test('Сортировка включена', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Дата создания')
      expect(headCol).toHaveClass(columnWithSortingClass)
    })

    test('Значение сортировки по умолчанию не установлено', () => {
      render(<TaskTable {...props} />)

      const headCol = taskTableTestUtils.getHeadCol('Дата создания')
      expect(headCol).not.toHaveAttribute(ariaSortAttrName)
    })

    test('При клике на заголовок обработчик вызывается корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Дата создания')
      expect(props.onChange).toBeCalledTimes(1)
    })

    test('Сортировка работает корректно', async () => {
      const { user } = render(<TaskTable {...props} />)

      await taskTableTestUtils.clickColTitle(user, 'Дата создания')
      const headCol = taskTableTestUtils.getHeadCol('Дата создания')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

      await taskTableTestUtils.clickColTitle(user, 'Дата создания')
      expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

      props.dataSource.forEach((item) => {
        const row = taskTableTestUtils.getRow(item.id)
        expect(row).toBeInTheDocument()
      })
    })
  })

  describe('Пагинация', () => {
    test('Отображается', () => {
      render(<TaskTable {...props} pagination={paginationProps} />)

      const pagination = taskTableTestUtils.getPaginationContainer()

      expect(pagination).toBeInTheDocument()
      expect(pagination).toHaveClass('ant-table-pagination')
    })

    test('Кнопки переключения страниц отображаются', () => {
      render(<TaskTable {...props} pagination={paginationProps} />)

      const page1Button = taskTableTestUtils.getPaginationPageButton('1')
      const page2Button = taskTableTestUtils.getPaginationPageButton('2')

      expect(page1Button).toBeInTheDocument()
      expect(page2Button).toBeInTheDocument()
    })

    test('Отображается корректный размер страницы по умолчанию', () => {
      render(<TaskTable {...props} pagination={paginationProps} />)

      const pagination = taskTableTestUtils.getPaginationContainer()
      const defaultPageSize = taskTableTestUtils.getPageSizeOption(pagination, DEFAULT_PAGE_SIZE)

      expect(defaultPageSize).toBeInTheDocument()
      expect(defaultPageSize).toHaveClass('ant-select-selection-item')
    })

    test('При клике на номер страницы вызывается обработчик', async () => {
      const { user } = render(<TaskTable {...props} pagination={paginationProps} />)

      await taskTableTestUtils.clickPaginationPageButton(user, '2')
      expect(props.onChange).toBeCalledTimes(1)
    })
  })

  describe('Если список заявок пуст', () => {
    test('Отображается соответствующий текст', () => {
      render(<TaskTable {...props} dataSource={[]} />)

      expect(
        taskTableTestUtils.getChildByText(
          'По заданным параметрам фильтрации ни одна заявка не найдена',
        ),
      ).toBeInTheDocument()
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const { user } = render(<TaskTable {...props} />)

    await taskTableTestUtils.clickRow(user, taskTableItem.id)

    expect(props.onRow).toBeCalled()
    expect(props.onRow).toBeCalledWith(taskTableItem, 0)
  })
})
