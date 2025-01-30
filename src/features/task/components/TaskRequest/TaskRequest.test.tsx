import { getShortUserName } from 'features/user/utils'

import { action, props } from '_tests_/features/tasks/components/TaskRequest/constants'
import { taskRequestTestUtils } from '_tests_/features/tasks/components/TaskRequest/testUtils'
import { fakeWord, render } from '_tests_/utils'

import TaskRequest from './index'

describe('Запрос заявки', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskRequest {...props} />)
      expect(taskRequestTestUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskRequest {...props} />)
      expect(taskRequestTestUtils.getChildByText(props.title)).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskRequest {...props} />)
      expect(taskRequestTestUtils.getChildByText(props.comment)).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskRequest {...props} />)
      expect(taskRequestTestUtils.getChildByText(getShortUserName(props.user!))).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskRequest {...props} />)
      expect(taskRequestTestUtils.getChildByText(props.date)).toBeInTheDocument()
    })
  })

  test('Можно отобразить несколько кнопок', () => {
    const actions = [...props.actions, { text: fakeWord() }]

    render(<TaskRequest {...props} actions={actions} />)

    actions.forEach((action) => {
      const button = taskRequestTestUtils.getActionButton(action.text)
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Кнопка', () => {
    test('Отображается если присутствует', () => {
      render(<TaskRequest {...props} />)

      const button = taskRequestTestUtils.getActionButton(action.text)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskRequest {...props} actions={[]} />)
      expect(taskRequestTestUtils.queryActionButton(action.text)).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      render(<TaskRequest {...props} actions={[{ ...action, disabled: true }]} />)
      expect(taskRequestTestUtils.getActionButton(action.text)).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<TaskRequest {...props} actions={[{ ...action, loading: true }]} />)
      await taskRequestTestUtils.expectActionLoadingStarted(action.text)
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskRequest {...props} />)

      await taskRequestTestUtils.clickActionButton(user, action.text)
      expect(action.onClick).toBeCalledTimes(1)
    })
  })
})
