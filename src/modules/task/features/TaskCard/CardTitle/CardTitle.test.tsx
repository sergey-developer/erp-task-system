import {
  generateId,
  getButtonIn,
  getIconByNameIn,
  getStoreWithAuth,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { UserRoleEnum } from 'shared/constants/roles'

import CardTitle, { CardTitleProps } from './index'

const requiredProps: CardTitleProps = {
  id: generateId(),
  type: TaskTypeEnum.Request,
  status: TaskStatusEnum.New,
  extendedStatus: TaskExtendedStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  isAssignedToCurrentUser: false,
  hasSuspendRequest: false,
  onClose: jest.fn(),
  onClickExecuteTask: jest.fn(),
  onClickRequestSuspend: jest.fn(),
  onClickRequestReclassification: jest.fn(),
}

export const activeFirstItemProps: Pick<
  CardTitleProps,
  'status' | 'extendedStatus' | 'isAssignedToCurrentUser'
> = {
  status: TaskStatusEnum.InProgress,
  extendedStatus: TaskExtendedStatusEnum.New,
  isAssignedToCurrentUser: true,
}

export const activeSecondItemProps: Pick<
  CardTitleProps,
  'status' | 'olaStatus' | 'type'
> = {
  status: TaskStatusEnum.New,
  olaStatus: TaskOlaStatusEnum.NotExpired,
  type: TaskTypeEnum.Request,
}

const getContainer = () => screen.getByTestId('task-card-title')

const queryContainer = () => screen.queryByTestId('task-card-title')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// menu
const getMenuButton = () => getButtonIn(getContainer(), 'menu')
const getMenu = () => screen.getByRole('menu')
const findMenu = () => screen.findByRole('menu')
const getMenuItems = () => within(getMenu()).getAllByRole('menuitem')
const getFirstMenuItem = () => getMenuItems()[1]
const getSecondMenuItem = () => getMenuItems()[2]

const getMenuItemIcon = (item: HTMLElement, iconName: string) =>
  getIconByNameIn(item, iconName)

const getMenuItemText = (item: HTMLElement, text: string) =>
  within(item).getByText(text)

const queryMenuItemText = (item: HTMLElement, text: string) =>
  within(item).queryByText(text)

const userClickFirstMenuItem = async (user: UserEvent) => {
  const item = getFirstMenuItem()
  await user.click(item)
  return item
}

const userClickSecondMenuItem = async (user: UserEvent) => {
  const item = getSecondMenuItem()
  await user.click(item)
  return item
}

const userOpenMenu = async (user: UserEvent) => {
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

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  queryContainer,
  getChildByText,

  getMenuButton,
  findMenu,
  getMenuItems,
  getFirstMenuItem,
  getSecondMenuItem,
  getMenuItemIcon,
  getMenuItemText,
  queryMenuItemText,
  userOpenMenu,
  userClickFirstMenuItem,
  userClickSecondMenuItem,
  expectMenuItemDisabled,
  expectMenuItemNotDisabled,

  getCloseButton,
  userClickCloseButton,
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

      await testUtils.userClickCloseButton(user)
      expect(requiredProps.onClose).toBeCalledTimes(1)
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

      const { menu } = await testUtils.userOpenMenu(user)
      expect(menu).toBeInTheDocument()
    })
  })

  describe('Меню', () => {
    test('Отображает корректное количество элементов', async () => {
      const { user } = render(<CardTitle {...requiredProps} />)

      await testUtils.userOpenMenu(user)
      expect(testUtils.getMenuItems()).toHaveLength(3)
    })

    describe('Элемент "Выполнить заявку"', () => {
      test('Отображается корректно', async () => {
        const { user } = render(<CardTitle {...requiredProps} />)

        await testUtils.userOpenMenu(user)
        const item = testUtils.getFirstMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'check-circle')
        const text = testUtils.getMenuItemText(item, 'Выполнить заявку')

        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно', async () => {
        const { user } = render(
          <CardTitle {...requiredProps} {...activeFirstItemProps} />,
        )

        await testUtils.userOpenMenu(user)
        await testUtils.userClickFirstMenuItem(user)
        expect(requiredProps.onClickExecuteTask).toBeCalledTimes(1)
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle {...requiredProps} {...activeFirstItemProps} />,
        )

        await testUtils.userOpenMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getFirstMenuItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test('Но заявка не имеет статуса - в процессе', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeFirstItemProps}
              status={TaskStatusEnum.New}
            />,
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getFirstMenuItem())
        })

        test('Но исполнитель заявки не является авторизованным пользователем', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeFirstItemProps}
              isAssignedToCurrentUser={false}
            />,
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getFirstMenuItem())
        })

        test('Но есть запрос на переклассификацию', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeFirstItemProps}
              extendedStatus={TaskExtendedStatusEnum.InReclassification}
            />,
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getFirstMenuItem())
        })
      })
    })

    describe('Элемент "Запросить переклассификацию"', () => {
      test('Отображается корректно если нет запроса на переклассификацию', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
        )

        await testUtils.userOpenMenu(user)
        const item = testUtils.getSecondMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')
        const text = testUtils.getMenuItemText(
          item,
          'Запросить переклассификацию',
        )

        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
      })

      test('Отображается корректно если есть запрос на переклассификацию', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
        )

        await testUtils.userOpenMenu(user)
        const item = testUtils.getSecondMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')
        const text = testUtils.queryMenuItemText(
          item,
          'Запросить переклассификацию',
        )

        expect(icon).toBeInTheDocument()
        expect(text).not.toBeInTheDocument()
      })

      test('При клике обработчик вызывается корректно если нет запроса на переклассификацию', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
            {...activeSecondItemProps}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
          { store: getStoreWithAuth() },
        )

        await testUtils.userOpenMenu(user)
        await testUtils.userClickSecondMenuItem(user)
        expect(requiredProps.onClickRequestReclassification).toBeCalledTimes(1)
      })

      test('При клике обработчик вызывается корректно если есть запрос на переклассификацию', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
            {...activeSecondItemProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
          { store: getStoreWithAuth() },
        )

        await testUtils.userOpenMenu(user)
        await testUtils.userClickSecondMenuItem(user)
        expect(requiredProps.onClickRequestReclassification).not.toBeCalled()
      })

      test('Активен если условия соблюдены', async () => {
        const { user } = render(
          <CardTitle {...requiredProps} {...activeSecondItemProps} />,
          {
            store: getStoreWithAuth(),
          },
        )

        await testUtils.userOpenMenu(user)
        testUtils.expectMenuItemNotDisabled(testUtils.getSecondMenuItem())
      })

      describe('Не активен если условия соблюдены', () => {
        test('Но заявка не имеет статуса - новая', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeSecondItemProps}
              status={TaskStatusEnum.InProgress}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getSecondMenuItem())
        })

        test('Но заявка не имеет ola статуса - не истекла', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeSecondItemProps}
              olaStatus={TaskOlaStatusEnum.Expired}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getSecondMenuItem())
        })

        test('Но заявка имеет ola статус - на половину истекла', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeSecondItemProps}
              olaStatus={TaskOlaStatusEnum.HalfExpired}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getSecondMenuItem())
        })

        test('Но тип заявки - request task', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeSecondItemProps}
              type={TaskTypeEnum.RequestTask}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getSecondMenuItem())
        })

        test('Но тип заявки - incident task', async () => {
          const { user } = render(
            <CardTitle
              {...requiredProps}
              {...activeSecondItemProps}
              type={TaskTypeEnum.IncidentTask}
            />,
            {
              store: getStoreWithAuth(),
            },
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getSecondMenuItem())
        })

        test('Но у пользователя роль - инженер', async () => {
          const { user } = render(
            <CardTitle {...requiredProps} {...activeSecondItemProps} />,
            {
              store: getStoreWithAuth({ userRole: UserRoleEnum.Engineer }),
            },
          )

          await testUtils.userOpenMenu(user)
          testUtils.expectMenuItemDisabled(testUtils.getSecondMenuItem())
        })
      })
    })

    describe('Элемент "Отменить переклассификацию"', () => {
      test('Отображается корректно если нет запроса на переклассификацию', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
            extendedStatus={TaskExtendedStatusEnum.New}
          />,
        )

        await testUtils.userOpenMenu(user)
        const item = testUtils.getSecondMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')
        const text = testUtils.queryMenuItemText(
          item,
          'Отменить переклассификацию',
        )

        expect(icon).toBeInTheDocument()
        expect(text).not.toBeInTheDocument()
      })

      test('Отображается корректно если есть запрос на переклассификацию', async () => {
        const { user } = render(
          <CardTitle
            {...requiredProps}
            extendedStatus={TaskExtendedStatusEnum.InReclassification}
          />,
        )

        await testUtils.userOpenMenu(user)
        const item = testUtils.getSecondMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')
        const text = testUtils.getMenuItemText(
          item,
          'Отменить переклассификацию',
        )

        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
      })
    })
  })
})
