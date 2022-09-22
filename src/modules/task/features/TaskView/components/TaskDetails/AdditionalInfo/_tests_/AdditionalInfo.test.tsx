import { render } from '_tests_/utils'
import { waitFor } from '@testing-library/react'

import AdditionalInfo from '../index'
import {
  getAdditionalInfoContent,
  queryAdditionalInfoContent,
  userClickExpandButton,
} from './utils'

describe('Блок дополнительной информации', () => {
  describe('Информация может быть по умолчанию', () => {
    test('Открыта', () => {
      render(<AdditionalInfo defaultExpanded />)

      const additionalInfoContent = getAdditionalInfoContent()
      expect(additionalInfoContent).toBeInTheDocument()
    })

    test('Скрыта', () => {
      render(<AdditionalInfo defaultExpanded={false} />)

      const additionalInfoContent = queryAdditionalInfoContent()
      expect(additionalInfoContent).not.toBeInTheDocument()
    })
  })

  describe('Если нажать кнопку "Дополнительная информация"', () => {
    test('Информация отображается', async () => {
      const { user } = render(<AdditionalInfo />)

      await userClickExpandButton(user)

      await waitFor(() => {
        const additionalInfoContent = getAdditionalInfoContent()
        expect(additionalInfoContent).toBeInTheDocument()
      })
    })

    test('callback "onExpand" вызывается', async () => {
      const onExpand = jest.fn()
      const defaultExpanded = false

      const { user } = render(
        <AdditionalInfo
          onExpand={onExpand}
          defaultExpanded={defaultExpanded}
        />,
      )

      await userClickExpandButton(user)

      await waitFor(() => {
        expect(onExpand).toBeCalledTimes(1)
      })

      expect(onExpand).toBeCalledWith(!defaultExpanded)
    })
  })

  describe('Если не нажать кнопку "Дополнительная информация"', () => {
    test('Информация не отображается', () => {
      render(<AdditionalInfo />)

      const additionalInfoContent = queryAdditionalInfoContent()
      expect(additionalInfoContent).not.toBeInTheDocument()
    })
  })
})
