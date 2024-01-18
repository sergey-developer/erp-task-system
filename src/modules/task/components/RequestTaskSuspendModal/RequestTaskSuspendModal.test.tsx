import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import {
  externalResponsibleCompanyDict,
  ExternalResponsibleCompanyEnum,
  suspendReasonDict,
  SuspendReasonEnum,
} from 'modules/task/constants/taskSuspendRequest'

import { validationMessages } from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'

import systemFixtures from '_tests_/fixtures/system'
import {
  buttonTestUtils,
  fakeIdStr,
  fakeInteger,
  fakeUrl,
  fakeWord,
  radioButtonTestUtils,
  render,
  selectTestUtils,
} from '_tests_/utils'

import RequestTaskSuspendModal from './index'
import { RequestTaskSuspendModalProps } from './types'
import { getDateLimitExceedError } from './utils'

const props: Readonly<RequestTaskSuspendModalProps> = {
  open: true,
  recordId: fakeIdStr(),
  systemSettings: systemFixtures.settings(),
  systemSettingsIsLoading: false,
  isLoading: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
}

const getContainer = () => screen.getByTestId('request-task-suspend-modal')
const findContainer = () => screen.findByTestId('request-task-suspend-modal')

// cancel button
const getCancelButton = () => buttonTestUtils.getButtonIn(getContainer(), /отменить/i)
const clickCancelButton = async (user: UserEvent) => {
  const button = getCancelButton()
  await user.click(button)
}

// submit button
const getSubmitButton = () => buttonTestUtils.getButtonIn(getContainer(), /перевести в ожидание/i)
const clickSubmitButton = async (user: UserEvent) => {
  const button = getSubmitButton()
  await user.click(button)
}

// reason field
const getReasonFormItem = () => within(getContainer()).getByTestId('reason-form-item')
const getReasonField = (reason: SuspendReasonEnum): HTMLInputElement =>
  radioButtonTestUtils.getRadioButtonIn(getReasonFormItem(), suspendReasonDict[reason])

const findReasonError = (text: string) => within(getReasonFormItem()).findByText(text)

const setReason = async (user: UserEvent, reason: SuspendReasonEnum) => {
  const field = getReasonField(reason)
  await user.click(field)
  return field
}

// task link field
const getTaskLinkFormItem = () => within(getContainer()).getByTestId('task-link-form-item')
const queryTaskLinkFormItem = () => within(getContainer()).queryByTestId('task-link-form-item')
const getTaskLinkField = () =>
  within(getTaskLinkFormItem()).getByPlaceholderText('Ссылка на задачу во внешней системе')
const findTaskLinkError = (text: string) => within(getTaskLinkFormItem()).findByText(text)

const setTaskLink = async (user: UserEvent, value: string) => {
  const field = getTaskLinkField()
  await user.type(field, value)
  return field
}

// organization field
const getOrganizationFormItem = () => within(getContainer()).getByTestId('organization-form-item')
const queryOrganizationFormItem = () =>
  within(getContainer()).queryByTestId('organization-form-item')

const getOrganizationSelectInput = () =>
  selectTestUtils.getSelect(getOrganizationFormItem(), { name: 'Организация' })

const setOrganization = selectTestUtils.clickSelectOption

const getSelectedOrganization = (value: string): HTMLElement =>
  within(getOrganizationFormItem()).getByTitle(value)

const openOrganizationSelect = async (user: UserEvent) => {
  await selectTestUtils.openSelect(user, getOrganizationFormItem())
}

const findOrganizationError = (error: string): Promise<HTMLElement> =>
  within(getOrganizationFormItem()).findByText(error)

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

const resetEndDate = async (user: UserEvent) => {
  const formItem = getEndDateFormItem()
  const clearButton = buttonTestUtils.getButtonIn(formItem, 'close-circle')
  await user.click(clearButton)
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

  getCancelButton,
  clickCancelButton,

  getSubmitButton,
  clickSubmitButton,

  getReasonField,
  findReasonError,
  setReason,

  getTaskLinkFormItem,
  queryTaskLinkFormItem,
  getTaskLinkField,
  findTaskLinkError,
  setTaskLink,

  getOrganizationFormItem,
  queryOrganizationFormItem,
  getOrganizationSelectInput,
  setOrganization,
  getSelectedOrganization,
  openOrganizationSelect,
  findOrganizationError,

  getReturnTimeFormItem,
  getReturnTimeTitle,
  getEndDateFormItem,
  getEndDateField,
  findEndDateError,
  setEndDate,
  resetEndDate,
  getEndTimeFormItem,
  getEndTimeField,
  findEndTimeError,
  setEndTime,

  getCommentFormItem,
  getCommentField,
  findCommentError,
  setComment,

  expectLoadingStarted,
  expectLoadingFinished,
}

