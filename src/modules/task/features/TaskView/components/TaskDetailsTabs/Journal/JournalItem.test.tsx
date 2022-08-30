import React from 'react'

import { render, screen } from '__tests__/utils'
import {
  TaskJournalSourceEnum,
  TaskJournalType,
} from 'modules/task/features/TaskView/models/taskJournal.model'

import JournalItem, { JournalItemProps } from './JournalItem'

describe('Элемент журнала', () => {
  const fakeJournalItem: JournalItemProps = {
    type: TaskJournalType.StatusChange,
    createdAt: new Date().toISOString(),
    description: 'Выполнено переназначение',
    sourceSystem: TaskJournalSourceEnum.X5,
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
