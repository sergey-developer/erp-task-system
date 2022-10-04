import { render, screen, within } from '_tests_/utils'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import TaskTable from '../index'
import { baseProps, columnWithSortingClass, taskTableItem } from './constants'
import { getColumnTitle, getColumnTitleContainer, getTable } from './utils'

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
      render(<TaskTable dataSource={[{ ...taskTableItem, workGroup: null }]} />)

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
})
