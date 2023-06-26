import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { getShortUserName } from 'modules/user/utils'

import { PauseCircleIcon } from 'components/Icons'

import { ArrayItem } from 'shared/interfaces/utils'

import commonFixtures from 'fixtures/common'

import {
  fakeDateString,
  fakeWord,
  getButtonIn,
  getIconByNameIn,
  expectLoadingStartedByButton,
  queryButtonIn,
  render,
} from '_tests_/utils'

import TaskRequest, { TaskRequestProps } from './index'

const action: ArrayItem<TaskRequestProps['actions']> = {
  text: fakeWord(),
  onClick: jest.fn(),
  disabled: false,
  loading: false,
}

const props: Readonly<TaskRequestProps & { 'data-testid': string }> = {
  user: commonFixtures.fakeUser(),
  title: fakeWord(),
  comment: fakeWord(),
  date: fakeDateString(),
  icon: <PauseCircleIcon />,
  actions: [action],
  'data-testid': 'task-request',
}

const getContainer = () => screen.getByTestId(props['data-testid'])

const findContainer = () => screen.findByTestId(props['data-testid'])

const queryContainer = () => screen.queryByTestId(props['data-testid'])

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const getIcon = () => getIconByNameIn(getContainer(), 'pause-circle')

const getActionButton = (label: string) =>
  getButtonIn(getContainer(), new RegExp(label))

const queryActionButton = (label: string) =>
  queryButtonIn(getContainer(), new RegExp(label))

const clickActionButton = async (user: UserEvent, label: string) => {
  const button = getActionButton(label)
  await user.click(button)
  return button
}

const expectActionLoadingStarted = (label: string) =>
  expectLoadingStartedByButton(getActionButton(label))

export const testUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getChildByText,
  getIcon,

  getActionButton,
  queryActionButton,
  clickActionButton,
  expectActionLoadingStarted,
}

describe('Запрос заявки', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskRequest {...props} />)
      expect(testUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskRequest {...props} />)
      expect(testUtils.getChildByText(props.title)).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskRequest {...props} />)

      expect(testUtils.getChildByText(props.comment)).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskRequest {...props} />)

      expect(
        testUtils.getChildByText(getShortUserName(props.user)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskRequest {...props} />)
      expect(testUtils.getChildByText(props.date)).toBeInTheDocument()
    })
  })

  test('Можно отобразить несколько кнопок', () => {
    const actions = [...props.actions, { text: fakeWord() }]

    render(<TaskRequest {...props} actions={actions} />)

    actions.forEach((action) => {
      const button = testUtils.getActionButton(action.text)
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Кнопка', () => {
    test('Отображается если присутствует', () => {
      render(<TaskRequest {...props} />)

      const button = testUtils.getActionButton(action.text)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskRequest {...props} actions={[]} />)
      expect(testUtils.queryActionButton(action.text)).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      render(
        <TaskRequest {...props} actions={[{ ...action, disabled: true }]} />,
      )

      expect(testUtils.getActionButton(action.text)).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(
        <TaskRequest {...props} actions={[{ ...action, loading: true }]} />,
      )

      await expectActionLoadingStarted(action.text)
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskRequest {...props} />)

      await testUtils.clickActionButton(user, action.text)
      expect(action.onClick).toBeCalledTimes(1)
    })
  })
})
