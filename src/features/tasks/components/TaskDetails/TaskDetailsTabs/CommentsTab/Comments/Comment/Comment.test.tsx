import { testUtils as attachmentsTestUtils } from 'features/attachments/components/Attachments/Attachments.test'

import { props } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/Comment/constants'
import { commentTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/Comment/testUtils'
import { render } from '_tests_/helpers'

import Comment from './index'

describe('Комментарий заявки', () => {
  test('Отображает автора', () => {
    render(<Comment {...props} />)
    expect(commentTestUtils.getChildByText(props.author)).toBeInTheDocument()
  })

  test('Отображает дату создания', () => {
    render(<Comment {...props} />)

    expect(commentTestUtils.getChildByText(props.createdAt)).toBeInTheDocument()
  })

  test('Отображает текст комментария', () => {
    render(<Comment {...props} />)
    expect(commentTestUtils.getChildByText(props.text)).toBeInTheDocument()
  })

  test('Отображает вложения', () => {
    render(<Comment {...props} />)
    expect(attachmentsTestUtils.getContainer()).toBeInTheDocument()
  })
})
