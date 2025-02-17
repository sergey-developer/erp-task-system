import { screen, within } from '@testing-library/react'

import attachmentsFixtures from '_tests_/fixtures/api/data/attachments'
import { render } from '_tests_/helpers'

import AttachmentImages from './index'
import { AttachmentImagesProps } from './types'

const props: AttachmentImagesProps = {
  data: attachmentsFixtures.attachments(),
}

const getImageIn = (container: HTMLElement, name: string) =>
  within(container).getByRole('img', { name })

export const testUtils = {
  getImageIn,
}

describe('Список вложений', () => {
  test('Отображается корректно', () => {
    render(<AttachmentImages {...props} data-testid='taskAttachment-images' />)

    const container = screen.getByTestId('attachment-images')
    props.data.forEach((item) => {
      const image = testUtils.getImageIn(container, item.name)
      expect(image).toBeInTheDocument()
    })
  })
})
