import { screen } from '@testing-library/react'
import omit from 'lodash/omit'
import React from 'react'

import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants/common'

import taskFixtures from 'fixtures/task'

import { fakeDateString, fakeWord, render } from '_tests_/utils'

import JournalEntry, { JournalEntryProps } from './JournalEntry'

const props: JournalEntryProps = {
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: fakeDateString(),
  description: fakeWord(),
  sourceSystem: TaskJournalSourceEnum.X5,
  author: fakeWord(),
  attachments: [taskFixtures.fakeAttachment()],
}

describe('Элемент журнала', () => {
  test('Отображается корректно со всеми данными', () => {
    render(<JournalEntry {...props} />)

    Object.values(omit(props, 'attachments')).forEach((item) => {
      expect(screen.getByText(item!)).toBeInTheDocument()
    })
  })

  test('Не отображает автора если не передать его', () => {
    render(<JournalEntry {...props} author={null} />)
    expect(screen.queryByTestId('journalEntry-author')).not.toBeInTheDocument()
  })
})
