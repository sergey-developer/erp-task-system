import { render, waitFor } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { Keys } from 'shared/interfaces/utils'

import AdditionalInfo, { AdditionalInfoProps } from '../index'
import {
  getAdditionalInfoContent,
  getAddress,
  getAddressIcon,
  queryAdditionalInfoContent,
  userClickExpandButton,
} from './utils'

const baseProps: Pick<AdditionalInfoProps, 'expanded'> & {
  onExpand: jest.MockedFn<AdditionalInfoProps['onExpand']>
} = {
  expanded: false,
  onExpand: jest.fn(),
}

const requiredProps: Pick<
  AdditionalInfoProps,
  | 'priority'
  | 'severity'
  | 'impact'
  | 'productClassifier1'
  | 'productClassifier2'
  | 'productClassifier3'
> = {
  severity: 'severity',
  priority: 'priority',
  impact: 'impact',
  productClassifier1: 'productClassifier1',
  productClassifier2: 'productClassifier2',
  productClassifier3: 'productClassifier3',
}

const notRequiredProps: Omit<
  AdditionalInfoProps,
  Keys<typeof baseProps> | Keys<typeof requiredProps>
> = {
  email: 'email',
  sapId: 'sapId',
  weight: 1,
  company: 'company',
  address: 'address',
  contactType: 'contactType',
  supportGroup: 'supportGroup',
}

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
