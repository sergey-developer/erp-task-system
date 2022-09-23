import { render, waitFor } from '_tests_/utils'
import { screen } from '@testing-library/react'
import { Keys } from 'shared/interfaces/utils'

import AdditionalInfo, { AdditionalInfoProps } from '../index'
import {
  getAdditionalInfoContent,
  queryAdditionalInfoContent,
  userClickExpandButton,
} from './utils'

const onExpand = jest.fn()

const baseProps: Pick<AdditionalInfoProps, 'expanded' | 'onExpand'> = {
  expanded: false,
  onExpand,
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

const getNotRequiredProps = (): Omit<
  AdditionalInfoProps,
  Keys<typeof baseProps> | Keys<typeof requiredProps>
> => ({
  email: 'email',
  sapId: 'sapId',
  weight: 1,
  company: 'company',
  address: 'address',
  contactType: 'contactType',
  supportGroup: 'supportGroup',
})

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
      onExpand.mockReset()
    })

    test('callback "onExpand" вызывается', async () => {
      const { user } = render(
        <AdditionalInfo {...baseProps} {...requiredProps} />,
      )

      await userClickExpandButton(user)

      await waitFor(() => {
        expect(onExpand).toBeCalledTimes(1)
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
    test('Отображаются если их передать', () => {
      const notRequiredProps = getNotRequiredProps()

      render(
        <AdditionalInfo
          {...baseProps}
          {...requiredProps}
          {...notRequiredProps}
          expanded
        />,
      )

      Object.values(notRequiredProps).forEach((prop) => {
        expect(screen.getByText(prop)).toBeInTheDocument()
      })
    })

    test('Если не передать поле "Адрес", вместо него отображается текст "Отсутствует"', () => {
      const notRequiredProps = getNotRequiredProps()
      delete notRequiredProps.address

      render(<AdditionalInfo {...baseProps} {...requiredProps} expanded />)

      expect(screen.getByText('Отсутствует')).toBeInTheDocument()
    })
  })
})
