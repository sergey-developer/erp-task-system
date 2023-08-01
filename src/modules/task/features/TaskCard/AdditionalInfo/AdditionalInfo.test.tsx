import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  fakeAddress,
  fakeEmail,
  fakeWord,
  getButtonIn,
  getIconByNameIn,
  render,
} from '_tests_/utils'

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
    | 'address'
    | 'longitude'
    | 'latitude'
    | 'weight'
    | 'company'
    | 'email'
    | 'sapId'
    | 'contactType'
  > & {
    onExpand: jest.MockedFn<AdditionalInfoProps['onExpand']>
  }
> = {
  expanded: true,
  onExpand: jest.fn(),
  severity: fakeWord(),
  priority: fakeWord(),
  impact: fakeWord(),
  productClassifier1: fakeWord(),
  productClassifier2: fakeWord(),
  productClassifier3: fakeWord(),
  address: null,
  longitude: null,
  latitude: null,
  weight: null,
  email: null,
  sapId: null,
  company: null,
  contactType: null,
}

const getContainer = () => screen.getByTestId('task-card-additional-info')

const queryContainer = () => screen.queryByTestId('task-card-additional-info')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getAdditionalInfoContent = () =>
  within(getContainer()).getByTestId('additional-info-content')

const queryAdditionalInfoContent = () =>
  within(getContainer()).queryByTestId('additional-info-content')

const getExpandButton = () =>
  getButtonIn(getContainer(), /дополнительная информация/i)

const clickExpandButton = async (user: UserEvent) => {
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
  getChildByText,

  getAdditionalInfoContent,
  queryAdditionalInfoContent,

  getExpandButton,
  clickExpandButton,

  getAddress,
  getAddressIcon,
}

describe('Блок дополнительной информации', () => {
  describe('Может быть по умолчанию', () => {
    test('Открыт', () => {
      render(<AdditionalInfo {...requiredProps} />)
      expect(testUtils.getAdditionalInfoContent()).toBeInTheDocument()
    })

    test('Скрыт', () => {
      render(<AdditionalInfo {...requiredProps} expanded={false} />)
      expect(testUtils.queryAdditionalInfoContent()).not.toBeInTheDocument()
    })
  })

  describe('Если нажать кнопку "Дополнительная информация"', () => {
    afterEach(() => {
      requiredProps.onExpand.mockReset()
    })

    test('callback "onExpand" вызывается', async () => {
      const { user } = render(<AdditionalInfo {...requiredProps} />)

      await testUtils.clickExpandButton(user)

      await waitFor(() => {
        expect(requiredProps.onExpand).toBeCalledTimes(1)
      })
    })
  })

  test('Обязательные поля отображаются', () => {
    render(<AdditionalInfo {...requiredProps} />)

    expect(testUtils.getChildByText(requiredProps.priority)).toBeInTheDocument()
    expect(testUtils.getChildByText(requiredProps.severity)).toBeInTheDocument()
    expect(testUtils.getChildByText(requiredProps.impact)).toBeInTheDocument()
    expect(
      testUtils.getChildByText(requiredProps.productClassifier1),
    ).toBeInTheDocument()
    expect(
      testUtils.getChildByText(requiredProps.productClassifier2),
    ).toBeInTheDocument()
    expect(
      testUtils.getChildByText(requiredProps.productClassifier3),
    ).toBeInTheDocument()
  })

  test('Группа поддержки отображается если присутствует', () => {
    const supportGroup = fakeWord()
    render(<AdditionalInfo {...requiredProps} supportGroup={supportGroup} />)

    expect(
      testUtils.getChildByText('Наименование группы поддержки Х5'),
    ).toBeInTheDocument()

    expect(testUtils.getChildByText(supportGroup)).toBeInTheDocument()
  })

  describe('Блок "Приоритет заявки"', () => {
    test('Заголовок отображается', () => {
      render(<AdditionalInfo {...requiredProps} />)
      expect(testUtils.getChildByText('Приоритет заявки')).toBeInTheDocument()
    })

    test('Вес отображается если присутствует', () => {
      const weight = 1
      render(<AdditionalInfo {...requiredProps} weight={weight} />)

      expect(testUtils.getChildByText('Вес:')).toBeInTheDocument()
      expect(testUtils.getChildByText(String(weight))).toBeInTheDocument()
    })
  })

  test('Email отображается если присутствует', () => {
    const email = fakeEmail()
    render(<AdditionalInfo {...requiredProps} email={email} />)

    expect(testUtils.getChildByText('Email')).toBeInTheDocument()
    expect(testUtils.getChildByText(email)).toBeInTheDocument()
  })

  test('SAP ID отображается если присутствует', () => {
    const sapId = fakeWord()
    render(<AdditionalInfo {...requiredProps} sapId={sapId} />)

    expect(testUtils.getChildByText('SAP ID')).toBeInTheDocument()
    expect(testUtils.getChildByText(sapId)).toBeInTheDocument()
  })

  test('Компания отображается если присутствует', () => {
    const company = fakeWord()
    render(<AdditionalInfo {...requiredProps} company={company} />)

    expect(testUtils.getChildByText('Компания')).toBeInTheDocument()
    expect(testUtils.getChildByText(company)).toBeInTheDocument()
  })

  test('Формат магазина отображается если присутствует', () => {
    const contactType = fakeWord()
    render(<AdditionalInfo {...requiredProps} contactType={contactType} />)

    expect(testUtils.getChildByText('Формат магазина')).toBeInTheDocument()
    expect(testUtils.getChildByText(contactType)).toBeInTheDocument()
  })

  describe('Поле "Адрес"', () => {
    describe('Если присутствует', () => {
      test('Является корректной ссылкой', () => {
        const addressValue = fakeAddress()
        render(<AdditionalInfo {...requiredProps} address={addressValue} />)

        const address = testUtils.getAddress()

        const link = within(address).getByRole('link', {
          name: addressValue,
        })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href')
        expect(link).toHaveAttribute('target', '_blank')
      })

      test('Иконка отображается', () => {
        render(<AdditionalInfo {...requiredProps} address={fakeAddress()} />)

        const icon = testUtils.getAddressIcon()
        expect(icon).toBeInTheDocument()
      })
    })

    describe('Если отсутствует', () => {
      test('Вместо него отображается соответствующий текст', () => {
        render(<AdditionalInfo {...requiredProps} />)

        const address = testUtils.getAddress()
        expect(within(address).getByText('Не определено')).toBeInTheDocument()
      })

      test('Не является ссылкой', () => {
        render(<AdditionalInfo {...requiredProps} />)

        const address = testUtils.getAddress()

        const link = within(address).queryByRole('link', {
          name: 'Не определено',
        })

        expect(link).not.toBeInTheDocument()
      })

      test('Иконка отображается', () => {
        render(<AdditionalInfo {...requiredProps} />)
        expect(testUtils.getAddressIcon()).toBeInTheDocument()
      })
    })
  })
})
