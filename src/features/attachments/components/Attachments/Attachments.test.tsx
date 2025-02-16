import { screen, within } from '@testing-library/react'

import { prettyBytes } from 'shared/utils/file'

import taskFixtures from '_tests_/fixtures/tasks'
import {
  fakeDateString,
  fakeId,
  fakeInteger,
  fakeName,
  fakeUrl,
  fakeWord,
  render,
} from '_tests_/utils'

import AttachmentList from './index'
import { AttachmentsProps } from './types'

const attachmentListItem: AttachmentsProps['data'][number] = {
  id: fakeId(),
  url: fakeUrl(),
  name: fakeWord(),
  size: fakeInteger(),
  createdAt: fakeDateString(),
  firstName: fakeName(),
  lastName: fakeName(),
  middleName: fakeName(),
}

const props: Readonly<AttachmentsProps> = {
  data: [attachmentListItem],
}

const getContainer = () => screen.getByTestId('attachments')
const getContainerIn = (container: HTMLElement) => within(container).getByTestId('attachments')
const queryContainer = () => screen.queryByTestId('attachments')
const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)
const queryChildByText = (text: string | RegExp) => within(getContainer()).queryByText(text)

const getAttachmentContainer = (name: string) =>
  within(getContainer()).getByTestId(`attachment-${name}`)

const getAttachmentLink = (name: string) =>
  within(getAttachmentContainer(name)).getByRole('link', {
    name: new RegExp(name),
  })

export const testUtils = {
  getContainer,
  getContainerIn,
  queryContainer,
  getChildByText,
  queryChildByText,
  getAttachmentContainer,
  getAttachmentLink,
}

describe('Список вложений', () => {
  test('Отображаются корректно если присутствуют', () => {
    render(<AttachmentList {...props} />)

    const fakeAttachment = props.data[0]

    const allAttachmentLinks = props.data.map((att) => testUtils.getAttachmentLink(att.name))
    const attachmentLink = allAttachmentLinks[0]

    const attachmentSize = testUtils.getChildByText(new RegExp(prettyBytes(fakeAttachment.size!)))
    const externalIdText = testUtils.queryChildByText('Не передано в Х5')

    expect(externalIdText).not.toBeInTheDocument()
    expect(attachmentSize).toBeInTheDocument()
    expect(attachmentLink).toBeInTheDocument()
    expect(attachmentLink).toHaveAttribute('download')
    expect(attachmentLink).toHaveAttribute('href', fakeAttachment.url)
    expect(allAttachmentLinks).toHaveLength(props.data.length)
  })

  test('Текст "Не передано в Х5" отображается если у вложения нет externalId', () => {
    render(<AttachmentList {...props} data={[taskFixtures.attachment({ externalId: '' })]} />)

    const externalIdText = testUtils.getChildByText('Не передано в Х5')
    expect(externalIdText).toBeInTheDocument()
  })
})
