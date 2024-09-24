import { getShortUserName } from 'modules/user/utils'

import { formatDate } from 'shared/utils/date'

import { props } from '_tests_/features/tasks/components/TaskReclassificationRequest/constants'
import { taskReclassificationRequestTestUtils } from '_tests_/features/tasks/components/TaskReclassificationRequest/testUtils'
import { render } from '_tests_/utils'

import TaskReclassificationRequest from './index'

describe('Запрос заявки на переклассификацию', () => {
  describe('Отображается корректно', () => {
    test('Иконка', () => {
      render(<TaskReclassificationRequest {...props} />)
      expect(taskReclassificationRequestTestUtils.getIcon()).toBeInTheDocument()
    })

    test('Заголовок', () => {
      render(<TaskReclassificationRequest {...props} />)
      expect(
        taskReclassificationRequestTestUtils.getChildByText(/запрошена переклассификация/i),
      ).toBeInTheDocument()
    })

    test('Комментарий', () => {
      render(<TaskReclassificationRequest {...props} />)
      expect(taskReclassificationRequestTestUtils.getChildByText(props.comment)).toBeInTheDocument()
    })

    test('Данные пользователя', () => {
      render(<TaskReclassificationRequest {...props} />)

      expect(
        taskReclassificationRequestTestUtils.getChildByText(getShortUserName(props.user)),
      ).toBeInTheDocument()
    })

    test('Дата создания', () => {
      render(<TaskReclassificationRequest {...props} />)

      expect(
        taskReclassificationRequestTestUtils.getChildByText(formatDate(props.date)),
      ).toBeInTheDocument()
    })
  })

  describe('Кнопка', () => {
    test('Отображается корректно', () => {
      render(<TaskReclassificationRequest {...props} />)

      const button = taskReclassificationRequestTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Можно сделать не активной', () => {
      render(<TaskReclassificationRequest {...props} cancelBtnDisabled />)
      expect(taskReclassificationRequestTestUtils.getCancelButton()).toBeDisabled()
    })

    test('При клике обработчик вызывается корректно', async () => {
      const { user } = render(<TaskReclassificationRequest {...props} />)

      await taskReclassificationRequestTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
