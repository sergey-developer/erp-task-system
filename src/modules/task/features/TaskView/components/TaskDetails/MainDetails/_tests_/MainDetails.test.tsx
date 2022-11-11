import { render } from '_tests_/utils'

import MainDetails from '../index'
import { notRequiredProps, requiredProps } from './constants'
import testUtils from './utils'

describe('Блок детальной информации заявки', () => {
  test('Отображается', () => {
    render(<MainDetails {...requiredProps} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  test('Идентификатор записи отображается', () => {
    render(<MainDetails {...requiredProps} />)
    expect(testUtils.getChildByText(requiredProps.recordId)).toBeInTheDocument()
  })

  test('Срок выполнения отображается если он есть', () => {
    render(
      <MainDetails
        {...requiredProps}
        olaNextBreachTime={notRequiredProps.olaNextBreachTime}
      />,
    )

    //...
  })

  test('Заголовок отображается', () => {
    render(<MainDetails {...requiredProps} />)
    expect(testUtils.getChildByText(requiredProps.title)).toBeInTheDocument()
  })

  test('Дата создания отображается', () => {
    render(<MainDetails {...requiredProps} />)

    expect(
      testUtils.getChildByText(requiredProps.createdAt),
    ).toBeInTheDocument()
  })

  describe('Блок адреса', () => {
    test('Название отображается', () => {
      render(<MainDetails {...requiredProps} />)
      expect(testUtils.getChildByText(requiredProps.name)).toBeInTheDocument()
    })

    test('Адрес отображается если он есть', () => {
      render(
        <MainDetails {...requiredProps} address={notRequiredProps.address} />,
      )

      expect(
        testUtils.getChildByText(notRequiredProps.address!),
      ).toBeInTheDocument()
    })
  })

  describe('Блок заявителя', () => {
    test('Заявитель отображается', () => {
      render(<MainDetails {...requiredProps} />)

      expect(
        testUtils.getChildByText(requiredProps.contactService),
      ).toBeInTheDocument()
    })

    test('Контактный телефон 1 отображается', () => {
      render(
        <MainDetails
          {...requiredProps}
          contactPhone={notRequiredProps.contactPhone}
        />,
      )

      expect(
        testUtils.getChildByText(notRequiredProps.contactPhone!),
      ).toBeInTheDocument()
    })

    test('Контактный телефон 2 отображается', () => {
      render(
        <MainDetails
          {...requiredProps}
          portablePhone={notRequiredProps.portablePhone}
        />,
      )

      expect(
        testUtils.getChildByText(notRequiredProps.portablePhone!),
      ).toBeInTheDocument()
    })
  })
})
