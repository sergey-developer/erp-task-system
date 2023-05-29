import { screen, within } from '@testing-library/react'

const getContainer = () => screen.getByTestId('attachment-list')
const queryContainer = () => screen.queryByTestId('attachment-list')

const getAttachmentContainer = (name: string) =>
  within(getContainer()).getByTestId(`attachment-${name}`)

const getAttachmentLink = (name: string) =>
  within(getAttachmentContainer(name)).getByRole('link', {
    name: new RegExp(name),
  })

export const testUtils = {
  getContainer,
  queryContainer,
  getAttachmentContainer,
  getAttachmentLink,
}

// todo: написать тесты
test.todo('AttachmentList')
