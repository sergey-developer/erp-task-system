import { render, waitFor } from '_tests_/utils'

import AdditionalInfo from '../index'
import {
  getAdditionalInfoContent,
  queryAdditionalInfoContent,
  userClickExpandButton,
} from './utils'

const onExpand = jest.fn()

describe('Блок дополнительной информации', () => {
  describe('Может быть по умолчанию', () => {
    test('Открыт', () => {
      render(<AdditionalInfo expanded onExpand={onExpand} />)

      const additionalInfoContent = getAdditionalInfoContent()
      expect(additionalInfoContent).toBeInTheDocument()
    })

    test('Скрыт', () => {
      render(<AdditionalInfo expanded={false} onExpand={onExpand} />)

      const additionalInfoContent = queryAdditionalInfoContent()
      expect(additionalInfoContent).not.toBeInTheDocument()
    })
  })

  describe('Если нажать кнопку "Дополнительная информация"', () => {
    afterEach(() => {
      onExpand.mockReset()
    })

    test('callback "onExpand" вызывается', async () => {
      const { user } = render(
        <AdditionalInfo expanded={false} onExpand={onExpand} />,
      )

      await userClickExpandButton(user)

      await waitFor(() => {
        expect(onExpand).toBeCalledTimes(1)
      })
    })
  })
})
