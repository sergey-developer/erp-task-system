import { screen, within } from '@testing-library/react'

import { testUtils as taskStatusTestUtils } from 'modules/task/components/TaskStatus/TaskStatus.test'
import { TaskOlaStatusEnum, TaskStatusEnum } from 'modules/task/constants/task'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
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
  olaNextBreachTime: fakeWord(),
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
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  test('Идентификатор записи отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(testUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  test('Срок выполнения отображается', () => {
    render(<MainDetails {...props} olaNextBreachTime={fakeDateString()} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(testUtils.getChildByText(/до/)).toBeInTheDocument()
  })

  test('Статус заявки отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

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
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        },
      )

      const responseTime = parseResponseTime(fakeResponseTime, null)

      expect(testUtils.getChildByText(/Срок реакции:/)).toBeInTheDocument()
      expect(testUtils.getChildByText(responseTime!.value)).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но срок реакции отсутствует', () => {
        render(<MainDetails {...props} workGroup={null} responseTime={null} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        expect(testUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
      })

      test('Но есть рабочая группа', () => {
        render(
          <MainDetails
            {...props}
            responseTime={taskFixtures.taskResponseTime()}
            workGroup={taskFixtures.workGroup()}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        expect(testUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
      })

      test(`Но у заявки есть исполнитель`, () => {
        render(
          <MainDetails
            {...props}
            responseTime={taskFixtures.taskResponseTime()}
            workGroup={taskFixtures.workGroup()}
            assignee={taskFixtures.assignee()}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        expect(testUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
      })
    })
  })

  test('Заголовок отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(testUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  test('Дата создания отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    expect(testUtils.getChildByText(props.createdAt)).toBeInTheDocument()
  })

  describe('Блок адреса', () => {
    test('Заголовок отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(testUtils.getChildByText('Адрес')).toBeInTheDocument()
    })

    test('Название отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(testUtils.getChildByText(props.name!)).toBeInTheDocument()
    })

    test('Адрес отображается если присутствует', () => {
      const address = fakeAddress()
      render(<MainDetails {...props} address={address} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(testUtils.getChildByText(address)).toBeInTheDocument()
    })

    test('Если отсутствует отображается соответствующий текст', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(testUtils.getChildByText('Не определено')).toBeInTheDocument()
    })
  })

  describe('Блок заявителя', () => {
    test('Заголовок отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(testUtils.getChildByText('Заявитель')).toBeInTheDocument()
    })

    test('Заявитель отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(testUtils.getChildByText(props.contactService)).toBeInTheDocument()
    })

    test('Контактный телефон 1 отображается если присутствует', () => {
      const contactPhone = fakePhone()
      render(<MainDetails {...props} contactPhone={contactPhone} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(testUtils.getChildByText(contactPhone)).toBeInTheDocument()
    })

    test('Контактный телефон 2 отображается если присутствует', () => {
      const portablePhone = fakePhone()
      render(<MainDetails {...props} portablePhone={portablePhone} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(testUtils.getChildByText(portablePhone)).toBeInTheDocument()
    })
  })
})
