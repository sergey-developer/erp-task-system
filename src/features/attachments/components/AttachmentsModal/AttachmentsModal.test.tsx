import { screen, within } from '@testing-library/react'
import { testUtils as attachmentImagesTestUtils } from 'features/attachments/components/AttachmentImages/AttachmentImages.test'

import attachmentsFixtures from '_tests_/fixtures/api/data/attachments'
import { fakeWord, render, spinnerTestUtils } from '_tests_/helpers'

import AttachmentsModal, { AttachmentsModalProps } from './index'

const props: AttachmentsModalProps = {
  open: true,
  title: fakeWord(),
  data: attachmentsFixtures.attachments(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('attachments-modal')
const findContainer = () => screen.findByTestId('attachments-modal')

export const testUtils = {
  getContainer,
  findContainer,

  expectLoadingFinished: spinnerTestUtils.expectLoadingFinished('attachments-modal-loading'),
}

describe('Модалка списка вложений', () => {
  test('Отображается корректно', () => {
    render(<AttachmentsModal {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText(props.title as string)

    expect(title).toBeInTheDocument()
    props.data.forEach((item) => {
      const image = attachmentImagesTestUtils.getImageIn(container, item.name)
      expect(image).toBeInTheDocument()
    })
  })
})
