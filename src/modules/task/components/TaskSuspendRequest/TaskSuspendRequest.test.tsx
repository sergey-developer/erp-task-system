import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { getShortUserName } from 'modules/user/utils'

import { formatDate } from 'shared/utils/date'

import userFixtures from '_tests_/fixtures/user'
import { fakeDateString, fakeWord, iconTestUtils, render, buttonTestUtils } from '_tests_/utils'

import TaskSuspendRequest, { TaskSuspendRequestProps } from './index'

const props: Readonly<Omit<TaskSuspendRequestProps, 'action'>> = {
  user: userFixtures.baseUser(),
  title: fakeWord(),
  comment: fakeWord(),
  date: fakeDateString(),
}

export const cancelRequestAction: TaskSuspendRequestProps['action'] = {
  text: 'Отменить запрос',
  onClick: jest.fn(),
}

export const returnInWorkAction: TaskSuspendRequestProps['action'] = {
  text: 'Вернуть в работу',
  onClick: jest.fn(),
}

const getContainer = () => screen.getByTestId('task-card-suspend-request')

const findContainer = () => screen.findByTestId('task-card-suspend-request')

const queryContainer = () => screen.queryByTestId('task-card-suspend-request')

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

const getIcon = () => iconTestUtils.getIconByNameIn(getContainer(), 'pause-circle')

// cancel button
const getCancelButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), new RegExp(cancelRequestAction.text))

const queryCancelButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), new RegExp(cancelRequestAction.text))

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

const expectCancelRequestLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getCancelButton())

// return button
const getReturnToWorkButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), new RegExp(returnInWorkAction.text))

const queryReturnToWorkButton = () =>
  buttonTestUtils.queryButtonIn(getContainer(), new RegExp(returnInWorkAction.text))

const clickReturnToWorkButton = async (user: UserEvent) => {
  const button = getReturnToWorkButton()
  await user.click(button)
  return button
}

const expectReturnToWorkLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getReturnToWorkButton())

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
  clickReturnToWorkButton,
  expectReturnToWorkLoadingStarted,
}

describe('Запрос заявки на ожидание', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(testUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(testUtils.getChildByText(props.title)).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(testUtils.getChildByText(props.comment)).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskSuspendRequest {...props} />)

      expect(testUtils.getChildByText(getShortUserName(props.user))).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskSuspendRequest {...props} />)

      expect(testUtils.getChildByText(`до ${formatDate(props.date)}`)).toBeInTheDocument()
    })
  })

  describe('Кнопка отмены запроса', () => {
    test('Отображается если присутствует', () => {
      render(<TaskSuspendRequest {...props} action={cancelRequestAction} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(testUtils.queryCancelButton()).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      render(<TaskSuspendRequest {...props} action={{ ...cancelRequestAction, disabled: true }} />)

      expect(testUtils.getCancelButton()).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<TaskSuspendRequest {...props} action={{ ...cancelRequestAction, loading: true }} />)

      await expectCancelRequestLoadingStarted()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskSuspendRequest {...props} action={cancelRequestAction} />)

      await testUtils.clickCancelButton(user)
      expect(cancelRequestAction.onClick).toBeCalledTimes(1)
    })
  })

  describe('Кнопка возврата в работу', () => {
    test('Отображается если присутствует', () => {
      render(<TaskSuspendRequest {...props} action={returnInWorkAction} />)

      const button = testUtils.getReturnToWorkButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskSuspendRequest {...props} />)
      expect(testUtils.queryReturnToWorkButton()).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      render(<TaskSuspendRequest {...props} action={{ ...returnInWorkAction, disabled: true }} />)

      expect(testUtils.getReturnToWorkButton()).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<TaskSuspendRequest {...props} action={{ ...returnInWorkAction, loading: true }} />)

      await expectReturnToWorkLoadingStarted()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskSuspendRequest {...props} action={returnInWorkAction} />)

      await testUtils.clickReturnToWorkButton(user)
      expect(returnInWorkAction.onClick).toBeCalledTimes(1)
    })
  })
})
