import { testUtils as attachmentsTestUtils } from 'modules/attachment/components/Attachments/Attachments.test'

import { props } from '_tests_/features/tasks/TaskDetails/Tabs/DescriptionTab/constants'
import { descriptionTabTestUtils } from '_tests_/features/tasks/TaskDetails/Tabs/DescriptionTab/testUtils'
import { render } from '_tests_/utils'

import DescriptionTab from './index'

describe('Вкладка описания заявки', () => {
  test('Заголовок отображается', () => {
    render(<DescriptionTab {...props} />)
    const title = descriptionTabTestUtils.getChildByText(props.title)
    expect(title).toBeInTheDocument()
  })

  test('Кнопка копирования отображается корректно', async () => {
    render(<DescriptionTab {...props} />)

    const copyButton = descriptionTabTestUtils.getCopyButton()

    expect(copyButton).toBeInTheDocument()
    expect(copyButton).toBeEnabled()
  })

  describe('Описание', () => {
    test('Отображается если есть', () => {
      render(<DescriptionTab {...props} />)
      const description = descriptionTabTestUtils.getChildByText(props.description!)
      expect(description).toBeInTheDocument()
    })

    test('Не отображается если его нет', () => {
      render(<DescriptionTab {...props} description={null} />)
      const description = descriptionTabTestUtils.queryChildByText(props.description!)
      expect(description).not.toBeInTheDocument()
    })
  })

  describe('Вложения', () => {
    test('Отображаются если есть', () => {
      render(<DescriptionTab {...props} />)
      const attachmentList = attachmentsTestUtils.getContainer()
      expect(attachmentList).toBeInTheDocument()
    })

    test('Не отображаются если их нет', () => {
      render(<DescriptionTab {...props} attachments={[]} />)
      const attachmentList = attachmentsTestUtils.queryContainer()
      expect(attachmentList).not.toBeInTheDocument()
    })
  })
})
