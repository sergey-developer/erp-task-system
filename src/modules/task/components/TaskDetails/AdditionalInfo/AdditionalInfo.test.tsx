import { waitFor, within } from '@testing-library/react'

import { props } from '_tests_/features/tasks/TaskDetails/AdditionalInfo/constants'
import { additionalInfoTestUtils } from '_tests_/features/tasks/TaskDetails/AdditionalInfo/testUtils'
import { fakeAddress, fakeEmail, fakeWord, render } from '_tests_/utils'

import AdditionalInfo from './index'

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

  describe('Если нажать кнопку "Дополнительная информация"', () => {
    afterEach(() => {
      props.onExpand.mockReset()
    })

    test('callback "onExpand" вызывается', async () => {
      const { user } = render(<AdditionalInfo {...props} />)

      await additionalInfoTestUtils.clickExpandButton(user)

      await waitFor(() => {
        expect(props.onExpand).toBeCalledTimes(1)
      })
    })
  })

  test('Обязательные поля отображаются', () => {
    render(<AdditionalInfo {...props} />)

    expect(additionalInfoTestUtils.getChildByText(props.priority)).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(props.severity)).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(props.impact)).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(props.productClassifier1)).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(props.productClassifier2)).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(props.productClassifier3)).toBeInTheDocument()
  })

  test('Группа поддержки отображается если присутствует', () => {
    const supportGroup = fakeWord()
    render(<AdditionalInfo {...props} supportGroup={supportGroup} />)

    expect(
      additionalInfoTestUtils.getChildByText('Наименование группы поддержки Х5'),
    ).toBeInTheDocument()

    expect(additionalInfoTestUtils.getChildByText(supportGroup)).toBeInTheDocument()
  })

  describe('Блок "Приоритет заявки"', () => {
    test('Заголовок отображается', () => {
      render(<AdditionalInfo {...props} />)
      expect(additionalInfoTestUtils.getChildByText('Приоритет заявки')).toBeInTheDocument()
    })

    test('Вес отображается если присутствует', () => {
      const weight = 1
      render(<AdditionalInfo {...props} weight={weight} />)

      expect(additionalInfoTestUtils.getChildByText('Вес:')).toBeInTheDocument()
      expect(additionalInfoTestUtils.getChildByText(String(weight))).toBeInTheDocument()
    })
  })

  test('Email отображается если присутствует', () => {
    const email = fakeEmail()
    render(<AdditionalInfo {...props} email={email} />)

    expect(additionalInfoTestUtils.getChildByText('Email')).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(email)).toBeInTheDocument()
  })

  test('SAP ID отображается если присутствует', () => {
    const sapId = fakeWord()
    render(<AdditionalInfo {...props} sapId={sapId} />)

    expect(additionalInfoTestUtils.getChildByText('SAP ID')).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(sapId)).toBeInTheDocument()
  })

  test('Компания отображается если присутствует', () => {
    const company = fakeWord()
    render(<AdditionalInfo {...props} company={company} />)

    expect(additionalInfoTestUtils.getChildByText('Компания')).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(company)).toBeInTheDocument()
  })

  test('Формат магазина отображается если присутствует', () => {
    const contactType = fakeWord()
    render(<AdditionalInfo {...props} contactType={contactType} />)

    expect(additionalInfoTestUtils.getChildByText('Формат магазина')).toBeInTheDocument()
    expect(additionalInfoTestUtils.getChildByText(contactType)).toBeInTheDocument()
  })

  describe('Поле "Адрес"', () => {
    describe('Если присутствует', () => {
      test('Является корректной ссылкой', () => {
        const addressValue = fakeAddress()
        render(<AdditionalInfo {...props} address={addressValue} />)

        const address = additionalInfoTestUtils.getAddress()

        const link = within(address).getByRole('link', {
          name: addressValue,
        })

        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href')
        expect(link).toHaveAttribute('target', '_blank')
      })

      test('Иконка отображается', () => {
        render(<AdditionalInfo {...props} address={fakeAddress()} />)

        const icon = additionalInfoTestUtils.getAddressIcon()
        expect(icon).toBeInTheDocument()
      })
    })

    describe('Если отсутствует', () => {
      test('Вместо него отображается соответствующий текст', () => {
        render(<AdditionalInfo {...props} />)

        const address = additionalInfoTestUtils.getAddress()
        expect(within(address).getByText('Не определено')).toBeInTheDocument()
      })

      test('Не является ссылкой', () => {
        render(<AdditionalInfo {...props} />)

        const address = additionalInfoTestUtils.getAddress()

        const link = within(address).queryByRole('link', {
          name: 'Не определено',
        })

        expect(link).not.toBeInTheDocument()
      })

      test('Иконка отображается', () => {
        render(<AdditionalInfo {...props} />)
        expect(additionalInfoTestUtils.getAddressIcon()).toBeInTheDocument()
      })
    })
  })
})
