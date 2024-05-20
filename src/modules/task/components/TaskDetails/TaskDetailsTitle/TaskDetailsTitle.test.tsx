import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  TaskActionsPermissionsEnum,
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { TaskModel } from 'modules/task/models'
import { UserRoleEnum } from 'modules/user/constants'

import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  getStoreWithAuth,
  iconTestUtils,
  menuTestUtils,
  render,
} from '_tests_/utils'

import TaskDetailsTitle from './index'
import { TaskDetailsTitleProps } from './types'

const props: Readonly<TaskDetailsTitleProps> = {
  id: fakeId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  assignee: null,
  workGroup: null,
  suspendRequest: null,
  userActions: userFixtures.userActions(),
  onExecuteTask: jest.fn(),
  onRegisterFN: jest.fn(),
  onReloadTask: jest.fn(),
  onRequestSuspend: jest.fn(),
  onRequestReclassification: jest.fn(),
  onUpdateDescription: jest.fn(),
  onUpdateDeadline: jest.fn(),
}

export const canExecuteTaskProps: Pick<
  TaskModel,
  'status' | 'extendedStatus' | 'assignee' | 'suspendRequest'
> = {
  status: TaskStatusEnum.InProgress,
  extendedStatus: TaskExtendedStatusEnum.InProgress,
  assignee: taskFixtures.assignee(),
  suspendRequest: null,
}

export const activeRequestReclassificationItemProps: Readonly<
  Pick<TaskDetailsTitleProps, 'status' | 'olaStatus' | 'type' | 'suspendRequest' | 'workGroup'>
> = {
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
  workGroup: null,
}

export const activeRequestSuspendItemProps: Readonly<
  Pick<
    TaskDetailsTitleProps,
    'status' | 'extendedStatus' | 'type' | 'suspendRequest' | 'userActions'
  >
> = {
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
  userActions: userFixtures.userActions({
    tasks: {
      ...userFixtures.taskActionsPermissions,
      [TaskActionsPermissionsEnum.CanSuspendRequestsCreate]: [props.id],
    },
  }),
}

export const canRegisterFNItemProps: Readonly<
  Pick<TaskDetailsTitleProps, 'status' | 'type' | 'workGroup' | 'assignee'>
> = {
  status: TaskStatusEnum.InProgress,
  type: TaskTypeEnum.Request,
  workGroup: taskFixtures.workGroup(),
  assignee: taskFixtures.assignee(),
}

const getContainer = () => screen.getByTestId('task-details-title')
const queryContainer = () => screen.queryByTestId('task-details-title')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => buttonTestUtils.getMenuButtonIn(getContainer())
const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  iconTestUtils.getIconByNameIn(item, iconName)

const openMenu = async (user: UserEvent) => menuTestUtils.openMenu(user, getMenuButton())

// reload button
const getReloadButton = () => buttonTestUtils.getButtonIn(getContainer(), 'sync')
const clickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

// execute task
const getExecuteTaskMenuItem = () => menuTestUtils.getMenuItem(/выполнить заявку/i)
const clickExecuteTaskMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/выполнить заявку/i, user)

// register FN
const getRegisterFNMenuItem = () => menuTestUtils.getMenuItem(/Зарегистрировать ФН/i)
const clickRegisterFNMenuItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/Зарегистрировать ФН/i, user)

// request reclassification
const getRequestReclassificationItem = () =>
  menuTestUtils.getMenuItem(/запросить переклассификацию/i)
const queryRequestReclassificationItem = () =>
  menuTestUtils.queryMenuItem(/запросить переклассификацию/i)
const clickRequestReclassificationItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/запросить переклассификацию/i, user)

// cancel reclassification
const getCancelReclassificationItem = () => menuTestUtils.getMenuItem(/отменить переклассификацию/i)
const queryCancelReclassificationItem = () =>
  menuTestUtils.queryMenuItem(/отменить переклассификацию/i)
const clickCancelReclassificationItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/отменить переклассификацию/i, user)

// request suspend
const getRequestSuspendItem = () => menuTestUtils.getMenuItem(/запросить перевод в ожидание/i)
const clickRequestSuspendItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/запросить перевод в ожидание/i, user)

export const testUtils = {
  getContainer,
  queryContainer,
  getChildByText,

  getMenuButton,
  getMenuItemIcon,
  openMenu,

  getExecuteTaskMenuItem,
  clickExecuteTaskMenuItem,

  getRegisterFNMenuItem,
  clickRegisterFNMenuItem,

  getRequestReclassificationItem,
  queryRequestReclassificationItem,
  clickRequestReclassificationItem,

  getCancelReclassificationItem,
  queryCancelReclassificationItem,
  clickCancelReclassificationItem,

  getRequestSuspendItem,
  clickRequestSuspendItem,

  getReloadButton,
  clickReloadButton,
}

