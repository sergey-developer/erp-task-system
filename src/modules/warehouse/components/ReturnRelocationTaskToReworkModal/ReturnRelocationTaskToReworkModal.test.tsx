import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { validationMessages } from 'shared/constants/validation'

import { fakeWord, render, buttonTestUtils } from '_tests_/utils'

import ReturnRelocationTaskToReworkModal from './index'
import { ReturnRelocationTaskToReworkModalProps } from './types'

const props: Readonly<ReturnRelocationTaskToReworkModalProps> = {
  open: true,
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('return-relocation-task-rework-modal')
const findContainer = () => screen.findByTestId('return-relocation-task-rework-modal')

// reason field
const getReasonFormItem = () => within(getContainer()).getByTestId('reason-form-item')

const getReasonField = () =>
  within(getReasonFormItem()).getByRole('textbox', { name: 'Причина возврата' })

const findReasonError = (error: string) => within(getReasonFormItem()).findByText(error)

const setReason = async (user: UserEvent, value: string) => {
  const field = getReasonField()
  await user.type(field, value)
  return field
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /Вернуть на доработку/)
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  findContainer,

  getReasonFormItem,
  getReasonField,
  findReasonError,
  setReason,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingFinished: () => buttonTestUtils.expectLoadingFinished(getSubmitButton()),
}

describe('Модалка возврата заявки на перемещение на доработку', () => {
  test('Заголовок отображается корректно', () => {
    render(<ReturnRelocationTaskToReworkModal {...props} />)
    const title = within(testUtils.getContainer()).getByText('Возврат на доработку')
    expect(title).toBeInTheDocument()
  })

  describe('Поле причины возврата', () => {
    test('Отображается корректно', () => {
      render(<ReturnRelocationTaskToReworkModal {...props} />)

      const field = testUtils.getReasonField()

      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)

        await testUtils.setReason(user, ' ')

        const error = await testUtils.findReasonError(validationMessages.canNotBeEmpty)
        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)

        await testUtils.clickSubmitButton(user)

        const error = await testUtils.findReasonError(validationMessages.required)
        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<ReturnRelocationTaskToReworkModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно если обязательные поля заполнены', async () => {
      const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)

      await testUtils.setReason(user, fakeWord())
      await testUtils.clickSubmitButton(user)

      expect(props.onSubmit).toBeCalledTimes(1)
      expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<ReturnRelocationTaskToReworkModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<ReturnRelocationTaskToReworkModal {...props} />)
      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })
})
