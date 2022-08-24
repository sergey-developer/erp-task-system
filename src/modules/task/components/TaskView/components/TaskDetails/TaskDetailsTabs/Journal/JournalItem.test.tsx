import React from 'react'

import { TaskJournalItemModel } from 'modules/task/components/TaskView/models/taskJournal.model'
import { render, screen } from 'tests/test-utils'

import JournalItem from './JournalItem'

describe('Элемент журнала', () => {
  const fakeJournalItem: Omit<TaskJournalItemModel, 'id'> = {
    createdAt: new Date().toISOString(),
    type: 'Переназначение',
    description: 'Выполнено переназначение',
    sourceSystem: 'Х5',
    author: {
      id: 1,
      firstName: 'Александр',
      lastName: 'Александров',
      middleName: 'Александрович',
    },
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

    expect(screen.getByTestId('journal-createdAt')).toBeInTheDocument()
    expect(screen.getByTestId('journal-description')).toBeInTheDocument()
    expect(screen.getByTestId('journal-type')).toBeInTheDocument()
    expect(screen.getByTestId('journal-sourceSystem')).toBeInTheDocument()
    expect(screen.getByTestId('journal-author')).toBeInTheDocument()
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

    expect(screen.queryByTestId('journal-author')).not.toBeInTheDocument()
  })
})
