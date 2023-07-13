import { screen, within } from '@testing-library/react'
import React from 'react'

import {
  TaskJournalSourceEnum,
  TaskJournalTypeEnum,
} from 'modules/task/constants'
import { testUtils as attachmentListTestUtils } from 'modules/task/features/AttachmentList/AttachmentList.test'

import taskFixtures from 'fixtures/task'

import { fakeDateString, fakeId, fakeWord, render } from '_tests_/utils'

import JournalEntry, { JournalEntryProps } from './JournalEntry'

const props: JournalEntryProps = {
  id: fakeId(),
  type: TaskJournalTypeEnum.StatusChange,
  createdAt: fakeDateString(),
  description: fakeWord(),
  sourceSystem: TaskJournalSourceEnum.X5,
  author: fakeWord(),
  attachments: [taskFixtures.fakeAttachment()],
}

const getContainer = (id: number) => screen.getByTestId(`journal-entry-${id}`)

const queryContainer = (id: number) =>
  screen.queryByTestId(`journal-entry-${id}`)

const getChildByText = (id: number, text: string) =>
  within(getContainer(id)).getByText(text)

const queryChildByText = (id: number, text: string) =>
  within(getContainer(id)).queryByText(text)

export const testUtils = {
  getContainer,
  queryContainer,
  getChildByText,
  queryChildByText,
}

describe('Элемент журнала', () => {
  test('Отображает дату создания', () => {
    render(<JournalEntry {...props} />)
    const createdAt = testUtils.getChildByText(props.id, props.createdAt)
    expect(createdAt).toBeInTheDocument()
  })

  test('Отображает описание', () => {
    render(<JournalEntry {...props} />)
    const description = testUtils.getChildByText(props.id, props.description)
    expect(description).toBeInTheDocument()
  })

  describe('Вложения', () => {
    test('Отображается если есть', () => {
      render(<JournalEntry {...props} />)
      const attachmentList = attachmentListTestUtils.getContainer()
      expect(attachmentList).toBeInTheDocument()
    })

    test('Не отображаются если их нет', () => {
      render(<JournalEntry {...props} attachments={[]} />)
      const attachmentList = attachmentListTestUtils.queryContainer()
      expect(attachmentList).not.toBeInTheDocument()
    })
  })

  test('Отображает тип', () => {
    render(<JournalEntry {...props} />)

    const label = testUtils.getChildByText(props.id, 'Тип')
    const type = testUtils.getChildByText(props.id, props.type)

    expect(label).toBeInTheDocument()
    expect(type).toBeInTheDocument()
  })

  test('Отображает источник добавления', () => {
    render(<JournalEntry {...props} />)

    const label = testUtils.getChildByText(props.id, 'Где добавлено')
    const sourceSystem = testUtils.getChildByText(props.id, props.sourceSystem)

    expect(label).toBeInTheDocument()
    expect(sourceSystem).toBeInTheDocument()
  })

  describe('Автор', () => {
    test('Отображается если есть', () => {
      render(<JournalEntry {...props} />)

      const label = testUtils.getChildByText(props.id, 'Кем добавлено')
      const author = testUtils.getChildByText(props.id, props.author!)

      expect(label).toBeInTheDocument()
      expect(author).toBeInTheDocument()
    })

    test('Не отображает если его нет', () => {
      render(<JournalEntry {...props} author={null} />)
      const author = testUtils.queryChildByText(props.id, props.author!)
      expect(author).not.toBeInTheDocument()
    })
  })
})
