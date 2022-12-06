import React from 'react'

import { generateDateString, generateWord, render } from '_tests_/utils'
import { screen } from '@testing-library/react'
import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'

import JournalEntry, { JournalEntryProps } from '../JournalEntry'

const requiredProps: JournalEntryProps = {
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: generateDateString(),
  description: generateWord(),
  sourceSystem: TaskJournalSourceEnum.X5,
  author: generateWord(),
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
