import omit from 'lodash/omit'

import { render } from '_tests_/utils'
import { screen, waitFor, within } from '@testing-library/react'

import AdditionalInfo from '../index'
import { notRequiredProps, requiredProps } from './constants'
import testUtils from './utils'

describe('Блок дополнительной информации', () => {
  describe('Может быть по умолчанию', () => {
    test('Открыт', () => {
      render(<AdditionalInfo {...requiredProps} expanded />)
      expect(testUtils.getAdditionalInfoContent()).toBeInTheDocument()
    })

    test('Скрыт', () => {
      render(<AdditionalInfo {...requiredProps} />)
      expect(testUtils.queryAdditionalInfoContent()).not.toBeInTheDocument()
    })
  })

  describe('Если нажать кнопку "Дополнительная информация"', () => {
    afterEach(() => {
      requiredProps.onExpand.mockReset()
    })

    test('callback "onExpand" вызывается', async () => {
      const { user } = render(<AdditionalInfo {...requiredProps} />)

      await testUtils.userClickExpandButton(user)

      await waitFor(() => {
        expect(requiredProps.onExpand).toBeCalledTimes(1)
      })
    })
  })

  test('Обязательные поля отображаются', () => {
    render(<AdditionalInfo {...requiredProps} expanded />)

    Object.values(omit(requiredProps, ['expanded', 'onExpand'])).forEach(
      (propValue) => {
        expect(screen.getByText(propValue)).toBeInTheDocument()
      },
    )
  })

  describe('Не обязательные поля', () => {
    test('Отображаются если они присутствуют', () => {
      render(
        <AdditionalInfo {...requiredProps} {...notRequiredProps} expanded />,
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
              {...requiredProps}
              expanded
              address={notRequiredProps.address}
            />,
          )

          const address = testUtils.getAddress()

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
              {...requiredProps}
              expanded
              address={notRequiredProps.address}
            />,
          )

          const icon = testUtils.getAddressIcon()
          expect(icon).toBeInTheDocument()
        })
      })

      describe('Если отсутствует', () => {
        test('Вместо него отображается текст "Отсутствует"', () => {
          render(<AdditionalInfo {...requiredProps} expanded />)

          const address = testUtils.getAddress()
          expect(within(address).getByText('Отсутствует')).toBeInTheDocument()
        })

        test('Не является ссылкой', () => {
          render(<AdditionalInfo {...requiredProps} expanded />)

          const address = testUtils.getAddress()

          const link = within(address).queryByRole('link', {
            name: 'Отсутствует',
          })

          expect(link).not.toBeInTheDocument()
        })

        test('Иконка отображается', () => {
          render(<AdditionalInfo {...requiredProps} expanded />)
          expect(testUtils.getAddressIcon()).toBeInTheDocument()
        })
      })
    })
  })
})
