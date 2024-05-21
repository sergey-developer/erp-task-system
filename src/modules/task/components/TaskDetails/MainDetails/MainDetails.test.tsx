import { screen, within } from '@testing-library/react'

import { testUtils as taskStatusTestUtils } from 'modules/task/components/TaskStatus/TaskStatus.test'
import { TaskOlaStatusEnum, TaskStatusEnum } from 'modules/task/constants/task'
import { UserRoleEnum } from 'modules/user/constants'

import taskFixtures from '_tests_/fixtures/task'
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

const props: Readonly<MainDetailsProps> = {
  name: fakeWord(),
  title: fakeWord(),
  recordId: fakeIdStr(),
  status: TaskStatusEnum.New,
  createdAt: fakeDateString(),
  contactService: fakeWord(),
  olaEstimatedTime: Date.now(),
  olaStatus: TaskOlaStatusEnum.NotExpired,
  olaNextBreachTime: null,
  previousOlaNextBreachTime: null,
  isOlaNextBreachTimeChanged: false,
  address: null,
  contactPhone: null,
  portablePhone: null,
  responseTime: null,
  workGroup: null,
  assignee: null,
}

const getContainer = () => screen.getByTestId('task-details-main-details')

const queryContainer = () => screen.queryByTestId('task-details-main-details')

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

const queryChildByText = (text: string | RegExp) => within(getContainer()).queryByText(text)

export const testUtils = {
  getContainer,
  queryContainer,

  getChildByText,
  queryChildByText,
}

describe('Блок детальной информации заявки', () => {
  test('Отображается', () => {
    render(<MainDetails {...props} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  test('Идентификатор записи отображается', () => {
    render(<MainDetails {...props} />)
    expect(testUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  test('Срок выполнения отображается если присутствует', () => {
    render(<MainDetails {...props} olaNextBreachTime={fakeDateString()} />)
    expect(testUtils.getChildByText(/до/)).toBeInTheDocument()
  })

  test('Статус заявки отображается', () => {
    render(<MainDetails {...props} />)

    expect(
      taskStatusTestUtils.getContainerIn(testUtils.getContainer(), props.status),
    ).toBeInTheDocument()
  })

  describe('Срок реакции', () => {
    test('Отображается если условия соблюдены', () => {
      const fakeResponseTime = taskFixtures.taskResponseTime()

      render(
        <MainDetails {...props} responseTime={fakeResponseTime} workGroup={null} assignee={null} />,
        {
          store: getStoreWithAuth({ role: UserRoleEnum.FirstLineSupport }),
        },
      )

      const responseTime = parseResponseTime(fakeResponseTime, null)

      expect(testUtils.getChildByText(/Срок реакции:/)).toBeInTheDocument()
      expect(testUtils.getChildByText(responseTime!.value)).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но срок реакции отсутствует', () => {
        render(<MainDetails {...props} workGroup={null} responseTime={null} />)

        expect(testUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
      })

      test('Но есть рабочая группа', () => {
        render(
          <MainDetails
            {...props}
            responseTime={taskFixtures.taskResponseTime()}
            workGroup={taskFixtures.workGroup()}
          />,
        )

        expect(testUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
      })

      test(`Но пользователь с ролью ${UserRoleEnum.FirstLineSupport} и у заявки есть исполнитель`, () => {
        render(
          <MainDetails
            {...props}
            responseTime={taskFixtures.taskResponseTime()}
            workGroup={taskFixtures.workGroup()}
            assignee={taskFixtures.assignee()}
          />,
          {
            store: getStoreWithAuth({
              role: UserRoleEnum.FirstLineSupport,
            }),
          },
        )

        expect(testUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
      })
    })
  })

  test('Заголовок отображается', () => {
    render(<MainDetails {...props} />)
    expect(testUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  test('Дата создания отображается', () => {
    render(<MainDetails {...props} />)

    expect(testUtils.getChildByText(props.createdAt)).toBeInTheDocument()
  })

  describe('Блок адреса', () => {
    test('Заголовок отображается', () => {
      render(<MainDetails {...props} />)
      expect(testUtils.getChildByText('Адрес')).toBeInTheDocument()
    })

    test('Название отображается', () => {
      render(<MainDetails {...props} />)
      expect(testUtils.getChildByText(props.name)).toBeInTheDocument()
    })

    test('Адрес отображается если присутствует', () => {
      const address = fakeAddress()
      render(<MainDetails {...props} address={address} />)
      expect(testUtils.getChildByText(address)).toBeInTheDocument()
    })

    test('Если отсутствует отображается соответствующий текст', () => {
      render(<MainDetails {...props} />)
      expect(testUtils.getChildByText('Не определено')).toBeInTheDocument()
    })
  })

  describe('Блок заявителя', () => {
    test('Заголовок отображается', () => {
      render(<MainDetails {...props} />)
      expect(testUtils.getChildByText('Заявитель')).toBeInTheDocument()
    })

    test('Заявитель отображается', () => {
      render(<MainDetails {...props} />)

      expect(testUtils.getChildByText(props.contactService)).toBeInTheDocument()
    })

    test('Контактный телефон 1 отображается если присутствует', () => {
      const contactPhone = fakePhone()
      render(<MainDetails {...props} contactPhone={contactPhone} />)
      expect(testUtils.getChildByText(contactPhone)).toBeInTheDocument()
    })

    test('Контактный телефон 2 отображается если присутствует', () => {
      const portablePhone = fakePhone()
      render(<MainDetails {...props} portablePhone={portablePhone} />)
      expect(testUtils.getChildByText(portablePhone)).toBeInTheDocument()
    })
  })
})
