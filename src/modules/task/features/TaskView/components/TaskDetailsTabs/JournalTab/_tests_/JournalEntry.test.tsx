import React from 'react'

import { render, screen } from '_tests_/utils'
import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'

import JournalEntry, { JournalEntryProps } from '../JournalEntry'

const journalEntry: JournalEntryProps = {
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: new Date().toISOString(),
  description: 'Выполнено переназначение',
  sourceSystem: TaskJournalSourceEnum.X5,
  author: 'Александров Александр Александрович',
}

describe('Элемент журнала', () => {
  test('Отображается корректно со всеми данными', () => {
    render(
      <JournalEntry
        type={journalEntry.type}
        author={journalEntry.author}
        createdAt={journalEntry.createdAt}
        description={journalEntry.description}
        sourceSystem={journalEntry.sourceSystem}
      />,
    )

    Object.values(journalEntry).forEach((item) => {
      expect(screen.getByText(item!)).toBeInTheDocument()
    })
  })

  test('Не отображает автора если не передать его', () => {
    render(
      <JournalEntry
        author={null}
        type={journalEntry.type}
        createdAt={journalEntry.createdAt}
        description={journalEntry.description}
        sourceSystem={journalEntry.sourceSystem}
      />,
    )

    expect(screen.queryByTestId('journalEntry-author')).not.toBeInTheDocument()
  })
})
