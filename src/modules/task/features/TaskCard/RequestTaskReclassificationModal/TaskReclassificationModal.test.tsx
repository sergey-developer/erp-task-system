import {
  generateIdStr,
  generateWord,
  getButtonIn,
  loadingFinishedByButton,
  loadingStartedByButton,
  modalTestUtils,
  render,
} from '_tests_/utils'
import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { ReclassificationReasonEnum } from 'modules/task/constants/common'
import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'

import { reclassificationReasonLabels } from './constants'
import RequestTaskReclassificationModal, {
  RequestTaskReclassificationModalProps,
} from './index'

const requiredProps: RequestTaskReclassificationModalProps = {
  recordId: generateIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const notAvailableReasons = [ReclassificationReasonEnum.DivideTask]

export const availableReasons = Object.values(
  ReclassificationReasonEnum,
).filter((reason) => !notAvailableReasons.includes(reason))

const getContainer = () =>
  screen.getByTestId('request-task-reclassification-modal')

const findContainer = () =>
  screen.findByTestId('request-task-reclassification-modal')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const userClickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
  await user.click(button)
  return button
}

// cancel button
const getCancelButton = () => getButtonIn(getContainer(), /отменить/i)

const userClickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
  return button
}

// submit button
const getSubmitButton = () =>
  getButtonIn(getContainer(), /запросить переклассификацию/i)

const userClickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// reclassification reason
const getReclassificationReasonBlock = () =>
  within(getContainer()).getByTestId('reclassification-reason')

const getReclassificationReasonTitle = () =>
  within(getReclassificationReasonBlock()).getByTitle(
    'Причина переклассификации',
  )

const getReclassificationReasonField = (
  reason: ReclassificationReasonEnum,
): HTMLInputElement =>
  within(getReclassificationReasonBlock()).getByRole('radio', {
    name: reclassificationReasonLabels[reason],
  })

const findReclassificationReasonError = (text: string) =>
  within(getReclassificationReasonBlock()).findByText(text)

const userSetReclassificationReason = async (
  user: UserEvent,
  reason: ReclassificationReasonEnum,
) => {
  const field = getReclassificationReasonField(reason)
  await user.click(field)
  return field
}

// comment
const getCommentBlock = () => within(getContainer()).getByTestId('comment')

const getCommentTitle = () =>
  within(getCommentBlock()).getByTitle('Комментарий')

const getCommentField = () =>
  within(getCommentBlock()).getByPlaceholderText('Опишите ситуацию')

const findCommentError = (text: string) =>
  within(getCommentBlock()).findByText(text)

const userSetComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// loading
const loadingStarted = () => loadingStartedByButton(getSubmitButton())

const loadingFinished = () => loadingFinishedByButton(getSubmitButton())

export const testUtils = {
  getContainer,
  findContainer,
  getChildByText,

  getCloseButton,
  userClickCloseButton,

  getCancelButton,
  userClickCancelButton,

  getSubmitButton,
  userClickSubmitButton,

  getReclassificationReasonBlock,
  getReclassificationReasonTitle,
  getReclassificationReasonField,
  findReclassificationReasonError,
  userSetReclassificationReason,

  getCommentBlock,
  getCommentTitle,
  getCommentField,
  findCommentError,
  userSetComment,

  loadingStarted,
  loadingFinished,
}

describe('Модалка запроса о переклассификации заявки', () => {
  test('Заголовок отображается', () => {
    render(<RequestTaskReclassificationModal {...requiredProps} />)

    expect(
      testUtils.getChildByText('Запрос о переклассификации заявки'),
    ).toBeInTheDocument()
    expect(testUtils.getChildByText(requiredProps.recordId)).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...requiredProps} />)
      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <RequestTaskReclassificationModal {...requiredProps} />,
      )

      await testUtils.userClickCloseButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...requiredProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(
        <RequestTaskReclassificationModal {...requiredProps} />,
      )

      await testUtils.userClickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...requiredProps} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<RequestTaskReclassificationModal {...requiredProps} isLoading />)
      await testUtils.loadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(
          <RequestTaskReclassificationModal {...requiredProps} />,
        )

        for await (const reason of Object.values(ReclassificationReasonEnum)) {
          await testUtils.userSetReclassificationReason(user, reason)
        }
        await testUtils.userSetComment(user, generateWord())
        await testUtils.userClickSubmitButton(user)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(
          <RequestTaskReclassificationModal {...requiredProps} />,
        )

        await testUtils.userClickSubmitButton(user)
        expect(requiredProps.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    describe('Поле причины переклассификации', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskReclassificationModal {...requiredProps} />)
        expect(testUtils.getReclassificationReasonTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskReclassificationModal {...requiredProps} />)

        Object.values(ReclassificationReasonEnum).forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeInTheDocument()
          expect(field.value).toBe(reason)
          expect(field).not.toBeChecked()
        })

        availableReasons.forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeEnabled()
        })

        notAvailableReasons.forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeDisabled()
        })
      })

      test('Можно выбрать любую доступную причину', async () => {
        const { user } = render(
          <RequestTaskReclassificationModal {...requiredProps} />,
        )

        for await (const reason of availableReasons) {
          const field = await testUtils.userSetReclassificationReason(
            user,
            reason,
          )
          expect(field).toBeChecked()
        }
      })

      test('Не активно во время загрузки', () => {
        render(
          <RequestTaskReclassificationModal {...requiredProps} isLoading />,
        )

        Object.values(ReclassificationReasonEnum).forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeDisabled()
        })
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(
            <RequestTaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.findReclassificationReasonError(
              validationMessages.required,
            ),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле комментария', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskReclassificationModal {...requiredProps} />)
        expect(testUtils.getCommentTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskReclassificationModal {...requiredProps} />)

        const field = testUtils.getCommentField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно заполнить', async () => {
        const { user } = render(
          <RequestTaskReclassificationModal {...requiredProps} />,
        )

        const value = generateWord()
        const field = await testUtils.userSetComment(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(
          <RequestTaskReclassificationModal {...requiredProps} isLoading />,
        )
        expect(testUtils.getCommentField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(
            <RequestTaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userSetComment(user, ' ')

          expect(
            await testUtils.findCommentError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(
            <RequestTaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userClickSubmitButton(user)

          expect(
            await testUtils.findCommentError(validationMessages.required),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(
            <RequestTaskReclassificationModal {...requiredProps} />,
          )

          await testUtils.userSetComment(
            user,
            generateWord({ length: validationSizes.string.long + 1 }),
          )

          expect(
            await testUtils.findCommentError(
              validationMessages.string.max.long,
            ),
          ).toBeInTheDocument()
        })
      })
    })
  })

  test('Обработчик вызывается корректно кликнув вне модалки', async () => {
    const { user } = render(
      <RequestTaskReclassificationModal {...requiredProps} />,
    )

    await modalTestUtils.clickOutOfModal(user)
    expect(requiredProps.onCancel).toBeCalledTimes(1)
  })
})
