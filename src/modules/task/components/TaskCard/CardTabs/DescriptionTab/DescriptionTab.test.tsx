import { screen, within } from '@testing-library/react'

import { testUtils as attachmentListTestUtils } from 'modules/task/components/AttachmentList/AttachmentList.test'

import taskFixtures from 'fixtures/task'

import { fakeWord, render } from '_tests_/utils'

import DescriptionTab, { DescriptionTabProps } from './index'

const props: Readonly<DescriptionTabProps> = {
  title: fakeWord(),
  description: fakeWord(),
  attachments: [taskFixtures.attachment()],
}

const getContainer = () => screen.getByTestId('task-description-tab')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const queryChildByText = (text: string) =>
  within(getContainer()).queryByText(text)

export const testUtils = {
  getContainer,
  getChildByText,
  queryChildByText,
}

describe('Вкладка описания заявки', () => {
  test('Заголовок отображается', () => {
    render(<DescriptionTab {...props} />)
    const title = testUtils.getChildByText(props.title)
    expect(title).toBeInTheDocument()
  })

  describe('Описание', () => {
    test('Отображается если есть', () => {
      render(<DescriptionTab {...props} />)
      const description = testUtils.getChildByText(props.description!)
      expect(description).toBeInTheDocument()
    })

    test('Не отображается если его нет', () => {
      render(<DescriptionTab {...props} description={null} />)
      const description = testUtils.queryChildByText(props.description!)
      expect(description).not.toBeInTheDocument()
    })
  })

  describe('Вложения', () => {
    test('Отображаются если есть', () => {
      render(<DescriptionTab {...props} />)
      const attachmentList = attachmentListTestUtils.getContainer()
      expect(attachmentList).toBeInTheDocument()
    })

    test('Не отображаются если их нет', () => {
      render(<DescriptionTab {...props} attachments={[]} />)
      const attachmentList = attachmentListTestUtils.queryContainer()
      expect(attachmentList).not.toBeInTheDocument()
    })
  })
})
