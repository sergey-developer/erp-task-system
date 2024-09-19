import React from 'react'

import { testUtils as attachmentsTestUtils } from 'modules/attachment/components/Attachments/Attachments.test'

import { props } from '_tests_/features/tasks/TaskDetails/Tabs/JournalTab/JournalEntry/constants'
import { journalEntryTestUtils } from '_tests_/features/tasks/TaskDetails/Tabs/JournalTab/JournalEntry/testUtils'
import { render } from '_tests_/utils'

import JournalEntry from './JournalEntry'

describe('Элемент журнала', () => {
  test('Отображает дату создания', () => {
    render(<JournalEntry {...props} />)
    const createdAt = journalEntryTestUtils.getChildByText(props.id, props.createdAt)
    expect(createdAt).toBeInTheDocument()
  })

  test('Отображает описание', () => {
    render(<JournalEntry {...props} />)
    const description = journalEntryTestUtils.getChildByText(props.id, props.description)
    expect(description).toBeInTheDocument()
  })

  describe('Вложения', () => {
    test('Отображается если есть', () => {
      render(<JournalEntry {...props} />)
      const attachmentList = attachmentsTestUtils.getContainer()
      expect(attachmentList).toBeInTheDocument()
    })

    test('Не отображаются если их нет', () => {
      render(<JournalEntry {...props} attachments={[]} />)
      const attachmentList = attachmentsTestUtils.queryContainer()
      expect(attachmentList).not.toBeInTheDocument()
    })
  })

  test('Отображает тип', () => {
    render(<JournalEntry {...props} />)

    const label = journalEntryTestUtils.getChildByText(props.id, 'Тип')
    const type = journalEntryTestUtils.getChildByText(props.id, props.type)

    expect(label).toBeInTheDocument()
    expect(type).toBeInTheDocument()
  })

  test('Отображает источник добавления', () => {
    render(<JournalEntry {...props} />)

    const label = journalEntryTestUtils.getChildByText(props.id, 'Где добавлено')
    const sourceSystem = journalEntryTestUtils.getChildByText(props.id, props.sourceSystem)

    expect(label).toBeInTheDocument()
    expect(sourceSystem).toBeInTheDocument()
  })

  describe('Автор', () => {
    test('Отображается если есть', () => {
      render(<JournalEntry {...props} />)

      const label = journalEntryTestUtils.getChildByText(props.id, 'Кем добавлено')
      const author = journalEntryTestUtils.getChildByText(props.id, props.author!)

      expect(label).toBeInTheDocument()
      expect(author).toBeInTheDocument()
    })

    test('Не отображает если его нет', () => {
      render(<JournalEntry {...props} author={null} />)
      const author = journalEntryTestUtils.queryChildByText(props.id, props.author!)
      expect(author).not.toBeInTheDocument()
    })
  })
})
