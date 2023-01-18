import { render } from '_tests_/utils'
import taskFixtures from 'fixtures/task'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import taskStatusTestUtils from 'modules/task/features/TaskStatus/_tests_/utils'
import { DEFAULT_PAGE_SIZE } from 'modules/task/pages/TaskListPage/constants'
import { getShortUserName } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { UserRoleEnum } from 'shared/constants/roles'
import { formatDate } from 'shared/utils/date'

import { paginationConfig } from '../constants/pagination'
import TaskTable from '../index'
import taskTableTestConstants from './constants'
import taskTableTestUtils from './utils'

afterEach(() => {
  const onChange = taskTableTestConstants.requiredProps.onChange as jest.Mock
  onChange.mockReset()
})

describe('Таблица заявок', () => {
  test('Отображается корректно', () => {
    const tableItems = taskFixtures.getTaskTableItems(2)
    render(
      <TaskTable
        {...taskTableTestConstants.requiredProps}
        dataSource={tableItems}
      />,
    )

    const table = taskTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableItems.forEach((item) => {
      const row = taskTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<TaskTable {...taskTableTestConstants.requiredProps} loading />)
    await taskTableTestUtils.loadingStarted()
  })

  describe('Колонка', () => {
    describe('Статус заявки', () => {
      describe('Отображается по статусу заявки', () => {
        test(`${TaskStatusEnum.New}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.New,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(TaskStatusEnum.New)
          expect(status).toBeInTheDocument()
        })

        test(`${TaskStatusEnum.InProgress}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.InProgress,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskStatusEnum.InProgress,
          )
          expect(status).toBeInTheDocument()
        })

        test(`${TaskStatusEnum.Completed}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.Completed,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskStatusEnum.Completed,
          )
          expect(status).toBeInTheDocument()
        })

        test(`${TaskStatusEnum.Awaiting}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.Awaiting,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskStatusEnum.Awaiting,
          )
          expect(status).toBeInTheDocument()
        })

        test(`${TaskStatusEnum.Closed}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.Closed,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskStatusEnum.Closed,
          )
          expect(status).toBeInTheDocument()
        })
      })

      describe('Отображается по расширенному статусу заявки', () => {
        test(`${TaskExtendedStatusEnum.Returned}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.Returned,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskExtendedStatusEnum.Returned,
          )
          expect(status).toBeInTheDocument()
        })

        test(`${TaskExtendedStatusEnum.InReclassification}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskExtendedStatusEnum.InReclassification,
          )
          expect(status).toBeInTheDocument()
        })

        test(`${TaskExtendedStatusEnum.FirstLineReturned}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.FirstLineReturned,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskExtendedStatusEnum.FirstLineReturned,
          )
          expect(status).toBeInTheDocument()
        })
      })
    })

    describe('Заявка', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColTitle('Заявка')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            String(taskTableTestConstants.firstTaskTableItem.id),
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Заявка')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Заявка')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Заявка')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Заявка')
        const headCol = taskTableTestUtils.getHeadCol('Заявка')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Заявка')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Внешний номер', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColTitle('Внеш.номер')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            taskTableTestConstants.firstTaskTableItem.recordId,
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Внеш.номер')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Внеш.номер')
        const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')

        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Внеш.номер')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Объект', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColTitle('Объект')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            taskTableTestConstants.firstTaskTableItem.name,
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Объект')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Объект')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Объект')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Объект')
        const headCol = taskTableTestUtils.getHeadCol('Объект')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Объект')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Тема', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColTitle('Тема')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            taskTableTestConstants.firstTaskTableItem.title,
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Тема')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Тема')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Тема')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Тема')
        const headCol = taskTableTestUtils.getHeadCol('Тема')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Тема')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Исполнитель', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getColTitle('Исполнитель'),
        ).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            getShortUserName(
              taskTableTestConstants.firstTaskTableItem.assignee,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Исполнитель')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Исполнитель')
        const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Исполнитель')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Рабочая группа', () => {
      describe('Роль - первая линия поддержки', () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          expect(
            taskTableTestUtils.queryColTitle('Рабочая группа'),
          ).not.toBeInTheDocument()
        })
      })

      describe('Роль - инженер', () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(
            taskTableTestUtils.getColTitle('Рабочая группа'),
          ).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(
            taskTableTestUtils.getChildByText(
              taskTableTestConstants.firstTaskTableItem.workGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(
            taskTableTestUtils.getChildByText('I линия поддержки'),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', async () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(
            taskTableTestConstants.columnWithSortingClass,
          )
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(
            1,
          )
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Роль - старший инженер', () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(
            taskTableTestUtils.getColTitle('Рабочая группа'),
          ).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(
            taskTableTestUtils.getChildByText(
              taskTableTestConstants.firstTaskTableItem.workGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(
            taskTableTestUtils.getChildByText('I линия поддержки'),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', async () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(
            taskTableTestConstants.columnWithSortingClass,
          )
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(
            1,
          )
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Роль - глава отдела', () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(
            taskTableTestUtils.getColTitle('Рабочая группа'),
          ).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(
            taskTableTestUtils.getChildByText(
              taskTableTestConstants.firstTaskTableItem.workGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(
            taskTableTestUtils.getChildByText('I линия поддержки'),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', async () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(
            taskTableTestConstants.columnWithSortingClass,
          )
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(
            1,
          )
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await taskTableTestUtils.userClickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })
    })

    describe('Группа поддержки', () => {
      describe('Роль - первая линия поддержки', () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          expect(
            taskTableTestUtils.getColTitle('Группа поддержки'),
          ).toBeInTheDocument()
        })

        test('Отображает значение', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          expect(
            taskTableTestUtils.getChildByText(
              taskTableTestConstants.firstTaskTableItem.supportGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', async () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Группа поддержки')
          expect(headCol).toHaveClass(
            taskTableTestConstants.columnWithSortingClass,
          )
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          const headCol = taskTableTestUtils.getHeadCol('Группа поддержки')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Группа поддержки')
          expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(
            1,
          )
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          await taskTableTestUtils.userClickColTitle(user, 'Группа поддержки')
          const headCol = taskTableTestUtils.getHeadCol('Группа поддержки')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await taskTableTestUtils.userClickColTitle(user, 'Группа поддержки')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
            const row = taskTableTestUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe('Роль - инженер', () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(
            taskTableTestUtils.queryColTitle('Группа поддержки'),
          ).not.toBeInTheDocument()
        })
      })

      describe('Роль - старший инженер', () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(
            taskTableTestUtils.queryColTitle('Группа поддержки'),
          ).not.toBeInTheDocument()
        })
      })

      describe('Роль - глава отдела', () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(
            taskTableTestUtils.queryColTitle('Группа поддержки'),
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('Выполнить до', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getColTitle('Выполнить до'),
        ).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            formatDate(
              taskTableTestConstants.firstTaskTableItem.olaNextBreachTime,
              DATE_TIME_FORMAT,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Имеет корректное значение сортировки по умолчанию', () => {
        render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            sort='ola_next_breach_time'
          />,
        )

        const headCol = taskTableTestUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Выполнить до')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Выполнить до')
        const headCol = taskTableTestUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Выполнить до')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Статус', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColTitle('Статус')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            taskStatusDict[taskTableTestConstants.firstTaskTableItem.status],
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Статус')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Статус')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Статус')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Статус')
        const headCol = taskTableTestUtils.getHeadCol('Статус')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Статус')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Комментарий', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getColTitle('Комментарий'),
        ).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            taskTableTestConstants.firstTaskTableItem.lastComment,
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Комментарий')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Комментарий')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Комментарий')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Комментарий')
        const headCol = taskTableTestUtils.getHeadCol('Комментарий')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Комментарий')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Дата создания', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getColTitle('Дата создания'),
        ).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getChildByText(
            formatDate(
              taskTableTestConstants.firstTaskTableItem.createdAt,
              DATE_TIME_FORMAT,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Дата создания')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Дата создания')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Дата создания')
        expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(
          <TaskTable {...taskTableTestConstants.requiredProps} />,
        )

        await taskTableTestUtils.userClickColTitle(user, 'Дата создания')
        const headCol = taskTableTestUtils.getHeadCol('Дата создания')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await taskTableTestUtils.userClickColTitle(user, 'Дата создания')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        taskTableTestConstants.requiredProps.dataSource.forEach((item) => {
          const row = taskTableTestUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })
  })

  describe('Пагинация', () => {
    test('Отображается', () => {
      render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
        />,
      )

      const pagination = taskTableTestUtils.getPaginationContainer()

      expect(pagination).toBeInTheDocument()
      expect(pagination).toHaveClass('ant-table-pagination')
    })

    test('Кнопки переключения страниц отображаются', () => {
      render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
        />,
      )

      const page1Button = taskTableTestUtils.getPaginationPageButton('1')
      const page2Button = taskTableTestUtils.getPaginationPageButton('2')

      expect(page1Button).toBeInTheDocument()
      expect(page2Button).toBeInTheDocument()
    })

    describe('Кнопки "Вперед" и "Назад" отображаются корректно', () => {
      test('Если элементов больше чем установленный размер страницы', () => {
        render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            pagination={taskTableTestConstants.paginationProps}
          />,
        )

        const nextButton = taskTableTestUtils.getPaginationNextButton()
        const prevButton = taskTableTestUtils.getPaginationPrevButton()

        expect(prevButton).toBeInTheDocument()
        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).toBeEnabled()
      })

      test('Если количество элементов равно установленному размеру страницы', () => {
        render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            pagination={{
              ...taskTableTestConstants.paginationProps,
              total: taskTableTestConstants.paginationProps.pageSize,
            }}
          />,
        )

        const nextButton = taskTableTestUtils.getPaginationNextButton()
        const prevButton = taskTableTestUtils.getPaginationPrevButton()

        expect(prevButton).toBeInTheDocument()
        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).toBeDisabled()
      })
    })

    test('Отображается корректный размер страницы по умолчанию', () => {
      render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
        />,
      )

      const pagination = taskTableTestUtils.getPaginationContainer()
      const defaultPageSize = taskTableTestUtils.getPageSizeOption(
        pagination,
        DEFAULT_PAGE_SIZE,
      )

      expect(defaultPageSize).toBeInTheDocument()
      expect(defaultPageSize).toHaveClass('ant-select-selection-item')
    })

    test('Отображаются корректные варианты размера страницы', async () => {
      const { user } = render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
        />,
      )

      const pagination = taskTableTestUtils.getPaginationContainer()

      await taskTableTestUtils.userOpenPageSizeOptions(user, pagination)

      const pageSizeOptionsContainer =
        taskTableTestUtils.getPageSizeOptionsContainer(pagination)

      paginationConfig.pageSizeOptions.forEach((pageSize) => {
        const option = taskTableTestUtils.getPageSizeOption(
          pageSizeOptionsContainer,
          pageSize,
        )
        expect(option).toBeInTheDocument()
      })
    })

    test('При изменении размера страницы обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
        />,
      )

      const pageSize = paginationConfig.pageSizeOptions[0]

      await taskTableTestUtils.userChangePageSize(user, pageSize)
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledWith(
        taskTableTestUtils.onChangeTableArgs.pagination({
          ...taskTableTestConstants.paginationProps,
          pageSize,
        }),
        {},
        {},
        taskTableTestUtils.onChangeTableArgs.extra(
          'paginate',
          taskTableTestConstants.requiredProps.dataSource,
        ),
      )
    })

    test('При клике "Вперед" обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
        />,
      )

      await taskTableTestUtils.userClickPaginationNextButton(user)
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledWith(
        taskTableTestUtils.onChangeTableArgs.pagination({
          ...taskTableTestConstants.paginationProps,
          current: 2,
        }),
        {},
        {},
        taskTableTestUtils.onChangeTableArgs.extra(
          'paginate',
          taskTableTestConstants.requiredProps.dataSource,
        ),
      )
    })

    test('При клике "Назад" обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={{
            ...taskTableTestConstants.paginationProps,
            current: 2,
          }}
        />,
      )

      await taskTableTestUtils.userClickPaginationPrevButton(user)
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledWith(
        taskTableTestUtils.onChangeTableArgs.pagination({
          ...taskTableTestConstants.paginationProps,
          current: 1,
        }),
        {},
        {},
        taskTableTestUtils.onChangeTableArgs.extra(
          'paginate',
          taskTableTestConstants.requiredProps.dataSource,
        ),
      )
    })

    test('При клике на номер страницы обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
        />,
      )

      await taskTableTestUtils.userClickPaginationPageButton(user, '2')
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(taskTableTestConstants.requiredProps.onChange).toBeCalledWith(
        taskTableTestUtils.onChangeTableArgs.pagination({
          ...taskTableTestConstants.paginationProps,
          current: 2,
        }),
        {},
        {},
        taskTableTestUtils.onChangeTableArgs.extra(
          'paginate',
          taskTableTestConstants.requiredProps.dataSource,
        ),
      )
    })
  })

  describe('Если список заявок пуст', () => {
    test('Отображается соответствующий текст', () => {
      render(
        <TaskTable {...taskTableTestConstants.requiredProps} dataSource={[]} />,
      )

      expect(
        taskTableTestUtils.getChildByText(
          'По заданным параметрам фильтрации ни одна заявка не найдена',
        ),
      ).toBeInTheDocument()
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const onRow = jest.fn()
    const { user } = render(
      <TaskTable {...taskTableTestConstants.requiredProps} onRow={onRow} />,
    )

    const index = 0

    await taskTableTestUtils.userClickRow(
      user,
      taskTableTestConstants.firstTaskTableItem.id,
    )
    expect(onRow).toBeCalled()
    expect(onRow).toBeCalledWith(
      taskTableTestConstants.firstTaskTableItem,
      index,
    )
  })
})
