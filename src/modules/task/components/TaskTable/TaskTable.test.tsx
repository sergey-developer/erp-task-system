import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { TablePaginationConfig } from 'antd'

import { parseResponseTime } from 'modules/task/components/TaskDetails/MainDetails/utils'
import { testUtils as taskStatusTestUtils } from 'modules/task/components/TaskStatus/TaskStatus.test'
import { TaskExtendedStatusEnum, taskStatusDict, TaskStatusEnum } from 'modules/task/constants/task'
import { DEFAULT_PAGE_SIZE } from 'modules/task/pages/TaskListPage/constants'
import { UserRoleEnum } from 'modules/user/constants'
import { getShortUserName } from 'modules/user/utils'

import { IdType } from 'shared/types/common'
import { NumberOrString } from 'shared/types/utils'
import { formatDate } from 'shared/utils/date'

import {
  ariaSortAttrAscValue,
  ariaSortAttrDescValue,
  ariaSortAttrName,
  columnWithSortingClass,
} from '_tests_/constants/components'
import taskFixtures from '_tests_/fixtures/task'
import { iconTestUtils, render, tableTestUtils } from '_tests_/utils'

import TaskTable from './index'
import { TaskTableProps } from './types'

const taskTableItem = taskFixtures.taskTableItem()

