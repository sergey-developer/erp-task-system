import { getStoreWithAuth, render } from '_tests_/utils'
import {
  TaskExtendedStatusEnum,
  TaskOlaStatusEnum,
  TaskStatusEnum,
  TaskTypeEnum,
} from 'modules/task/constants/common'
import { UserRoleEnum } from 'shared/constants/roles'

import CardTitle from '../index'
import {
  activeFirstItemProps,
  activeSecondItemProps,
  requiredProps,
} from './constants'
import testUtils from './utils'

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
      expect(testUtils.getMenuItems()).toHaveLength(2)
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
