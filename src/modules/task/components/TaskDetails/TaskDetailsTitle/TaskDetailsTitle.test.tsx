import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/task'
import { SuspendRequestStatusEnum } from 'modules/task/constants/taskSuspendRequest'
import { UserRoleEnum } from 'modules/user/constants'

import taskFixtures from '_tests_/fixtures/task'
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
  onExecuteTask: jest.fn(),
  onReloadTask: jest.fn(),
  onRequestSuspend: jest.fn(),
  onRequestReclassification: jest.fn(),
  onChangeDescription: jest.fn(),
}

export const activeExecuteTaskItemProps: Readonly<
  Pick<
    TaskDetailsTitleProps,
    'status' | 'extendedStatus' | 'assignee' | 'suspendRequest' | 'workGroup'
  >
> = {
  status: TaskStatusEnum.InProgress,
  extendedStatus: TaskExtendedStatusEnum.New,
  assignee: taskFixtures.assignee(),
  suspendRequest: null,
  workGroup: null,
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
  Pick<TaskDetailsTitleProps, 'status' | 'type' | 'suspendRequest' | 'workGroup'>
> = {
  status: TaskStatusEnum.New,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
  workGroup: null,
}

const getContainer = () => screen.getByTestId('task-details-title')
const queryContainer = () => screen.queryByTestId('task-details-title')
const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => buttonTestUtils.getMenuButtonIn(getContainer())
const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  iconTestUtils.getIconByNameIn(item, iconName)

const openMenu = async (user: UserEvent) => {
  const button = getMenuButton()
  await user.hover(button)
  const menu = await menuTestUtils.findMenu()
  return { button, menu }
}

const expectMenuItemDisabled = (item: HTMLElement) =>
  expect(item).toHaveClass('ant-dropdown-menu-item-disabled')

const expectMenuItemNotDisabled = (item: HTMLElement) =>
  expect(item).not.toHaveClass('ant-dropdown-menu-item-disabled')

// reload button
const getReloadButton = () => buttonTestUtils.getButtonIn(getContainer(), 'sync')
const clickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

// execute task
const getExecuteTaskItem = () => menuTestUtils.getMenuItem(/выполнить заявку/i)
const clickExecuteTaskItem = (user: UserEvent) =>
  menuTestUtils.clickMenuItem(/выполнить заявку/i, user)

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
  expectMenuItemDisabled,
  expectMenuItemNotDisabled,

  getExecuteTaskItem,
  clickExecuteTaskItem,

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
    render(<TaskDetailsTitle {...props} />)
    expect(testUtils.getChildByText(String(props.id))).toBeInTheDocument()
  })

  describe('Кнопка перезапроса заявки', () => {
    test('Отображается корректно', () => {
      render(<TaskDetailsTitle {...props} />)

      const button = testUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskDetailsTitle {...props} />)

      await testUtils.clickReloadButton(user)
      expect(props.onReloadTask).toBeCalledTimes(1)
    })
  })

  describe('Кнопка меню', () => {
    test('Отображается корректно', () => {
      render(<TaskDetailsTitle {...props} />)

      const button = testUtils.getMenuButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает меню', async () => {
      const { user } = render(<TaskDetailsTitle {...props} />)

      const { menu } = await testUtils.openMenu(user)
      expect(menu).toBeInTheDocument()
    })
  })

  describe('Меню', () => {
    test('Отображает корректное количество элементов', async () => {
      const { user } = render(<TaskDetailsTitle {...props} />)

      await testUtils.openMenu(user)
      expect(menuTestUtils.getMenuItems()).toHaveLength(3)
    })

    describe('Элемент "Выполнить заявку"', () => {
      test('Отображается', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />)

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskItem()
        const icon = testUtils.getMenuItemIcon(item, 'check-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике вызывается обработчик', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...activeExecuteTaskItemProps} />, {
          store: getStoreWithAuth({ userId: activeExecuteTaskItemProps.assignee!.id }),
        })

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskItem(user)
        expect(props.onExecuteTask).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...activeExecuteTaskItemProps} />, {
          store: getStoreWithAuth({ userId: activeExecuteTaskItemProps.assignee!.id }),
        })

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getExecuteTaskItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Если роль пользователя ${UserRoleEnum.FirstLineSupport} и есть рабочая группа`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeExecuteTaskItemProps}
              workGroup={taskFixtures.workGroup()}
            />,
            {
              store: getStoreWithAuth({
                userId: activeExecuteTaskItemProps.assignee!.id,
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test('Но заявка не в статусе - "В процессе"', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeExecuteTaskItemProps}
              status={TaskStatusEnum.New}
            />,
            { store: getStoreWithAuth({ userId: activeExecuteTaskItemProps.assignee!.id }) },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test('Но исполнитель заявки не является авторизованным пользователем', async () => {
          const { user } = render(<TaskDetailsTitle {...props} {...activeExecuteTaskItemProps} />, {
            store: getStoreWithAuth(),
          })

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test('Но есть запрос на переклассификацию', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeExecuteTaskItemProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
            { store: getStoreWithAuth({ userId: activeExecuteTaskItemProps.assignee!.id }) },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test(`Но запрос на ожидание имеет статус ${SuspendRequestStatusEnum.New}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeExecuteTaskItemProps}
              suspendRequest={taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.New,
              })}
            />,
            { store: getStoreWithAuth({ userId: activeExecuteTaskItemProps.assignee!.id }) },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test(`Но запрос на ожидание имеет статус ${SuspendRequestStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeExecuteTaskItemProps}
              suspendRequest={taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.InProgress,
              })}
            />,
            { store: getStoreWithAuth({ userId: activeExecuteTaskItemProps.assignee!.id }) },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })
      })
    })

    describe('Элемент "Запросить переклассификацию"', () => {
      test('Отображается корректно если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} extendedStatus={TaskExtendedStatusEnum.New} />,
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
          { store: getStoreWithAuth() },
        )

        await testUtils.openMenu(user)
        await testUtils.clickRequestReclassificationItem(user)
        expect(props.onRequestReclassification).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle {...props} {...activeRequestReclassificationItemProps} />,
          {
            store: getStoreWithAuth(),
          },
        )

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getRequestReclassificationItem())
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
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но заявка не в статусе - ${TaskStatusEnum.New}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              status={TaskStatusEnum.InProgress}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но заявка не имеет ola статуса - ${TaskOlaStatusEnum.NotExpired}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              olaStatus={TaskOlaStatusEnum.Expired}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но заявка имеет ola статус - ${TaskOlaStatusEnum.HalfExpired}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              olaStatus={TaskOlaStatusEnum.HalfExpired}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но тип заявки - ${TaskTypeEnum.RequestTask}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но тип заявки - ${TaskTypeEnum.IncidentTask}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.IncidentTask}
            />,
            { store: getStoreWithAuth() },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test(`Но у пользователя роль - ${UserRoleEnum.Engineer}`, async () => {
          const { user } = render(
            <TaskDetailsTitle {...props} {...activeRequestReclassificationItemProps} />,
            {
              store: getStoreWithAuth({ userRole: UserRoleEnum.Engineer }),
            },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })

        test('Но у заявки есть запрос на ожидание', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              suspendRequest={taskFixtures.suspendRequest()}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestReclassificationItem())
        })
      })
    })

    describe('Элемент "Отменить переклассификацию"', () => {
      test('Отображается корректно если условия соблюдены', async () => {
        const { user } = render(
          <TaskDetailsTitle
            {...props}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
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
        )

        await testUtils.openMenu(user)

        expect(testUtils.queryCancelReclassificationItem()).not.toBeInTheDocument()
      })
    })

    describe('Элемент "Запросить перевод в ожидание"', () => {
      test('Отображается корректно', async () => {
        const { user } = render(<TaskDetailsTitle {...props} />)

        await testUtils.openMenu(user)
        const item = testUtils.getRequestSuspendItem()
        const icon = testUtils.getMenuItemIcon(item, 'pause-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...activeRequestSuspendItemProps} />)

        await testUtils.openMenu(user)
        await testUtils.clickRequestSuspendItem(user)
        expect(props.onRequestSuspend).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(<TaskDetailsTitle {...props} {...activeRequestSuspendItemProps} />)

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getRequestSuspendItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Если роль пользователя ${UserRoleEnum.FirstLineSupport} и есть рабочая группа`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              workGroup={taskFixtures.workGroup()}
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        test(`Но заявка не в статусе - ${TaskStatusEnum.New} или ${TaskStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              status={TaskStatusEnum.Completed}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        test(`Но тип заявки не - ${TaskTypeEnum.Request} или ${TaskTypeEnum.Incident}`, async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        test('Но заявка имеет запрос на ожидание', async () => {
          const { user } = render(
            <TaskDetailsTitle
              {...props}
              {...activeRequestSuspendItemProps}
              suspendRequest={taskFixtures.suspendRequest()}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })
      })
    })
  })
})
