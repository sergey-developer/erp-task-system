import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { TablePaginationConfig } from 'antd'
import { TableAction } from 'antd/es/table/interface'

import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { taskStatusDict } from 'modules/task/constants/dictionary'
import { testUtils as taskStatusTestUtils } from 'modules/task/features/TaskStatus/TaskStatus.test'
import { DEFAULT_PAGE_SIZE } from 'modules/task/pages/TaskListPage/constants'
import { getShortUserName } from 'modules/user/utils'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { UserRoleEnum } from 'shared/constants/roles'
import { NumberOrString } from 'shared/interfaces/utils'
import { formatDate } from 'shared/utils/date'

import taskFixtures from 'fixtures/task'

import {
  loadingFinishedByIconIn,
  loadingStartedByIconIn,
  render,
} from '_tests_/utils'

import { paginationConfig } from './constants/pagination'
import TaskTable from './index'
import { TaskTableProps } from './interfaces'

const columnWithSortingClass = 'ant-table-column-has-sorters'

const requiredProps: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [taskFixtures.getTaskTableItem()],
  loading: false,
  onRow: jest.fn(),
  onChange: jest.fn(),
  pagination: false,
  rowClassName: '',
  userRole: UserRoleEnum.FirstLineSupport,
}

const paginationProps: Readonly<
  Required<Pick<TablePaginationConfig, 'current' | 'pageSize' | 'total'>>
> = {
  current: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  total: DEFAULT_PAGE_SIZE + 1,
}

const firstTaskTableItem = requiredProps.dataSource[0]

export const testConstants = {
  columnWithSortingClass,
  requiredProps,
  paginationProps,
  firstTaskTableItem,
}

const getContainer = () => screen.getByTestId('table-task-list')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

const getRow = (id: number) =>
  // eslint-disable-next-line testing-library/no-node-access
  getContainer().querySelector(`[data-row-key='${id}']`)

const clickRow = async (user: UserEvent, id: number) => {
  const row = getRow(id)
  await user.click(row!)
  return row
}

const getHeadCol = (text: string) => {
  // eslint-disable-next-line testing-library/no-node-access
  return getChildByText(text).parentElement?.parentElement!
}

const getColTitle = getChildByText
const queryColTitle = queryChildByText

const userClickColTitle = async (user: UserEvent, text: string) => {
  const col = getChildByText(text)
  await user.click(col)
  return col
}

const getPaginationContainer = () => within(getContainer()).getByRole('list')

const getPaginationNextButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'right',
  })

const userClickPaginationNextButton = async (user: UserEvent) => {
  const button = getPaginationNextButton()
  await user.click(button)
  return button
}

const getPaginationPrevButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'left',
  })

const userClickPaginationPrevButton = async (user: UserEvent) => {
  const button = getPaginationPrevButton()
  await user.click(button)
  return button
}

const getPaginationPageButton = (pageNumber: string) =>
  within(getPaginationContainer()).getByRole('listitem', { name: pageNumber })

const userClickPaginationPageButton = async (
  user: UserEvent,
  pageNumber: string,
) => {
  const button = getPaginationPageButton(pageNumber)
  await user.click(button)
  return button
}

const getPageSizeOptionsContainer = (container: HTMLElement) =>
  // eslint-disable-next-line testing-library/no-node-access
  container.querySelector('.rc-virtual-list') as HTMLElement

const getPageSizeOption = (container: HTMLElement, pageSize: NumberOrString) =>
  within(container).getByText(`${pageSize} / стр.`)

const userOpenPageSizeOptions = async (
  user: UserEvent,
  container: HTMLElement,
) => {
  const button = within(container).getByRole('combobox', {
    expanded: false,
  })

  await user.click(button)
}

const userChangePageSize = async (
  user: UserEvent,
  pageSize: NumberOrString,
) => {
  const pagination = getPaginationContainer()
  await userOpenPageSizeOptions(user, pagination)
  const pageSizeOption = getPageSizeOption(
    getPageSizeOptionsContainer(pagination),
    pageSize,
  )
  await user.click(pageSizeOption)

  return pageSizeOption
}

const loadingStarted = async () => {
  const taskTable = getContainer()
  await loadingStartedByIconIn(taskTable)
  return taskTable
}

const loadingFinished = async () => {
  const taskTable = getContainer()
  await loadingFinishedByIconIn(taskTable)
  return taskTable
}

