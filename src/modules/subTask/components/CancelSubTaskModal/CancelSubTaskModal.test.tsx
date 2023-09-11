import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import {
  fakeWord,
  render,
  fakeIdStr, buttonTestUtils
} from "_tests_/utils";

import CancelSubTaskModal from './index'
import { CancelSubTaskModalProps } from './types'

const props: Readonly<CancelSubTaskModalProps> = {
  isLoading: false,
  recordId: null,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('cancel-sub-task-modal')

const findContainer = () => screen.findByTestId('cancel-sub-task-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// cancel reason
const getCancelReasonFieldContainer = () =>
  within(getContainer()).getByTestId('cancel-reason')

const getCancelReasonField = () =>
  within(getCancelReasonFieldContainer()).getByPlaceholderText(
    /опишите причину отмены/i,
  )

const setCancelReason = async (user: UserEvent, value: string) => {
  const field = getCancelReasonField()
  await user.type(field, value)
  return field
}

const findCancelReasonFieldError = async (error: string) =>
  within(getCancelReasonFieldContainer()).findByText(error)

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /сохранить/i)

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

// loading
const expectLoadingStarted = () =>
  buttonTestUtils.expectLoadingStarted(getSubmitButton())

const expectLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getCancelReasonFieldContainer,
  getCancelReasonField,
  setCancelReason,
  findCancelReasonFieldError,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модальное окно отправки запроса на доработку', () => {
  test('Отображается корректно', () => {
    render(<CancelSubTaskModal {...props} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    const recordId = fakeIdStr()
    render(<CancelSubTaskModal {...props} recordId={recordId} />)

    expect(testUtils.getChildByText(/отмена задания/i)).toBeInTheDocument()
    expect(testUtils.getChildByText(recordId)).toBeInTheDocument()
  })

  describe('Форма перевода заявки', () => {
    describe('Поле ввода причины отмены', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...props} />)

        const field = testUtils.getCancelReasonField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<CancelSubTaskModal {...props} isLoading />)
        expect(testUtils.getCancelReasonField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<CancelSubTaskModal {...props} />)

        const value = fakeWord()
        const field = await testUtils.setCancelReason(user, value)

        expect(field).toHaveValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<CancelSubTaskModal {...props} />)

          await testUtils.setCancelReason(user, ' ')

          expect(
            await testUtils.findCancelReasonFieldError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<CancelSubTaskModal {...props} />)

          await testUtils.setCancelReason(
            user,
            fakeWord({ length: validationSizes.string.middle + 1 }),
          )

          expect(
            await testUtils.findCancelReasonFieldError(
              validationMessages.string.max.middle,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<CancelSubTaskModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findCancelReasonFieldError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...props} />)

        const submitButton = testUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<CancelSubTaskModal {...props} isLoading />)

        const submitButton = testUtils.getSubmitButton()
        await buttonTestUtils.expectLoadingStarted(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<CancelSubTaskModal {...props} />)

        await testUtils.setCancelReason(user, fakeWord())
        await testUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(
          expect.anything(),
          expect.anything(),
        )
      })
    })

    describe('Кнопка отмены', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...props} />)

        const cancelButton = testUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<CancelSubTaskModal {...props} />)

        await testUtils.clickCancelButton(user)
        expect(props.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
