import { render, screen, within } from '_tests_/utils'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { paginationConfig } from '../constants/pagination'
import TaskTable from '../index'
import {
  baseProps,
  columnWithSortingClass,
  paginationProps,
  taskTableItem,
} from './constants'
import {
  getColumnTitle,
  getColumnTitleContainer,
  getPaginationContainer,
  getTable,
} from './utils'

describe('Таблица заявок', () => {
  describe('Колонка "Статус заявки"', () => {
    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const status = screen.getByTestId('task-status')
      expect(status).toBeInTheDocument()
    })
  })

  describe('Колонка "Заявка"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Заявка')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(within(table).getByText(taskTableItem.id)).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Заявка')

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Внешний номер"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Внеш.номер')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(
        within(table).getByText(taskTableItem.recordId),
      ).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Внеш.номер')

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Объект"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Объект')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(within(table).getByText(taskTableItem.name)).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Объект')

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Тема"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Тема')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(within(table).getByText(taskTableItem.title)).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Тема')

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Исполнитель"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Исполнитель')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()

      expect(
        within(table).getByText(getShortUserName(taskTableItem.assignee)),
      ).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Исполнитель')

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Рабочая группа"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Рабочая группа')).toBeInTheDocument()
    })

    test('Отображает значение если оно присутствует', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()

      expect(
        within(table).getByText(taskTableItem.workGroup!.name),
      ).toBeInTheDocument()
    })

    test('Отображает резервный текст если оно отсутствует', () => {
      render(
        <TaskTable
          {...baseProps}
          dataSource={[{ ...taskTableItem, workGroup: null }]}
        />,
      )

      const table = getTable()
      expect(within(table).getByText('I линия поддержки')).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(
        table,
        'Рабочая группа',
      )

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Выполнить до"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Выполнить до')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()

      expect(
        within(table).getByText(
          formatDate(taskTableItem.olaNextBreachTime, DATE_TIME_FORMAT),
        ),
      ).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(
        table,
        'Выполнить до',
      )

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Комментарий"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Комментарий')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()

      expect(
        within(table).getByText(taskTableItem.comment!.text),
      ).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Комментарий')

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Колонка "Дата создания"', () => {
    test('Отображает заголовок', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      expect(getColumnTitle(table, 'Дата создания')).toBeInTheDocument()
    })

    test('Отображает значение', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()

      expect(
        within(table).getByText(
          formatDate(taskTableItem.createdAt, DATE_TIME_FORMAT),
        ),
      ).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(
        table,
        'Дата создания',
      )

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })
  })

  describe('Пагинация', () => {
    test('Отображается', () => {
      render(<TaskTable {...baseProps} pagination={paginationProps} />)

      const pagination = getPaginationContainer()

      expect(pagination).toBeInTheDocument()
      expect(pagination).toHaveClass('ant-table-pagination')
    })

    test('Кнопки переключения страниц отображаются', () => {
      render(<TaskTable {...baseProps} pagination={paginationProps} />)

      const pagination = getPaginationContainer()
      const page1 = within(pagination).getByRole('listitem', { name: '1' })
      const page2 = within(pagination).getByRole('listitem', { name: '2' })

      expect(page1).toBeInTheDocument()
      expect(page2).toBeInTheDocument()
    })

    test('Кнопки "Вперед" и "Назад" отображаются', () => {
      render(<TaskTable {...baseProps} pagination={paginationProps} />)

      const pagination = getPaginationContainer()

      const nextButton = within(pagination).getByRole('listitem', {
        name: 'Вперед',
      })
      const prevButton = within(pagination).getByRole('listitem', {
        name: 'Назад',
      })

      expect(prevButton).toBeInTheDocument()
      expect(nextButton).toBeInTheDocument()
    })

    test('Отображается корректный размер страницы по умолчанию', () => {
      render(<TaskTable {...baseProps} pagination={paginationProps} />)

      const pagination = getPaginationContainer()
      const defaultPageSize = within(pagination).getByTitle('100 / стр.')

      expect(defaultPageSize).toBeInTheDocument()
      expect(defaultPageSize).toHaveClass('ant-select-selection-item')
    })

    test('Отображаются корректные варианты размера страницы', async () => {
      const { user } = render(
        <TaskTable {...baseProps} pagination={paginationProps} />,
      )

      const pagination = getPaginationContainer()
      const currentPageSizeButton = within(pagination).getByRole('combobox', {
        expanded: false,
      })

      await user.click(currentPageSizeButton)

      const pageSizeOptionsContainer = pagination.querySelector(
        '.rc-virtual-list',
      ) as HTMLElement

      paginationConfig.pageSizeOptions.forEach((pageSize) => {
        const option = within(pageSizeOptionsContainer).getByText(
          `${pageSize} / стр.`,
        )

        expect(option).toBeInTheDocument()
      })
    })
  })
})
