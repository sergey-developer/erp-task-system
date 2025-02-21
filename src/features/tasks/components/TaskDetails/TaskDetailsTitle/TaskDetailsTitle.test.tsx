import {
  SuspendRequestStatusEnum,
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'features/tasks/api/constants'

import {
  activeRequestReclassificationItemProps,
  activeRequestSuspendItemProps,
  canExecuteTaskProps,
  canRegisterFNItemProps,
  hideRequestReclassificationItemProps,
  props,
  showRequestReclassificationItemProps,
} from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTitle/constants'
import { taskDetailsTitleTestUtils } from '_tests_/features/tasks/components/TaskDetails/TaskDetailsTitle/testUtils'
import tasksFixtures from '_tests_/fixtures/api/data/tasks'
import userFixtures from '_tests_/fixtures/api/data/users'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import { menuTestUtils, render } from '_tests_/helpers'

import TaskDetailsTitle from './index'

describe('Заголовок карточки заявки', () => {
  test('Идентификатор заявки отображается', () => {
    render(<TaskDetailsTitle {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
      }),
    })

    expect(taskDetailsTitleTestUtils.getChildByText(String(props.id))).toBeInTheDocument()
  })

  describe('Кнопка перезапроса заявки', () => {
    test('Отображается корректно', () => {
      render(<TaskDetailsTitle {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      const button = taskDetailsTitleTestUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskDetailsTitle {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
        }),
      })

      await taskDetailsTitleTestUtils.clickReloadButton(user)
      expect(props.onReloadTask).toBeCalledTimes(1)
    })
  })

  describe('Контекстное меню', () => {
    describe('Кнопка меню', () => {
      test('Отображается', () => {
        render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        const button = taskDetailsTitleTestUtils.getMenuButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Открывает меню', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        const menu = await taskDetailsTitleTestUtils.openMenu(user)
        expect(menu).toBeInTheDocument()
      })
    })

    describe('Зарегистрировать ФН', () => {
      test('Отображается', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await taskDetailsTitleTestUtils.openMenu(user)
        const item = taskDetailsTitleTestUtils.getRegisterFNMenuItem()
        const icon = taskDetailsTitleTestUtils.getMenuItemIcon(item, 'mail')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике вызывается обработчик', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canRegisterFNItemProps} />, {
          store: getStoreWithAuth(canRegisterFNItemProps.assignee!, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await taskDetailsTitleTestUtils.openMenu(user)
        await taskDetailsTitleTestUtils.clickRegisterFNMenuItem(user)
        expect(props.onRegisterFN).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canRegisterFNItemProps} />, {
          store: getStoreWithAuth(canRegisterFNItemProps.assignee!, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await taskDetailsTitleTestUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(taskDetailsTitleTestUtils.getRegisterFNMenuItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Но тип заявки не ${TaskTypeEnum.Incident} или ${TaskTypeEnum.Request}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...canRegisterFNItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(canRegisterFNItemProps.assignee!, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRegisterFNMenuItem())
        })

        test(`Но заявка не в статусе ${TaskStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle {...props} {...canRegisterFNItemProps} status={TaskStatusEnum.New} />,
            {
              store: getStoreWithAuth(canRegisterFNItemProps.assignee!, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRegisterFNMenuItem())
        })

        test('Но исполнитель заявки не является авторизованным пользователем', async () => {
          const { user } = render(<TaskDetailsTitle {...props} {...canRegisterFNItemProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          })

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRegisterFNMenuItem())
        })

        test('Но нету рабочей группы', async () => {
          const { user } = render(
            <TaskDetailsTitle {...props} {...canRegisterFNItemProps} workGroup={null} />,
            {
              store: getStoreWithAuth(canRegisterFNItemProps.assignee!, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRegisterFNMenuItem())
        })
      })
    })

    describe('Выполнить заявку', () => {
      test('Отображается', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canExecuteTaskProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await taskDetailsTitleTestUtils.openMenu(user)
        const item = taskDetailsTitleTestUtils.getExecuteTaskMenuItem()
        const icon = taskDetailsTitleTestUtils.getMenuItemIcon(item, 'check-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике вызывается обработчик', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canExecuteTaskProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await taskDetailsTitleTestUtils.openMenu(user)
        await taskDetailsTitleTestUtils.clickExecuteTaskMenuItem(user)
        expect(props.onExecuteTask).toBeCalledTimes(1)
      })

      test('Элемент активен если userActions содержит id заявки', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canExecuteTaskProps} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await taskDetailsTitleTestUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(taskDetailsTitleTestUtils.getExecuteTaskMenuItem())
      })

      test('Элемент не активен если userActions не содержит id заявки', async () => {
        const { user } = render(
          <TaskDetailsTitle
            {...props}
            userActions={{
              tasks: {
                ...userFixtures.taskActionsPermissions,
                [TaskActionsPermissionsEnum.CanResolve]: [],
              },
            }}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await taskDetailsTitleTestUtils.openMenu(user)
        menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getExecuteTaskMenuItem())
      })
    })

    describe('Запросить переклассификацию', () => {
      test('Отображается если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...showRequestReclassificationItemProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await taskDetailsTitleTestUtils.openMenu(user)
        const item = taskDetailsTitleTestUtils.getRequestReclassificationItem()
        const icon = taskDetailsTitleTestUtils.getMenuItemIcon(item, 'question-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если есть запрос на переклассификацию', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...hideRequestReclassificationItemProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await taskDetailsTitleTestUtils.openMenu(user)
        expect(taskDetailsTitleTestUtils.queryRequestReclassificationItem()).not.toBeInTheDocument()
      })

      test('При клике обработчик вызывается', async () => {
        const { user } = render(
          <TaskDetailsTitle
            {...props}
            {...showRequestReclassificationItemProps}
            {...activeRequestReclassificationItemProps}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await taskDetailsTitleTestUtils.openMenu(user)
        await taskDetailsTitleTestUtils.clickRequestReclassificationItem(user)
        expect(props.onRequestReclassification).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle
            {...props}
            {...showRequestReclassificationItemProps}
            {...activeRequestReclassificationItemProps}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await taskDetailsTitleTestUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(
          taskDetailsTitleTestUtils.getRequestReclassificationItem(),
        )
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Но ola статус не ${TaskOlaStatusEnum.NotExpired}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...showRequestReclassificationItemProps}
              {...activeRequestReclassificationItemProps}
              olaStatus={TaskOlaStatusEnum.Expired}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(
            taskDetailsTitleTestUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но тип заявки ${TaskTypeEnum.RequestTask}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...showRequestReclassificationItemProps}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(
            taskDetailsTitleTestUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но тип заявки ${TaskTypeEnum.IncidentTask}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...showRequestReclassificationItemProps}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.IncidentTask}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)

          menuTestUtils.expectMenuItemDisabled(
            taskDetailsTitleTestUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но статус запроса на ожидание ${SuspendRequestStatusEnum.New}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...showRequestReclassificationItemProps}
              {...activeRequestReclassificationItemProps}
              suspendRequest={tasksFixtures.taskSuspendRequest({
                status: SuspendRequestStatusEnum.New,
              })}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(
            taskDetailsTitleTestUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но статус запроса на ожидание ${SuspendRequestStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...showRequestReclassificationItemProps}
              {...activeRequestReclassificationItemProps}
              suspendRequest={tasksFixtures.taskSuspendRequest({
                status: SuspendRequestStatusEnum.InProgress,
              })}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(
            taskDetailsTitleTestUtils.getRequestReclassificationItem(),
          )
        })

        test('Но у заявки нет прав', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...showRequestReclassificationItemProps}
              {...activeRequestReclassificationItemProps}
              userActions={userFixtures.userActions()}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(
            taskDetailsTitleTestUtils.getRequestReclassificationItem(),
          )
        })
      })
    })

    describe('Запросить перевод в ожидание', () => {
      test('Отображается', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
          }),
        })

        await taskDetailsTitleTestUtils.openMenu(user)
        const item = taskDetailsTitleTestUtils.getRequestSuspendItem()
        const icon = taskDetailsTitleTestUtils.getMenuItemIcon(item, 'pause-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...activeRequestSuspendItemProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await taskDetailsTitleTestUtils.openMenu(user)
        await taskDetailsTitleTestUtils.clickRequestSuspendItem(user)
        expect(props.onRequestSuspend).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...activeRequestSuspendItemProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
            }),
          },
        )

        await taskDetailsTitleTestUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(taskDetailsTitleTestUtils.getRequestSuspendItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Но заявка не в статусе ${TaskStatusEnum.New} или ${TaskStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              status={TaskStatusEnum.Completed}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRequestSuspendItem())
        })

        test.skip(`Но тип заявки не ${TaskTypeEnum.Request} или ${TaskTypeEnum.Incident}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRequestSuspendItem())
        })

        test('Но заявка на переклассификации', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRequestSuspendItem())
        })

        test(`Но запрос на ожидание заявки в статусе ${SuspendRequestStatusEnum.New}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              suspendRequest={tasksFixtures.taskSuspendRequest({
                status: SuspendRequestStatusEnum.New,
              })}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRequestSuspendItem())
        })

        test(`Но запрос на ожидание заявки в статусе ${SuspendRequestStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              suspendRequest={tasksFixtures.taskSuspendRequest({
                status: SuspendRequestStatusEnum.InProgress,
              })}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRequestSuspendItem())
        })

        test('Но у заявки нет прав', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              userActions={userFixtures.userActions()}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.userDetail()) },
              }),
            },
          )

          await taskDetailsTitleTestUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(taskDetailsTitleTestUtils.getRequestSuspendItem())
        })
      })
    })
  })
})
