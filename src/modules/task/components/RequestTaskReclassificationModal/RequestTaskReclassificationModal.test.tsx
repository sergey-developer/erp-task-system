import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import {
  reclassificationReasonDict,
  ReclassificationReasonEnum,
} from 'modules/task/constants/taskReclassificationRequest'

import { validationMessages } from 'shared/constants/validation'

import { buttonTestUtils, fakeIdStr, fakeWord, radioButtonTestUtils, render } from '_tests_/utils'

import RequestTaskReclassificationModal from './index'
import { RequestTaskReclassificationModalProps } from './types'

const props: Readonly<RequestTaskReclassificationModalProps> = {
  open: true,
  recordId: fakeIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('request-task-reclassification-modal')
const queryContainer = () => screen.queryByTestId('request-task-reclassification-modal')
const findContainer = () => screen.findByTestId('request-task-reclassification-modal')

const getChildByText = (text: string) => within(getContainer()).getByText(text)

// close button
const getCloseButton = () => buttonTestUtils.getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
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

// submit button
const getSubmitButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), /запросить переклассификацию/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// reclassification reason
const getReclassificationReasonBlock = () =>
  within(getContainer()).getByTestId('reclassification-reason')

const getReclassificationReasonTitle = () =>
  within(getReclassificationReasonBlock()).getByTitle('Причина переклассификации')

const getReclassificationReasonField = (reason: ReclassificationReasonEnum): HTMLInputElement =>
  radioButtonTestUtils.getRadioButtonIn(
    getReclassificationReasonBlock(),
    reclassificationReasonDict[reason],
  )

const findReclassificationReasonError = (text: string) =>
  within(getReclassificationReasonBlock()).findByText(text)

const setReclassificationReason = async (user: UserEvent, reason: ReclassificationReasonEnum) => {
  const field = getReclassificationReasonField(reason)
  await user.click(field)
  return field
}

// comment
const getCommentBlock = () => within(getContainer()).getByTestId('comment')
const getCommentTitle = () => within(getCommentBlock()).getByTitle('Комментарий')
const getCommentField = () => within(getCommentBlock()).getByPlaceholderText('Опишите ситуацию')
const findCommentError = (text: string) => within(getCommentBlock()).findByText(text)

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// loading
const expectLoadingStarted = () => buttonTestUtils.expectLoadingStarted(getSubmitButton())
const expectLoadingFinished = () => buttonTestUtils.expectLoadingFinished(getSubmitButton())

export const testUtils = {
  getContainer,
  queryContainer,
  findContainer,
  getChildByText,

  getCloseButton,
  clickCloseButton,

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getReclassificationReasonBlock,
  getReclassificationReasonTitle,
  getReclassificationReasonField,
  findReclassificationReasonError,
  setReclassificationReason,

  getCommentBlock,
  getCommentTitle,
  getCommentField,
  findCommentError,
  setComment,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка запроса о переклассификации заявки', () => {
  test('Заголовок отображается', () => {
    render(<RequestTaskReclassificationModal {...props} />)

    expect(testUtils.getChildByText('Запрос о переклассификации заявки')).toBeInTheDocument()
    expect(testUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...props} />)
      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskReclassificationModal {...props} />)

      await testUtils.clickCloseButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskReclassificationModal {...props} />)

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskReclassificationModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<RequestTaskReclassificationModal {...props} isLoading />)
      await testUtils.expectLoadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        for await (const reason of Object.values(ReclassificationReasonEnum)) {
          await testUtils.setReclassificationReason(user, reason)
        }
        await testUtils.setComment(user, fakeWord())
        await testUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        await testUtils.clickSubmitButton(user)
        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    describe('Поле причины переклассификации', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskReclassificationModal {...props} />)
        expect(testUtils.getReclassificationReasonTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskReclassificationModal {...props} />)

        Object.values(ReclassificationReasonEnum).forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeInTheDocument()
          expect(field).toBeEnabled()
          expect(field.value).toBe(reason)
          expect(field).not.toBeChecked()
        })
      })

      test('Можно выбрать любую доступную причину', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        for await (const reason of Object.values(ReclassificationReasonEnum)) {
          const field = await testUtils.setReclassificationReason(user, reason)
          expect(field).toBeChecked()
        }
      })

      test('Не активно во время загрузки', () => {
        render(<RequestTaskReclassificationModal {...props} isLoading />)

        Object.values(ReclassificationReasonEnum).forEach((reason) => {
          const field = testUtils.getReclassificationReasonField(reason)
          expect(field).toBeDisabled()
        })
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskReclassificationModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findReclassificationReasonError(validationMessages.required),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поле комментария', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskReclassificationModal {...props} />)
        expect(testUtils.getCommentTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskReclassificationModal {...props} />)

        const field = testUtils.getCommentField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно заполнить', async () => {
        const { user } = render(<RequestTaskReclassificationModal {...props} />)

        const value = fakeWord()
        const field = await testUtils.setComment(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<RequestTaskReclassificationModal {...props} isLoading />)
        expect(testUtils.getCommentField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(<RequestTaskReclassificationModal {...props} />)

          await testUtils.setComment(user, ' ')

          expect(
            await testUtils.findCommentError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskReclassificationModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(await testUtils.findCommentError(validationMessages.required)).toBeInTheDocument()
        })
      })
    })
  })
})
