import React from 'react'

import { render, screen } from '__tests__/utils'

import JournalItem, { JournalItemProps } from './JournalItem'

describe('Элемент журнала', () => {
  const fakeJournalItem: JournalItemProps = {
    createdAt: new Date().toISOString(),
    type: 'Переназначение',
    description: 'Выполнено переназначение',
    sourceSystem: 'Х5',
    author: 'Александров Александр Александрович',
  }

  test('Отображается корректно со всеми данными', () => {
    render(
      <JournalItem
        type={fakeJournalItem.type}
        author={fakeJournalItem.author}
        createdAt={fakeJournalItem.createdAt}
        description={fakeJournalItem.description}
        sourceSystem={fakeJournalItem.sourceSystem}
      />,
    )

    Object.values(fakeJournalItem).forEach((item) => {
      expect(screen.getByText(item!)).toBeInTheDocument()
    })
  })

  test('Не отображает автора если не передать его', () => {
    render(
      <JournalItem
        author={null}
        type={fakeJournalItem.type}
        createdAt={fakeJournalItem.createdAt}
        description={fakeJournalItem.description}
        sourceSystem={fakeJournalItem.sourceSystem}
      />,
    )

    expect(screen.queryByTestId('journalItem-author')).not.toBeInTheDocument()
  })
})
