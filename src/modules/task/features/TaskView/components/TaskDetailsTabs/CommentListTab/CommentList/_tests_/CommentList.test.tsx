import { render } from '_tests_/utils'
import * as taskFixtures from 'fixtures/task'

import CommentList from '../index'
import testUtils from './utils'

describe('Список комментариев заявки', () => {
  test('Отображает комментарии если они есть', () => {
    const data = taskFixtures.getTaskCommentList()

    render(<CommentList isLoading={false} data={data} />)

    expect(testUtils.getAllComments()).toHaveLength(data.length)
  })

  test('Отображает соответствующий текст, если загрузка завершена и комментариев нет', () => {
    render(<CommentList isLoading={false} data={[]} />)

    expect(
      testUtils.getChildByText('Комментариев пока нет'),
    ).toBeInTheDocument()
  })
})
