import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { TaskStatusEnum } from 'modules/task/constants/task'

import taskFixtures from '_tests_/fixtures/task'
import {
  buttonTestUtils,
  fakeAddress,
  fakeEmail,
  fakeWord,
  iconTestUtils,
  render,
} from '_tests_/utils'

import AdditionalInfo, { AdditionalInfoProps } from './index'

const props: Readonly<
  AdditionalInfoProps & {
    onExpand: jest.MockedFn<AdditionalInfoProps['onExpand']>
  }
> = {
  permissions: {},
  expanded: true,
  onExpand: jest.fn(),
  severity: fakeWord(),
  priority: fakeWord(),
  impact: fakeWord(),
  productClassifier1: fakeWord(),
  productClassifier2: fakeWord(),
  productClassifier3: fakeWord(),
  status: TaskStatusEnum.New,
  workGroup: taskFixtures.workGroup(),
  address: null,
  longitude: null,
  latitude: null,
  weight: null,
  email: null,
  sapId: null,
  company: null,
  contactType: null,
  workType: null,
  supportGroup: undefined,
  toggleEditWorkType: jest.fn(),
  onSaveWorkType: jest.fn(),
  saveWorkTypeIsLoading: false,
  workTypes: [],
  workTypesIsLoading: false,
}

const getContainer = () => screen.getByTestId('task-details-additional-info')
const queryContainer = () => screen.queryByTestId('task-details-additional-info')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

const getAdditionalInfoContent = () => within(getContainer()).getByTestId('additional-info-content')

const queryAdditionalInfoContent = () =>
  within(getContainer()).queryByTestId('additional-info-content')

const getExpandButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /дополнительная информация/i)

const clickExpandButton = async (user: UserEvent) => {
  const button = getExpandButton()
  await user.click(button)
  return button
}

const getAddress = () => within(getAdditionalInfoContent()).getByTestId('additional-info-address')

const getAddressIcon = () => iconTestUtils.getIconByNameIn(getAddress(), 'environment')

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
      render(<AdditionalInfo {...props} />)
      expect(testUtils.getAdditionalInfoContent()).toBeInTheDocument()
    })

    test('Скрыт', () => {
      render(<AdditionalInfo {...props} expanded={false} />)
      expect(testUtils.queryAdditionalInfoContent()).not.toBeInTheDocument()
    })
  })

  describe('Если нажать кнопку "Дополнительная информация"', () => {
    afterEach(() => {
      props.onExpand.mockReset()
    })

    test('callback "onExpand" вызывается', async () => {
      const { user } = render(<AdditionalInfo {...props} />)

      await testUtils.clickExpandButton(user)

      await waitFor(() => {
        expect(props.onExpand).toBeCalledTimes(1)
      })
    })
  })

  test('Обязательные поля отображаются', () => {
    render(<AdditionalInfo {...props} />)

    expect(testUtils.getChildByText(props.priority)).toBeInTheDocument()
    expect(testUtils.getChildByText(props.severity)).toBeInTheDocument()
    expect(testUtils.getChildByText(props.impact)).toBeInTheDocument()
    expect(testUtils.getChildByText(props.productClassifier1)).toBeInTheDocument()
    expect(testUtils.getChildByText(props.productClassifier2)).toBeInTheDocument()
    expect(testUtils.getChildByText(props.productClassifier3)).toBeInTheDocument()
  })

  test('Группа поддержки отображается если присутствует', () => {
    const supportGroup = fakeWord()
    render(<AdditionalInfo {...props} supportGroup={supportGroup} />)

    expect(testUtils.getChildByText('Наименование группы поддержки Х5')).toBeInTheDocument()

    expect(testUtils.getChildByText(supportGroup)).toBeInTheDocument()
  })

  describe('Блок "Приоритет заявки"', () => {
    test('Заголовок отображается', () => {
      render(<AdditionalInfo {...props} />)
      expect(testUtils.getChildByText('Приоритет заявки')).toBeInTheDocument()
    })

    test('Вес отображается если присутствует', () => {
      const weight = 1
      render(<AdditionalInfo {...props} weight={weight} />)

      expect(testUtils.getChildByText('Вес:')).toBeInTheDocument()
      expect(testUtils.getChildByText(String(weight))).toBeInTheDocument()
    })
  })

  test('Email отображается если присутствует', () => {
    const email = fakeEmail()
    render(<AdditionalInfo {...props} email={email} />)

    expect(testUtils.getChildByText('Email')).toBeInTheDocument()
    expect(testUtils.getChildByText(email)).toBeInTheDocument()
  })

  test('SAP ID отображается если присутствует', () => {
    const sapId = fakeWord()
    render(<AdditionalInfo {...props} sapId={sapId} />)

    expect(testUtils.getChildByText('SAP ID')).toBeInTheDocument()
    expect(testUtils.getChildByText(sapId)).toBeInTheDocument()
  })

  test('Компания отображается если присутствует', () => {
    const company = fakeWord()
    render(<AdditionalInfo {...props} company={company} />)

    expect(testUtils.getChildByText('Компания')).toBeInTheDocument()
    expect(testUtils.getChildByText(company)).toBeInTheDocument()
  })

  test('Формат магазина отображается если присутствует', () => {
    const contactType = fakeWord()
    render(<AdditionalInfo {...props} contactType={contactType} />)

    expect(testUtils.getChildByText('Формат магазина')).toBeInTheDocument()
    expect(testUtils.getChildByText(contactType)).toBeInTheDocument()
  })

  describe('Поле "Адрес"', () => {
    describe('Если присутствует', () => {
      test('Является корректной ссылкой', () => {
        const addressValue = fakeAddress()
        render(<AdditionalInfo {...props} address={addressValue} />)

        const address = testUtils.getAddress()

        const link = within(address).getByRole('link', {
          name: addressValue,
        })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href')
        expect(link).toHaveAttribute('target', '_blank')
      })

      test('Иконка отображается', () => {
        render(<AdditionalInfo {...props} address={fakeAddress()} />)

        const icon = testUtils.getAddressIcon()
        expect(icon).toBeInTheDocument()
      })
    })

    describe('Если отсутствует', () => {
      test('Вместо него отображается соответствующий текст', () => {
        render(<AdditionalInfo {...props} />)

        const address = testUtils.getAddress()
        expect(within(address).getByText('Не определено')).toBeInTheDocument()
      })

      test('Не является ссылкой', () => {
        render(<AdditionalInfo {...props} />)

        const address = testUtils.getAddress()

        const link = within(address).queryByRole('link', {
          name: 'Не определено',
        })

        expect(link).not.toBeInTheDocument()
      })

      test('Иконка отображается', () => {
        render(<AdditionalInfo {...props} />)
        expect(testUtils.getAddressIcon()).toBeInTheDocument()
      })
    })
  })
})
