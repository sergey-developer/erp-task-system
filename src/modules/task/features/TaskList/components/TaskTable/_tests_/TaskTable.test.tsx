import { loadingStartedByIconIn, render } from '_tests_/utils'
import { within } from '@testing-library/react'
import * as taskFixtures from 'fixtures/task'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import taskStatusTestUtils from '../../../../TaskStatus/_tests_/utils'
import { DEFAULT_PAGE_SIZE } from '../../TaskListPage/constants'
import { paginationConfig } from '../constants/pagination'
import TaskTable from '../index'
import taskTableTestConstants from './constants'
import taskTableTestUtils from './utils'

const onChange = jest.fn()

afterEach(() => {
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

    const table = taskTableTestUtils.getTable()

    expect(table).toBeInTheDocument()
    tableItems.forEach((item) => {
      const row = taskTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', () => {
    render(<TaskTable {...taskTableTestConstants.requiredProps} loading />)

    const table = taskTableTestUtils.getTable()
    loadingStartedByIconIn(table)
  })

  describe('Колонка', () => {
    describe('Статус заявки', () => {
      describe('Отображает значение по статусу заявки', () => {
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
      })

      describe('Отображает значение по расширенному статусу заявки', () => {
        test(`${TaskExtendedStatusEnum.Awaiting}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.Awaiting,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskExtendedStatusEnum.Awaiting,
          )
          expect(status).toBeInTheDocument()
        })

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

        test(`${TaskExtendedStatusEnum.Closed}`, () => {
          render(
            <TaskTable
              {...taskTableTestConstants.requiredProps}
              dataSource={[
                {
                  ...taskTableTestConstants.firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.Closed,
                },
              ]}
            />,
          )

          const status = taskStatusTestUtils.getTaskStatus(
            TaskExtendedStatusEnum.Closed,
          )
          expect(status).toBeInTheDocument()
        })
      })
    })

    describe('Заявка', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColText('Заявка')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()
        expect(
          within(table).getByText(taskTableTestConstants.firstTaskTableItem.id),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Заявка')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Заявка')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Заявка')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Внешний номер', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColText('Внеш.номер')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()
        expect(
          within(table).getByText(
            taskTableTestConstants.firstTaskTableItem.recordId,
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Внеш.номер')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Внеш.номер')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Объект', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColText('Объект')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()
        expect(
          within(table).getByText(
            taskTableTestConstants.firstTaskTableItem.name,
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Объект')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Объект')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Объект')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Тема', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColText('Тема')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()
        expect(
          within(table).getByText(
            taskTableTestConstants.firstTaskTableItem.title,
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Тема')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Тема')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Тема')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Исполнитель', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColText('Исполнитель')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()

        expect(
          within(table).getByText(
            getShortUserName(
              taskTableTestConstants.firstTaskTableItem.assignee,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Исполнитель')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Исполнитель')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Рабочая группа', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getColText('Рабочая группа'),
        ).toBeInTheDocument()
      })

      test('Отображает значение если оно присутствует', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()

        expect(
          within(table).getByText(
            taskTableTestConstants.firstTaskTableItem.workGroup!.name,
          ),
        ).toBeInTheDocument()
      })

      test('Отображает резервный текст если оно отсутствует', () => {
        render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            dataSource={[
              { ...taskTableTestConstants.firstTaskTableItem, workGroup: null },
            ]}
          />,
        )

        const table = taskTableTestUtils.getTable()
        expect(within(table).getByText('I линия поддержки')).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Рабочая группа')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Рабочая группа')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Выполнить до', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getColText('Выполнить до'),
        ).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()

        expect(
          within(table).getByText(
            formatDate(
              taskTableTestConstants.firstTaskTableItem.olaNextBreachTime,
              DATE_TIME_FORMAT,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
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

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Выполнить до')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Комментарий', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(taskTableTestUtils.getColText('Комментарий')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()

        expect(
          within(table).getByText(
            taskTableTestConstants.firstTaskTableItem.lastComment,
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Комментарий')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Комментарий')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Комментарий')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Дата создания', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        expect(
          taskTableTestUtils.getColText('Дата создания'),
        ).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const table = taskTableTestUtils.getTable()

        expect(
          within(table).getByText(
            formatDate(
              taskTableTestConstants.firstTaskTableItem.createdAt,
              DATE_TIME_FORMAT,
            ),
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Дата создания')
        expect(headCol).toHaveClass(
          taskTableTestConstants.columnWithSortingClass,
        )
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...taskTableTestConstants.requiredProps} />)

        const headCol = taskTableTestUtils.getHeadCol('Дата создания')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable
            {...taskTableTestConstants.requiredProps}
            onChange={onChange}
          />,
        )

        await taskTableTestUtils.userClickHeadCol(user, 'Дата создания')
        expect(onChange).toBeCalledTimes(1)
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

    test('При изменении размера страницы вызывается обработчик', async () => {
      const { user } = render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
          onChange={onChange}
        />,
      )

      await taskTableTestUtils.userChangePageSize(
        user,
        paginationConfig.pageSizeOptions[0],
      )
      expect(onChange).toBeCalledTimes(1)
    })

    test('При изменении страницы вызывается обработчик', async () => {
      const { user } = render(
        <TaskTable
          {...taskTableTestConstants.requiredProps}
          pagination={taskTableTestConstants.paginationProps}
          onChange={onChange}
        />,
      )

      await taskTableTestUtils.userClickPaginationNextButton(user)
      expect(onChange).toBeCalled()

      await taskTableTestUtils.userClickPaginationPrevButton(user)
      expect(onChange).toBeCalled()

      await taskTableTestUtils.userClickPaginationPageButton(user, '2')
      expect(onChange).toBeCalled()
    })
  })

  describe('Если список заявок пуст', () => {
    test('Отображается соответствующий текст', () => {
      render(
        <TaskTable {...taskTableTestConstants.requiredProps} dataSource={[]} />,
      )

      const table = taskTableTestUtils.getTable()
      const emptyContent = within(table).getByText(
        'По заданным параметрам фильтрации ни одна заявка не найдена',
      )

      expect(emptyContent).toBeInTheDocument()
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const onRow = jest.fn()
    const { user } = render(
      <TaskTable {...taskTableTestConstants.requiredProps} onRow={onRow} />,
    )

    await taskTableTestUtils.userClickRow(
      user,
      taskTableTestConstants.firstTaskTableItem.id,
    )
    expect(onRow).toBeCalled()
  })
})
