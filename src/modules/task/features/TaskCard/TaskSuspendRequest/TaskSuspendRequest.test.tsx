import {
  generateDateString,
  generateWord,
  getButtonIn,
  getIconByNameIn,
  loadingStartedByButton,
  queryButtonIn,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import commonFixtures from 'fixtures/common'
import { getShortUserName } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

import TaskSuspendRequest, { TaskSuspendRequestProps } from './index'

const requiredProps: Omit<TaskSuspendRequestProps, 'action'> = {
  user: commonFixtures.getUser(),
  title: generateWord(),
  comment: generateWord(),
  date: generateDateString(),
}

export const cancelRequestAction: TaskSuspendRequestProps['action'] = {
  text: 'Отменить запрос',
  onClick: jest.fn(),
  loading: false,
  disabled: false,
}

export const returnInWorkAction: TaskSuspendRequestProps['action'] = {
  text: 'Вернуть в работу',
  onClick: jest.fn(),
  loading: false,
  disabled: true,
}

const getContainer = () => screen.getByTestId('task-card-suspend-request')

const findContainer = () => screen.findByTestId('task-card-suspend-request')

const queryContainer = () => screen.queryByTestId('task-card-suspend-request')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const getIcon = () => getIconByNameIn(getContainer(), 'pause-circle')

// cancel button
const getCancelButton = () =>
  getButtonIn(getContainer(), new RegExp(cancelRequestAction.text))

const queryCancelButton = () =>
  queryButtonIn(getContainer(), new RegExp(cancelRequestAction.text))

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

const expectCancelRequestLoadingStarted = () =>
  loadingStartedByButton(getCancelButton())

// return button
const getReturnToWorkButton = () =>
  getButtonIn(getContainer(), new RegExp(returnInWorkAction.text))

const queryReturnToWorkButton = () =>
  queryButtonIn(getContainer(), new RegExp(returnInWorkAction.text))

const userClickReturnToWorkButton = async (user: UserEvent) => {
  const button = getReturnToWorkButton()
  await user.click(button)
  return button
}

const expectReturnToWorkLoadingStarted = () =>
  loadingStartedByButton(getReturnToWorkButton())

export const testUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getChildByText,
  getIcon,

  getCancelButton,
  queryCancelButton,
  clickCancelButton,
  expectCancelRequestLoadingStarted,

  getReturnToWorkButton,
  queryReturnToWorkButton,
  userClickReturnToWorkButton,
  expectReturnToWorkLoadingStarted,
}

describe('Запрос заявки на ожидание', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskSuspendRequest {...requiredProps} />)
      expect(testUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskSuspendRequest {...requiredProps} />)
      expect(testUtils.getChildByText(requiredProps.title)).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskSuspendRequest {...requiredProps} />)
      expect(
        testUtils.getChildByText(requiredProps.comment),
      ).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskSuspendRequest {...requiredProps} />)

      expect(
        testUtils.getChildByText(getShortUserName(requiredProps.user)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskSuspendRequest {...requiredProps} />)

      expect(
        testUtils.getChildByText(
          formatDate(requiredProps.date, DATE_TIME_FORMAT),
        ),
      ).toBeInTheDocument()
    })
  })

  describe('Кнопка отмены запроса', () => {
    test('Отображается если присутствует', () => {
      render(
        <TaskSuspendRequest {...requiredProps} action={cancelRequestAction} />,
      )

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskSuspendRequest {...requiredProps} />)
      expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      render(
        <TaskSuspendRequest
          {...requiredProps}
          action={{ ...cancelRequestAction, disabled: true }}
        />,
      )

      expect(testUtils.getCancelButton()).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(
        <TaskSuspendRequest
          {...requiredProps}
          action={{ ...cancelRequestAction, loading: true }}
        />,
      )

      await expectCancelRequestLoadingStarted()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskSuspendRequest {...requiredProps} action={cancelRequestAction} />,
      )

      await testUtils.clickCancelButton(user)
      expect(cancelRequestAction.onClick).toBeCalledTimes(1)
    })
  })

  describe('Кнопка возврата в работу', () => {
    test('Отображается если присутствует', () => {
      render(
        <TaskSuspendRequest {...requiredProps} action={returnInWorkAction} />,
      )

      const button = testUtils.getReturnToWorkButton()

      expect(button).toBeInTheDocument()
      expect(button).not.toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskSuspendRequest {...requiredProps} />)
      expect(testUtils.queryReturnToWorkButton()).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      render(
        <TaskSuspendRequest
          {...requiredProps}
          action={{ ...returnInWorkAction, disabled: true }}
        />,
      )

      expect(testUtils.getReturnToWorkButton()).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(
        <TaskSuspendRequest
          {...requiredProps}
          action={{ ...returnInWorkAction, loading: true }}
        />,
      )

      await expectReturnToWorkLoadingStarted()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskSuspendRequest
          {...requiredProps}
          action={{ ...returnInWorkAction, disabled: false }}
        />,
      )

      await testUtils.userClickReturnToWorkButton(user)
      expect(returnInWorkAction.onClick).toBeCalledTimes(1)
    })
  })
})
