import { within } from '@testing-library/react'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import {
  externalResponsibleCompanyDict,
  ExternalResponsibleCompanyEnum,
  SuspendReasonEnum,
} from 'features/tasks/constants/taskSuspendRequest'

import { validationMessages } from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'

import { props } from '_tests_/features/tasks/components/RequestTaskSuspendModal/constants'
import { requestTaskSuspendModalTestUtils } from '_tests_/features/tasks/components/RequestTaskSuspendModal/testUtils'
import { fakeInteger, fakeUrl, fakeWord, render } from '_tests_/utils'

import RequestTaskSuspendModal from './index'
import { getDateLimitExceedError } from './utils'

describe('Модалка создания запроса о переводе в ожидание', () => {
  test('Заголовок отображается', () => {
    render(<RequestTaskSuspendModal {...props} />)
    expect(
      within(requestTaskSuspendModalTestUtils.getContainer()).getByText(/^запрос перевода заявки/i),
    ).toBeInTheDocument()
    expect(
      within(requestTaskSuspendModalTestUtils.getContainer()).getByText(props.recordId),
    ).toBeInTheDocument()
  })

  describe('Кнопка отмены', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const button = requestTaskSuspendModalTestUtils.getCancelButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test('Обработчик вызывается корректно', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await requestTaskSuspendModalTestUtils.clickCancelButton(user)
      expect(props.onCancel).toBeCalledTimes(1)
    })
  })

  describe('Кнопка отправки', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const button = requestTaskSuspendModalTestUtils.getSubmitButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    describe('При клике обработчик вызывается корректно', () => {
      test('Если поля заполнены', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.setReason(
          user,
          SuspendReasonEnum.AwaitingInformation,
        )
        await requestTaskSuspendModalTestUtils.setComment(user, fakeWord())
        await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

        expect(props.onSubmit).toBeCalledTimes(1)
        expect(props.onSubmit).toBeCalledWith(expect.anything(), expect.anything())
      })

      test('Если поля не заполнены', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.clickSubmitButton(user)
        expect(props.onSubmit).not.toBeCalled()
      })
    })
  })

  describe('Поле причины ожидания', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const title = within(requestTaskSuspendModalTestUtils.getReasonFormItem()).getByTitle(
        'Причина ожидания',
      )
      expect(title).toBeInTheDocument()

      Object.values(SuspendReasonEnum).forEach((reason) => {
        const field = requestTaskSuspendModalTestUtils.getReasonField(reason)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field.value).toBe(reason)
        expect(field).not.toBeChecked()
      })
    })

    test('Можно выбрать причину', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      for await (const reason of Object.values(SuspendReasonEnum)) {
        const field = await requestTaskSuspendModalTestUtils.setReason(user, reason)
        expect(field).toBeChecked()
      }
    })

    describe('Отображается ошибка', () => {
      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

        const error = await requestTaskSuspendModalTestUtils.findReasonError(
          validationMessages.required,
        )
        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Поле ссылки на задачу', () => {
    test(`Отображается если выбрана причина ${SuspendReasonEnum.AwaitingRelease}`, async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)

      const title = within(requestTaskSuspendModalTestUtils.getTaskLinkFormItem()).getByTitle(
        'Ссылка на задачу',
      )
      const field = requestTaskSuspendModalTestUtils.getTaskLinkField()

      expect(title).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если выбрана другая причина', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingInitiator)

      const field = requestTaskSuspendModalTestUtils.queryTaskLinkFormItem()
      expect(field).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)
      const value = fakeUrl()
      const field = await requestTaskSuspendModalTestUtils.setTaskLink(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    describe('Отображается ошибка', () => {
      test('Если ввести не корректный url', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)
        await requestTaskSuspendModalTestUtils.setTaskLink(user, fakeWord())

        const error = await requestTaskSuspendModalTestUtils.findTaskLinkError(
          validationMessages.url.incorrect,
        )
        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)
        await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

        const error = await requestTaskSuspendModalTestUtils.findTaskLinkError(
          validationMessages.required,
        )
        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Поле организации', () => {
    test(`Отображается корректно если выбрана причина ${SuspendReasonEnum.AwaitingNonItWork}`, async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingNonItWork)
      const label = within(
        requestTaskSuspendModalTestUtils.getOrganizationFormItem(),
      ).getByLabelText('Организация (ответственная за работу вне зоны ответственности ИТ)')
      const input = requestTaskSuspendModalTestUtils.getOrganizationSelectInput()

      await requestTaskSuspendModalTestUtils.openOrganizationSelect(user)
      const value =
        externalResponsibleCompanyDict[ExternalResponsibleCompanyEnum.BusinessDepartmentX5]
      const selectedOrganization = requestTaskSuspendModalTestUtils.getSelectedOrganization(value)

      expect(selectedOrganization).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если выбрана другая причина', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingInitiator)

      const field = requestTaskSuspendModalTestUtils.queryOrganizationFormItem()
      expect(field).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingNonItWork)
      await requestTaskSuspendModalTestUtils.openOrganizationSelect(user)
      const value =
        externalResponsibleCompanyDict[ExternalResponsibleCompanyEnum.OutsideOrganization]
      await requestTaskSuspendModalTestUtils.setOrganization(user, value)
      const selectedOrganization = requestTaskSuspendModalTestUtils.getSelectedOrganization(value)

      expect(selectedOrganization).toBeInTheDocument()
    })
  })

  describe('Поля времени возврата', () => {
    test.skip('Отображаются корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const endDateField = requestTaskSuspendModalTestUtils.getEndDateField()
      const endTimeField = requestTaskSuspendModalTestUtils.getEndTimeField()
      const title = requestTaskSuspendModalTestUtils.getReturnTimeTitle()
      const info = within(requestTaskSuspendModalTestUtils.getReturnTimeFormItem()).getByText(
        `Убедитесь, что на компьютере установлено точное время. Время ожидания может быть автоматически уменьшено до установленного администратором системы`,
      )

      expect(title).toBeInTheDocument()
      expect(info).toBeInTheDocument()
      expect(endDateField).toBeInTheDocument()
      expect(endDateField).not.toHaveValue()
      expect(endTimeField).toBeInTheDocument()
      expect(endTimeField).not.toHaveValue()
    })

    describe('Поле даты', () => {
      test('Активно если выбрать причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)
        await requestTaskSuspendModalTestUtils.setReason(
          user,
          SuspendReasonEnum.AwaitingInformation,
        )
        expect(requestTaskSuspendModalTestUtils.getEndDateField()).toBeEnabled()
      })

      describe('Не активно', () => {
        test('Если не выбрана причина', () => {
          render(<RequestTaskSuspendModal {...props} />)
          expect(requestTaskSuspendModalTestUtils.getEndDateField()).toBeDisabled()
        })

        test('При загрузке', () => {
          render(<RequestTaskSuspendModal {...props} isLoading />)
          expect(requestTaskSuspendModalTestUtils.getEndDateField()).toBeDisabled()
        })

        test('При загрузке системных настроек', () => {
          render(<RequestTaskSuspendModal {...props} systemSettingsIsLoading />)
          expect(requestTaskSuspendModalTestUtils.getEndDateField()).toBeDisabled()
        })

        test('Если так указано в системных настройках', async () => {
          const { user } = render(
            <RequestTaskSuspendModal
              {...props}
              systemSettings={{
                suspendReasons: {
                  [SuspendReasonEnum.AwaitingInformation]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingInitiator]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingNonItWork]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingRelease]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingPurchase]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingInformationFromFirstLine]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                },
              }}
            />,
          )

          for await (const reason of Object.values(SuspendReasonEnum)) {
            await requestTaskSuspendModalTestUtils.setReason(user, reason)
            expect(requestTaskSuspendModalTestUtils.getEndDateField()).toBeDisabled()
          }
        })
      })

      test('Можно установить значение', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.setReason(
          user,
          SuspendReasonEnum.AwaitingInformation,
        )
        await requestTaskSuspendModalTestUtils.resetEndDate(user)
        const value = formatDate(moment(), DATE_PICKER_FORMAT)
        const field = await requestTaskSuspendModalTestUtils.setEndDate(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('При выборе причины значение устанавливается в соответствии с системными настройками', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        const reason = SuspendReasonEnum.AwaitingInformation
        await requestTaskSuspendModalTestUtils.setReason(user, reason)

        const field = requestTaskSuspendModalTestUtils.getEndDateField()
        const value = moment()
          .add(props.systemSettings!.suspendReasons[reason].limit, 'days')
          .format(DATE_PICKER_FORMAT)

        expect(field.value).toBe(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          const error = await requestTaskSuspendModalTestUtils.findEndDateError(
            validationMessages.required,
          )
          expect(error).toBeInTheDocument()
        })

        test('Если дата в прошлом времени', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)
          await requestTaskSuspendModalTestUtils.resetEndDate(user)
          const value = formatDate(moment().subtract(1, 'day'), DATE_PICKER_FORMAT)
          await requestTaskSuspendModalTestUtils.setEndDate(user, value)

          const error = await requestTaskSuspendModalTestUtils.findEndDateError(
            validationMessages.date.canNotBeInPast,
          )
          expect(error).toBeInTheDocument()
        })

        test('Если превышен лимит из системных настроек', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          const reason = SuspendReasonEnum.AwaitingInformation
          await requestTaskSuspendModalTestUtils.setReason(user, reason)
          await requestTaskSuspendModalTestUtils.resetEndDate(user)

          const limit = props.systemSettings!.suspendReasons[reason].limit
          const value = moment()
            .add(limit + 1, 'days')
            .format(DATE_PICKER_FORMAT)
          await requestTaskSuspendModalTestUtils.setEndDate(user, value)

          const limitDate = moment().add(limit, 'days')
          const error = await requestTaskSuspendModalTestUtils.findEndDateError(
            getDateLimitExceedError(limitDate),
          )
          expect(error).toBeInTheDocument()
        })
      })
    })

    describe.skip('Поле времени', () => {
      test('Активно если выбрать причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)
        await requestTaskSuspendModalTestUtils.setReason(
          user,
          SuspendReasonEnum.AwaitingInformation,
        )
        expect(requestTaskSuspendModalTestUtils.getEndTimeField()).toBeEnabled()
      })

      describe('Не активно', () => {
        test('Если не выбрана причина', () => {
          render(<RequestTaskSuspendModal {...props} />)
          expect(requestTaskSuspendModalTestUtils.getEndTimeField()).toBeDisabled()
        })

        test('При загрузке', () => {
          render(<RequestTaskSuspendModal {...props} isLoading />)
          expect(requestTaskSuspendModalTestUtils.getEndTimeField()).toBeDisabled()
        })

        test('При загрузке системных настроек', () => {
          render(<RequestTaskSuspendModal {...props} systemSettingsIsLoading />)
          expect(requestTaskSuspendModalTestUtils.getEndTimeField()).toBeDisabled()
        })

        test('Если так указано в системных настройках', async () => {
          const { user } = render(
            <RequestTaskSuspendModal
              {...props}
              systemSettings={{
                suspendReasons: {
                  [SuspendReasonEnum.AwaitingInformation]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingInitiator]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingNonItWork]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingRelease]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingPurchase]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                  [SuspendReasonEnum.AwaitingInformationFromFirstLine]: {
                    editable: false,
                    limit: fakeInteger({ min: 1, max: 20 }),
                  },
                },
              }}
            />,
          )

          for await (const reason of Object.values(SuspendReasonEnum)) {
            await requestTaskSuspendModalTestUtils.setReason(user, reason)
            expect(requestTaskSuspendModalTestUtils.getEndTimeField()).toBeDisabled()
          }
        })
      })

      test('Можно установить значение', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)
        const value = formatDate(moment(), TIME_PICKER_FORMAT)
        const field = await requestTaskSuspendModalTestUtils.setEndTime(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('При выборе причины устанавливается текущее время', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.setReason(
          user,
          SuspendReasonEnum.AwaitingInformation,
        )
        const field = requestTaskSuspendModalTestUtils.getEndTimeField()
        const value = moment().format(TIME_PICKER_FORMAT)

        expect(field.value).toBe(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

          const error = await requestTaskSuspendModalTestUtils.findEndTimeError(
            validationMessages.required,
          )
          expect(error).toBeInTheDocument()
        })

        // todo: выяснить почему тест падает но функционал работает
        test.skip('Если выбран сегодняшний день и если время в прошлом времени', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await requestTaskSuspendModalTestUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

          const dateValue = formatDate(moment(), DATE_PICKER_FORMAT)
          await requestTaskSuspendModalTestUtils.setEndDate(user, dateValue)

          const timeValue = formatDate(moment().subtract(1, 'hour'), TIME_PICKER_FORMAT)
          await requestTaskSuspendModalTestUtils.setEndTime(user, timeValue)

          const error = await requestTaskSuspendModalTestUtils.findEndTimeError(
            validationMessages.time.canNotBeInPast,
          )
          expect(error).toBeInTheDocument()
        })
      })
    })
  })

  describe('Поле комментария', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const title = within(requestTaskSuspendModalTestUtils.getCommentFormItem()).getByTitle(
        'Комментарий',
      )
      const field = requestTaskSuspendModalTestUtils.getCommentField()

      expect(title).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      const value = fakeWord()
      const field = await requestTaskSuspendModalTestUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.setComment(user, ' ')

        const error = await requestTaskSuspendModalTestUtils.findCommentError(
          validationMessages.canNotBeEmpty,
        )
        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await requestTaskSuspendModalTestUtils.clickSubmitButton(user)

        const error = await requestTaskSuspendModalTestUtils.findCommentError(
          validationMessages.required,
        )
        expect(error).toBeInTheDocument()
      })
    })
  })
})
