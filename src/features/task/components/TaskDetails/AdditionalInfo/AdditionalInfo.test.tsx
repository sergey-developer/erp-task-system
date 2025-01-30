import { waitFor, within } from '@testing-library/react'

import { props } from '_tests_/features/tasks/components/TaskDetails/AdditionalInfo/constants'
import { additionalInfoTestUtils } from '_tests_/features/tasks/components/TaskDetails/AdditionalInfo/testUtils'
import {
  buttonTestUtils,
  fakeAddress,
  fakeEmail,
  fakeLatitude,
  fakeLongitude,
  fakeWord,
  render,
} from '_tests_/utils'

import AdditionalInfo from './index'

afterEach(() => {
  props.onExpand.mockReset()
})

describe('Блок дополнительной информации', () => {
  describe('Может быть по умолчанию', () => {
    test('Открыт', () => {
      render(<AdditionalInfo {...props} />)
      expect(additionalInfoTestUtils.getAdditionalInfoContent()).toBeInTheDocument()
    })

    test('Скрыт', () => {
      render(<AdditionalInfo {...props} expanded={false} />)
      expect(additionalInfoTestUtils.queryAdditionalInfoContent()).not.toBeInTheDocument()
    })
  })

  test('При клике на кнопку "Дополнительная информация" вызывается обработчик', async () => {
    const { user } = render(<AdditionalInfo {...props} />)

    await additionalInfoTestUtils.clickExpandButton(user)

    await waitFor(() => {
      expect(props.onExpand).toBeCalledTimes(1)
    })
  })

  describe('Родительская заявка', () => {
    test('Отображается если есть', () => {
      render(<AdditionalInfo {...props} />)
      const label = additionalInfoTestUtils.getChildByText('Родительская заявка')
      const button = buttonTestUtils.getButtonIn(
        additionalInfoTestUtils.getContainer(),
        props.parentTask!.recordId,
      )
      expect(label).toBeInTheDocument()
      expect(button).toBeInTheDocument()
    })

    test('При клике вызывается обработчик', async () => {
      const { user } = render(<AdditionalInfo {...props} />)
      const button = buttonTestUtils.getButtonIn(
        additionalInfoTestUtils.getContainer(),
        props.parentTask!.recordId,
      )
      await user.click(button)
      expect(props.openParentTask).toBeCalledTimes(1)
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} parentTask={null} />)
      expect(
        additionalInfoTestUtils.queryChildByText('Родительская заявка'),
      ).not.toBeInTheDocument()
    })
  })

  describe('Группа поддержки', () => {
    test('Отображается если есть', () => {
      const supportGroup = fakeWord()
      render(<AdditionalInfo {...props} supportGroup={supportGroup} />)
      expect(
        additionalInfoTestUtils.getChildByText('Наименование группы поддержки Х5'),
      ).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(supportGroup)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} supportGroup={undefined} />)
      expect(
        additionalInfoTestUtils.queryChildByText('Наименование группы поддержки Х5'),
      ).not.toBeInTheDocument()
    })
  })

  describe('Категория заявки', () => {
    test('Уровень 1 отображается если есть', () => {
      const productClassifier1 = fakeWord()
      render(<AdditionalInfo {...props} productClassifier1={productClassifier1} />)
      expect(additionalInfoTestUtils.getChildByText('Категория заявки')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText('Уровень 1')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(productClassifier1)).toBeInTheDocument()
    })

    test('Уровень 1 не отображается если нету', () => {
      render(<AdditionalInfo {...props} productClassifier1={null} />)
      expect(additionalInfoTestUtils.queryChildByText('Уровень 1')).not.toBeInTheDocument()
    })

    test('Уровень 2 отображается если есть', () => {
      const productClassifier2 = fakeWord()
      render(<AdditionalInfo {...props} productClassifier2={productClassifier2} />)
      expect(additionalInfoTestUtils.getChildByText('Категория заявки')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText('Уровень 2')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(productClassifier2)).toBeInTheDocument()
    })

    test('Уровень 2 не отображается если нету', () => {
      render(<AdditionalInfo {...props} productClassifier2={null} />)
      expect(additionalInfoTestUtils.queryChildByText('Уровень 2')).not.toBeInTheDocument()
    })

    test('Уровень 3 отображается если есть', () => {
      const productClassifier3 = fakeWord()
      render(<AdditionalInfo {...props} productClassifier3={productClassifier3} />)
      expect(additionalInfoTestUtils.getChildByText('Категория заявки')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText('Уровень 3')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(productClassifier3)).toBeInTheDocument()
    })

    test('Уровень 3 не отображается если нету', () => {
      render(<AdditionalInfo {...props} productClassifier3={null} />)
      expect(additionalInfoTestUtils.queryChildByText('Уровень 3')).not.toBeInTheDocument()
    })
  })

  describe('Приоритет заявки', () => {
    test('Отображается если есть', () => {
      const weight = 1
      render(<AdditionalInfo {...props} weight={weight} />)
      expect(additionalInfoTestUtils.getChildByText('Приоритет заявки')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText('Вес:')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(String(weight))).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} weight={null} />)
      expect(additionalInfoTestUtils.queryChildByText('Приоритет заявки')).not.toBeInTheDocument()
      expect(additionalInfoTestUtils.queryChildByText('Вес:')).not.toBeInTheDocument()
    })
  })

  describe('Влияние', () => {
    test('Отображается если есть', () => {
      const impact = fakeWord()
      render(<AdditionalInfo {...props} impact={impact} />)
      expect(additionalInfoTestUtils.getChildByText('Влияние')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(impact)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} impact={undefined} />)
      expect(additionalInfoTestUtils.queryChildByText('Влияние')).not.toBeInTheDocument()
    })
  })

  describe('Срочность', () => {
    test('Отображается если есть', () => {
      const severity = fakeWord()
      render(<AdditionalInfo {...props} severity={severity} />)
      expect(additionalInfoTestUtils.getChildByText('Срочность')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(severity)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} severity={undefined} />)
      expect(additionalInfoTestUtils.queryChildByText('Срочность')).not.toBeInTheDocument()
    })
  })

  describe('Приоритет', () => {
    test('Отображается если есть', () => {
      const priority = fakeWord()
      render(<AdditionalInfo {...props} priority={priority} />)
      expect(additionalInfoTestUtils.getChildByText('Приоритет')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(priority)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} priority={undefined} />)
      expect(additionalInfoTestUtils.queryChildByText('Приоритет')).not.toBeInTheDocument()
    })
  })

  describe('Email', () => {
    test('Отображается если есть', () => {
      const email = fakeEmail()
      render(<AdditionalInfo {...props} email={email} />)
      expect(additionalInfoTestUtils.getChildByText('Email')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(email)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} email={null} />)
      expect(additionalInfoTestUtils.queryChildByText('Email')).not.toBeInTheDocument()
    })
  })

  describe('SAP ID', () => {
    test('Отображается если есть', () => {
      const sapId = fakeWord()
      render(<AdditionalInfo {...props} sapId={sapId} />)
      expect(additionalInfoTestUtils.getChildByText('SAP ID')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(sapId)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} sapId={null} />)
      expect(additionalInfoTestUtils.queryChildByText('SAP ID')).not.toBeInTheDocument()
    })
  })

  describe('Компания', () => {
    test('Отображается если есть родительская заявка', () => {
      const company = fakeWord()
      render(<AdditionalInfo {...props} company={company} />)
      expect(additionalInfoTestUtils.getChildByText('Компания')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(company)).toBeInTheDocument()
    })

    test('Не отображается если нет родительской заявки', () => {
      const company = fakeWord()
      render(<AdditionalInfo {...props} company={company} parentTask={null} />)
      expect(additionalInfoTestUtils.queryChildByText('Компания')).not.toBeInTheDocument()
      expect(additionalInfoTestUtils.queryChildByText(company)).not.toBeInTheDocument()
    })
  })

  describe('Формат магазина', () => {
    test('Отображается если есть', () => {
      const contactType = fakeWord()
      render(<AdditionalInfo {...props} contactType={contactType} />)
      expect(additionalInfoTestUtils.getChildByText('Формат магазина')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(contactType)).toBeInTheDocument()
    })

    test('Не отображается если нету', () => {
      render(<AdditionalInfo {...props} contactType={null} />)
      expect(additionalInfoTestUtils.queryChildByText('Формат магазина')).not.toBeInTheDocument()
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

      const address = additionalInfoTestUtils.getAddress()
      const icon = additionalInfoTestUtils.getAddressIcon()
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
      expect(additionalInfoTestUtils.queryAddress()).not.toBeInTheDocument()
    })
  })
})
