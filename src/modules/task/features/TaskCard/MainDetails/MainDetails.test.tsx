import {
  generateAddress,
  generateDateString,
  generateIdStr,
  generatePhone,
  generateWord,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { TaskOlaStatusEnum } from 'modules/task/constants/common'

import MainDetails, { MainDetailsProps } from './index'

const requiredProps: Pick<
  MainDetailsProps,
  | 'recordId'
  | 'title'
  | 'createdAt'
  | 'name'
  | 'contactService'
  | 'olaStatus'
  | 'olaEstimatedTime'
> = {
  name: generateWord(),
  title: generateWord(),
  recordId: generateIdStr(),
  createdAt: generateDateString(),
  contactService: generateWord(),
  olaEstimatedTime: Date.now(),
  olaStatus: TaskOlaStatusEnum.NotExpired,
}

const notRequiredProps: Pick<
  MainDetailsProps,
  'address' | 'olaNextBreachTime' | 'contactPhone' | 'portablePhone'
> = {
  olaNextBreachTime: generateDateString(),
  address: generateAddress(),
  contactPhone: generatePhone(),
  portablePhone: generatePhone(),
}

const getContainer = () => screen.getByTestId('task-card-main-details')

const queryContainer = () => screen.queryByTestId('task-card-main-details')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

export const testUtils = {
  getContainer,
  queryContainer,
  getChildByText,
}

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

    expect(testUtils.getChildByText(/до/)).toBeInTheDocument()
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
