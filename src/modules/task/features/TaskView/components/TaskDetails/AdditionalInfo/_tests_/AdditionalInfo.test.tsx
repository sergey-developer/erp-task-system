import { render } from '_tests_/utils'

import { ADDITIONAL_INFO_BUTTON_TEXT } from '../constants'
import AdditionalInfo from '../index'
import {
  getAdditionalInfoContent,
  queryAdditionalInfoContent,
  userClickExpandButton,
} from './utils'

describe('Блок дополнительной информации', () => {
  describe('Не отображается', () => {
    test(`Если не нажать на кнопку "${ADDITIONAL_INFO_BUTTON_TEXT}"`, () => {
      render(<AdditionalInfo />)

      const additionalInfoContent = queryAdditionalInfoContent()
      expect(additionalInfoContent).not.toBeInTheDocument()
    })

    test(`Если нажать на кнопку "${ADDITIONAL_INFO_BUTTON_TEXT}" дважды`, async () => {
      const { user } = render(<AdditionalInfo />)

      await userClickExpandButton(user)
      await userClickExpandButton(user)

      const additionalInfoContent = queryAdditionalInfoContent()
      expect(additionalInfoContent).not.toBeInTheDocument()
    })
  })

  describe('Отображается', () => {
    test(`Если нажать на кнопку "${ADDITIONAL_INFO_BUTTON_TEXT}" один раз`, async () => {
      const { user } = render(<AdditionalInfo />)

      await userClickExpandButton(user)
      const additionalInfoContent = getAdditionalInfoContent()
      expect(additionalInfoContent).toBeInTheDocument()
    })
  })
})
