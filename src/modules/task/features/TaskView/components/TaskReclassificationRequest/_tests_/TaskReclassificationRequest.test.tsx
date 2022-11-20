import { render } from '_tests_/utils'
import getShortUserName from 'modules/user/utils/getShortUserName'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'

import TaskReclassificationRequest from '../index'
import { requiredProps } from './constants'
import testUtils from './utils'

describe('Статус запроса на переклассификацию', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)
      expect(testUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)
      expect(testUtils.getText(requiredProps.title)).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)
      expect(testUtils.getText(requiredProps.comment)).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)

      expect(
        testUtils.getText(getShortUserName(requiredProps.user)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)

      expect(
        testUtils.getText(
          formatDate(requiredProps.createdAt, DATE_TIME_FORMAT),
        ),
      ).toBeInTheDocument()
    })
  })

  describe('Кнопка', () => {
    test('Отображается корректно', () => {
      render(<TaskReclassificationRequest {...requiredProps} />)

      const button = testUtils.getButton(requiredProps.actionText)

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(
        <TaskReclassificationRequest {...requiredProps} />,
      )

      await testUtils.userClickButton(user, requiredProps.actionText)
      expect(requiredProps.onAction).toBeCalledTimes(1)
    })
  })
})
