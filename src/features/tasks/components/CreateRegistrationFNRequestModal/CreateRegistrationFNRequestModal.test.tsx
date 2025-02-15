import { within } from '@testing-library/react'

import { validationMessages } from 'shared/constants/validation'

import { props } from '_tests_/features/tasks/components/CreateRegistrationFNRequestModal/constants'
import { createRegistrationFNRequestModalTestUtils } from '_tests_/features/tasks/components/CreateRegistrationFNRequestModal/testUtils'
import catalogsFixtures from '_tests_/fixtures/catalogs'
import { fakeEmail, render } from '_tests_/utils'

import CreateRegistrationFNRequestModal from './index'

describe('Модалка создания запроса на регистрацию ФН', () => {
  test('Заголовок и описание отображаются', async () => {
    render(<CreateRegistrationFNRequestModal {...props} />)

    const container = createRegistrationFNRequestModalTestUtils.getContainer()
    const title = within(container).getByText('Отправка запроса на регистрацию ФН')
    const description = within(container).getByText(
      /Для регистрации фискального накопителя система автоматически направит письмо с прикрепленными файлами. Результат обработки запроса будет отображен в журнале заявки/,
    )

    expect(title).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })

  test('Получатели и получатели копии отображаются', async () => {
    render(
      <CreateRegistrationFNRequestModal
        {...props}
        email={[fakeEmail(), fakeEmail()]}
        emailAsCopy={[fakeEmail(), fakeEmail()]}
      />,
    )

    const container = createRegistrationFNRequestModalTestUtils.getContainer()

    const emailContainer = within(container).getByTestId('email')
    const emailAsCopyContainer = within(container).getByTestId('email-as-copy')

    props.email.forEach((e) => {
      const text = within(emailContainer).getByText(e)
      expect(text).toBeInTheDocument()
    })

    props.emailAsCopy.forEach((e) => {
      const text = within(emailAsCopyContainer).getByText(e)
      expect(text).toBeInTheDocument()
    })
  })

  describe('Тип замены ФН', () => {
    test('Можно выбрать значение', async () => {
      const changeType = catalogsFixtures.faChangeTypeListItem()

      const { user } = render(
        <CreateRegistrationFNRequestModal {...props} changeTypes={[changeType]} />,
      )

      await createRegistrationFNRequestModalTestUtils.openChangeTypeSelect(user)
      await createRegistrationFNRequestModalTestUtils.setChangeType(user, changeType.title)
      const option = createRegistrationFNRequestModalTestUtils.getSelectedChangeType()

      expect(option).toBeInTheDocument()
    })

    test('Обязательное поле', async () => {
      const { user } = render(<CreateRegistrationFNRequestModal {...props} />)

      await createRegistrationFNRequestModalTestUtils.clickSubmitButton(user)
      const error = await createRegistrationFNRequestModalTestUtils.findChangeTypeError(
        validationMessages.required,
      )

      expect(error).toBeInTheDocument()
    })
  })

  describe('Вложения', () => {
    test('Загрузка работает', async () => {
      const { user } = render(<CreateRegistrationFNRequestModal {...props} />)

      const { input, file } = await createRegistrationFNRequestModalTestUtils.setAttachment(user)
      const uploadedFile = createRegistrationFNRequestModalTestUtils.getUploadedAttachment(
        file.name,
      )

      expect(input.files!.item(0)).toBe(file)
      expect(input.files).toHaveLength(1)
      expect(uploadedFile).toBeInTheDocument()
      expect(props.onCreateAttachment).toBeCalledTimes(1)
      expect(props.onCreateAttachment).toBeCalledWith(expect.anything())
    })

    test('Удаление работает', async () => {
      const { user } = render(<CreateRegistrationFNRequestModal {...props} />)

      const { file } = await createRegistrationFNRequestModalTestUtils.setAttachment(user)
      await createRegistrationFNRequestModalTestUtils.clickDeleteAttachmentButton(user)
      const uploadedFile = createRegistrationFNRequestModalTestUtils.queryUploadedAttachment(
        file.name,
      )

      expect(uploadedFile).not.toBeInTheDocument()
    })
  })
})
