import { getShortUserName } from 'features/user/utils'

import { formatDate } from 'shared/utils/date'

import { props } from '_tests_/features/tasks/components/TaskSuspendRequest/constants'
import {
  cancelRequestAction,
  returnInWorkAction,
  taskSuspendRequestTestUtils,
} from '_tests_/features/tasks/components/TaskSuspendRequest/testUtils'
import { render } from '_tests_/utils'

import TaskSuspendRequest from './index'

describe('Запрос заявки на ожидание', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(taskSuspendRequestTestUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(taskSuspendRequestTestUtils.getChildByText(props.title)).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(taskSuspendRequestTestUtils.getChildByText(props.comment)).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(
        taskSuspendRequestTestUtils.getChildByText(getShortUserName(props.user!)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(
        taskSuspendRequestTestUtils.getChildByText(`до ${formatDate(props.date)}`),
      ).toBeInTheDocument()
    })
  })

  describe('Кнопка отмены запроса', () => {
    test('Отображается если присутствует', () => {
      render(<TaskSuspendRequest {...props} action={cancelRequestAction} />)

      const button = taskSuspendRequestTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(taskSuspendRequestTestUtils.queryCancelButton()).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      // @ts-ignore
      render(<TaskSuspendRequest {...props} action={{ ...cancelRequestAction, disabled: true }} />)
      expect(taskSuspendRequestTestUtils.getCancelButton()).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      // @ts-ignore
      render(<TaskSuspendRequest {...props} action={{ ...cancelRequestAction, loading: true }} />)
      await taskSuspendRequestTestUtils.expectCancelRequestLoadingStarted()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskSuspendRequest {...props} action={cancelRequestAction} />)

      await taskSuspendRequestTestUtils.clickCancelButton(user)
      // @ts-ignore
      expect(cancelRequestAction.onClick).toBeCalledTimes(1)
    })
  })

  describe('Кнопка возврата в работу', () => {
    test('Отображается если присутствует', () => {
      render(<TaskSuspendRequest {...props} action={returnInWorkAction} />)

      const button = taskSuspendRequestTestUtils.getReturnToWorkButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(taskSuspendRequestTestUtils.queryReturnToWorkButton()).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      // @ts-ignore
      render(<TaskSuspendRequest {...props} action={{ ...returnInWorkAction, disabled: true }} />)
      expect(taskSuspendRequestTestUtils.getReturnToWorkButton()).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      // @ts-ignore
      render(<TaskSuspendRequest {...props} action={{ ...returnInWorkAction, loading: true }} />)
      await taskSuspendRequestTestUtils.expectReturnToWorkLoadingStarted()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskSuspendRequest {...props} action={returnInWorkAction} />)

      await taskSuspendRequestTestUtils.clickReturnToWorkButton(user)
      // @ts-ignore
      expect(returnInWorkAction.onClick).toBeCalledTimes(1)
    })
  })
})
