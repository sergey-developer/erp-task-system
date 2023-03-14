import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { getShortUserName } from 'modules/user/utils'

import { PauseCircleIcon } from 'components/Icons'

import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { ArrayItem } from 'shared/interfaces/utils'
import { formatDate } from 'shared/utils/date'

import commonFixtures from 'fixtures/common'

import {
  generateDateString,
  generateWord,
  getButtonIn,
  getIconByNameIn,
  expectLoadingStartedByButton,
  queryButtonIn,
  render,
} from '_tests_/utils'

import TaskRequest, { TaskRequestProps } from './index'

const action: ArrayItem<TaskRequestProps['actions']> = {
  text: generateWord(),
  onClick: jest.fn(),
  disabled: false,
  loading: false,
}

const requiredProps: TaskRequestProps & { 'data-testid': string } = {
  user: commonFixtures.getUser(),
  title: generateWord(),
  comment: generateWord(),
  date: generateDateString(),
  icon: <PauseCircleIcon />,
  actions: [action],
  'data-testid': 'task-request',
}

const getContainer = () => screen.getByTestId(requiredProps['data-testid'])

const findContainer = () => screen.findByTestId(requiredProps['data-testid'])

const queryContainer = () => screen.queryByTestId(requiredProps['data-testid'])

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
      render(<TaskRequest {...requiredProps} />)
      expect(testUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskRequest {...requiredProps} />)
      expect(testUtils.getChildByText(requiredProps.title)).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskRequest {...requiredProps} />)

      expect(
        testUtils.getChildByText(requiredProps.comment),
      ).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskRequest {...requiredProps} />)

      expect(
        testUtils.getChildByText(getShortUserName(requiredProps.user)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskRequest {...requiredProps} />)

      expect(
        testUtils.getChildByText(
          formatDate(requiredProps.date, DATE_TIME_FORMAT),
        ),
      ).toBeInTheDocument()
    })
  })

  test('Можно отобразить несколько кнопок', () => {
    const actions = [...requiredProps.actions, { text: generateWord() }]

    render(<TaskRequest {...requiredProps} actions={actions} />)

    actions.forEach((action) => {
      const button = testUtils.getActionButton(action.text)
      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })
  })

  describe('Кнопка', () => {
    test('Отображается если присутствует', () => {
      render(<TaskRequest {...requiredProps} />)

      const button = testUtils.getActionButton(action.text)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Не отображается если отсутствует', () => {
      render(<TaskRequest {...requiredProps} actions={[]} />)
      expect(testUtils.queryActionButton(action.text)).not.toBeInTheDocument()
    })

    test('Можно сделать не активной', () => {
      render(
        <TaskRequest
          {...requiredProps}
          actions={[{ ...action, disabled: true }]}
        />,
      )

      expect(testUtils.getActionButton(action.text)).toBeDisabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(
        <TaskRequest
          {...requiredProps}
          actions={[{ ...action, loading: true }]}
        />,
      )

      await expectActionLoadingStarted(action.text)
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskRequest {...requiredProps} />)

      await testUtils.clickActionButton(user, action.text)
      expect(action.onClick).toBeCalledTimes(1)
    })
  })
})
