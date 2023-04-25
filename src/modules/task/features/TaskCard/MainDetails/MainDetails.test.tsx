import { screen, within } from '@testing-library/react'

import {
  TaskOlaStatusEnum,
  TaskStatusEnum,
} from 'modules/task/constants/common'
import { testUtils as taskStatusTestUtils } from 'modules/task/features/TaskStatus/TaskStatus.test'

import {
  fakeAddress,
  fakeDateString,
  fakeIdStr,
  fakePhone,
  fakeWord,
  render,
} from '_tests_/utils'

import MainDetails, { MainDetailsProps } from './index'

const requiredProps: MainDetailsProps = {
  name: fakeWord(),
  title: fakeWord(),
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  createdAt: fakeDateString(),
  contactService: fakeWord(),
  olaEstimatedTime: Date.now(),
  olaStatus: TaskOlaStatusEnum.NotExpired,
  olaNextBreachTime: null,
  address: null,
  contactPhone: null,
  portablePhone: null,
  responseTime: null,
  workGroup: null,
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

  test('Срок выполнения отображается если присутствует', () => {
    render(
      <MainDetails {...requiredProps} olaNextBreachTime={fakeDateString()} />,
    )
    expect(testUtils.getChildByText(/до/)).toBeInTheDocument()
  })

  test('Статус заявки отображается', () => {
    render(<MainDetails {...requiredProps} />)

    expect(
      taskStatusTestUtils.getContainerIn(
        testUtils.getContainer(),
        requiredProps.status,
      ),
    ).toBeInTheDocument()
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
    test('Заголовок отображается', () => {
      render(<MainDetails {...requiredProps} />)
      expect(testUtils.getChildByText('Адрес')).toBeInTheDocument()
    })

    test('Название отображается', () => {
      render(<MainDetails {...requiredProps} />)
      expect(testUtils.getChildByText(requiredProps.name)).toBeInTheDocument()
    })

    test('Адрес отображается если присутствует', () => {
      const address = fakeAddress()
      render(<MainDetails {...requiredProps} address={address} />)
      expect(testUtils.getChildByText(address)).toBeInTheDocument()
    })

    test('Если отсутствует отображается соответствующий текст', () => {
      render(<MainDetails {...requiredProps} />)
      expect(testUtils.getChildByText('Не определено')).toBeInTheDocument()
    })
  })

  describe('Блок заявителя', () => {
    test('Заголовок отображается', () => {
      render(<MainDetails {...requiredProps} />)
      expect(testUtils.getChildByText('Заявитель')).toBeInTheDocument()
    })

    test('Заявитель отображается', () => {
      render(<MainDetails {...requiredProps} />)

      expect(
        testUtils.getChildByText(requiredProps.contactService),
      ).toBeInTheDocument()
    })

    test('Контактный телефон 1 отображается если присутствует', () => {
      const contactPhone = fakePhone()
      render(<MainDetails {...requiredProps} contactPhone={contactPhone} />)
      expect(testUtils.getChildByText(contactPhone)).toBeInTheDocument()
    })

    test('Контактный телефон 2 отображается если присутствует', () => {
      const portablePhone = fakePhone()
      render(<MainDetails {...requiredProps} portablePhone={portablePhone} />)
      expect(testUtils.getChildByText(portablePhone)).toBeInTheDocument()
    })
  })
})