const props: Readonly<Omit<TaskTableProps, 'sort'>> = {
  dataSource: [taskTableItem],
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

const getContainer = () => screen.getByTestId('task-table')
const getChildByText = (text: string) => within(getContainer()).getByText(text)
const queryChildByText = (text: string) => within(getContainer()).queryByText(text)
const getRow = (id: IdType) => tableTestUtils.getRowIn(getContainer(), id)
const clickRow = async (user: UserEvent, id: IdType) =>
  tableTestUtils.clickRowIn(getContainer(), user, id)

const getHeadCol = (text: string) => {
  // eslint-disable-next-line testing-library/no-node-access
  return getChildByText(text).parentElement?.parentElement!
}

const getColTitle = getChildByText
const queryColTitle = queryChildByText

const clickColTitle = async (user: UserEvent, text: string) => {
  const col = getChildByText(text)
  await user.click(col)
  return col
}

const getPaginationContainer = () => within(getContainer()).getByRole('list')

const getPaginationNextButton = () =>
  within(getPaginationContainer()).getByRole('button', {
    name: 'right',
  })

const clickPaginationNextButton = async (user: UserEvent) => {
  const button = getPaginationNextButton()
  await user.click(button)
  return button
}

const getPaginationPrevButton = () =>
  within(getPaginationContainer()).getByRole('button', { name: 'left' })

const clickPaginationPrevButton = async (user: UserEvent) => {
  const button = getPaginationPrevButton()
  await user.click(button)
  return button
}

const getPaginationPageButton = (pageNumber: string) =>
  within(getPaginationContainer()).getByRole('listitem', { name: pageNumber })

const clickPaginationPageButton = async (user: UserEvent, pageNumber: string) => {
  const button = getPaginationPageButton(pageNumber)
  await user.click(button)
  return button
}

const getPageSizeOptionsContainer = (container: HTMLElement) =>
  // eslint-disable-next-line testing-library/no-node-access
  container.querySelector('.rc-virtual-list') as HTMLElement

const getPageSizeOption = (container: HTMLElement, pageSize: NumberOrString) =>
  within(container).getByText(`${pageSize} / стр.`)

const openPageSizeOptions = async (user: UserEvent, container: HTMLElement) => {
  const button = within(container).getByRole('combobox', {
    expanded: false,
  })

  await user.click(button)
}

const changePageSize = async (user: UserEvent, pageSize: NumberOrString) => {
  const pagination = getPaginationContainer()
  await openPageSizeOptions(user, pagination)
  const pageSizeOption = getPageSizeOption(getPageSizeOptionsContainer(pagination), pageSize)
  await user.click(pageSizeOption)

  return pageSizeOption
}

const expectLoadingStarted = async () => {
  const taskTable = getContainer()
  await iconTestUtils.expectLoadingStartedIn(taskTable)
  return taskTable
}

const expectLoadingFinished = async () => {
  const taskTable = getContainer()
  await iconTestUtils.expectLoadingFinishedIn(taskTable)
  return taskTable
}

export const testUtils = {
  getContainer,
  getRow,
  clickRow,
  getChildByText,
  queryChildByText,
  getHeadCol,
  getColTitle,
  queryColTitle,
  getPaginationContainer,
  getPaginationNextButton,
  getPaginationPrevButton,
  getPaginationPageButton,
  getPageSizeOptionsContainer,
  getPageSizeOption,

  clickColTitle,
  clickPaginationNextButton,
  clickPaginationPrevButton,
  clickPaginationPageButton,
  openPageSizeOptions,
  changePageSize,

  expectLoadingStarted,
  expectLoadingFinished,
}

afterEach(() => {
  const onRow = props.onRow as jest.Mock
  const onChange = props.onChange as jest.Mock

  onRow.mockReset()
  onChange.mockReset()
})

describe('Таблица заявок', () => {
  test('Отображается корректно', () => {
    const tableItems = taskFixtures.taskTableItems(2)
    render(<TaskTable {...props} dataSource={tableItems} />)

    const table = testUtils.getContainer()
    tableTestUtils.expectPaginationEnabledIn(table)

    expect(table).toBeInTheDocument()
    tableItems.forEach((item) => {
      const row = testUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', async () => {
    render(<TaskTable {...props} loading />)
    await testUtils.expectLoadingStarted()
  })

  describe('Колонка', () => {
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
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getColTitle('Заявка')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getChildByText(String(taskTableItem.id))).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Заявка')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Заявка')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Заявка')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Заявка')
        const headCol = testUtils.getHeadCol('Заявка')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Заявка')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Внешний номер', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getColTitle('Внеш.номер')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getChildByText(taskTableItem.recordId!)).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Внеш.номер')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Внеш.номер')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Внеш.номер')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Внеш.номер')
        const headCol = testUtils.getHeadCol('Внеш.номер')

        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Внеш.номер')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Объект', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getColTitle('Объект')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getChildByText(taskTableItem.name!)).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)
        const headCol = testUtils.getHeadCol('Объект')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Объект')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Объект')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Объект')
        const headCol = testUtils.getHeadCol('Объект')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Объект')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Тема', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getColTitle('Тема')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getChildByText(taskTableItem.title!)).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Тема')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Тема')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Тема')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Тема')
        const headCol = testUtils.getHeadCol('Тема')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Тема')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Исполнитель', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getColTitle('Исполнитель')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)

        expect(
          testUtils.getChildByText(getShortUserName(taskTableItem.assignee!)),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Исполнитель')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Исполнитель')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Исполнитель')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Исполнитель')
        const headCol = testUtils.getHeadCol('Исполнитель')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Исполнитель')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Рабочая группа', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        test('Не отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.FirstLineSupport} />)

          expect(testUtils.queryColTitle('Рабочая группа')).not.toBeInTheDocument()
        })
      })

      describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
        test('Отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          expect(testUtils.getColTitle('Рабочая группа')).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          expect(testUtils.getChildByText(taskTableItem.workGroup!.name)).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...props}
              dataSource={[
                {
                  ...taskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.Engineer}
            />,
          )

          expect(testUtils.getChildByText('I линия поддержки')).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute(ariaSortAttrName)
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          expect(props.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

          props.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        test('Отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          expect(testUtils.getColTitle('Рабочая группа')).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          expect(testUtils.getChildByText(taskTableItem.workGroup!.name)).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...props}
              dataSource={[
                {
                  ...taskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.SeniorEngineer}
            />,
          )

          expect(testUtils.getChildByText('I линия поддержки')).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute(ariaSortAttrName)
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          expect(props.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

          props.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        test('Отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          expect(testUtils.getColTitle('Рабочая группа')).toBeInTheDocument()
        })

        test('Отображает значение если оно присутствует', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          expect(testUtils.getChildByText(taskTableItem.workGroup!.name)).toBeInTheDocument()
        })

        test('Отображает резервный текст если значение отсутствует', () => {
          render(
            <TaskTable
              {...props}
              dataSource={[
                {
                  ...taskTableItem,
                  workGroup: null,
                },
              ]}
              userRole={UserRoleEnum.HeadOfDepartment}
            />,
          )

          expect(testUtils.getChildByText('I линия поддержки')).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveClass(columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).not.toHaveAttribute(ariaSortAttrName)
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          expect(props.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          const headCol = testUtils.getHeadCol('Рабочая группа')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

          await testUtils.clickColTitle(user, 'Рабочая группа')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

          props.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })
    })

    describe('Группа поддержки', () => {
      describe(`Роль - ${UserRoleEnum.FirstLineSupport}`, () => {
        test('Отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.FirstLineSupport} />)

          expect(testUtils.getColTitle('Группа поддержки')).toBeInTheDocument()
        })

        test('Отображает значение', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.FirstLineSupport} />)

          expect(testUtils.getChildByText(taskTableItem.supportGroup!.name)).toBeInTheDocument()
        })

        test('Сортировка включена', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.FirstLineSupport} />)
          const headCol = testUtils.getHeadCol('Группа поддержки')
          expect(headCol).toHaveClass(columnWithSortingClass)
        })

        test('Значение сортировки по умолчанию не установлено', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.FirstLineSupport} />)
          const headCol = testUtils.getHeadCol('Группа поддержки')
          expect(headCol).not.toHaveAttribute(ariaSortAttrName)
        })

        test('При клике на заголовок обработчик вызывается корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.FirstLineSupport} />)

          await testUtils.clickColTitle(user, 'Группа поддержки')
          expect(props.onChange).toBeCalledTimes(1)
        })

        test('Сортировка работает корректно', async () => {
          const { user } = render(<TaskTable {...props} userRole={UserRoleEnum.FirstLineSupport} />)

          await testUtils.clickColTitle(user, 'Группа поддержки')
          const headCol = testUtils.getHeadCol('Группа поддержки')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

          await testUtils.clickColTitle(user, 'Группа поддержки')
          expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

          props.dataSource.forEach((item) => {
            const row = testUtils.getRow(item.id)
            expect(row).toBeInTheDocument()
          })
        })
      })

      describe(`Роль - ${UserRoleEnum.Engineer}`, () => {
        test('Не отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          expect(testUtils.queryColTitle('Группа поддержки')).not.toBeInTheDocument()
        })
      })

      describe(`Роль - ${UserRoleEnum.SeniorEngineer}`, () => {
        test('Не отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          expect(testUtils.queryColTitle('Группа поддержки')).not.toBeInTheDocument()
        })
      })

      describe(`Роль - ${UserRoleEnum.HeadOfDepartment}`, () => {
        test('Не отображает заголовок', () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          expect(testUtils.queryColTitle('Группа поддержки')).not.toBeInTheDocument()
        })
      })
    })

    describe('Срок реакции', () => {
      describe('Не отображается', () => {
        test(`Для роли ${UserRoleEnum.Engineer}`, () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.Engineer} />)

          expect(testUtils.queryColTitle('Срок реакции')).not.toBeInTheDocument()
        })

        test(`Для роли ${UserRoleEnum.SeniorEngineer}`, () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.SeniorEngineer} />)

          expect(testUtils.queryColTitle('Срок реакции')).not.toBeInTheDocument()
        })

        test(`Для роли ${UserRoleEnum.HeadOfDepartment}`, () => {
          render(<TaskTable {...props} userRole={UserRoleEnum.HeadOfDepartment} />)

          expect(testUtils.queryColTitle('Срок реакции')).not.toBeInTheDocument()
        })
      })

      test('Заголовок отображается если условия соблюдены', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getColTitle('Срок реакции')).toBeInTheDocument()
      })

      test('Значение отображается если условия соблюдены', () => {
        const fakeTaskTableItem: typeof taskTableItem = {
          ...taskTableItem,
          workGroup: null,
          assignee: null,
        }

        render(
          <TaskTable
            {...props}
            dataSource={[fakeTaskTableItem]}
            userRole={UserRoleEnum.FirstLineSupport}
          />,
        )

        const responseTime = parseResponseTime(
          fakeTaskTableItem.responseTime!,
          fakeTaskTableItem.workGroup,
        )
        expect(testUtils.getChildByText(responseTime!.value)).toBeInTheDocument()
      })

      describe('Значение не отображается', () => {
        test(`Для роли ${UserRoleEnum.FirstLineSupport} если есть исполнитель`, () => {
          const fakeTaskTableItem: typeof taskTableItem = {
            ...taskTableItem,
            workGroup: null,
            assignee: taskFixtures.assignee(),
          }

          render(
            <TaskTable
              {...props}
              dataSource={[fakeTaskTableItem]}
              userRole={UserRoleEnum.FirstLineSupport}
            />,
          )

          const responseTime = parseResponseTime(
            fakeTaskTableItem.responseTime!,
            fakeTaskTableItem.workGroup!,
          )

          expect(testUtils.queryChildByText(responseTime!.value)).not.toBeInTheDocument()
        })
      })

      test('Сортировка отключена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Срок реакции')
        expect(headCol).not.toHaveClass(columnWithSortingClass)
      })
    })

    describe('Выполнить до', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getColTitle('Выполнить до')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)

        expect(
          testUtils.getChildByText(formatDate(taskTableItem.olaNextBreachTime)),
        ).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)
        const headCol = testUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Имеет корректное значение сортировки по умолчанию', () => {
        render(<TaskTable {...props} sort='ola_next_breach_time' />)
        const headCol = testUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)
        await testUtils.clickColTitle(user, 'Выполнить до')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Выполнить до')
        const headCol = testUtils.getHeadCol('Выполнить до')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Выполнить до')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Статус', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getColTitle('Статус')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getChildByText(taskStatusDict[taskTableItem.status!])).toBeInTheDocument()
      })

      // Временно отключена сортировка
      test('Сортировка отключена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Статус')
        expect(headCol).not.toHaveClass(columnWithSortingClass)
      })

      test.skip('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Статус')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })
    })

    describe('Задания', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)
        expect(testUtils.getColTitle('Задания')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)

        expect(
          testUtils.getChildByText(
            `${taskTableItem.subtasksCounter!.completed}/${taskTableItem.subtasksCounter!.all}`,
          ),
        ).toBeInTheDocument()
      })

      test('Сортировка отключена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Задания')
        expect(headCol).not.toHaveClass(columnWithSortingClass)
      })
    })

    describe('Комментарий', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getColTitle('Комментарий')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getChildByText(taskTableItem.lastComment!)).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Комментарий')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Комментарий')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Комментарий')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Комментарий')
        const headCol = testUtils.getHeadCol('Комментарий')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Комментарий')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })

    describe('Дата создания', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getColTitle('Дата создания')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...props} />)

        expect(testUtils.getChildByText(formatDate(taskTableItem.createdAt))).toBeInTheDocument()
      })

      test('Сортировка включена', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Дата создания')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Значение сортировки по умолчанию не установлено', () => {
        render(<TaskTable {...props} />)

        const headCol = testUtils.getHeadCol('Дата создания')
        expect(headCol).not.toHaveAttribute(ariaSortAttrName)
      })

      test('При клике на заголовок обработчик вызывается корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Дата создания')
        expect(props.onChange).toBeCalledTimes(1)
      })

      test('Сортировка работает корректно', async () => {
        const { user } = render(<TaskTable {...props} />)

        await testUtils.clickColTitle(user, 'Дата создания')
        const headCol = testUtils.getHeadCol('Дата создания')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrAscValue)

        await testUtils.clickColTitle(user, 'Дата создания')
        expect(headCol).toHaveAttribute(ariaSortAttrName, ariaSortAttrDescValue)

        props.dataSource.forEach((item) => {
          const row = testUtils.getRow(item.id)
          expect(row).toBeInTheDocument()
        })
      })
    })
  })

  describe('Пагинация', () => {
    test('Отображается', () => {
      render(<TaskTable {...props} pagination={paginationProps} />)

      const pagination = testUtils.getPaginationContainer()

      expect(pagination).toBeInTheDocument()
      expect(pagination).toHaveClass('ant-table-pagination')
    })

    test('Кнопки переключения страниц отображаются', () => {
      render(<TaskTable {...props} pagination={paginationProps} />)

      const page1Button = testUtils.getPaginationPageButton('1')
      const page2Button = testUtils.getPaginationPageButton('2')

      expect(page1Button).toBeInTheDocument()
      expect(page2Button).toBeInTheDocument()
    })

    test('Отображается корректный размер страницы по умолчанию', () => {
      render(<TaskTable {...props} pagination={paginationProps} />)

      const pagination = testUtils.getPaginationContainer()
      const defaultPageSize = testUtils.getPageSizeOption(pagination, DEFAULT_PAGE_SIZE)

      expect(defaultPageSize).toBeInTheDocument()
      expect(defaultPageSize).toHaveClass('ant-select-selection-item')
    })

    test('При клике на номер страницы вызывается обработчик', async () => {
      const { user } = render(
        <TaskTable {...props} pagination={paginationProps} />,
      )

      await testUtils.clickPaginationPageButton(user, '2')
      expect(props.onChange).toBeCalledTimes(1)
    })
  })

  describe('Если список заявок пуст', () => {
    test('Отображается соответствующий текст', () => {
      render(<TaskTable {...props} dataSource={[]} />)

      expect(
        testUtils.getChildByText('По заданным параметрам фильтрации ни одна заявка не найдена'),
      ).toBeInTheDocument()
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const { user } = render(<TaskTable {...props} />)

    await testUtils.clickRow(user, taskTableItem.id)

    expect(props.onRow).toBeCalledTimes(1)
    expect(props.onRow).toBeCalledWith(taskTableItem, 0)
  })
})
