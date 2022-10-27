import { getIconByName, loadingStartedByIconIn, render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import {
  TaskExtendedStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { DEFAULT_PAGE_SIZE } from '../../TaskListPage/constants'
import { paginationConfig } from '../constants/pagination'
import TaskTable from '../index'
import {
  columnWithSortingClass,
  firstTaskTableItem,
  paginationProps,
  requiredProps,
} from './constants'
import {
  getColText,
  getHeadCol,
  getPageButton,
  getPageSizeOption,
  getPageSizeOptionsContainer,
  getPaginationContainer,
  getPaginationNextButton,
  getPaginationPrevButton,
  getTable,
  userClickHeadCol,
  userClickRow,
  userOpenPageSizeOptions,
} from './utils'

const onChange = jest.fn()

afterEach(() => {
  onChange.mockReset()
})

describe('Таблица заявок', () => {
  describe('Колонка', () => {
    describe('Статус заявки', () => {
      describe('Отображает значение по статусу заявки', () => {
        test(`${TaskStatusEnum.New}`, () => {
          render(
            <TaskTable
              {...requiredProps}
              dataSource={[
                {
                  ...firstTaskTableItem,
                  status: TaskStatusEnum.New,
                },
              ]}
            />,
          )

          const badge = screen.getByTestId('badge-status-default')
          expect(badge).toBeInTheDocument()
        })

        test(`${TaskStatusEnum.InProgress}`, () => {
          render(
            <TaskTable
              {...requiredProps}
              dataSource={[
                {
                  ...firstTaskTableItem,
                  status: TaskStatusEnum.InProgress,
                },
              ]}
            />,
          )

          const badge = screen.getByTestId('badge-status-warning')
          expect(badge).toBeInTheDocument()
        })

        test(`${TaskStatusEnum.Completed}`, () => {
          render(
            <TaskTable
              {...requiredProps}
              dataSource={[
                {
                  ...firstTaskTableItem,
                  status: TaskStatusEnum.Completed,
                },
              ]}
            />,
          )

          const badge = screen.getByTestId('badge-status-success')
          expect(badge).toBeInTheDocument()
        })
      })

      describe('Отображает значение по расширенному статусу заявки', () => {
        test(`${TaskExtendedStatusEnum.Awaiting}`, () => {
          render(
            <TaskTable
              {...requiredProps}
              dataSource={[
                {
                  ...firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.Awaiting,
                },
              ]}
            />,
          )

          expect(getIconByName('pause-circle')).toBeInTheDocument()
        })

        test(`${TaskExtendedStatusEnum.Returned}`, () => {
          render(
            <TaskTable
              {...requiredProps}
              dataSource={[
                {
                  ...firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.Returned,
                },
              ]}
            />,
          )

          expect(getIconByName('right-circle')).toBeInTheDocument()
        })

        test(`${TaskExtendedStatusEnum.InReclassification}`, () => {
          render(
            <TaskTable
              {...requiredProps}
              dataSource={[
                {
                  ...firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.InReclassification,
                },
              ]}
            />,
          )

          expect(getIconByName('question-circle')).toBeInTheDocument()
        })

        test(`${TaskExtendedStatusEnum.Closed}`, () => {
          render(
            <TaskTable
              {...requiredProps}
              dataSource={[
                {
                  ...firstTaskTableItem,
                  status: TaskStatusEnum.New,
                  extendedStatus: TaskExtendedStatusEnum.Closed,
                },
              ]}
            />,
          )

          expect(getIconByName('check-circle')).toBeInTheDocument()
        })
      })
    })

    describe('Заявка', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Заявка')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()
        expect(
          within(table).getByText(firstTaskTableItem.id),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Заявка')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Заявка')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Заявка')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Внешний номер', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Внеш.номер')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()
        expect(
          within(table).getByText(firstTaskTableItem.recordId),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Внеш.номер')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Внеш.номер')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Внеш.номер')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Объект', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Объект')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()
        expect(
          within(table).getByText(firstTaskTableItem.name),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Объект')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Объект')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Объект')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Тема', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Тема')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()
        expect(
          within(table).getByText(firstTaskTableItem.title),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Тема')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Тема')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Тема')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Исполнитель', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Исполнитель')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()

        expect(
          within(table).getByText(
            getShortUserName(firstTaskTableItem.assignee),
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Исполнитель')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Исполнитель')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Исполнитель')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Рабочая группа', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Рабочая группа')).toBeInTheDocument()
      })

      test('Отображает значение если оно присутствует', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()

        expect(
          within(table).getByText(firstTaskTableItem.workGroup!.name),
        ).toBeInTheDocument()
      })

      test('Отображает резервный текст если оно отсутствует', () => {
        render(
          <TaskTable
            {...requiredProps}
            dataSource={[{ ...firstTaskTableItem, workGroup: null }]}
          />,
        )

        const table = getTable()
        expect(within(table).getByText('I линия поддержки')).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Рабочая группа')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Рабочая группа')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Рабочая группа')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Выполнить до', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Выполнить до')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()

        expect(
          within(table).getByText(
            formatDate(firstTaskTableItem.olaNextBreachTime, DATE_TIME_FORMAT),
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Выполнить до')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Имеет корректное значение сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} sort='ola_next_breach_time' />)

        const headCol = getHeadCol('Выполнить до')
        expect(headCol).toHaveAttribute('aria-sort', 'ascending')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Выполнить до')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Комментарий', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Комментарий')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()

        expect(
          within(table).getByText(firstTaskTableItem.lastComment),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Комментарий')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Комментарий')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Комментарий')
        expect(onChange).toBeCalledTimes(1)
      })
    })

    describe('Дата создания', () => {
      test('Отображает заголовок', () => {
        render(<TaskTable {...requiredProps} />)

        expect(getColText('Дата создания')).toBeInTheDocument()
      })

      test('Отображает значение', () => {
        render(<TaskTable {...requiredProps} />)

        const table = getTable()

        expect(
          within(table).getByText(
            formatDate(firstTaskTableItem.createdAt, DATE_TIME_FORMAT),
          ),
        ).toBeInTheDocument()
      })

      test('Имеет сортировку', async () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Дата создания')
        expect(headCol).toHaveClass(columnWithSortingClass)
      })

      test('Не имеет сортировки по умолчанию', () => {
        render(<TaskTable {...requiredProps} />)

        const headCol = getHeadCol('Дата создания')
        expect(headCol).not.toHaveAttribute('aria-sort')
      })

      test('При клике на заголовок вызывается обработчик', async () => {
        const { user } = render(
          <TaskTable {...requiredProps} onChange={onChange} />,
        )

        await userClickHeadCol(user, 'Дата создания')
        expect(onChange).toBeCalledTimes(1)
      })
    })
  })

  describe('Пагинация', () => {
    test('Отображается', () => {
      render(<TaskTable {...requiredProps} pagination={paginationProps} />)

      const pagination = getPaginationContainer()

      expect(pagination).toBeInTheDocument()
      expect(pagination).toHaveClass('ant-table-pagination')
    })

    test('Кнопки переключения страниц отображаются', () => {
      render(<TaskTable {...requiredProps} pagination={paginationProps} />)

      const page1Button = getPageButton('1')
      const page2Button = getPageButton('2')

      expect(page1Button).toBeInTheDocument()
      expect(page2Button).toBeInTheDocument()
    })

    describe('Кнопки "Вперед" и "Назад" отображаются корректно', () => {
      test('Если элементов больше чем установленный размер страницы', () => {
        render(<TaskTable {...requiredProps} pagination={paginationProps} />)

        const nextButton = getPaginationNextButton()
        const prevButton = getPaginationPrevButton()

        expect(prevButton).toBeInTheDocument()
        expect(prevButton).toBeDisabled()

        expect(nextButton).toBeInTheDocument()
        expect(nextButton).toBeEnabled()
      })

      test('Если количество элементов равно установленному размеру страницы', () => {
        render(
          <TaskTable
            {...requiredProps}
            pagination={{
              ...paginationProps,
              total: paginationProps.pageSize,
            }}
          />,
        )

        const nextButton = getPaginationNextButton()
        const prevButton = getPaginationPrevButton()

        expect(prevButton).toBeInTheDocument()
        expect(prevButton).toBeDisabled()

        expect(nextButton).toBeInTheDocument()
        expect(nextButton).toBeDisabled()
      })
    })

    test('Отображается корректный размер страницы по умолчанию', () => {
      render(<TaskTable {...requiredProps} pagination={paginationProps} />)

      const pagination = getPaginationContainer()
      const defaultPageSize = getPageSizeOption(pagination, DEFAULT_PAGE_SIZE)

      expect(defaultPageSize).toBeInTheDocument()
      expect(defaultPageSize).toHaveClass('ant-select-selection-item')
    })

    test('Отображаются корректные варианты размера страницы', async () => {
      const { user } = render(
        <TaskTable {...requiredProps} pagination={paginationProps} />,
      )

      const pagination = getPaginationContainer()

      await userOpenPageSizeOptions(user, pagination)

      const pageSizeOptionsContainer = getPageSizeOptionsContainer(pagination)

      paginationConfig.pageSizeOptions.forEach((pageSize) => {
        const option = getPageSizeOption(pageSizeOptionsContainer, pageSize)
        expect(option).toBeInTheDocument()
      })
    })

    test('При изменении размера страницы вызывается обработчик', async () => {
      const { user } = render(
        <TaskTable
          {...requiredProps}
          pagination={paginationProps}
          onChange={onChange}
        />,
      )

      const pagination = getPaginationContainer()

      await userOpenPageSizeOptions(user, pagination)

      const pageSizeOptionsContainer = getPageSizeOptionsContainer(pagination)
      const pageSize = paginationConfig.pageSizeOptions[0]
      const pageSizeOption = getPageSizeOption(
        pageSizeOptionsContainer,
        pageSize,
      )

      await user.click(pageSizeOption)

      expect(onChange).toBeCalledTimes(1)
    })

    test('При изменении страницы вызывается обработчик', async () => {
      const { user } = render(
        <TaskTable
          {...requiredProps}
          pagination={paginationProps}
          onChange={onChange}
        />,
      )

      const nextButton = getPaginationNextButton()
      const prevButton = getPaginationPrevButton()
      const page2Button = getPageButton('2')

      await user.click(nextButton)
      expect(onChange).toBeCalled()

      await user.click(prevButton)
      expect(onChange).toBeCalled()

      await user.click(page2Button)
      expect(onChange).toBeCalled()
    })
  })

  describe('Если список заявок пуст', () => {
    test('Отображается соответствующий текст', () => {
      render(<TaskTable {...requiredProps} dataSource={[]} />)

      const table = getTable()
      const emptyContent = within(table).getByText(
        'По заданным параметрам фильтрации ни одна заявка не найдена',
      )

      expect(emptyContent).toBeInTheDocument()
    })
  })

  test('Отображает состояние загрузки', () => {
    render(<TaskTable {...requiredProps} loading />)

    const table = getTable()
    loadingStartedByIconIn(table)
  })

  test('При клике на строку вызывается обработчик', async () => {
    const onRow = jest.fn()
    const { user } = render(<TaskTable {...requiredProps} onRow={onRow} />)

    await userClickRow(user, firstTaskTableItem.id)

    expect(onRow).toBeCalled()
  })
})
