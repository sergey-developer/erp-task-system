import { screen, within } from '@testing-library/react'

import { fakeWord, render } from '_tests_/utils'

import Comment, { CommentProps } from './index'

const requiredProps: Readonly<CommentProps> = {
  text: fakeWord(),
  author: fakeWord(),
  createdAt: fakeWord(),
}

const getContainer = () => screen.getByTestId('task-comment')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

export const testUtils = {
  getContainer,
  getChildByText,
}

describe('Комментарий заявки', () => {
  test('Отображает автора', () => {
    render(<Comment {...requiredProps} />)
    expect(testUtils.getChildByText(requiredProps.author)).toBeInTheDocument()
  })

  test('Отображает дату создания', () => {
    render(<Comment {...requiredProps} />)

    expect(
      testUtils.getChildByText(requiredProps.createdAt),
    ).toBeInTheDocument()
  })

  test('Отображает текст комментария', () => {
    render(<Comment {...requiredProps} />)
    expect(testUtils.getChildByText(requiredProps.text)).toBeInTheDocument()
  })
})