describe('Заголовок карточки заявки', () => {
  test('Идентификатор заявки отображается', () => {
    render(<TaskDetailsTitle {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock(userFixtures.user()) },
      }),
    })

    expect(testUtils.getChildByText(String(props.id))).toBeInTheDocument()
  })

  describe('Кнопка перезапроса заявки', () => {
    test('Отображается корректно', () => {
      render(<TaskDetailsTitle {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      const button = testUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskDetailsTitle {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock(userFixtures.user()) },
        }),
      })

      await testUtils.clickReloadButton(user)
      expect(props.onReloadTask).toBeCalledTimes(1)
    })
  })

  describe('Контекстное меню', () => {
    describe('Кнопка меню', () => {
      test('Отображается', () => {
        render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        const button = testUtils.getMenuButton()

        expect(button).toBeInTheDocument()
        expect(button).toBeEnabled()
      })

      test('Открывает меню', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        const menu = await testUtils.openMenu(user)
        expect(menu).toBeInTheDocument()
      })
    })

    describe('Зарегистрировать ФН', () => {
      test('Отображается', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.openMenu(user)
        const item = testUtils.getRegisterFNMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'mail')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике вызывается обработчик', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canRegisterFNItemProps} />, {
          store: getStoreWithAuth({ userId: canRegisterFNItemProps.assignee!.id }),
        })

        await testUtils.openMenu(user)
        await testUtils.clickRegisterFNMenuItem(user)
        expect(props.onRegisterFN).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canRegisterFNItemProps} />, {
          store: getStoreWithAuth({ userId: canRegisterFNItemProps.assignee!.id }),
        })

        await testUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(testUtils.getRegisterFNMenuItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Но тип заявки не ${TaskTypeEnum.Incident} или ${TaskTypeEnum.Request}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...canRegisterFNItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            { store: getStoreWithAuth({ userId: canRegisterFNItemProps.assignee!.id }) },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRegisterFNMenuItem())
        })

        test(`Но заявка не в статусе ${TaskStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle {...props} {...canRegisterFNItemProps} status={TaskStatusEnum.New} />,
            { store: getStoreWithAuth({ userId: canRegisterFNItemProps.assignee!.id }) },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRegisterFNMenuItem())
        })

        test('Но исполнитель заявки не является авторизованным пользователем', async () => {
          const { user } = render(<TaskDetailsTitle {...props} {...canRegisterFNItemProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          })

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRegisterFNMenuItem())
        })

        test('Но нету рабочей группы', async () => {
          const { user } = render(
            <TaskDetailsTitle {...props} {...canRegisterFNItemProps} workGroup={null} />,
            { store: getStoreWithAuth({ userId: canRegisterFNItemProps.assignee!.id }) },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRegisterFNMenuItem())
        })
      })
    })

    describe('Выполнить заявку', () => {
      test('Отображается', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'check-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике вызывается обработчик', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canExecuteTaskProps} />, {
          store: getStoreWithAuth(
            { userId: canExecuteTaskProps.assignee!.id },
            undefined,
            undefined,
            {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            },
          ),
        })

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskMenuItem(user)
        expect(props.onExecuteTask).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...canExecuteTaskProps} />, {
          store: getStoreWithAuth(
            { userId: canExecuteTaskProps.assignee!.id },
            undefined,
            undefined,
            {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            },
          ),
        })

        await testUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(testUtils.getExecuteTaskMenuItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test('Но заявка не в статусе - "В процессе"', async () => {
          const { user } = render(
            <TaskDetailsTitle {...props} {...canExecuteTaskProps} status={TaskStatusEnum.New} />,
            {
              store: getStoreWithAuth(
                { userId: canExecuteTaskProps.assignee!.id },
                undefined,
                undefined,
                {
                  queries: { ...getUserMeQueryMock({ permissions: [] }) },
                },
              ),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getExecuteTaskMenuItem())
        })

        test('Но исполнитель заявки не является авторизованным пользователем', async () => {
          const { user } = render(<TaskDetailsTitle {...props} {...canExecuteTaskProps} />, {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock({ permissions: [] }) },
            }),
          })

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getExecuteTaskMenuItem())
        })

        test('Но есть запрос на переклассификацию', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...canExecuteTaskProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            {
              store: getStoreWithAuth(
                { userId: canExecuteTaskProps.assignee!.id },
                undefined,
                undefined,
                {
                  queries: { ...getUserMeQueryMock({ permissions: [] }) },
                },
              ),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getExecuteTaskMenuItem())
        })

        test(`Но запрос на ожидание имеет статус ${SuspendRequestStatusEnum.New}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...canExecuteTaskProps}
              suspendRequest={taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.New,
              })}
            />,
            {
              store: getStoreWithAuth(
                { userId: canExecuteTaskProps.assignee!.id },
                undefined,
                undefined,
                {
                  queries: { ...getUserMeQueryMock({ permissions: [] }) },
                },
              ),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getExecuteTaskMenuItem())
        })

        test(`Но запрос на ожидание имеет статус ${SuspendRequestStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...canExecuteTaskProps}
              suspendRequest={taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.InProgress,
              })}
            />,
            {
              store: getStoreWithAuth(
                { userId: canExecuteTaskProps.assignee!.id },
                undefined,
                undefined,
                {
                  queries: { ...getUserMeQueryMock({ permissions: [] }) },
                },
              ),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getExecuteTaskMenuItem())
        })
      })
    })

    describe('Запросить переклассификацию', () => {
      test('Отображается если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} extendedStatus={TaskExtendedStatusEnum.New} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getRequestReclassificationItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если есть запрос на переклассификацию', async () => {
        const { user } = render(
          <TaskDetailsTitle
            {...props}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)

        expect(testUtils.queryRequestReclassificationItem()).not.toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskDetailsTitle
            {...props}
            {...activeRequestReclassificationItemProps}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickRequestReclassificationItem(user)
        expect(props.onRequestReclassification).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...activeRequestReclassificationItemProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(testUtils.getRequestReclassificationItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Если роль пользователя ${UserRoleEnum.FirstLineSupport} и есть рабочая группа`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              workGroup={taskFixtures.workGroup()}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)

          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но заявка не в статусе - ${TaskStatusEnum.New}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              status={TaskStatusEnum.InProgress}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)

          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но заявка не имеет ola статуса - ${TaskOlaStatusEnum.NotExpired}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              olaStatus={TaskOlaStatusEnum.Expired}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)

          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но заявка имеет ola статус - ${TaskOlaStatusEnum.HalfExpired}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              olaStatus={TaskOlaStatusEnum.HalfExpired}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)

          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но тип заявки - ${TaskTypeEnum.RequestTask}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)

          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но тип заявки - ${TaskTypeEnum.IncidentTask}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.IncidentTask}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)

          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но у пользователя роль - ${UserRoleEnum.Engineer}`, async () => {
          const { user } = render(
            <TaskDetailsTitle {...props} {...activeRequestReclassificationItemProps} />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test('Но у заявки есть запрос на ожидание', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              suspendRequest={taskFixtures.suspendRequest()}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })
      })
    })

    describe('Отменить переклассификацию', () => {
      test('Отображается корректно если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle
            {...props}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        const item = testUtils.getCancelReclassificationItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если нет запроса на переклассификацию', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} extendedStatus={TaskExtendedStatusEnum.New} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)

        expect(testUtils.queryCancelReclassificationItem()).not.toBeInTheDocument()
      })
    })

    describe('Запросить перевод в ожидание', () => {
      test('Отображается', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock(userFixtures.user()) },
          }),
        })

        await testUtils.openMenu(user)
        const item = testUtils.getRequestSuspendItem()
        const icon = testUtils.getMenuItemIcon(item, 'pause-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...activeRequestSuspendItemProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        await testUtils.clickRequestSuspendItem(user)
        expect(props.onRequestSuspend).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...activeRequestSuspendItemProps} />,
          {
            store: getStoreWithAuth(undefined, undefined, undefined, {
              queries: { ...getUserMeQueryMock(userFixtures.user()) },
            }),
          },
        )

        await testUtils.openMenu(user)
        menuTestUtils.expectMenuItemNotDisabled(testUtils.getRequestSuspendItem())
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
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        test(`Но тип заявки не ${TaskTypeEnum.Request} или ${TaskTypeEnum.Incident}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
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
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        test(`Но запрос на ожидание заявки в статусе ${SuspendRequestStatusEnum.New}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              suspendRequest={taskFixtures.suspendRequest({ status: SuspendRequestStatusEnum.New })}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        test(`Но запрос на ожидание заявки в статусе ${SuspendRequestStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              suspendRequest={taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.InProgress,
              })}
            />,
            {
              store: getStoreWithAuth(undefined, undefined, undefined, {
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
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
                queries: { ...getUserMeQueryMock(userFixtures.user()) },
              }),
            },
          )

          await testUtils.openMenu(user)
          menuTestUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })
      })
    })
  })
})
