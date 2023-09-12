import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  SuspendRequestStatusEnum,
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants'
import { UserRoleEnum } from 'modules/user/constants'

import taskFixtures from '_tests_/fixtures/task'

import {
  fakeId,
  iconTestUtils,
  getStoreWithAuth,
  render, buttonTestUtils
} from "_tests_/utils";

import CardTitle, { CardTitleProps } from './index'

const props: Readonly<CardTitleProps> = {
  id: fakeId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  isAssignedToCurrentUser: false,
  workGroup: null,
  suspendRequest: null,
  onClose: jest.fn(),
  onExecuteTask: jest.fn(),
  onReloadTask: jest.fn(),
  onRequestSuspend: jest.fn(),
  onRequestReclassification: jest.fn(),
}

export const activeExecuteTaskItemProps: Readonly<
  Pick<
    CardTitleProps,
    | 'status'
    | 'extendedStatus'
    | 'isAssignedToCurrentUser'
    | 'suspendRequest'
    | 'workGroup'
  >
> = {
  status: TaskStatusEnum.InProgress,
  extendedStatus: TaskExtendedStatusEnum.New,
  isAssignedToCurrentUser: true,
  suspendRequest: null,
  workGroup: null,
}

export const activeRequestReclassificationItemProps: Readonly<
  Pick<
    CardTitleProps,
    'status' | 'olaStatus' | 'type' | 'suspendRequest' | 'workGroup'
  >
> = {
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
  workGroup: null,
}

export const activeRequestSuspendItemProps: Readonly<
  Pick<CardTitleProps, 'status' | 'type' | 'suspendRequest' | 'workGroup'>
> = {
  status: TaskStatusEnum.New,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
  workGroup: null,
}

const getContainer = () => screen.getByTestId('task-card-title')

const queryContainer = () => screen.queryByTestId('task-card-title')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => buttonTestUtils.getButtonIn(getContainer(), 'menu')

const getMenu = () => screen.getByRole('menu')

const findMenu = () => screen.findByRole('menu')

const getMenuItem = (name: string | RegExp) =>
  within(getMenu()).getByRole('menuitem', { name })

const queryMenuItem = (name: string | RegExp) =>
  within(getMenu()).queryByRole('menuitem', { name })

const getMenuItems = () => within(getMenu()).getAllByRole('menuitem')

const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  iconTestUtils.getIconByNameIn(item, iconName)

const queryMenuItemText = (item: HTMLElement, text: string) =>
  within(item).queryByText(text)

const clickMenuItem = async (user: UserEvent, name: string | RegExp) => {
  const item = getMenuItem(name)
  await user.click(item)
  return item
}

const openMenu = async (user: UserEvent) => {
  const button = getMenuButton()
  await user.hover(button)
  const menu = await findMenu()
  return { button, menu }
}

const expectMenuItemDisabled = (item: HTMLElement) =>
  expect(item).toHaveClass('ant-dropdown-menu-item-disabled')

const expectMenuItemNotDisabled = (item: HTMLElement) =>
  expect(item).not.toHaveClass('ant-dropdown-menu-item-disabled')

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), 'close')

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// reload button
const getReloadButton = () => buttonTestUtils.getButtonIn(getContainer(), 'sync')

const clickReloadButton = async (user: UserEvent) => {
  const button = getReloadButton()
  await user.click(button)
  return button
}

// execute task
const getExecuteTaskItem = () => getMenuItem(/выполнить заявку/i)

const clickExecuteTaskItem = (user: UserEvent) =>
  clickMenuItem(user, /выполнить заявку/i)

// request reclassification
const getRequestReclassificationItem = () =>
  getMenuItem(/запросить переклассификацию/i)

const queryRequestReclassificationItem = () =>
  queryMenuItem(/запросить переклассификацию/i)

const clickRequestReclassificationItem = (user: UserEvent) =>
  clickMenuItem(user, /запросить переклассификацию/i)

// cancel reclassification

const getCancelReclassificationItem = () =>
  getMenuItem(/отменить переклассификацию/i)

const queryCancelReclassificationItem = () =>
  queryMenuItem(/отменить переклассификацию/i)

const clickCancelReclassificationItem = (user: UserEvent) =>
  clickMenuItem(user, /отменить переклассификацию/i)

// request suspend

const getRequestSuspendItem = () => getMenuItem(/запросить перевод в ожидание/i)

const clickRequestSuspendItem = (user: UserEvent) =>
  clickMenuItem(user, /запросить перевод в ожидание/i)

export const testUtils = {
  getContainer,
  queryContainer,
  getChildByText,

  getMenuButton,
  findMenu,
  getMenuItems,
  getMenuItemIcon,
  queryMenuItemText,
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

  getCloseButton,
  clickCloseButton,

  getReloadButton,
  clickReloadButton,
}