const onChangeTableArgs = {
  pagination: (config: typeof testConstants.paginationProps) => ({
    ...paginationConfig,
    ...config,
  }),
  extra: (action: TableAction, dataSource: Readonly<Array<any>>) => ({
    action,
    currentDataSource: dataSource,
  }),
}

export const testUtils = {
  getContainer,
  getRow,
  clickRow,
  getChildByText,
  getHeadCol,
  getColTitle,
  queryColTitle,
  getPaginationContainer,
  getPaginationNextButton,
  getPaginationPrevButton,
  getPaginationPageButton,
  getPageSizeOptionsContainer,
  getPageSizeOption,

  userClickColTitle,
  userClickPaginationNextButton,
  userClickPaginationPrevButton,
  userClickPaginationPageButton,
  userOpenPageSizeOptions,
  userChangePageSize,

  loadingStarted,
  loadingFinished,

  onChangeTableArgs,
}

afterEach(() => {
  const onChange = testConstants.requiredProps.onChange as jest.Mock
  onChange.mockReset()
})

describe('Таблица заявок', () => {
  test('Отображается корректно', () => {
    const tableItems = taskFixtures.getTaskTableItems(2)
    render(
      <TaskTable {...testConstants.requiredProps} dataSource={tableItems} />,
    )

    const table = testUtils.getContainer()

    expect(table).toBeInTheDocument()
    tableItems.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<TaskTable {...testConstants.requiredProps} loading />)
    await testUtils.loadingStarted()
  })

  describe('Колонка', () => {
    describe('Статус заявки', () => {
      describe('Отображается по статусу заявки', () => {
        test(`${TaskStatusEnum.New}`, () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
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
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Заявка')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(String(testConstants.firstTaskTableItem.id)),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Заявка')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Заявка')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Заявка')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Заявка')
        const headCol = testUtils.getHeadCol('Заявка')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Заявка')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Внешний номер', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Внеш.номер')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(testConstants.firstTaskTableItem.recordId),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Внеш.номер')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Внеш.номер')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Внеш.номер')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Внеш.номер')
        const headCol = testUtils.getHeadCol('Внеш.номер')

        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Внеш.номер')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Объект', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Объект')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(testConstants.firstTaskTableItem.name),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Объект')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Объект')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Объект')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Объект')
        const headCol = testUtils.getHeadCol('Объект')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Объект')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Тема', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Тема')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(testConstants.firstTaskTableItem.title),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Тема')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Тема')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Тема')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Тема')
        const headCol = testUtils.getHeadCol('Тема')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Тема')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Исполнитель', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Исполнитель')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(
            getShortUserName(testConstants.firstTaskTableItem.assignee),
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Исполнитель')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Исполнитель')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Исполнитель')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Исполнитель')
        const headCol = testUtils.getHeadCol('Исполнитель')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Исполнитель')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Рабочая группа', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          expect(
            testUtils.queryColTitle('Рабочая группа'),
          ).not.toBeInTheDocument()
        })
      })

      describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(testUtils.getColTitle('Рабочая группа')).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(
            testUtils.getChildByText(
              testConstants.firstTaskTableItem.workGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(
            testUtils.getChildByText('I линия поддержки'),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          testConstants.requiredProps.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(testUtils.getColTitle('Рабочая группа')).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(
            testUtils.getChildByText(
              testConstants.firstTaskTableItem.workGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(
            testUtils.getChildByText('I линия поддержки'),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          testConstants.requiredProps.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(testUtils.getColTitle('Рабочая группа')).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(
            testUtils.getChildByText(
              testConstants.firstTaskTableItem.workGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              dataSource={[
                {
                  ...testConstants.firstTaskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(
            testUtils.getChildByText('I линия поддержки'),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await testUtils.userClickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          testConstants.requiredProps.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })
    })

    describe('Группа поддержки', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        test('Отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          expect(testUtils.getColTitle('Группа поддержки')).toBeInTheDocument()
        })

        test('Отображает значение', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          expect(
            testUtils.getChildByText(
              testConstants.firstTaskTableItem.supportGroup!.name,
            ),
          ).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          const headCol = testUtils.getHeadCol('Группа поддержки')
          expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          const headCol = testUtils.getHeadCol('Группа поддержки')
          expect(headCol).not.toHaveAttribute('aria-sort')
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          await testUtils.userClickColTitle(user, 'Группа поддержки')
          expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          await testUtils.userClickColTitle(user, 'Группа поддержки')
          const headCol = testUtils.getHeadCol('Группа поддержки')
          expect(headCol).toHaveAttribute('aria-sort', 'ascending')

          await testUtils.userClickColTitle(user, 'Группа поддержки')
          expect(headCol).toHaveAttribute('aria-sort', 'descending')

          testConstants.requiredProps.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(
            testUtils.queryColTitle('Группа поддержки'),
          ).not.toBeInTheDocument()
        })
      })

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(
            testUtils.queryColTitle('Группа поддержки'),
          ).not.toBeInTheDocument()
        })
      })

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        test('Не отображает заголовок', () => {
          render(
            <TaskTable
              {...testConstants.requiredProps}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(
            testUtils.queryColTitle('Группа поддержки'),
          ).not.toBeInTheDocument()
        })
      })
    })

    describe('Выполнить до', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Выполнить до')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(
            formatDate(
              testConstants.firstTaskTableItem.olaNextBreachTime,
              DATE_TIME_FORMAT,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Имеет корректное значение сортировки по умолчанию', () => {
        render(
          <TaskTable
            {...testConstants.requiredProps}
            sort='ola_next_breach_time'
          />,
        )

        const headCol = testUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Выполнить до')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Выполнить до')
        const headCol = testUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Выполнить до')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Статус', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Статус')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(
            taskStatusDict[testConstants.firstTaskTableItem.status],
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка отключена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Статус')
        expect(headCol).not.toHaveClass(testConstants.columnWithSortingClass)
      })

      test.skip('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Статус')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test.skip('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Статус')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test.skip('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Статус')
        const headCol = testUtils.getHeadCol('Статус')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Статус')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Задания', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)
        expect(testUtils.getColTitle('Задания')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(
            `${testConstants.firstTaskTableItem.subtasksCounter.completed}/${testConstants.firstTaskTableItem.subtasksCounter.all}`,
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка отключена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Задания')
        expect(headCol).not.toHaveClass(testConstants.columnWithSortingClass)
      })
    })

    describe('Комментарий', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Комментарий')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(
            testConstants.firstTaskTableItem.lastComment,
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Комментарий')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Комментарий')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Комментарий')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Комментарий')
        const headCol = testUtils.getHeadCol('Комментарий')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Комментарий')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Дата создания', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(testUtils.getColTitle('Дата создания')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        expect(
          testUtils.getChildByText(
            formatDate(
              testConstants.firstTaskTableItem.createdAt,
              DATE_TIME_FORMAT,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Дата создания')
        expect(headCol).toHaveClass(testConstants.columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...testConstants.requiredProps} />)

        const headCol = testUtils.getHeadCol('Дата создания')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Дата создания')
        expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...testConstants.requiredProps} />)

        await testUtils.userClickColTitle(user, 'Дата создания')
        const headCol = testUtils.getHeadCol('Дата создания')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')

        await testUtils.userClickColTitle(user, 'Дата создания')
        expect(headCol).toHaveAttribute('aria-sort', 'descending')

        testConstants.requiredProps.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })
  })

  describe('Пагинация', () => {
    test('Отображается', () => {
      render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={testConstants.paginationProps}
        />,
      )

      const pagination = testUtils.getPaginationContainer()

      expect(pagination).toBeInTheDocument()
      expect(pagination).toHaveClass('ant-table-pagination')
    })

    test('Кнопки переключения страниц отображаются', () => {
      render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={testConstants.paginationProps}
        />,
      )

      const page1Button = testUtils.getPaginationPageButton('1')
      const page2Button = testUtils.getPaginationPageButton('2')

      expect(page1Button).toBeInTheDocument()
      expect(page2Button).toBeInTheDocument()
    })

    describe('Кнопки "Вперед" и "Назад" отображаются корректно', () => {
      test('Если элементов больше чем установленный размер страницы', () => {
        render(
          <TaskTable
            {...testConstants.requiredProps}
            pagination={testConstants.paginationProps}
          />,
        )

        const nextButton = testUtils.getPaginationNextButton()
        const prevButton = testUtils.getPaginationPrevButton()

        expect(prevButton).toBeInTheDocument()
        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).toBeEnabled()
      })

      test('Если количество элементов равно установленному размеру страницы', () => {
        render(
          <TaskTable
            {...testConstants.requiredProps}
            pagination={{
              ...testConstants.paginationProps,
              total: testConstants.paginationProps.pageSize,
            }}
          />,
        )

        const nextButton = testUtils.getPaginationNextButton()
        const prevButton = testUtils.getPaginationPrevButton()

        expect(prevButton).toBeInTheDocument()
        expect(prevButton).toBeDisabled()
        expect(nextButton).toBeInTheDocument()
        expect(nextButton).toBeDisabled()
      })
    })

    test('Отображается корректный размер страницы по умолчанию', () => {
      render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={testConstants.paginationProps}
        />,
      )

      const pagination = testUtils.getPaginationContainer()
      const defaultPageSize = testUtils.getPageSizeOption(
        pagination,
        DEFAULT_PAGE_SIZE,
      )

      expect(defaultPageSize).toBeInTheDocument()
      expect(defaultPageSize).toHaveClass('ant-select-selection-item')
    })

    test('Отображаются корректные варианты размера страницы', async () => {
      const { user } = render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={testConstants.paginationProps}
        />,
      )

      const pagination = testUtils.getPaginationContainer()

      await testUtils.userOpenPageSizeOptions(user, pagination)

      const pageSizeOptionsContainer =
        testUtils.getPageSizeOptionsContainer(pagination)

      paginationConfig.pageSizeOptions.forEach((pageSize) => {
        const option = testUtils.getPageSizeOption(
          pageSizeOptionsContainer,
          pageSize,
        )
        expect(option).toBeInTheDocument()
      })
    })

    test('При изменении размера страницы обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={testConstants.paginationProps}
        />,
      )

      const pageSize = paginationConfig.pageSizeOptions[0]

      await testUtils.userChangePageSize(user, pageSize)
      expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(testConstants.requiredProps.onChange).toBeCalledWith(
        testUtils.onChangeTableArgs.pagination({
          ...testConstants.paginationProps,
          pageSize,
        }),
        {},
        {},
        testUtils.onChangeTableArgs.extra(
          'paginate',
          testConstants.requiredProps.dataSource,
        ),
      )
    })

    test('При клике "Вперед" обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={testConstants.paginationProps}
        />,
      )

      await testUtils.userClickPaginationNextButton(user)
      expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(testConstants.requiredProps.onChange).toBeCalledWith(
        testUtils.onChangeTableArgs.pagination({
          ...testConstants.paginationProps,
          current: 2,
        }),
        {},
        {},
        testUtils.onChangeTableArgs.extra(
          'paginate',
          testConstants.requiredProps.dataSource,
        ),
      )
    })

    test('При клике "Назад" обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={{
            ...testConstants.paginationProps,
            current: 2,
          }}
        />,
      )

      await testUtils.userClickPaginationPrevButton(user)
      expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(testConstants.requiredProps.onChange).toBeCalledWith(
        testUtils.onChangeTableArgs.pagination({
          ...testConstants.paginationProps,
          current: 1,
        }),
        {},
        {},
        testUtils.onChangeTableArgs.extra(
          'paginate',
          testConstants.requiredProps.dataSource,
        ),
      )
    })

    test('При клике на номер страницы обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskTable
          {...testConstants.requiredProps}
          pagination={testConstants.paginationProps}
        />,
      )

      await testUtils.userClickPaginationPageButton(user, '2')
      expect(testConstants.requiredProps.onChange).toBeCalledTimes(1)
      expect(testConstants.requiredProps.onChange).toBeCalledWith(
        testUtils.onChangeTableArgs.pagination({
          ...testConstants.paginationProps,
          current: 2,
        }),
        {},
        {},
        testUtils.onChangeTableArgs.extra(
          'paginate',
          testConstants.requiredProps.dataSource,
        ),
      )
    })
  })

  describe('Если список заявок пуст', () => {
    test('Отображается соответствующий текст', () => {
      render(<TaskTable {...testConstants.requiredProps} dataSource={[]} />)

      expect(
        testUtils.getChildByText(
          'По заданным параметрам фильтрации ни одна заявка не найдена',
        ),
      ).toBeInTheDocument()
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const onRow = jest.fn()
    const { user } = render(
      <TaskTable {...testConstants.requiredProps} onRow={onRow} />,
    )

    const index = 0

    await testUtils.clickRow(user, testConstants.firstTaskTableItem.id)
    expect(onRow).toBeCalled()
    expect(onRow).toBeCalledWith(testConstants.firstTaskTableItem, index)
  })
})
