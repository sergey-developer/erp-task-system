import { props } from '_tests_/features/warehouse/CreateInventorizationRequestModal/constants'
import { createInventorizationRequestModalTestUtils } from '_tests_/features/warehouse/CreateInventorizationRequestModal/testUtils'
import { fakeWord, render } from '_tests_/utils'

import CreateInventorizationRequestModal from './index'

// todo: добавить тесты по другим полям

describe('Модалка создания запроса на инвентаризацию', () => {
  describe('Поле описания', () => {
    test('Отображается', () => {
      render(<CreateInventorizationRequestModal {...props} />)
      const field = createInventorizationRequestModalTestUtils.getDescriptionField()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)
      const value = fakeWord()
      const field = await createInventorizationRequestModalTestUtils.setDescription(user, value)
      expect(field).toHaveDisplayValue(value)
    })
  })

  describe('Вложения', () => {
    test('Кнопка отображается и активна', () => {
      render(<CreateInventorizationRequestModal {...props} />)

      const button = createInventorizationRequestModalTestUtils.getAddAttachmentsButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Загрузка работает', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      const { input, file } = await createInventorizationRequestModalTestUtils.setAttachment(user)
      const uploadedFile = createInventorizationRequestModalTestUtils.getUploadedAttachment(
        file.name,
      )

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedFile).toBeInTheDocument()
      expect(props.onCreateAttachment).toBeCalledTimes(1)
      expect(props.onCreateAttachment).toBeCalledWith(expect.anything())
    })

    test('Удаление работает', async () => {
      const { user } = render(<CreateInventorizationRequestModal {...props} />)

      const { file } = await createInventorizationRequestModalTestUtils.setAttachment(user)
      await createInventorizationRequestModalTestUtils.clickDeleteAttachmentButton(user)
      const uploadedFile = createInventorizationRequestModalTestUtils.queryUploadedAttachment(
        file.name,
      )

      expect(uploadedFile).not.toBeInTheDocument()
      expect(props.onDeleteAttachment).toBeCalledTimes(1)
      expect(props.onDeleteAttachment).toBeCalledWith(expect.anything())
    })
  })
})
