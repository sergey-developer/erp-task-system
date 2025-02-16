import { within } from '@testing-library/react'

import { validationMessages } from 'shared/constants/validation'

import { props } from '_tests_/features/warehouses/components/ExecuteRelocationTaskModal/constants'
import { executeRelocationTaskModalTestUtils } from '_tests_/features/warehouses/components/ExecuteRelocationTaskModal/testUtils'
import { render } from '_tests_/helpers'

import ExecuteRelocationTaskModal from './index'

describe('Модалка выполнения заявки на перемещение', () => {
  test('Заголовок отображается', () => {
    render(<ExecuteRelocationTaskModal {...props} />)
    const title = within(executeRelocationTaskModalTestUtils.getContainer()).getByText(
      'Решение по заявке',
    )
    expect(title).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ExecuteRelocationTaskModal {...props} />)

      const button = executeRelocationTaskModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      await executeRelocationTaskModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<ExecuteRelocationTaskModal {...props} />)

      const button = executeRelocationTaskModalTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается если обязательные поля заполнены', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      await executeRelocationTaskModalTestUtils.setDocument(user)
      await executeRelocationTaskModalTestUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })

  describe('Поле добавления документов', () => {
    test('Кнопка отображается корректно', () => {
      render(<ExecuteRelocationTaskModal {...props} />)

      const button = executeRelocationTaskModalTestUtils.getAddDocumentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Можно загрузить документ', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      const { input, file } = await executeRelocationTaskModalTestUtils.setDocument(user)

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
    })

    test('После загрузки документ отображается', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      const { file } = await executeRelocationTaskModalTestUtils.setDocument(user)

      const uploadedDocument = executeRelocationTaskModalTestUtils.getUploadedDocument(file.name)
      expect(uploadedDocument).toBeInTheDocument()
    })

    test('Отображается ошибка если не заполнить поле', async () => {
      const { user } = render(<ExecuteRelocationTaskModal {...props} />)

      await executeRelocationTaskModalTestUtils.clickSubmitButton(user)

      const error = await executeRelocationTaskModalTestUtils.findDocumentsError(
        validationMessages.required,
      )
      expect(error).toBeInTheDocument()
    })
  })
})
