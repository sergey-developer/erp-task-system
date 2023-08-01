import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import {
  fakeWord,
  getButtonIn,
  expectLoadingFinishedByButton,
  expectLoadingStartedByButton,
  render,
  fakeIdStr,
} from '_tests_/utils'

import ReworkSubTaskModal from './index'
import { ReworkSubTaskModalProps } from './types'

const props: Readonly<ReworkSubTaskModalProps> = {
  isLoading: false,
  recordId: null,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const getContainer = () => screen.getByTestId('rework-sub-task-modal')

const findContainer = () => screen.findByTestId('rework-sub-task-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// return reason
const getReturnReasonFieldContainer = () =>
  within(getContainer()).getByTestId('return-reason')

const getReturnReasonField = () =>
  within(getReturnReasonFieldContainer()).getByPlaceholderText(
    /опишите причину возврата/i,
  )

const setReturnReason = async (user: UserEvent, value: string) => {
  const field = getReturnReasonField()
  await user.type(field, value)
  return field
}

const findReturnReasonFieldError = async (error: string) =>
  within(getReturnReasonFieldContainer()).findByText(error)

// submit button
const getSubmitButton = () => getButtonIn(getContainer(), /сохранить/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// other
const expectLoadingStarted = () =>
  expectLoadingStartedByButton(getSubmitButton())
const expectLoadingFinished = () =>
  expectLoadingFinishedByButton(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getReturnReasonFieldContainer,
  getReturnReasonField,
  setReturnReason,
  findReturnReasonFieldError,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка отправки запроса на доработку', () => {
  test('Отображается корректно', () => {
    render(<ReworkSubTaskModal {...props} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    const recordId = fakeIdStr()
    render(<ReworkSubTaskModal {...props} recordId={recordId} />)

    expect(
      testUtils.getChildByText(/возврат на доработку задания/i),
    ).toBeInTheDocument()

    expect(testUtils.getChildByText(recordId)).toBeInTheDocument()
  })

  describe('Форма', () => {
    describe('Поле ввода причины возврата', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...props} />)

        const field = testUtils.getReturnReasonField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<ReworkSubTaskModal {...props} isLoading />)
        expect(testUtils.getReturnReasonField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<ReworkSubTaskModal {...props} />)

        const value = fakeWord()
        const field = await testUtils.setReturnReason(user, value)

        expect(field).toHaveValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<ReworkSubTaskModal {...props} />)

          await testUtils.setReturnReason(user, ' ')

          expect(
            await testUtils.findReturnReasonFieldError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<ReworkSubTaskModal {...props} />)

          await testUtils.setReturnReason(
            user,
            fakeWord({ length: validationSizes.string.middle + 1 }),
          )

          expect(
            await testUtils.findReturnReasonFieldError(
              validationMessages.string.max.middle,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<ReworkSubTaskModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findReturnReasonFieldError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...props} />)

        const submitButton = testUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<ReworkSubTaskModal {...props} isLoading />)

        const submitButton = testUtils.getSubmitButton()
        await expectLoadingStartedByButton(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<ReworkSubTaskModal {...props} />)

        await testUtils.setReturnReason(user, fakeWord())
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
        render(<ReworkSubTaskModal {...props} />)

        const cancelButton = testUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<ReworkSubTaskModal {...props} />)

        await testUtils.clickCancelButton(user)
        expect(props.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
