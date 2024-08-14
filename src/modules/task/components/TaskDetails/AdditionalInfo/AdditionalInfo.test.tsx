import { screen, waitFor, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import pick from 'lodash/pick'

import { TaskStatusEnum } from 'modules/task/constants/task'

import taskFixtures from '_tests_/fixtures/task'
import {
  buttonTestUtils,
  fakeAddress,
  fakeEmail,
  fakeLatitude,
  fakeLongitude,
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

  parentTask: pick(taskFixtures.task(), 'id', 'recordId'),
  openParentTask: jest.fn(),

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
const queryChildByText = (text: string) => within(getContainer()).queryByText(text)

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
const queryAddress = () =>
  within(getAdditionalInfoContent()).queryByTestId('additional-info-address')
const getAddressIcon = () => iconTestUtils.getIconByNameIn(getAddress(), 'environment')

export const testUtils = {
  getContainer,
  queryContainer,
  getChildByText,
  queryChildByText,

  getAdditionalInfoContent,
  queryAdditionalInfoContent,

  getExpandButton,
  clickExpandButton,

  getAddress,
  queryAddress,
  getAddressIcon,
}

afterEach(() => {
  props.onExpand.mockReset()
})

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

  test('При клике на кнопку "Дополнительная информация" вызывается обработчик', async () => {
    const { user } = render(<AdditionalInfo {...props} />)

    await testUtils.clickExpandButton(user)

    await waitFor(() => {
      expect(props.onExpand).toBeCalledTimes(1)
    })
  })

  describe('Родительская заявка', () => {
    test('Отображается если есть', () => {
      render(<AdditionalInfo {...props} />)
      const label = testUtils.getChildByText('Родительская заявка')
      const button = buttonTestUtils.getButtonIn(getContainer(), props.parentTask!.recordId)
      expect(label).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<AdditionalInfo {...props} />)
      const button = buttonTestUtils.getButtonIn(getContainer(), props.parentTask!.recordId)
      await user.click(button)
      expect(props.openParentTask).toBeCalledTimes(1)
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} parentTask={null} />)
      expect(testUtils.queryChildByText('Родительская заявка')).not.toBeInTheDocument()
    })
  })

  describe('Группа поддержки', () => {
    test('Отображается если есть', () => {
      const supportGroup = fakeWord()
      render(<AdditionalInfo {...props} supportGroup={supportGroup} />)
      expect(testUtils.getChildByText('Наименование группы поддержки Х5')).toBeInTheDocument()
      expect(testUtils.getChildByText(supportGroup)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} supportGroup={undefined} />)
      expect(testUtils.queryChildByText('Наименование группы поддержки Х5')).not.toBeInTheDocument()
    })
  })

  describe('Категория заявки', () => {
    test('Уровень 1 отображается если есть', () => {
      const productClassifier1 = fakeWord()
      render(<AdditionalInfo {...props} productClassifier1={productClassifier1} />)
      expect(testUtils.getChildByText('Категория заявки')).toBeInTheDocument()
      expect(testUtils.getChildByText('Уровень 1')).toBeInTheDocument()
      expect(testUtils.getChildByText(productClassifier1)).toBeInTheDocument()
    })

    test('Уровень 1 не отображается если нету', () => {
      render(<AdditionalInfo {...props} productClassifier1={null} />)
      expect(testUtils.queryChildByText('Уровень 1')).not.toBeInTheDocument()
    })

    test('Уровень 2 отображается если есть', () => {
      const productClassifier2 = fakeWord()
      render(<AdditionalInfo {...props} productClassifier2={productClassifier2} />)
      expect(testUtils.getChildByText('Категория заявки')).toBeInTheDocument()
      expect(testUtils.getChildByText('Уровень 2')).toBeInTheDocument()
      expect(testUtils.getChildByText(productClassifier2)).toBeInTheDocument()
    })

    test('Уровень 2 не отображается если нету', () => {
      render(<AdditionalInfo {...props} productClassifier2={null} />)
      expect(testUtils.queryChildByText('Уровень 2')).not.toBeInTheDocument()
    })

    test('Уровень 3 отображается если есть', () => {
      const productClassifier3 = fakeWord()
      render(<AdditionalInfo {...props} productClassifier3={productClassifier3} />)
      expect(testUtils.getChildByText('Категория заявки')).toBeInTheDocument()
      expect(testUtils.getChildByText('Уровень 3')).toBeInTheDocument()
      expect(testUtils.getChildByText(productClassifier3)).toBeInTheDocument()
    })

    test('Уровень 3 не отображается если нету', () => {
      render(<AdditionalInfo {...props} productClassifier3={null} />)
      expect(testUtils.queryChildByText('Уровень 3')).not.toBeInTheDocument()
    })
  })

  describe('Приоритет заявки', () => {
    test('Отображается если есть', () => {
      const weight = 1
      render(<AdditionalInfo {...props} weight={weight} />)
      expect(testUtils.getChildByText('Приоритет заявки')).toBeInTheDocument()
      expect(testUtils.getChildByText('Вес:')).toBeInTheDocument()
      expect(testUtils.getChildByText(String(weight))).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} weight={null} />)
      expect(testUtils.queryChildByText('Приоритет заявки')).not.toBeInTheDocument()
      expect(testUtils.queryChildByText('Вес:')).not.toBeInTheDocument()
    })
  })

  describe('Влияние', () => {
    test('Отображается если есть', () => {
      const impact = fakeWord()
      render(<AdditionalInfo {...props} impact={impact} />)
      expect(testUtils.getChildByText('Влияние')).toBeInTheDocument()
      expect(testUtils.getChildByText(impact)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} impact={undefined} />)
      expect(testUtils.queryChildByText('Влияние')).not.toBeInTheDocument()
    })
  })

  describe('Срочность', () => {
    test('Отображается если есть', () => {
      const severity = fakeWord()
      render(<AdditionalInfo {...props} severity={severity} />)
      expect(testUtils.getChildByText('Срочность')).toBeInTheDocument()
      expect(testUtils.getChildByText(severity)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} severity={undefined} />)
      expect(testUtils.queryChildByText('Срочность')).not.toBeInTheDocument()
    })
  })

  describe('Приоритет', () => {
    test('Отображается если есть', () => {
      const priority = fakeWord()
      render(<AdditionalInfo {...props} priority={priority} />)
      expect(testUtils.getChildByText('Приоритет')).toBeInTheDocument()
      expect(testUtils.getChildByText(priority)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} priority={undefined} />)
      expect(testUtils.queryChildByText('Приоритет')).not.toBeInTheDocument()
    })
  })

  describe('Email', () => {
    test('Отображается если есть', () => {
      const email = fakeEmail()
      render(<AdditionalInfo {...props} email={email} />)
      expect(testUtils.getChildByText('Email')).toBeInTheDocument()
      expect(testUtils.getChildByText(email)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} email={null} />)
      expect(testUtils.queryChildByText('Email')).not.toBeInTheDocument()
    })
  })

  describe('SAP ID', () => {
    test('Отображается если есть', () => {
      const sapId = fakeWord()
      render(<AdditionalInfo {...props} sapId={sapId} />)
      expect(testUtils.getChildByText('SAP ID')).toBeInTheDocument()
      expect(testUtils.getChildByText(sapId)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} sapId={null} />)
      expect(testUtils.queryChildByText('SAP ID')).not.toBeInTheDocument()
    })
  })

  describe('Компания', () => {
    test('Отображается если есть родительская заявка', () => {
      const company = fakeWord()
      render(<AdditionalInfo {...props} company={company} />)
      expect(testUtils.getChildByText('Компания')).toBeInTheDocument()
      expect(testUtils.getChildByText(company)).toBeInTheDocument()
    })

    test('Не отображается если нет родительской заявки', () => {
      const company = fakeWord()
      render(<AdditionalInfo {...props} company={company} parentTask={null} />)
      expect(testUtils.queryChildByText('Компания')).not.toBeInTheDocument()
      expect(testUtils.queryChildByText(company)).not.toBeInTheDocument()
    })
  })

  describe('Формат магазина', () => {
    test('Отображается если есть', () => {
      const contactType = fakeWord()
      render(<AdditionalInfo {...props} contactType={contactType} />)
      expect(testUtils.getChildByText('Формат магазина')).toBeInTheDocument()
      expect(testUtils.getChildByText(contactType)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} contactType={null} />)
      expect(testUtils.queryChildByText('Формат магазина')).not.toBeInTheDocument()
    })
  })

  describe('Поле "Адрес"', () => {
    test('Отображается если есть', () => {
      const addressValue = fakeAddress()
      render(
        <AdditionalInfo
          {...props}
          address={addressValue}
          latitude={String(fakeLatitude())}
          longitude={String(fakeLongitude())}
        />,
      )

      const address = testUtils.getAddress()
      const icon = testUtils.getAddressIcon()
      const link = within(address).getByRole('link', {
        name: addressValue,
      })

      expect(icon).toBeInTheDocument()
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href')
      expect(link).toHaveAttribute('target', '_blank')
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} address={null} />)
      expect(testUtils.queryAddress()).not.toBeInTheDocument()
    })
  })
})
