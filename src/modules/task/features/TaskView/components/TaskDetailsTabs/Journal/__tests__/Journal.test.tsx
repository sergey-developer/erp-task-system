import { render, screen } from '__tests__/utils'

import { NO_DATA_MSG } from '../constants'
import Journal from '../index'
import { emptyJournal, fakeJournal } from './constants'

describe('Журнал', () => {
  describe('Если есть записи', () => {
    test('Отображает записи', () => {
      render(<Journal data={fakeJournal} />)

      expect(screen.getAllByTestId('journalEntry')).toHaveLength(
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

      expect(screen.queryAllByTestId('journalEntry')).toHaveLength(
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
