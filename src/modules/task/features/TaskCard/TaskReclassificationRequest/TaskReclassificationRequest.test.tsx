import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { getShortUserName } from 'modules/user/utils'

import { formatDate } from 'shared/utils/date'

import commonFixtures from 'fixtures/common'

import {
  fakeDateString,
  fakeWord,
  getButtonIn,
  getIconByNameIn,
  render,
} from '_tests_/utils'

import TaskReclassificationRequest, {
  TaskReclassificationRequestProps,
} from './index'

const props: Readonly<TaskReclassificationRequestProps> = {
  user: commonFixtures.fakeUser(),
  comment: fakeWord(),
  date: fakeDateString(),
  onCancel: jest.fn(),
  cancelBtnDisabled: false,
}

const getContainer = () =>
  screen.getByTestId('task-card-reclassification-request')

const findContainer = () =>
  screen.findByTestId('task-card-reclassification-request')

const queryContainer = () =>
  screen.queryByTestId('task-card-reclassification-request')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const getIcon = () => getIconByNameIn(getContainer(), 'question-circle')

const getCancelButton = () => getButtonIn(getContainer(), /отменить запрос/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  findContainer,
  queryContainer,

  getChildByText,
  getIcon,

  getCancelButton,
  clickCancelButton,
}

describe('Запрос заявки на переклассификацию', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskReclassificationRequest {...props} />)
      expect(testUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskReclassificationRequest {...props} />)
      expect(
        testUtils.getChildByText(/запрошена переклассификация/i),
      ).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskReclassificationRequest {...props} />)
      expect(testUtils.getChildByText(props.comment)).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskReclassificationRequest {...props} />)

      expect(
        testUtils.getChildByText(getShortUserName(props.user)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskReclassificationRequest {...props} />)

      expect(
        testUtils.getChildByText(formatDate(props.date)),
      ).toBeInTheDocument()
    })
  })

  describe('Кнопка', () => {
    test('Отображается корректно', () => {
      render(<TaskReclassificationRequest {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Можно сделать не активной', () => {
      render(<TaskReclassificationRequest {...props} cancelBtnDisabled />)
      expect(testUtils.getCancelButton()).toBeDisabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskReclassificationRequest {...props} />)

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
