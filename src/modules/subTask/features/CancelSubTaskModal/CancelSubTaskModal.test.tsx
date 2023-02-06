import {
  generateWord,
  getButtonIn,
  loadingFinishedByButton,
  loadingStartedByButton,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'
import { NonNullableObject } from 'shared/interfaces/utils'

import ReworkSubTaskModal from './index'
import CancelSubTaskModal from './index'
import { CancelSubTaskModalProps } from './interfaces'

const requiredProps: Omit<CancelSubTaskModalProps, 'recordId'> = {
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const notRequiredProps: NonNullableObject<
  Omit<CancelSubTaskModalProps, keyof typeof requiredProps>
> = {
  recordId: generateWord(),
}

const getContainer = () => screen.getByTestId('cancel-sub-task-modal')

const findContainer = () => screen.findByTestId('cancel-sub-task-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

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

const findCancelReasonError = async (error: string) =>
  within(getCancelReasonFieldContainer()).findByText(error)

const getSubmitButton = () => getButtonIn(getContainer(), /сохранить/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getCancelReasonFieldContainer,
  getCancelReasonField,
  setCancelReason,
  findCancelReasonError,

  getSubmitButton,
  clickSubmitButton,

  getCancelButton,
  clickCancelButton,

  loadingStarted: () => loadingStartedByButton(getSubmitButton()),
  loadingFinished: () => loadingFinishedByButton(getSubmitButton()),
}

describe('Модальное окно отправки запроса на доработку', () => {
  test('Отображается корректно', () => {
    render(<CancelSubTaskModal {...requiredProps} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    render(
      <CancelSubTaskModal
        {...requiredProps}
        recordId={notRequiredProps.recordId}
      />,
    )

    expect(testUtils.getChildByText(/отмена задания/i)).toBeInTheDocument()

    expect(
      testUtils.getChildByText(notRequiredProps.recordId),
    ).toBeInTheDocument()
  })

  describe('Форма перевода заявки', () => {
    describe('Поле ввода причины отмены', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...requiredProps} />)

        const field = testUtils.getCancelReasonField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<CancelSubTaskModal {...requiredProps} isLoading />)
        expect(testUtils.getCancelReasonField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<ReworkSubTaskModal {...requiredProps} />)

        const value = generateWord()
        const field = await testUtils.setCancelReason(user, value)

        expect(field).toHaveValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<CancelSubTaskModal {...requiredProps} />)

          await testUtils.setCancelReason(user, ' ')

          expect(
            await testUtils.findCancelReasonError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<CancelSubTaskModal {...requiredProps} />)

          await testUtils.setCancelReason(
            user,
            generateWord({ length: validationSizes.string.middle + 1 }),
          )

          expect(
            await testUtils.findCancelReasonError(
              validationMessages.string.max.middle,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<CancelSubTaskModal {...requiredProps} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findCancelReasonError(validationMessages.required),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...requiredProps} />)

        const submitButton = testUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<CancelSubTaskModal {...requiredProps} isLoading />)

        const submitButton = testUtils.getSubmitButton()
        await loadingStartedByButton(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<CancelSubTaskModal {...requiredProps} />)

        await testUtils.setCancelReason(user, generateWord())
        await testUtils.clickSubmitButton(user)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
      })
    })

    describe('Кнопка отмены', () => {
      test('Отображается корректно', () => {
        render(<CancelSubTaskModal {...requiredProps} />)

        const cancelButton = testUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<CancelSubTaskModal {...requiredProps} />)

        await testUtils.clickCancelButton(user)
        expect(requiredProps.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