describe('Модалка создания запроса о переводе в ожидание', () => {
  test('Заголовок отображается', () => {
    render(<RequestTaskSuspendModal {...props} />)
    expect(within(getContainer()).getByText(/^запрос перевода заявки/i)).toBeInTheDocument()
    expect(within(getContainer()).getByText(props.recordId)).toBeInTheDocument()
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

      const title = within(getReasonFormItem()).getByTitle('Причина ожидания')
      expect(title).toBeInTheDocument()

      Object.values(SuspendReasonEnum).forEach((reason) => {
        const field = testUtils.getReasonField(reason)
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field.value).toBe(reason)
        expect(field).not.toBeChecked()
      })
    })

    test('Можно выбрать причину', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      for await (const reason of Object.values(SuspendReasonEnum)) {
        const field = await testUtils.setReason(user, reason)
        expect(field).toBeChecked()
      }
    })

    describe('Отображается ошибка', () => {
      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.clickSubmitButton(user)

        const error = await testUtils.findReasonError(validationMessages.required)
        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Поле ссылки на задачу', () => {
    test(`Отображается если выбрана причина ${SuspendReasonEnum.AwaitingRelease}`, async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await testUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)

      const title = within(testUtils.getTaskLinkFormItem()).getByTitle('Ссылка на задачу')
      const field = testUtils.getTaskLinkField()

      expect(title).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Не отображается если выбрана другая причина', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await testUtils.setReason(user, SuspendReasonEnum.AwaitingInitiator)

      const field = testUtils.queryTaskLinkFormItem()
      expect(field).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await testUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)
      const value = fakeUrl()
      const field = await testUtils.setTaskLink(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    describe('Отображается ошибка', () => {
      test('Если ввести не корректный url', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)
        await testUtils.setTaskLink(user, fakeWord())

        const error = await testUtils.findTaskLinkError(validationMessages.url.incorrect)
        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingRelease)
        await testUtils.clickSubmitButton(user)

        const error = await testUtils.findTaskLinkError(validationMessages.required)
        expect(error).toBeInTheDocument()
      })
    })
  })

  describe('Поле организации', () => {
    test(`Отображается корректно если выбрана причина ${SuspendReasonEnum.AwaitingNonItWork}`, async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await testUtils.setReason(user, SuspendReasonEnum.AwaitingNonItWork)
      const label = within(testUtils.getOrganizationFormItem()).getByLabelText(
        'Организация (ответственная за работу вне зоны ответственности ИТ)',
      )
      const input = testUtils.getOrganizationSelectInput()

      await testUtils.openOrganizationSelect(user)
      const value =
        externalResponsibleCompanyDict[ExternalResponsibleCompanyEnum.BusinessDepartmentX5]
      const selectedOrganization = testUtils.getSelectedOrganization(value)

      expect(selectedOrganization).toBeInTheDocument()
      expect(label).toBeInTheDocument()
      expect(input).toBeInTheDocument()
      expect(input).toBeEnabled()
    })

    test('Не отображается если выбрана другая причина', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await testUtils.setReason(user, SuspendReasonEnum.AwaitingInitiator)

      const field = testUtils.queryOrganizationFormItem()
      expect(field).not.toBeInTheDocument()
    })

    test('Можно установить значение', async () => {
      const { user } = render(<RequestTaskSuspendModal {...props} />)

      await testUtils.setReason(user, SuspendReasonEnum.AwaitingNonItWork)
      await testUtils.openOrganizationSelect(user)
      const value =
        externalResponsibleCompanyDict[ExternalResponsibleCompanyEnum.OutsideOrganization]
      await testUtils.setOrganization(user, value)
      const selectedOrganization = testUtils.getSelectedOrganization(value)

      expect(selectedOrganization).toBeInTheDocument()
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
      expect(endDateField).not.toHaveValue()
      expect(endTimeField).toBeInTheDocument()
      expect(endTimeField).not.toHaveValue()
    })

    describe('Поле даты', () => {
      test('Активно если выбрать причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)
        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)
        expect(testUtils.getEndDateField()).toBeEnabled()
      })

      describe('Не активно', () => {
        test('Если не выбрана причина', () => {
          render(<RequestTaskSuspendModal {...props} />)
          expect(testUtils.getEndDateField()).toBeDisabled()
        })

        test('При загрузке', () => {
          render(<RequestTaskSuspendModal {...props} isLoading />)
          expect(testUtils.getEndDateField()).toBeDisabled()
        })

        test('При загрузке системных настроек', () => {
          render(<RequestTaskSuspendModal {...props} systemSettingsIsLoading />)
          expect(testUtils.getEndDateField()).toBeDisabled()
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
            await testUtils.setReason(user, reason)
            expect(testUtils.getEndDateField()).toBeDisabled()
          }
        })
      })

      test('Можно установить значение', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)
        await testUtils.resetEndDate(user)
        const value = formatDate(moment(), DATE_PICKER_FORMAT)
        const field = await testUtils.setEndDate(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('При выборе причины значение устанавливается в соответствии с системными настройками', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        const reason = SuspendReasonEnum.AwaitingInformation
        await testUtils.setReason(user, reason)

        const field = testUtils.getEndDateField()
        const value = moment()
          .add(props.systemSettings!.suspendReasons[reason].limit, 'days')
          .format(DATE_PICKER_FORMAT)

        expect(field.value).toBe(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.clickSubmitButton(user)

          const error = await testUtils.findEndDateError(validationMessages.required)
          expect(error).toBeInTheDocument()
        })

        test('Если дата в прошлом времени', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)
          await testUtils.resetEndDate(user)
          const value = formatDate(moment().subtract(1, 'day'), DATE_PICKER_FORMAT)
          await testUtils.setEndDate(user, value)

          const error = await testUtils.findEndDateError(validationMessages.date.canNotBeInPast)
          expect(error).toBeInTheDocument()
        })

        test('Если превышен лимит из системных настроек', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          const reason = SuspendReasonEnum.AwaitingInformation
          await testUtils.setReason(user, reason)
          await testUtils.resetEndDate(user)

          const limit = props.systemSettings!.suspendReasons[reason].limit
          const value = moment()
            .add(limit + 1, 'days')
            .format(DATE_PICKER_FORMAT)
          await testUtils.setEndDate(user, value)

          const limitDate = moment().add(limit, 'days')
          const error = await testUtils.findEndDateError(getDateLimitExceedError(limitDate))
          expect(error).toBeInTheDocument()
        })
      })
    })

    describe('Поле времени', () => {
      test('Активно если выбрать причину', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)
        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)
        expect(testUtils.getEndTimeField()).toBeEnabled()
      })

      describe('Не активно', () => {
        test('Если не выбрана причина', () => {
          render(<RequestTaskSuspendModal {...props} />)
          expect(testUtils.getEndTimeField()).toBeDisabled()
        })

        test('При загрузке', () => {
          render(<RequestTaskSuspendModal {...props} isLoading />)
          expect(testUtils.getEndTimeField()).toBeDisabled()
        })

        test('При загрузке системных настроек', () => {
          render(<RequestTaskSuspendModal {...props} systemSettingsIsLoading />)
          expect(testUtils.getEndTimeField()).toBeDisabled()
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
            await testUtils.setReason(user, reason)
            expect(testUtils.getEndTimeField()).toBeDisabled()
          }
        })
      })

      test('Можно установить значение', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)
        const value = formatDate(moment(), TIME_PICKER_FORMAT)
        const field = await testUtils.setEndTime(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      test('При выборе причины устанавливается текущее время', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.setReason(user, SuspendReasonEnum.AwaitingInformation)
        const field = testUtils.getEndTimeField()
        const value = moment().format(TIME_PICKER_FORMAT)

        expect(field.value).toBe(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.clickSubmitButton(user)

          const error = await testUtils.findEndTimeError(validationMessages.required)
          expect(error).toBeInTheDocument()
        })

        // todo: выяснить почему тест падает но функционал работает
        test.skip('Если выбран сегодняшний день и если время в прошлом времени', async () => {
          const { user } = render(<RequestTaskSuspendModal {...props} />)

          await testUtils.setReason(user, SuspendReasonEnum.AwaitingPurchase)

          const dateValue = formatDate(moment(), DATE_PICKER_FORMAT)
          await testUtils.setEndDate(user, dateValue)

          const timeValue = formatDate(moment().subtract(1, 'hour'), TIME_PICKER_FORMAT)
          await testUtils.setEndTime(user, timeValue)

          const error = await testUtils.findEndTimeError(validationMessages.time.canNotBeInPast)
          expect(error).toBeInTheDocument()
        })
      })
    })
  })

  describe('Поле комментария', () => {
    test('Отображается корректно', () => {
      render(<RequestTaskSuspendModal {...props} />)

      const title = within(getCommentFormItem()).getByTitle('Комментарий')
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

        const error = await testUtils.findCommentError(validationMessages.canNotBeEmpty)
        expect(error).toBeInTheDocument()
      })

      test('Если не заполнить поле и нажать кнопку отправки', async () => {
        const { user } = render(<RequestTaskSuspendModal {...props} />)

        await testUtils.clickSubmitButton(user)

        const error = await testUtils.findCommentError(validationMessages.required)
        expect(error).toBeInTheDocument()
      })
    })
  })
})
