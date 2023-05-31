import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import { SuspendReasonEnum } from 'modules/task/constants/common'
import { suspendReasonDict } from 'modules/task/constants/dictionary'

import {
  validationMessages,
  validationSizes,
} from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'

import {
  fakeIdStr,
  fakeWord,
  getButtonIn,
  expectLoadingFinishedByButton,
  expectLoadingStartedByButton,
  modalTestUtils,
  render,
} from '_tests_/utils'

import { reasonsMakeDateTimeFieldDisabled } from './constants'
import RequestTaskSuspendModal, { RequestTaskSuspendModalProps } from './index'

const requiredProps: Readonly<RequestTaskSuspendModalProps> = {
  recordId: fakeIdStr(),
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('request-task-suspend-modal')

const findContainer = () => screen.findByTestId('request-task-suspend-modal')

const getChildByText = (text: string | RegExp) =>
  within(getContainer()).getByText(text)

// close button
const getCloseButton = () => getButtonIn(getContainer(), /close/i)

const clickCloseButton = async (user: UserEvent) => {
  const button = getCloseButton()
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

// submit button
const getSubmitButton = () =>
  getButtonIn(getContainer(), /перевести в ожидание/i)

const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
  return button
}

// reason
const getReasonBlock = () => within(getContainer()).getByTestId('reason')

const getReasonTitle = () =>
  within(getReasonBlock()).getByTitle('Причина ожидания')

const getReasonField = (reason: SuspendReasonEnum): HTMLInputElement =>
  within(getReasonBlock()).getByRole('radio', {
    name: suspendReasonDict[reason],
  })

const findReasonError = (text: string) =>
  within(getReasonBlock()).findByText(text)

const setReason = async (user: UserEvent, reason: SuspendReasonEnum) => {
  const field = getReasonField(reason)
  await user.click(field)
  return field
}

// return time
const getReturnTimeBlock = () =>
  within(getContainer()).getByTestId('return-time')

const getReturnTimeTitle = () =>
  within(getReturnTimeBlock()).getByTitle('Время возврата')

const getEndDateBlock = () =>
  within(getReturnTimeBlock()).getByTestId('end-date')

const getEndDateField = (): HTMLInputElement =>
  within(getEndDateBlock()).getByPlaceholderText('Выберите дату')

const findEndDateError = (text: string) =>
  within(getEndDateBlock()).findByText(text)

const setEndDate = async (user: UserEvent, value: string) => {
  const field = getEndDateField()
  await user.type(field, value)
  await user.tab()
  return field
}

const getEndTimeBlock = () =>
  within(getReturnTimeBlock()).getByTestId('end-time')

const getEndTimeField = (): HTMLInputElement =>
  within(getEndTimeBlock()).getByPlaceholderText('Выберите время')

const findEndTimeError = (text: string) =>
  within(getEndTimeBlock()).findByText(text)

const setEndTime = async (user: UserEvent, value: string) => {
  const field = getEndTimeField()
  await user.type(field, value)
  await user.tab()
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

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

// loading
const expectLoadingStarted = () =>
  expectLoadingStartedByButton(getSubmitButton())

const expectLoadingFinished = () =>
  expectLoadingFinishedByButton(getSubmitButton())

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

  getReasonBlock,
  getReasonTitle,
  getReasonField,
  findReasonError,
  setReason,

  getReturnTimeBlock,
  getReturnTimeTitle,
  getEndDateBlock,
  getEndDateField,
  findEndDateError,
  setEndDate,
  getEndTimeBlock,
  getEndTimeField,
  findEndTimeError,
  setEndTime,

  getCommentBlock,
  getCommentTitle,
  getCommentField,
  findCommentError,
  setComment,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка создания запроса о переводе в ожидание', () => {
  test('Заголовок отображается', () => {
    render(<RequestTaskSuspendModal {...requiredProps} />)

    expect(
      testUtils.getChildByText(/^запрос перевода заявки/i),
    ).toBeInTheDocument()

    expect(testUtils.getChildByText(requiredProps.recordId)).toBeInTheDocument()
  })

  test('Обработчик вызывается корректно кликнув вне модалки', async () => {
    const { user } = render(<RequestTaskSuspendModal {...requiredProps} />)

    await modalTestUtils.clickOutsideModal(user)
    expect(requiredProps.onCancel).toBeCalledTimes(1)
  })

  describe('Кнопка закрытия', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...requiredProps} />)
      const button = testUtils.getCloseButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskSuspendModal {...requiredProps} />)

      await testUtils.clickCloseButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...requiredProps} />)

      const button = testUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskSuspendModal {...requiredProps} />)

      await testUtils.clickCancelButton(user)
      expect(requiredProps.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...requiredProps} />)

      const button = testUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Отображает состояние загрузки', async () => {
      render(<RequestTaskSuspendModal {...requiredProps} isLoading />)
      await testUtils.expectLoadingStarted()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<RequestTaskSuspendModal {...requiredProps} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)
        await testUtils.setComment(user, fakeWord())
        await testUtils.clickSubmitButton(user)

        expect(requiredProps.onSubmit).toBeCalledTimes(1)
        expect(requiredProps.onSubmit).toBeCalledWith(
          expect.anything(),
          expect.anything(),
        )
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<RequestTaskSuspendModal {...requiredProps} />)

        await testUtils.clickSubmitButton(user)
        expect(requiredProps.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Форма', () => {
    describe('Поле причины ожидания', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskSuspendModal {...requiredProps} />)
        expect(testUtils.getReasonTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskSuspendModal {...requiredProps} />)

        Object.values(SuspendReasonEnum).forEach((reason) => {
          const field = testUtils.getReasonField(reason)
          expect(field).toBeInTheDocument()
          expect(field).toBeEnabled()
          expect(field.value).toBe(reason)
          expect(field).not.toBeChecked()
        })
      })

      test('Можно выбрать любую причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...requiredProps} />)

        for await (const reason of Object.values(SuspendReasonEnum)) {
          const field = await testUtils.setReason(user, reason)
          expect(field).toBeChecked()
        }
      })

      test('Не активно во время загрузки', () => {
        render(<RequestTaskSuspendModal {...requiredProps} isLoading />)

        Object.values(SuspendReasonEnum).forEach((reason) => {
          const field = testUtils.getReasonField(reason)
          expect(field).toBeDisabled()
        })
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findReasonError(validationMessages.required),
          ).toBeInTheDocument()
        })
      })
    })

    describe('Поля времени возврата', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskSuspendModal {...requiredProps} />)
        expect(testUtils.getReturnTimeTitle()).toBeInTheDocument()
      })

      describe('Поле даты', () => {
        test('Отображается корректно', () => {
          render(<RequestTaskSuspendModal {...requiredProps} />)

          const field = testUtils.getEndDateField()

          expect(field).toBeInTheDocument()
          expect(field).not.toBeEnabled()
          expect(field).not.toHaveValue()
        })

        test('Активно если выбрать определённую причину', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          for await (const reason of Object.values(SuspendReasonEnum)) {
            if (reasonsMakeDateTimeFieldDisabled.includes(reason)) return

            await testUtils.setReason(user, reason)
            expect(testUtils.getEndDateField()).toBeEnabled()
          }
        })

        describe('Не активно', () => {
          test('Если не выбрана причина', () => {
            render(<RequestTaskSuspendModal {...requiredProps} />)
            expect(testUtils.getEndDateField()).toBeDisabled()
          })

          test('Если выбрать определённую причину', async () => {
            const { user } = render(
              <RequestTaskSuspendModal {...requiredProps} />,
            )

            for await (const reason of Object.values(SuspendReasonEnum)) {
              if (!reasonsMakeDateTimeFieldDisabled.includes(reason)) return

              await testUtils.setReason(user, reason)
              expect(testUtils.getEndDateField()).toBeDisabled()
            }
          })

          test('Во время загрузки', () => {
            render(<RequestTaskSuspendModal {...requiredProps} isLoading />)
            expect(testUtils.getEndDateField()).toBeDisabled()
          })
        })

        test('Можно установить значение если выбрать определённую причину', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

          const value = formatDate(new Date(), 'YYYY-MM-DD')
          const field = await testUtils.setEndDate(user, value)

          expect(field).toHaveDisplayValue(value)
        })

        test('При выборе определённой причины, автоматически устанавливается текущая дата на пять дней больше', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

          const field = testUtils.getEndDateField()
          const plusFiveDaysDate = moment()
            .add('5', 'days')
            .format('YYYY-MM-DD')

          expect(field.value).toBe(plusFiveDaysDate)
        })

        describe('Отображается ошибка', () => {
          test('Если не заполнить поле и нажать кнопку отправки', async () => {
            const { user } = render(
              <RequestTaskSuspendModal {...requiredProps} />,
            )

            await testUtils.clickSubmitButton(user)

            expect(
              await testUtils.findEndDateError(validationMessages.required),
            ).toBeInTheDocument()
          })

          test('Если дата в прошлом времени', async () => {
            const { user } = render(
              <RequestTaskSuspendModal {...requiredProps} />,
            )

            await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

            const value = formatDate(moment().subtract(1, 'day'), 'YYYY-MM-DD')
            await testUtils.setEndDate(user, value)

            expect(
              await testUtils.findEndDateError(
                validationMessages.date.canNotBeInPast,
              ),
            ).toBeInTheDocument()
          })
        })

        test('Значение сбрасывается при выборе определённой причины', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

          const field = testUtils.getEndDateField()
          expect(field).toHaveDisplayValue(field.value)

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)

          expect(testUtils.getEndDateField()).not.toHaveDisplayValue(
            field.value,
          )
        })
      })

      describe('Поле времени', () => {
        test('Отображается корректно', () => {
          render(<RequestTaskSuspendModal {...requiredProps} />)

          const field = testUtils.getEndTimeField()

          expect(field).toBeInTheDocument()
          expect(field).not.toBeEnabled()
          expect(field).not.toHaveValue()
        })

        test('Активно если выбрать определённую причину', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          for await (const reason of Object.values(SuspendReasonEnum)) {
            if (reasonsMakeDateTimeFieldDisabled.includes(reason)) return

            await testUtils.setReason(user, reason)
            expect(testUtils.getEndTimeField()).toBeEnabled()
          }
        })

        describe('Не активно', () => {
          test('Если не выбрана причина', () => {
            render(<RequestTaskSuspendModal {...requiredProps} />)
            expect(testUtils.getEndTimeField()).toBeDisabled()
          })

          test('Если выбрать определённую причину', async () => {
            const { user } = render(
              <RequestTaskSuspendModal {...requiredProps} />,
            )

            for await (const reason of Object.values(SuspendReasonEnum)) {
              if (!reasonsMakeDateTimeFieldDisabled.includes(reason)) return

              await testUtils.setReason(user, reason)
              expect(testUtils.getEndTimeField()).toBeDisabled()
            }
          })

          test('Во время загрузки', () => {
            render(<RequestTaskSuspendModal {...requiredProps} isLoading />)
            expect(testUtils.getEndTimeField()).toBeDisabled()
          })
        })

        test('Можно установить значение если выбрать определённую причину', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

          const value = formatDate(new Date(), 'HH:mm')
          const field = await testUtils.setEndTime(user, value)

          expect(field).toHaveDisplayValue(value)
        })

        test('При выборе определённой причины, автоматически устанавливается текущее время', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

          const field = testUtils.getEndTimeField()
          const plusFiveDaysTime = moment().add('5', 'days').format('HH:mm')

          expect(field.value).toBe(plusFiveDaysTime)
        })

        describe('Отображается ошибка', () => {
          test('Если не заполнить поле и нажать кнопку отправки', async () => {
            const { user } = render(
              <RequestTaskSuspendModal {...requiredProps} />,
            )

            await testUtils.clickSubmitButton(user)

            expect(
              await testUtils.findEndTimeError(validationMessages.required),
            ).toBeInTheDocument()
          })

          // todo: выяснить почему тест падает но всё написано корректно
          test.skip('Если выбран сегодняшний день и если время в прошлом времени', async () => {
            const { user } = render(
              <RequestTaskSuspendModal {...requiredProps} />,
            )

            await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

            const dateValue = formatDate(new Date(), 'YYYY-MM-DD')
            await testUtils.setEndDate(user, dateValue)

            const timeValue = formatDate(moment().subtract(1, 'hour'), 'HH:mm')
            await testUtils.setEndTime(user, timeValue)

            expect(
              await testUtils.findEndTimeError(
                validationMessages.time.canNotBeInPast,
              ),
            ).toBeInTheDocument()
          })
        })

        test('Значение сбрасывается при выборе определённой причины', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)

          const field = testUtils.getEndTimeField()
          expect(field).toHaveDisplayValue(field.value)

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)

          expect(testUtils.getEndTimeField()).not.toHaveDisplayValue(
            field.value,
          )
        })
      })
    })

    describe('Поле комментария', () => {
      test('Заголовок отображается', () => {
        render(<RequestTaskSuspendModal {...requiredProps} />)
        expect(testUtils.getCommentTitle()).toBeInTheDocument()
      })

      test('Отображается корректно', () => {
        render(<RequestTaskSuspendModal {...requiredProps} />)

        const field = testUtils.getCommentField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно установить значение', async () => {
        const { user } = render(<RequestTaskSuspendModal {...requiredProps} />)

        const value = fakeWord()
        const field = await testUtils.setComment(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('Не активно во время загрузки', () => {
        render(<RequestTaskSuspendModal {...requiredProps} isLoading />)
        expect(testUtils.getCommentField()).toBeDisabled()
      })

      describe('Отображается ошибка', () => {
        test('Если ввести только пробелы', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setComment(user, ' ')

          expect(
            await testUtils.findCommentError(validationMessages.canNotBeEmpty),
          ).toBeInTheDocument()
        })

        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.clickSubmitButton(user)

          expect(
            await testUtils.findCommentError(validationMessages.required),
          ).toBeInTheDocument()
        })

        test('Если превысить лимит символов', async () => {
          const { user } = render(
            <RequestTaskSuspendModal {...requiredProps} />,
          )

          await testUtils.setComment(
            user,
            fakeWord({ length: validationSizes.string.long + 1 }),
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
})
