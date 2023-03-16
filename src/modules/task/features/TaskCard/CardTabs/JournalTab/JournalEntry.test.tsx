import { screen } from '@testing-library/react'
import React from 'react'

import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'

import { fakeDateString, fakeWord, render } from '_tests_/utils'

import JournalEntry, { JournalEntryProps } from './JournalEntry'

const requiredProps: JournalEntryProps = {
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: fakeDateString(),
  description: fakeWord(),
  sourceSystem: TaskJournalSourceEnum.X5,
  author: fakeWord(),
}

describe('Элемент журнала', () => {
  test('Отображается корректно со всеми данными', () => {
    render(<JournalEntry {...requiredProps} />)

    Object.values(requiredProps).forEach((item) => {
      expect(screen.getByText(item!)).toBeInTheDocument()
    })
  })

  test('Не отображает автора если не передать его', () => {
    render(<JournalEntry {...requiredProps} author={null} />)
    expect(screen.queryByTestId('journalEntry-author')).not.toBeInTheDocument()
  })
})
