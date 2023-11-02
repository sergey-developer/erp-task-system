import { screen, within } from '@testing-library/react'

import attachmentFixtures from '_tests_/fixtures/attachments'
import { render } from '_tests_/utils'

import AttachmentList, { AttachmentListProps } from './index'

const props: AttachmentListProps = {
  data: attachmentFixtures.attachmentList(),
}

const getAllIn = (container: HTMLElement) => within(container).getAllByRole('img', { name: '' })

export const testUtils = {
  getAllIn,
}

describe('Список вложений', () => {
  test('Отображается корректно', () => {
    render(<AttachmentList {...props} data-testid='attachment-list' />)

    const container = screen.getByTestId('attachment-list')
    const images = testUtils.getAllIn(container)

    expect(images).toHaveLength(props.data.length)
  })
})
