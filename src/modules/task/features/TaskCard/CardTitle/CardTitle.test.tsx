import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { UserRoleEnum } from 'modules/user/constants/roles'

import {
  fakeId,
  getButtonIn,
  getIconByNameIn,
  getStoreWithAuth,
  render,
} from '_tests_/utils'

import CardTitle, { CardTitleProps } from './index'

const requiredProps: CardTitleProps = {
  id: fakeId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  isAssignedToCurrentUser: false,
  suspendRequest: null,
  onClose: jest.fn(),
  onExecuteTask: jest.fn(),
  onReloadTask: jest.fn(),
  onRequestSuspend: jest.fn(),
  onRequestReclassification: jest.fn(),
}

export const activeExecuteTaskItemProps: Pick<
  CardTitleProps,
  'status' | 'extendedStatus' | 'isAssignedToCurrentUser' | 'suspendRequest'
> = {
  status: TaskStatusEnum.InProgress,
  extendedStatus: TaskExtendedStatusEnum.New,
  isAssignedToCurrentUser: true,
  suspendRequest: null,
}

export const activeRequestReclassificationItemProps: Pick<
  CardTitleProps,
  'status' | 'olaStatus' | 'type' | 'suspendRequest'
> = {
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
}

export const activeRequestSuspendItemProps: Pick<
  CardTitleProps,
  'status' | 'type' | 'suspendRequest'
> = {
  status: TaskStatusEnum.New,
  type: TaskTypeEnum.Request,
  suspendRequest: null,
}

const getContainer = () => screen.getByTestId('task-card-title')

const queryContainer = () => screen.queryByTestId('task-card-title')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => getButtonIn(getContainer(), 'menu')

const getMenu = () => screen.getByRole('menu')

const findMenu = () => screen.findByRole('menu')

const getMenuItem = (name: string | RegExp) =>
  within(getMenu()).getByRole('menuitem', { name })

const queryMenuItem = (name: string | RegExp) =>
  within(getMenu()).queryByRole('menuitem', { name })

const getMenuItems = () => within(getMenu()).getAllByRole('menuitem')

const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  getIconByNameIn(item, iconName)

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
const getCloseButton = () => getButtonIn(getContainer(), 'close')

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// reload button
const getReloadButton = () => getButtonIn(getContainer(), 'sync')

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
    render(<CardTitle {...requiredProps} />)

    expect(
      testUtils.getChildByText(String(requiredProps.id)),
    ).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<CardTitle {...requiredProps} />)

      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<CardTitle {...requiredProps} />)

      await testUtils.clickCloseButton(user)
      expect(requiredProps.onClose).toBeCalledTimes(1)
    })
  })

  describe('Кнопка перезапроса заявки', () => {
    test('Отображается корректно', () => {
      render(<CardTitle {...requiredProps} />)

      const button = testUtils.getReloadButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<CardTitle {...requiredProps} />)

      await testUtils.clickReloadButton(user)
      expect(requiredProps.onReloadTask).toBeCalledTimes(1)
    })
  })

  describe('Кнопка меню', () => {
    test('Отображается корректно', () => {
      render(<CardTitle {...requiredProps} />)

      const button = testUtils.getMenuButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Открывает меню', async () => {
      const { user } = render(<CardTitle {...requiredProps} />)

      const { menu } = await testUtils.openMenu(user)
      expect(menu).toBeInTheDocument()
    })
  })

  describe('Меню', () => {
    test('Отображает корректное количество элементов', async () => {
      const { user } = render(<CardTitle {...requiredProps} />)

      await testUtils.openMenu(user)
      expect(testUtils.getMenuItems()).toHaveLength(3)
    })

    describe('Элемент "Выполнить заявку"', () => {
      test('Отображается корректно', async () => {
        const { user } = render(<CardTitle {...requiredProps} />)

        await testUtils.openMenu(user)
        const item = testUtils.getExecuteTaskItem()
        const icon = testUtils.getMenuItemIcon(item, 'check-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <CardTitle {...requiredProps} {...activeExecuteTaskItemProps} />,
        )

        await testUtils.openMenu(user)
        await testUtils.clickExecuteTaskItem(user)
        expect(requiredProps.onExecuteTask).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle {...requiredProps} {...activeExecuteTaskItemProps} />,
        )

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getExecuteTaskItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test('Но заявка не в статусе - "В процессе"', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
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
              {...requiredProps}
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
              {...requiredProps}
              {...activeExecuteTaskItemProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
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
          <CardTitle
            {...requiredProps}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
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
            {...requiredProps}
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
            {...requiredProps}
            {...activeRequestReclassificationItemProps}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
          { store: getStoreWithAuth() },
        )

        await testUtils.openMenu(user)
        await testUtils.clickRequestReclassificationItem(user)
        expect(requiredProps.onRequestReclassification).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
            {...activeRequestReclassificationItemProps}
          />,
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
        test('Но заявка не в статусе - новая', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
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

        test('Но заявка не имеет ola статуса - не истекла', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
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

        test('Но заявка имеет ola статус - на половину истекла', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
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

        test('Но тип заявки - request task', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
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

        test('Но тип заявки - incident task', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
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
              {...requiredProps}
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

        // todo
        // test('Но у заявки есть запрос на ожидание', async () => {
        //   const { user } = render(
        //     <CardTitle
        //       {...requiredProps}
        //       {...activeRequestReclassificationItemProps}
        //       hasSuspendRequest
        //     />,
        //     { store: getStoreWithAuth() },
        //   )
        //
        //   await testUtils.openMenu(user)
        //
        //   testUtils.expectMenuItemDisabled(
        //     testUtils.getRequestReclassificationItem(),
        //   )
        // })
      })
    })

    describe('Элемент "Отменить переклассификацию"', () => {
      test('Отображается корректно если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
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
          <CardTitle
            {...requiredProps}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
        )

        await testUtils.openMenu(user)

        expect(
          testUtils.queryCancelReclassificationItem(),
        ).not.toBeInTheDocument()
      })
    })

    describe('Элемент "Запросить перевод в ожидание"', () => {
      test('Отображается корректно', async () => {
        const { user } = render(<CardTitle {...requiredProps} />)

        await testUtils.openMenu(user)
        const item = testUtils.getRequestSuspendItem()
        const icon = testUtils.getMenuItemIcon(item, 'pause-circle')

        expect(item).toBeInTheDocument()
        expect(icon).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <CardTitle {...requiredProps} {...activeRequestSuspendItemProps} />,
        )

        await testUtils.openMenu(user)
        await testUtils.clickRequestSuspendItem(user)
        expect(requiredProps.onRequestSuspend).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle {...requiredProps} {...activeRequestSuspendItemProps} />,
        )

        await testUtils.openMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getRequestSuspendItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test('Но заявка не в статусе - "Новая" или "В процессе"', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeRequestSuspendItemProps}
              status={TaskStatusEnum.Completed}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        test('Но тип заявки не - "Request" или "Incident"', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeRequestSuspendItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
          )

          await testUtils.openMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        })

        // todo
        // test('Но заявка имеет запрос на ожидание', async () => {
        //   const { user } = render(
        //     <CardTitle
        //       {...requiredProps}
        //       {...activeRequestSuspendItemProps}
        //       hasSuspendRequest
        //     />,
        //   )
        //
        //   await testUtils.openMenu(user)
        //   testUtils.expectMenuItemDisabled(testUtils.getRequestSuspendItem())
        // })
      })
    })
  })
})
