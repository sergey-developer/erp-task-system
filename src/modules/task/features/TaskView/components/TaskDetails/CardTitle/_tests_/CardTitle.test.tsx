import { render } from '_tests_/utils'

import CardTitle from '../index'
import { requiredProps } from './constants'
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

    describe('Выполнить заявку', () => {
      test('Отображается корректно', () => {
        render(<CardTitle {...requiredProps} />)

        const item = testUtils.getFirstMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'check-circle')
        const text = testUtils.getMenuItemText(item, 'Выполнить заявку')

        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
      })
    })

    describe('Запросить переклассификацию', () => {
      test('Отображается корректно если нет запроса на переклассификацию', () => {
        render(
          <CardTitle {...requiredProps} hasReclassificationRequest={false} />,
        )

        const item = testUtils.getSecondMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')
        const text = testUtils.getMenuItemText(
          item,
          'Запросить переклассификацию',
        )

        expect(icon).toBeInTheDocument()
        expect(text).toBeInTheDocument()
      })

      test('Отображается корректно если есть запрос на переклассификацию', () => {
        render(<CardTitle {...requiredProps} hasReclassificationRequest />)

        const item = testUtils.getSecondMenuItem()
        const icon = testUtils.getMenuItemIcon(item, 'question-circle')
        const text = testUtils.queryMenuItemText(
          item,
          'Запросить переклассификацию',
        )

        expect(icon).toBeInTheDocument()
        expect(text).not.toBeInTheDocument()
      })
    })

    describe('Отменить переклассификацию', () => {
      test('Отображается корректно', () => {})
    })
  })
})
