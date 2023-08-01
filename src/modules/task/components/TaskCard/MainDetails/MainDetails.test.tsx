import { screen, within } from '@testing-library/react'

import { TaskOlaStatusEnum, TaskStatusEnum } from 'modules/task/constants'
import { testUtils as taskStatusTestUtils } from 'modules/task/components/TaskStatus/TaskStatus.test'
import { UserRoleEnum } from 'modules/user/constants/roles'

import taskFixtures from 'fixtures/task'

import {
  fakeAddress,
  fakeDateString,
  fakeIdStr,
  fakePhone,
  fakeWord,
  getStoreWithAuth,
  render,
} from '_tests_/utils'

import MainDetails, { MainDetailsProps } from './index'
import { parseResponseTime } from './utils'

const requiredProps: Readonly<MainDetailsProps> = {
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
  assignee: null,
}

const getContainer = () => screen.getByTestId('task-card-main-details')

const queryContainer = () => screen.queryByTestId('task-card-main-details')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const queryChildByText = (text: string | RegExp) =>
  within(getContainer()).queryByText(text)

export const testUtils = {
  getContainer,
  queryContainer,

  getChildByText,
  queryChildByText,
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

  describe('Срок реакции', () => {
    test('Отображается если условия соблюдены', () => {
      const fakeResponseTime = taskFixtures.fakeTaskResponseTime()

      render(
        <MainDetails
          {...requiredProps}
          responseTime={fakeResponseTime}
          workGroup={null}
          assignee={null}
        />,
        {
          store: getStoreWithAuth({ userRole: UserRoleEnum.FirstLineSupport }),
        },
      )

      const responseTime = parseResponseTime(fakeResponseTime, null)

      expect(testUtils.getChildByText(/Срок реакции:/)).toBeInTheDocument()
      expect(testUtils.getChildByText(responseTime!.value)).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но срок реакции отсутствует', () => {
        render(
          <MainDetails
            {...requiredProps}
            workGroup={null}
            responseTime={null}
          />,
        )

        expect(
          testUtils.queryChildByText(/Срок реакции:/),
        ).not.toBeInTheDocument()
      })

      test('Но есть рабочая группа', () => {
        render(
          <MainDetails
            {...requiredProps}
            responseTime={taskFixtures.fakeTaskResponseTime()}
            workGroup={taskFixtures.fakeWorkGroup()}
          />,
        )

        expect(
          testUtils.queryChildByText(/Срок реакции:/),
        ).not.toBeInTheDocument()
      })

      test(`Но пользователь с ролью ${UserRoleEnum.FirstLineSupport} и у заявки есть исполнитель`, () => {
        render(
          <MainDetails
            {...requiredProps}
            responseTime={taskFixtures.fakeTaskResponseTime()}
            workGroup={taskFixtures.fakeWorkGroup()}
            assignee={taskFixtures.fakeAssignee()}
          />,
          {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(
          testUtils.queryChildByText(/Срок реакции:/),
        ).not.toBeInTheDocument()
      })
    })
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
