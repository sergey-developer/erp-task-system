import { TaskJournalModel } from 'modules/task/components/TaskView/models/taskJournal.model'
import { render, screen } from 'tests/test-utils'

import { NO_DATA_MSG } from './constants'
import Journal from './index'

describe('Журнал', () => {
  const emptyJournal: TaskJournalModel = []

  const fakeJournal: TaskJournalModel = [
    {
      id: 1,
      createdAt: new Date().toISOString(),
      type: 'Переназначение 1',
      description: 'Выполнено переназначение 1',
      sourceSystem: 'Х5',
      author: {
        id: 1,
        firstName: 'Александр 1',
        lastName: 'Александров 1',
        middleName: 'Александрович 1',
      },
    },
    {
      id: 2,
      createdAt: new Date().toISOString(),
      type: 'Переназначение 2',
      description: 'Выполнено переназначение 2',
      sourceSystem: 'Х5',
      author: {
        id: 2,
        firstName: 'Александр 2',
        lastName: 'Александров 2',
        middleName: 'Александрович 2',
      },
    },
  ]

  describe('Если есть записи', () => {
    test('Отображает записи', () => {
      render(<Journal data={fakeJournal} />)

      expect(screen.getAllByTestId('journalItem')).toHaveLength(
        fakeJournal.length,
      )
    })

    test('Отображает кнопку экспорта', () => {
      render(<Journal data={fakeJournal} />)

      expect(screen.getByTestId('journal-icon-download')).toBeInTheDocument()
    })

    test(`Не отображает текст - "${NO_DATA_MSG}"`, () => {
      render(<Journal data={fakeJournal} />)
      expect(screen.queryByText(NO_DATA_MSG)).not.toBeInTheDocument()
    })
  })

  describe('Если нет записей', () => {
    test(`Отображает текст - "${NO_DATA_MSG}"`, () => {
      render(<Journal data={emptyJournal} />)
      expect(screen.getByText(NO_DATA_MSG)).toBeInTheDocument()
    })

    test('Не отображает записи', () => {
      render(<Journal data={emptyJournal} />)

      expect(screen.queryAllByTestId('journalItem')).toHaveLength(
        emptyJournal.length,
      )
    })

    test('Не отображает кнопку экспорта', () => {
      render(<Journal data={emptyJournal} />)

      expect(
        screen.queryByTestId('journal-icon-download'),
      ).not.toBeInTheDocument()
    })
  })
})
