import { within } from '@testing-library/react'

import { props } from '_tests_/features/tasks/components/ConfirmExecuteTaskReclassificationTasksModal/constants'
import { confirmExecuteTaskReclassificationTasksModalTestUtils } from '_tests_/features/tasks/components/ConfirmExecuteTaskReclassificationTasksModal/testUtils'
import { render } from '_tests_/utils'

import ConfirmExecuteTaskReclassificationTasksModal from './index'

describe('Модалка подтверждения выполнения заявки', () => {
  test('Заголовок и текст отображается', () => {
    render(<ConfirmExecuteTaskReclassificationTasksModal {...props} />)

    const container = confirmExecuteTaskReclassificationTasksModalTestUtils.getContainer()
    const text =
      'По заявке отсутствуют перемещения. Вы уверены, что хотите перейти к её выполнению?'

    expect(within(container).getByText('Решение по заявке')).toBeInTheDocument()
    expect(within(container).getByText(props.recordId)).toBeInTheDocument()
    expect(within(container).getByText(text)).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskReclassificationTasksModal {...props} />)

      const button = confirmExecuteTaskReclassificationTasksModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskReclassificationTasksModal {...props} />)
      await confirmExecuteTaskReclassificationTasksModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка подтверждения', () => {
    test('Отображается', () => {
      render(<ConfirmExecuteTaskReclassificationTasksModal {...props} />)

      const button = confirmExecuteTaskReclassificationTasksModalTestUtils.getConfirmButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('При клике обработчик вызывается', async () => {
      const { user } = render(<ConfirmExecuteTaskReclassificationTasksModal {...props} />)
      await confirmExecuteTaskReclassificationTasksModalTestUtils.clickConfirmButton(user)
      expect(props.onOk).toBeCalledTimes(1)
    })
  })
})
