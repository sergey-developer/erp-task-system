import { screen, within } from '@testing-library/react'

import { testUtils as attachmentListTestUtils } from 'modules/task/components/AttachmentList/AttachmentList.test'

import taskFixtures from 'fixtures/task'

import { fakeWord, render } from '_tests_/utils'

import Comment, { CommentProps } from './index'

const props: Readonly<CommentProps> = {
  text: fakeWord(),
  author: fakeWord(),
  createdAt: fakeWord(),
  attachments: [taskFixtures.attachment()],
}

const getContainer = () => screen.getByTestId('task-comment')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

export const testUtils = {
  getContainer,
  getChildByText,
}

describe('Комментарий заявки', () => {
  test('Отображает автора', () => {
    render(<Comment {...props} />)
    expect(testUtils.getChildByText(props.author)).toBeInTheDocument()
  })

  test('Отображает дату создания', () => {
    render(<Comment {...props} />)

    expect(testUtils.getChildByText(props.createdAt)).toBeInTheDocument()
  })

  test('Отображает текст комментария', () => {
    render(<Comment {...props} />)
    expect(testUtils.getChildByText(props.text)).toBeInTheDocument()
  })

  test('Отображает вложения', () => {
    render(<Comment {...props} />)
    expect(attachmentListTestUtils.getContainer()).toBeInTheDocument()
  })
})
