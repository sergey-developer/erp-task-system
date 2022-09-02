import React from 'react'

import { render, screen } from '__tests/utils'

import JournalEntry from '../JournalEntry'
import { fakeJournalEntry } from './constants'

describe('Элемент журнала', () => {
  test('Отображается корректно со всеми данными', () => {
    render(
      <JournalEntry
        type={fakeJournalEntry.type}
        author={fakeJournalEntry.author}
        createdAt={fakeJournalEntry.createdAt}
        description={fakeJournalEntry.description}
        sourceSystem={fakeJournalEntry.sourceSystem}
      />,
    )

    Object.values(fakeJournalEntry).forEach((item) => {
      expect(screen.getByText(item!)).toBeInTheDocument()
    })
  })

  test('Не отображает автора если не передать его', () => {
    render(
      <JournalEntry
        author={null}
        type={fakeJournalEntry.type}
        createdAt={fakeJournalEntry.createdAt}
        description={fakeJournalEntry.description}
        sourceSystem={fakeJournalEntry.sourceSystem}
      />,
    )

    expect(screen.queryByTestId('journalEntry-author')).not.toBeInTheDocument()
  })
})