describe('Заголовок карточки заявки', () => {
  test('Идентификатор заявки отображается', () => {
    render(<CardTitle {...props} />)
    expect(testUtils.getChildByText(String(props.id))).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<CardTitle {...props} />)

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<CardTitle {...props} />)

      await testUtils.clickCloseButton(user)
      expect(props.onClose).toBeCalledTimes(1)
    })
  })

  describe('Кнопка перезапроса заявки', () => {
    test('Отображается корректно', () => {
      render(<CardTitle {...props} />)

      const button = testUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<CardTitle {...props} />)

      await testUtils.clickReloadButton(user)
      expect(props.onReloadTask).toBeCalledTimes(1)
    })
  })

  describe('Кнопка меню', () => {
    test('Отображается корректно', () => {
      render(<CardTitle {...props} />)

      const button = testUtils.getMenuButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает меню', async () => {
      const { user } = render(<CardTitle {...props} />)

      const { menu } = await testUtils.openMenu(user)
      expect(menu).toBeInTheDocument()
    })
  })

  describe('Меню', () => {
    test('Отображает корректное количество элементов', async () => {
      const { user } = render(<CardTitle {...props} />)

      await testUtils.openMenu(user)
      expect(testUtils.getMenuItems()).toHaveLength(3)
    })

    describe('Элемент "Выполнить заявку"', () => {
      test('Отображается корректно', async () => {
        const { user } = render(<CardTitle {...props} />)

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskItem()
        const icon = testUtils.getMenuItemIcon(item, 'check-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <CardTitle {...props} {...activeExecuteTaskItemProps} />,
        )

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskItem(user)
        expect(props.onExecuteTask).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle {...props} {...activeExecuteTaskItemProps} />,
        )

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getExecuteTaskItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Если роль пользователя ${UserRoleEnum.FirstLineSupport} и есть рабочая группа`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeExecuteTaskItemProps}
              workGroup={taskFixtures.workGroup()}
            />,
            {
              store: getStoreWithAuth({
                userRole: UserRoleEnum.FirstLineSupport,
              }),
            },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test('Но заявка не в статусе - "В процессе"', async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeExecuteTaskItemProps}
              status={TaskStatusEnum.New}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test('Но исполнитель заявки не является авторизованным пользователем', async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeExecuteTaskItemProps}
              isAssignedToCurrentUser={false}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test('Но есть запрос на переклассификацию', async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeExecuteTaskItemProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test(`Но запрос на ожидание имеет статус ${SuspendRequestStatusEnum.New}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeExecuteTaskItemProps}
              suspendRequest={taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.New,
              })}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })

        test(`Но запрос на ожидание имеет статус ${SuspendRequestStatusEnum.InProgress}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeExecuteTaskItemProps}
              suspendRequest={taskFixtures.suspendRequest({
                status: SuspendRequestStatusEnum.InProgress,
              })}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getExecuteTaskItem())
        })
      })
    })

    describe('Элемент "Запросить переклассификацию"', () => {
      test('Отображается корректно если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle {...props} extendedStatus={TaskExtendedStatusEnum.New} />,
        )

        await testUtils.openMenu(user)
        const item = testUtils.getRequestReclassificationItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('Не отображается если есть запрос на переклассификацию', async () => {
        const { user } = render(
          <CardTitle
            {...props}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
        )

        await testUtils.openMenu(user)

        expect(
          testUtils.queryRequestReclassificationItem(),
        ).not.toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <CardTitle
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
          <CardTitle {...props} {...activeRequestReclassificationItemProps} />,
          {
            store: getStoreWithAuth(),
          },
        )

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(
          testUtils.getRequestReclassificationItem(),
        )
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Если роль пользователя ${UserRoleEnum.FirstLineSupport} и есть рабочая группа`, async () => {
          const { user } = render(
            <CardTitle
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

          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но заявка не в статусе - ${TaskStatusEnum.New}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              status={TaskStatusEnum.InProgress}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но заявка не имеет ola статуса - ${TaskOlaStatusEnum.NotExpired}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              olaStatus={TaskOlaStatusEnum.Expired}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но заявка имеет ola статус - ${TaskOlaStatusEnum.HalfExpired}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              olaStatus={TaskOlaStatusEnum.HalfExpired}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но тип заявки - ${TaskTypeEnum.RequestTask}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но тип заявки - ${TaskTypeEnum.IncidentTask}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              type={TaskTypeEnum.IncidentTask}
            />,
            { store: getStoreWithAuth() },
          )

          await testUtils.openMenu(user)

          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })

        test(`Но у пользователя роль - ${UserRoleEnum.Engineer}`, async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeRequestReclassificationItemProps}
            />,
            {
              store: getStoreWithAuth({ userRole: UserRoleEnum.Engineer }),
            },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })

        test('Но у заявки есть запрос на ожидание', async () => {
          const { user } = render(
            <CardTitle
              {...props}
              {...activeRequestReclassificationItemProps}
              suspendRequest={taskFixtures.suspendRequest()}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(
            testUtils.getRequestReclassificationItem(),
          )
        })
      })
    })

    describe('Элемент "Отменить переклассификацию"', () => {
      test('Отображается корректно если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle
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
          <CardTitle {...props} extendedStatus={TaskExtendedStatusEnum.New} />,
        )

        await testUtils.openMenu(user)

        expect(
          testUtils.queryCancelReclassificationItem(),
        ).not.toBeInTheDocument()
      })
    })

    describe('Элемент "Запросить перевод в ожидание"', () => {
      test('Отображается корректно', async () => {
        const { user } = render(<CardTitle {...props} />)

        await testUtils.openMenu(user)
        const item = testUtils.getRequestSuspendItem()
        const icon = testUtils.getMenuItemIcon(item, 'pause-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <CardTitle {...props} {...activeRequestSuspendItemProps} />,
        )

        await testUtils.openMenu(user)
        await testUtils.clickRequestSuspendItem(user)
        expect(props.onRequestSuspend).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle {...props} {...activeRequestSuspendItemProps} />,
        )

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getRequestSuspendItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test(`Если роль пользователя ${UserRoleEnum.FirstLineSupport} и есть рабочая группа`, async () => {
          const { user } = render(
            <CardTitle
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
            <CardTitle
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
            <CardTitle
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
            <CardTitle
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
