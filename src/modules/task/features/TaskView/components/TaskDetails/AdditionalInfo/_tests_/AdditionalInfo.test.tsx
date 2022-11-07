import { render } from '_tests_/utils'
import { screen, waitFor, within } from '@testing-library/react'

import AdditionalInfo from '../index'
import { baseProps, notRequiredProps, requiredProps } from './constants'
import {
  getAdditionalInfoContent,
  getAddress,
  getAddressIcon,
  queryAdditionalInfoContent,
  userClickExpandButton,
} from './utils'

describe('Блок дополнительной информации', () => {
  describe('Может быть по умолчанию', () => {
    test('Открыт', () => {
      render(<AdditionalInfo {...baseProps} {...requiredProps} expanded />)

      const additionalInfoContent = getAdditionalInfoContent()
      expect(additionalInfoContent).toBeInTheDocument()
    })

    test('Скрыт', () => {
      render(<AdditionalInfo {...baseProps} {...requiredProps} />)

      const additionalInfoContent = queryAdditionalInfoContent()
      expect(additionalInfoContent).not.toBeInTheDocument()
    })
  })

  describe('Если нажать кнопку "Дополнительная информация"', () => {
    afterEach(() => {
      baseProps.onExpand.mockReset()
    })

    test('callback "onExpand" вызывается', async () => {
      const { user } = render(
        <AdditionalInfo {...baseProps} {...requiredProps} />,
      )

      await userClickExpandButton(user)

      await waitFor(() => {
        expect(baseProps.onExpand).toBeCalledTimes(1)
      })
    })
  })

  test('Обязательные поля отображаются', () => {
    render(<AdditionalInfo {...baseProps} {...requiredProps} expanded />)

    Object.values(requiredProps).forEach((propValue) => {
      expect(screen.getByText(propValue)).toBeInTheDocument()
    })
  })

  describe('Не обязательные поля', () => {
    test('Отображаются если они присутствуют', () => {
      render(
        <AdditionalInfo
          {...baseProps}
          {...requiredProps}
          {...notRequiredProps}
          expanded
        />,
      )

      Object.values(notRequiredProps).forEach((propValue) => {
        expect(screen.getByText(propValue)).toBeInTheDocument()
      })
    })

    describe('Поле "Адрес"', () => {
      describe('Если присутствует', () => {
        test('Является корректной ссылкой', () => {
          render(
            <AdditionalInfo
              {...baseProps}
              {...requiredProps}
              expanded
              address={notRequiredProps.address}
            />,
          )

          const address = getAddress()

          const link = within(address).getByRole('link', {
            name: notRequiredProps.address,
          })

          expect(link).toBeInTheDocument()
          expect(link).toHaveAttribute('href')
          expect(link).toHaveAttribute('target', '_blank')
        })

        test('Иконка отображается', () => {
          render(
            <AdditionalInfo
              {...baseProps}
              {...requiredProps}
              expanded
              address={notRequiredProps.address}
            />,
          )

          const icon = getAddressIcon(getAddress())
          expect(icon).toBeInTheDocument()
        })
      })

      describe('Если отсутствует', () => {
        test('Вместо него отображается текст "Отсутствует"', () => {
          render(<AdditionalInfo {...baseProps} {...requiredProps} expanded />)

          const address = getAddress()
          expect(within(address).getByText('Отсутствует')).toBeInTheDocument()
        })

        test('Не является ссылкой', () => {
          render(<AdditionalInfo {...baseProps} {...requiredProps} expanded />)

          const address = getAddress()

          const link = within(address).queryByRole('link', {
            name: 'Отсутствует',
          })

          expect(link).not.toBeInTheDocument()
        })

        test('Иконка отображается', () => {
          render(<AdditionalInfo {...baseProps} {...requiredProps} expanded />)

          const icon = getAddressIcon(getAddress())
          expect(icon).toBeInTheDocument()
        })
      })
    })
  })
})
