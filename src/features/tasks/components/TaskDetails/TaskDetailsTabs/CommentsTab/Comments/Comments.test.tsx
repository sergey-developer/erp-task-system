import { props } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/constants'
import { commentsTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTabs/CommentsTab/Comments/testUtils'
import { render } from '_tests_/helpers'

import Comments from './index'

describe('Список комментариев заявки', () => {
  test('Отображает комментарии если они есть', () => {
    render(<Comments {...props} />)
    expect(commentsTestUtils.getAllComments()).toHaveLength(props.comments.length)
  })

  test('Отображает соответствующий текст, если загрузка завершена и комментариев нет', () => {
    render(<Comments {...props} isLoading={false} comments={[]} />)
    expect(commentsTestUtils.getChildByText('Комментариев пока нет')).toBeInTheDocument()
  })
})
