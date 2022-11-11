import { render } from '_tests_/utils'

import commentTestUtils from '../_tests_/utils'
import Comment from '../index'
import { requiredProps } from './constants'

describe('Комментарий заявки', () => {
  test('Отображает автора', () => {
    render(<Comment {...requiredProps} />)

    expect(
      commentTestUtils.getChildByText(requiredProps.author),
    ).toBeInTheDocument()
  })

  test('Отображает дату создания', () => {
    render(<Comment {...requiredProps} />)

    expect(
      commentTestUtils.getChildByText(requiredProps.createdAt),
    ).toBeInTheDocument()
  })

  test('Отображает текст комментария', () => {
    render(<Comment {...requiredProps} />)

    expect(
      commentTestUtils.getChildByText(requiredProps.text),
    ).toBeInTheDocument()
  })
})
