import { screen, within } from '@testing-library/react'

import attachmentFixtures from '_tests_/fixtures/attachments'
import { render } from '_tests_/utils'

import AttachmentList from './index'
import { AttachmentListProps } from './types'

const props: AttachmentListProps = {
  data: attachmentFixtures.attachmentList(),
}

const getIn = (container: HTMLElement, name: string) => within(container).getByRole('img', { name })

export const testUtils = {
  getIn,
}

describe('Список вложений', () => {
  test('Отображается корректно', () => {
    render(<AttachmentList {...props} data-testid='attachment-list' />)

    const container = screen.getByTestId('attachment-list')
    props.data.forEach((item) => {
      const image = testUtils.getIn(container, item.name)
      expect(image).toBeInTheDocument()
    })
  })
})
