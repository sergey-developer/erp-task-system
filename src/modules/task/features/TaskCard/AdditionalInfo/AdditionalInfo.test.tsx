import omit from 'lodash/omit'

import {
  generateEmail,
  generateWord,
  getButtonIn,
  getIconByNameIn,
  render,
} from '_tests_/utils'
import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import AdditionalInfo, { AdditionalInfoProps } from './index'

const requiredProps: Readonly<
  Pick<
    AdditionalInfoProps,
    | 'expanded'
    | 'priority'
    | 'severity'
    | 'impact'
    | 'productClassifier1'
    | 'productClassifier2'
    | 'productClassifier3'
  > & {
    onExpand: jest.MockedFn<AdditionalInfoProps['onExpand']>
  }
> = {
  expanded: false,
  onExpand: jest.fn(),
  severity: generateWord(),
  priority: generateWord(),
  impact: generateWord(),
  productClassifier1: generateWord(),
  productClassifier2: generateWord(),
  productClassifier3: generateWord(),
}

const notRequiredProps: Readonly<
  Omit<AdditionalInfoProps, keyof typeof requiredProps>
> = {
  email: generateEmail(),
  sapId: generateWord(),
  weight: 1,
  company: generateWord(),
  address: generateWord(),
  contactType: generateWord(),
  supportGroup: generateWord(),
}

const getContainer = () => screen.getByTestId('task-card-additional-info')

const queryContainer = () => screen.queryByTestId('task-card-additional-info')

const getAdditionalInfoContent = () =>
  within(getContainer()).getByTestId('additional-info-content')

const queryAdditionalInfoContent = () =>
  within(getContainer()).queryByTestId('additional-info-content')

const getExpandButton = () =>
  getButtonIn(getContainer(), /дополнительная информация/i)

const userClickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getAddress = () =>
  within(getAdditionalInfoContent()).getByTestId('additional-info-address')

const getAddressIcon = () => getIconByNameIn(getAddress(), 'environment')

export const testUtils = {
  getContainer,
  queryContainer,

  getAdditionalInfoContent,
  queryAdditionalInfoContent,

  getExpandButton,
  userClickExpandButton,

  getAddress,
  getAddressIcon,
}

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
