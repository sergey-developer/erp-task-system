import { render } from '_tests_/utils'
import { getShortUserName } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { formatDate } from 'shared/utils/date'

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
