import { props } from '_tests_/features/tasks/components/TaskDetails/MainDetails/constants'
import { mainDetailsTestUtils } from '_tests_/features/tasks/components/TaskDetails/MainDetails/testUtils'
import { taskStatusTestUtils } from '_tests_/features/tasks/components/TaskStatus/testUtils'
import taskFixtures from '_tests_/fixtures/tasks'
import userFixtures from '_tests_/fixtures/users'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeAddress,
  fakeDateString,
  fakePhone,
  fakeWord,
  getStoreWithAuth,
  render,
} from '_tests_/utils'

import MainDetails, { MainDetailsProps } from './index'
import { parseResponseTime } from './utils'

describe('Блок детальной информации заявки', () => {
  test('Отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(mainDetailsTestUtils.getContainer()).toBeInTheDocument()
  })

  test('Идентификатор записи отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(mainDetailsTestUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  test('Срок выполнения отображается', () => {
    render(<MainDetails {...props} olaNextBreachTime={fakeDateString()} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(mainDetailsTestUtils.getChildByText(/до/)).toBeInTheDocument()
  })

  test('Статус заявки отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    expect(
      taskStatusTestUtils.getContainerIn(mainDetailsTestUtils.getContainer(), props.status),
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

      expect(mainDetailsTestUtils.getChildByText(/Срок реакции:/)).toBeInTheDocument()
      expect(mainDetailsTestUtils.getChildByText(responseTime!.value)).toBeInTheDocument()
    })

    describe('Не отображается если условия соблюдены', () => {
      test('Но срок реакции отсутствует', () => {
        render(<MainDetails {...props} workGroup={null} responseTime={null} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        expect(mainDetailsTestUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
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

        expect(mainDetailsTestUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
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

        expect(mainDetailsTestUtils.queryChildByText(/Срок реакции:/)).not.toBeInTheDocument()
      })
    })
  })

  test('Заголовок отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })
    expect(mainDetailsTestUtils.getChildByText(props.title)).toBeInTheDocument()
  })

  test('Дата создания отображается', () => {
    render(<MainDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    expect(mainDetailsTestUtils.getChildByText(props.createdAt)).toBeInTheDocument()
  })

  describe('Блок адреса', () => {
    test('Заголовок отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText('Адрес')).toBeInTheDocument()
    })

    test('Название отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText(props.name!)).toBeInTheDocument()
    })

    test('Адрес отображается если присутствует', () => {
      const address = fakeAddress()
      render(<MainDetails {...props} address={address} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText(address)).toBeInTheDocument()
    })

    test('Если отсутствует отображается соответствующий текст', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText('Не определено')).toBeInTheDocument()
    })
  })

  describe('Блок заявителя', () => {
    test('Заголовок отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText('Заявитель')).toBeInTheDocument()
    })

    test('Заявитель отображается', () => {
      render(<MainDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      expect(mainDetailsTestUtils.getChildByText(props.contactService)).toBeInTheDocument()
    })

    test('Номер инициатора отображается если инициатор указан', () => {
      const createdBy: NonNullable<MainDetailsProps['createdBy']> = {
        ...userFixtures.user(),
        position: fakeWord(),
      }

      render(<MainDetails {...props} createdBy={createdBy} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText(createdBy!.phone)).toBeInTheDocument()
    })

    test('Контактный телефон 1 отображается если он есть и если не указан инициатор заявки', () => {
      const contactPhone = fakePhone()
      render(<MainDetails {...props} contactPhone={contactPhone} createdBy={null} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText(contactPhone)).toBeInTheDocument()
    })

    test('Контактный телефон 2 отображается если он есть и если не указан инициатор заявки', () => {
      const portablePhone = fakePhone()
      render(<MainDetails {...props} portablePhone={portablePhone} createdBy={null} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })
      expect(mainDetailsTestUtils.getChildByText(portablePhone)).toBeInTheDocument()
    })
  })
})
