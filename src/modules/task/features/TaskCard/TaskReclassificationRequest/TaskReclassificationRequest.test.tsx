import { getButtonIn, getIconByNameIn, render } from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import taskFixtures from 'fixtures/task'
import { getShortUserName } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

import TaskReclassificationRequest, {
  TaskReclassificationRequestProps,
} from './index'

const reclassificationRequest = taskFixtures.getTaskReclassificationRequest()

const requiredProps: TaskReclassificationRequestProps = {
  user: reclassificationRequest.user,
  comment: reclassificationRequest.comment.text,
  date: reclassificationRequest.createdAt,
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

const userClickCancelButton = async (user: UserEvent) => {
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
  userClickCancelButton,
}

describe('Запрос заявки на переклассификацию', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)
      expect(testUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)
      expect(
        testUtils.getChildByText(/запрошена переклассификация/i),
      ).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)
      expect(
        testUtils.getChildByText(requiredProps.comment),
      ).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)

      expect(
        testUtils.getChildByText(getShortUserName(requiredProps.user)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)

      expect(
        testUtils.getChildByText(
          formatDate(requiredProps.date, DATE_TIME_FORMAT),
        ),
      ).toBeInTheDocument()
    })
  })

  describe('Кнопка', () => {
    test('Отображается корректно', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Можно сделать не активной', () => {
      render(
        <TaskReclassificationRequest {...requiredProps} cancelBtnDisabled />,
      )
      expect(testUtils.getCancelButton()).toBeDisabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskReclassificationRequest {...requiredProps} />,
      )

      await testUtils.userClickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })
})
