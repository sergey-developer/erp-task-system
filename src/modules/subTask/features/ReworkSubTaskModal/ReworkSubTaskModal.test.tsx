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
import { ReworkSubTaskModalProps } from './interfaces'

const requiredProps: Omit<ReworkSubTaskModalProps, 'recordId'> = {
  isLoading: false,
  onSubmit: jest.fn(),
  onCancel: jest.fn(),
}

const notRequiredProps: NonNullableObject<
  Omit<ReworkSubTaskModalProps, keyof typeof requiredProps>
> = {
  recordId: generateWord(),
}

const getContainer = () => screen.getByTestId('rework-sub-task-modal')

const findContainer = () => screen.findByTestId('rework-sub-task-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

const getReturnReasonFieldContainer = () =>
  within(getContainer()).getByTestId('return-reason')

const getReturnReasonField = () =>
  within(getReturnReasonFieldContainer()).getByPlaceholderText(
    /опишите причину возврата/i,
  )

const userSetReturnReason = async (user: UserEvent, value: string) => {
  const field = getReturnReasonField()
  await user.type(field, value)
  return field
}

const findReturnReasonError = async (error: string) =>
  within(getReturnReasonFieldContainer()).findByText(error)

const getSubmitButton = () => getButtonIn(getContainer(), /сохранить/i)

const userClickSubmitButton = async (user: UserEvent) => {
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

  getReturnReasonFieldContainer,
  getReturnReasonField,
  userSetReturnReason,
  findReturnReasonError,

  getSubmitButton,
  userClickSubmitButton,

  getCancelButton,
  clickCancelButton,

  loadingStarted: () => loadingStartedByButton(getSubmitButton()),
  loadingFinished: () => loadingFinishedByButton(getSubmitButton()),
}

describe('Модалка отправки запроса на доработку', () => {
  test('Отображается корректно', () => {
    render(<ReworkSubTaskModal {...requiredProps} />)
    expect(testUtils.getContainer()).toBeInTheDocument()
  })

  test('Заголовок отображается корректно', () => {
    render(
      <ReworkSubTaskModal
        {...requiredProps}
        recordId={notRequiredProps.recordId}
      />,
    )

    expect(
      testUtils.getChildByText(/возврат на доработку задания/i),
    ).toBeInTheDocument()

    expect(
      testUtils.getChildByText(notRequiredProps.recordId),
    ).toBeInTheDocument()
  })

  describe('Форма', () => {
    describe('Поле ввода причины возврата', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...requiredProps} />)

        const field = testUtils.getReturnReasonField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Не активно при загрузке', () => {
        render(<ReworkSubTaskModal {...requiredProps} isLoading />)
        expect(testUtils.getReturnReasonField()).toBeDisabled()
      })

      test('Можно ввести значение', async () => {
        const { user } = render(<ReworkSubTaskModal {...requiredProps} />)

        const value = generateWord()
        const field = await testUtils.userSetReturnReason(user, value)

        expect(field).toHaveValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<ReworkSubTaskModal {...requiredProps} />)

          await testUtils.userSetReturnReason(user, ' ')

          expect(
            await testUtils.findReturnReasonError(
              validationMessages.canNotBeEmpty,
            ),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(<ReworkSubTaskModal {...requiredProps} />)

          await testUtils.userSetReturnReason(
            user,
            generateWord({ length: validationSizes.string.middle + 1 }),
          )

          expect(
            await testUtils.findReturnReasonError(
              validationMessages.string.max.middle,
            ),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<ReworkSubTaskModal {...requiredProps} />)

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.findReturnReasonError(validationMessages.required),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Кнопка отправки', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...requiredProps} />)

        const submitButton = testUtils.getSubmitButton()

        expect(submitButton).toBeInTheDocument()
        expect(submitButton).toBeEnabled()
      })

      test('Отображает процесс загрузки', async () => {
        render(<ReworkSubTaskModal {...requiredProps} isLoading />)

        const submitButton = testUtils.getSubmitButton()
        await loadingStartedByButton(submitButton)
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<ReworkSubTaskModal {...requiredProps} />)

        await testUtils.userSetReturnReason(user, generateWord())
        await testUtils.userClickSubmitButton(user)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
      })
    })

    describe('Кнопка отмены', () => {
      test('Отображается корректно', () => {
        render(<ReworkSubTaskModal {...requiredProps} />)

        const cancelButton = testUtils.getCancelButton()

        expect(cancelButton).toBeInTheDocument()
        expect(cancelButton).toBeEnabled()
      })

      test('Обработчик вызывается корректно', async () => {
        const { user } = render(<ReworkSubTaskModal {...requiredProps} />)

        await testUtils.clickCancelButton(user)
        expect(requiredProps.onCancel).toBeCalledTimes(1)
      })
    })
  })
})
