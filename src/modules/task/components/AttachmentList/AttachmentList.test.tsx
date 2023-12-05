import { screen, within } from '@testing-library/react'

import { prettyBytes } from 'shared/utils/file'

import taskFixtures from '_tests_/fixtures/task'
import { render } from '_tests_/utils'

import AttachmentList, { AttachmentListProps } from './index'

const props: Readonly<AttachmentListProps> = {
  data: [taskFixtures.attachment()],
}

const getContainer = () => screen.getByTestId('attachment-list')

const getContainerIn = (container: HTMLElement) => within(container).getByTestId('attachment-list')

const queryContainer = () => screen.queryByTestId('attachment-list')

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

    const attachmentSize = testUtils.getChildByText(new RegExp(prettyBytes(fakeAttachment.size)))
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
