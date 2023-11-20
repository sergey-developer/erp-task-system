import { screen, within } from '@testing-library/react'

import attachmentFixtures from '_tests_/fixtures/attachments'
import { fakeWord, render } from '_tests_/utils'

import AttachmentListModal, { AttachmentListModalProps } from './index'

const props: AttachmentListModalProps = {
  open: true,
  title: fakeWord(),
  data: attachmentFixtures.attachmentList(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('attachment-list-modal')
const findContainer = () => screen.findByTestId('attachment-list-modal')

export const testUtils = {
  getContainer,
  findContainer,
}

describe('Модалка списка вложений', () => {
  test('Отображается корректно', () => {
    render(<AttachmentListModal {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText(props.title as string)
    const images = within(container).getAllByRole('img', { name: '' })

    expect(title).toBeInTheDocument()
    expect(images).toHaveLength(props.data.length)
  })
})
