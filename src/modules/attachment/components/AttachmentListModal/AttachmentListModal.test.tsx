import { screen, within } from '@testing-library/react'

import { testUtils as attachmentImagesTestUtils } from 'modules/attachment/components/AttachmentImages/AttachmentImages.test'

import attachmentFixtures from '_tests_/fixtures/attachments'
import { fakeWord, render, spinnerTestUtils } from '_tests_/utils'

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

  expectLoadingFinished: spinnerTestUtils.expectLoadingFinished('attachment-list-modal-loading'),
}

describe('Модалка списка вложений', () => {
  test('Отображается корректно', () => {
    render(<AttachmentListModal {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText(props.title as string)

    expect(title).toBeInTheDocument()
    props.data.forEach((item) => {
      const image = attachmentImagesTestUtils.getImageIn(container, item.name)
      expect(image).toBeInTheDocument()
    })
  })
})
