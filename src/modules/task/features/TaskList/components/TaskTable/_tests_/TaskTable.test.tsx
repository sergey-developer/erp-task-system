import { render, screen, within } from '_tests_/utils'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import { DEFAULT_PAGE_SIZE } from '../../TaskListPage/constants'
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
  getPageButton,
  getPageSizeOption,
  getPageSizeOptionsContainer,
  getPaginationContainer,
  getPaginationNextButton,
  getPaginationPrevButton,
  getTable,
  userOpenPageSizeOptions,
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

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Заявка')

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Внеш.номер')

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Объект')

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Тема')

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Исполнитель')

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(
        table,
        'Рабочая группа',
      )

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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

    test('Имеет сортировку по умолчанию', () => {
      render(<TaskTable {...baseProps} sort='ola_next_breach_time' />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(
        table,
        'Выполнить до',
      )

      expect(columnTitleContainer).toHaveAttribute('aria-sort', 'ascending')
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
        within(table).getByText(taskTableItem.lastComment),
      ).toBeInTheDocument()
    })

    test('Имеет сортировку', async () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Комментарий')

      expect(columnTitleContainer).toHaveClass(columnWithSortingClass)
    })

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(table, 'Комментарий')

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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

    test('Не имеет сортировки по умолчанию', () => {
      render(<TaskTable {...baseProps} />)

      const table = getTable()
      const columnTitleContainer = getColumnTitleContainer(
        table,
        'Дата создания',
      )

      expect(columnTitleContainer).not.toHaveAttribute('aria-sort')
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
      const page1Button = getPageButton(pagination, '1')
      const page2Button = getPageButton(pagination, '2')

      expect(page1Button).toBeInTheDocument()
      expect(page2Button).toBeInTheDocument()
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
      const defaultPageSize = getPageSizeOption(pagination, DEFAULT_PAGE_SIZE)

      expect(defaultPageSize).toBeInTheDocument()
      expect(defaultPageSize).toHaveClass('ant-select-selection-item')
    })

    test('Отображаются корректные варианты размера страницы', async () => {
      const { user } = render(
        <TaskTable {...baseProps} pagination={paginationProps} />,
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
      const onChange = jest.fn()

      const { user } = render(
        <TaskTable
          {...baseProps}
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
      const onChange = jest.fn()

      const { user } = render(
        <TaskTable
          {...baseProps}
          pagination={paginationProps}
          onChange={onChange}
        />,
      )

      const pagination = getPaginationContainer()
      const nextButton = getPaginationNextButton(pagination)
      const prevButton = getPaginationPrevButton(pagination)
      const page2Button = getPageButton(pagination, '2')

      await user.click(nextButton)
      expect(onChange).toBeCalled()

      await user.click(prevButton)
      expect(onChange).toBeCalled()

      await user.click(page2Button)
      expect(onChange).toBeCalled()
    })
  })

  test('При клике на строку вызывается обработчик', async () => {
    const onRow = jest.fn()
    const { user } = render(<TaskTable {...baseProps} onRow={onRow} />)

    const row = screen.getByRole('row')
    await user.click(row)

    expect(onRow).toBeCalled()
  })

  test('При клике на сортировку вызывается обработчик', async () => {
    const onChange = jest.fn()
    const { user } = render(<TaskTable {...baseProps} onChange={onChange} />)

    const table = getTable()
    const columnTitleContainer = getColumnTitleContainer(table, 'Дата создания')

    await user.click(columnTitleContainer)

    expect(onChange).toBeCalledTimes(1)
  })
})
