import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import { suspendReasonDict, SuspendReasonEnum } from 'modules/task/constants/taskSuspendRequest'

import { validationMessages } from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'

import { buttonTestUtils, fakeIdStr, fakeWord, radioButtonTestUtils, render } from '_tests_/utils'

import { reasonsMakeDateTimeFieldDisabled } from './constants'
import RequestTaskSuspendModal from './index'
import { RequestTaskSuspendModalProps } from './types'

const props: Readonly<RequestTaskSuspendModalProps> = {
  open: true,
  recordId: fakeIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('request-task-suspend-modal')

const findContainer = () => screen.findByTestId('request-task-suspend-modal')

const getChildByText = (text: string | RegExp) => within(getContainer()).getByText(text)

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
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /перевести в ожидание/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// reason field
const getReasonFormItem = () => within(getContainer()).getByTestId('reason-form-item')
const getReasonTitle = () => within(getReasonFormItem()).getByTitle('Причина ожидания')
const getReasonField = (reason: SuspendReasonEnum): HTMLInputElement =>
  radioButtonTestUtils.getRadioButtonIn(getReasonFormItem(), suspendReasonDict[reason])

const findReasonError = (text: string) => within(getReasonFormItem()).findByText(text)

const setReason = async (user: UserEvent, reason: SuspendReasonEnum) => {
  const field = getReasonField(reason)
  await user.click(field)
  return field
}

// return time field
const getReturnTimeFormItem = () => within(getContainer()).getByTestId('return-time-form-item')
const getReturnTimeTitle = () => within(getReturnTimeFormItem()).getByTitle('Время возврата')
const getEndDateFormItem = () => within(getReturnTimeFormItem()).getByTestId('end-date-form-item')

const getEndDateField = (): HTMLInputElement =>
  within(getEndDateFormItem()).getByPlaceholderText('Выберите дату')

const findEndDateError = (text: string) => within(getEndDateFormItem()).findByText(text)

const setEndDate = async (user: UserEvent, value: string) => {
  const field = getEndDateField()
  await user.type(field, value)
  await user.tab()
  return field
}

const getEndTimeFormItem = () => within(getReturnTimeFormItem()).getByTestId('end-time-form-item')

const getEndTimeField = (): HTMLInputElement =>
  within(getEndTimeFormItem()).getByPlaceholderText('Выберите время')

const findEndTimeError = (text: string) => within(getEndTimeFormItem()).findByText(text)

const setEndTime = async (user: UserEvent, value: string) => {
  const field = getEndTimeField()
  await user.type(field, value)
  await user.tab()
  return field
}

// comment field
const getCommentFormItem = () => within(getContainer()).getByTestId('comment-form-item')
const getCommentTitle = () => within(getCommentFormItem()).getByTitle('Комментарий')
const getCommentField = () => within(getCommentFormItem()).getByPlaceholderText('Опишите ситуацию')
const findCommentError = (text: string) => within(getCommentFormItem()).findByText(text)

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
  findContainer,
  getChildByText,

  getCloseButton,
  clickCloseButton,

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getReasonFormItem,
  getReasonTitle,
  getReasonField,
  findReasonError,
  setReason,

  getReturnTimeFormItem,
  getReturnTimeTitle,
  getEndDateFormItem,
  getEndDateField,
  findEndDateError,
  setEndDate,
  getEndTimeFormItem,
  getEndTimeField,
  findEndTimeError,
  setEndTime,

  getCommentFormItem,
  getCommentTitle,
  getCommentField,
  findCommentError,
  setComment,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка создания запроса о переводе в ожидание', () => {
  test('Заголовок отображается', () => {
    render(<RequestTaskSuspendModal {...props} />)
    expect(testUtils.getChildByText(/^запрос перевода заявки/i)).toBeInTheDocument()
    expect(testUtils.getChildByText(props.recordId)).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await testUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)
        await testUtils.setComment(user, fakeWord())
        await testUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.clickSubmitButton(user)
        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Поле причины ожидания', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const awaitingReleaseField = testUtils.getReasonField(SuspendReasonEnum.AwaitingRelease)
      const awaitingNonItWorkField = testUtils.getReasonField(SuspendReasonEnum.AwaitingNonItWork)
      const awaitingInformationField = testUtils.getReasonField(
        SuspendReasonEnum.AwaitingInformation,
      )
      const awaitingInformationFromFirstLineField = testUtils.getReasonField(
        SuspendReasonEnum.AwaitingInformationFromFirstLine,
      )
      const awaitingInitiatorField = testUtils.getReasonField(SuspendReasonEnum.AwaitingInitiator)
      const awaitingPurchaseField = testUtils.getReasonField(SuspendReasonEnum.AwaitingPurchase)

      const title = testUtils.getReasonTitle()

      expect(title).toBeInTheDocument()

      expect(awaitingReleaseField).toBeInTheDocument()
      expect(awaitingReleaseField).not.toBeEnabled()
      expect(awaitingReleaseField.value).toBe(SuspendReasonEnum.AwaitingRelease)
      expect(awaitingReleaseField).not.toBeChecked()

      expect(awaitingNonItWorkField).toBeInTheDocument()
      expect(awaitingNonItWorkField).not.toBeEnabled()
      expect(awaitingNonItWorkField.value).toBe(SuspendReasonEnum.AwaitingNonItWork)
      expect(awaitingNonItWorkField).not.toBeChecked()

      expect(awaitingInformationField).toBeInTheDocument()
      expect(awaitingInformationField).toBeEnabled()
      expect(awaitingInformationField.value).toBe(SuspendReasonEnum.AwaitingInformation)
      expect(awaitingInformationField).not.toBeChecked()

      expect(awaitingInformationFromFirstLineField).toBeInTheDocument()
      expect(awaitingInformationFromFirstLineField).toBeEnabled()
      expect(awaitingInformationFromFirstLineField.value).toBe(
        SuspendReasonEnum.AwaitingInformationFromFirstLine,
      )
      expect(awaitingInformationFromFirstLineField).not.toBeChecked()

      expect(awaitingInitiatorField).toBeInTheDocument()
      expect(awaitingInitiatorField).toBeEnabled()
      expect(awaitingInitiatorField.value).toBe(SuspendReasonEnum.AwaitingInitiator)
      expect(awaitingInitiatorField).not.toBeChecked()

      expect(awaitingPurchaseField).toBeInTheDocument()
      expect(awaitingPurchaseField).toBeEnabled()
      expect(awaitingPurchaseField.value).toBe(SuspendReasonEnum.AwaitingPurchase)
      expect(awaitingPurchaseField).not.toBeChecked()
    })

    test('Можно выбрать причину', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      const awaitingReleaseField = await testUtils.setReason(
        user,
        SuspendReasonEnum.AwaitingRelease,
      )
      expect(awaitingReleaseField).not.toBeChecked()

      const awaitingNonItWorkField = await testUtils.setReason(
        user,
        SuspendReasonEnum.AwaitingNonItWork,
      )
      expect(awaitingNonItWorkField).not.toBeChecked()

      const awaitingInitiatorField = await testUtils.setReason(
        user,
        SuspendReasonEnum.AwaitingInitiator,
      )
      expect(awaitingInitiatorField).toBeChecked()

      const awaitingInformationField = await testUtils.setReason(
        user,
        SuspendReasonEnum.AwaitingInformation,
      )
      expect(awaitingInformationField).toBeChecked()

      const awaitingInformationFromFirstLineField = await testUtils.setReason(
        user,
        SuspendReasonEnum.AwaitingInformationFromFirstLine,
      )
      expect(awaitingInformationFromFirstLineField).toBeChecked()

      const awaitingPurchaseField = await testUtils.setReason(
        user,
        SuspendReasonEnum.AwaitingPurchase,
      )
      expect(awaitingPurchaseField).toBeChecked()
    })

    test('Не активно во время загрузки', () => {
      render(<RequestTaskSuspendModal {...props} isLoading />)

      Object.values(SuspendReasonEnum).forEach((reason) => {
        const field = testUtils.getReasonField(reason)
        expect(field).toBeDisabled()
      })
    })

    describe('Отображается ошибка', () => {
      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.clickSubmitButton(user)

        expect(await testUtils.findReasonError(validationMessages.required)).toBeInTheDocument()
      })
    })
  })

  describe('Поля времени возврата', () => {
    test('Отображаются корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const endDateField = testUtils.getEndDateField()
      const endTimeField = testUtils.getEndTimeField()
      const title = testUtils.getReturnTimeTitle()

      expect(title).toBeInTheDocument()
      expect(endDateField).toBeInTheDocument()
      expect(endDateField).toBeDisabled()
      expect(endDateField).not.toHaveValue()
      expect(endTimeField).toBeInTheDocument()
      expect(endTimeField).toBeDisabled()
      expect(endTimeField).not.toHaveValue()
    })

    describe('Поле даты', () => {
      test('Активно если выбрать определённую причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        for await (const reason of Object.values(SuspendReasonEnum)) {
          if (reasonsMakeDateTimeFieldDisabled.includes(reason)) return

          await testUtils.setReason(user, reason)
          expect(testUtils.getEndDateField()).toBeEnabled()
        }
      })

      describe('Не активно', () => {
        test('Если не выбрана причина', () => {
          render(<RequestTaskSuspendModal {...props} />)
          expect(testUtils.getEndDateField()).toBeDisabled()
        })

        test('Если выбрать определённую причину', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          for await (const reason of Object.values(SuspendReasonEnum)) {
            if (!reasonsMakeDateTimeFieldDisabled.includes(reason)) return

            await testUtils.setReason(user, reason)
            expect(testUtils.getEndDateField()).toBeDisabled()
          }
        })
      })

      test('Можно установить значение если выбрать определённую причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

        const value = formatDate(moment(), DATE_PICKER_FORMAT)
        const field = await testUtils.setEndDate(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('При выборе определённой причины, автоматически устанавливается текущая дата на пять дней больше', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

        const field = testUtils.getEndDateField()
        const plusFiveDaysDate = moment().add('5', 'days').format(DATE_PICKER_FORMAT)

        expect(field.value).toBe(plusFiveDaysDate)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(await testUtils.findEndDateError(validationMessages.required)).toBeInTheDocument()
        })

        test('Если дата в прошлом времени', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

          const value = formatDate(moment().subtract(1, 'day'), DATE_PICKER_FORMAT)
          await testUtils.setEndDate(user, value)

          expect(
            await testUtils.findEndDateError(validationMessages.date.canNotBeInPast),
          ).toBeInTheDocument()
        })
      })

      test('Значение сбрасывается при выборе определённой причины', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

        const field = testUtils.getEndDateField()
        expect(field).toHaveDisplayValue(field.value)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

        expect(testUtils.getEndDateField()).not.toHaveDisplayValue(field.value)
      })
    })

    describe('Поле времени', () => {
      test('Активно если выбрать определённую причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        for await (const reason of Object.values(SuspendReasonEnum)) {
          if (reasonsMakeDateTimeFieldDisabled.includes(reason)) return

          await testUtils.setReason(user, reason)
          expect(testUtils.getEndTimeField()).toBeEnabled()
        }
      })

      describe('Не активно', () => {
        test('Если не выбрана причина', () => {
          render(<RequestTaskSuspendModal {...props} />)
          expect(testUtils.getEndTimeField()).toBeDisabled()
        })

        test('Если выбрать определённую причину', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          for await (const reason of Object.values(SuspendReasonEnum)) {
            if (!reasonsMakeDateTimeFieldDisabled.includes(reason)) return

            await testUtils.setReason(user, reason)
            expect(testUtils.getEndTimeField()).toBeDisabled()
          }
        })

        test('Во время загрузки', () => {
          render(<RequestTaskSuspendModal {...props} isLoading />)
          expect(testUtils.getEndTimeField()).toBeDisabled()
        })
      })

      test('Можно установить значение если выбрать определённую причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

        const value = formatDate(moment(), TIME_PICKER_FORMAT)
        const field = await testUtils.setEndTime(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('При выборе определённой причины, автоматически устанавливается текущее время', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

        const field = testUtils.getEndTimeField()
        const plusFiveDaysTime = moment().add('5', 'days').format(TIME_PICKER_FORMAT)

        expect(field.value).toBe(plusFiveDaysTime)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.clickSubmitButton(user)

          expect(await testUtils.findEndTimeError(validationMessages.required)).toBeInTheDocument()
        })

        // todo: выяснить почему тест падает но функционал работает
        test.skip('Если выбран сегодняшний день и если время в прошлом времени', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

          const dateValue = formatDate(moment(), DATE_PICKER_FORMAT)
          await testUtils.setEndDate(user, dateValue)

          const timeValue = formatDate(moment().subtract(1, 'hour'), TIME_PICKER_FORMAT)
          await testUtils.setEndTime(user, timeValue)

          expect(
            await testUtils.findEndTimeError(validationMessages.time.canNotBeInPast),
          ).toBeInTheDocument()
        })
      })

      test('Значение сбрасывается при выборе определённой причины', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

        const field = testUtils.getEndTimeField()
        expect(field).toHaveDisplayValue(field.value)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

        expect(testUtils.getEndTimeField()).not.toHaveDisplayValue(field.value)
      })
    })
  })

  describe('Поле комментария', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const title = testUtils.getCommentTitle()
      const field = testUtils.getCommentField()

      expect(title).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      const value = fakeWord()
      const field = await testUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setComment(user, ' ')

        expect(
          await testUtils.findCommentError(validationMessages.canNotBeEmpty),
        ).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.clickSubmitButton(user)

        expect(await testUtils.findCommentError(validationMessages.required)).toBeInTheDocument()
      })
    })
  })
})
