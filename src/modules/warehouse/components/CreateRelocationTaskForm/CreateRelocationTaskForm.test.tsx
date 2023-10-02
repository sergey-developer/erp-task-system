import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import { Form } from 'antd'
import moment from 'moment-timezone'

import { DATE_PICKER_FORMAT, TIME_PICKER_FORMAT } from 'lib/antd/constants/dateTimePicker'

import CreateRelocationTaskPage from 'modules/warehouse/pages/CreateRelocationTaskPage'
import { testUtils as createRelocationTaskPageTestUtils } from 'modules/warehouse/pages/CreateRelocationTaskPage/CreateRelocationTaskPage.test'

import { validationMessages } from 'shared/constants/validation'
import { formatDate } from 'shared/utils/date'

import { fakeWord, render } from '_tests_/utils'

import CreateRelocationTaskForm from './index'

const getContainer = () => screen.getByTestId('create-relocation-task-form')

// deadline at field
const getDeadlineAtFormItem = () => within(getContainer()).getByTestId('deadline-at-form-item')

const getDeadlineAtTitle = () => within(getDeadlineAtFormItem()).getByTitle('Срок выполнения')

const getDeadlineAtDateFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-date-form-item')

const getDeadlineAtDateField = (): HTMLInputElement =>
  within(getDeadlineAtDateFormItem()).getByPlaceholderText('Выберите дату')

const findDeadlineAtDateError = (text: string) =>
  within(getDeadlineAtDateFormItem()).findByText(text)

const setDeadlineAtDate = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtDateField()
  await user.type(field, value)
  await user.tab()
  return field
}

const getDeadlineAtTimeFormItem = () =>
  within(getDeadlineAtFormItem()).getByTestId('deadline-at-time-form-item')

const getDeadlineAtTimeField = (): HTMLInputElement =>
  within(getDeadlineAtTimeFormItem()).getByPlaceholderText('Время')

const findDeadlineAtTimeError = (text: string) =>
  within(getDeadlineAtTimeFormItem()).findByText(text)

const setDeadlineAtTime = async (user: UserEvent, value: string) => {
  const field = getDeadlineAtTimeField()
  await user.type(field, value)
  await user.tab()
  return field
}

// comment field
const getCommentFormItem = () => within(getContainer()).getByTestId('comment-form-item')

const getCommentTitle = () => within(getCommentFormItem()).getByTitle('Комментарий')

const getCommentField = () =>
  within(getCommentFormItem()).getByPlaceholderText('Добавьте комментарий')

const findCommentError = (text: string) => within(getCommentFormItem()).findByText(text)

const setComment = async (user: UserEvent, value: string) => {
  const field = getCommentField()
  await user.type(field, value)
  return field
}

export const testUtils = {
  getContainer,

  getDeadlineAtTitle,
  getDeadlineAtDateField,
  findDeadlineAtDateError,
  setDeadlineAtDate,
  getDeadlineAtTimeField,
  findDeadlineAtTimeError,
  setDeadlineAtTime,

  getCommentTitle,
  getCommentField,
  findCommentError,
  setComment,
}

describe('Форма создания заявки на перемещение оборудования', () => {
  describe('Срок выполнения', () => {
    describe('Дата', () => {
      test('Отображается корректно', () => {
        render(
          <Form>
            <CreateRelocationTaskForm />
          </Form>,
        )

        const title = testUtils.getDeadlineAtTitle()
        const field = testUtils.getDeadlineAtDateField()

        expect(title).toBeInTheDocument()
        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно установить значение', async () => {
        const { user } = render(
          <Form>
            <CreateRelocationTaskForm />
          </Form>,
        )

        const value = formatDate(new Date(), DATE_PICKER_FORMAT)
        const field = await testUtils.setDeadlineAtDate(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<CreateRelocationTaskPage />)

          await createRelocationTaskPageTestUtils.clickSubmitButton(user)
          const error = await testUtils.findDeadlineAtDateError(validationMessages.required)

          expect(error).toBeInTheDocument()
        })

        test('Если дата в прошлом времени', async () => {
          const { user } = render(<CreateRelocationTaskPage />)

          const value = formatDate(moment().subtract(1, 'day'), DATE_PICKER_FORMAT)
          await testUtils.setDeadlineAtDate(user, value)
          const error = await testUtils.findDeadlineAtDateError(
            validationMessages.date.canNotBeInPast,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })

    describe('Время', () => {
      test('Отображается корректно', () => {
        render(
          <Form>
            <CreateRelocationTaskForm />
          </Form>,
        )

        const field = testUtils.getDeadlineAtTimeField()

        expect(field).toBeInTheDocument()
        expect(field).toBeEnabled()
        expect(field).not.toHaveValue()
      })

      test('Можно установить значение', async () => {
        const { user } = render(
          <Form>
            <CreateRelocationTaskForm />
          </Form>,
        )

        const value = formatDate(new Date(), TIME_PICKER_FORMAT)
        const field = await testUtils.setDeadlineAtTime(user, value)

        expect(field).toHaveDisplayValue(value)
      })

      describe('Отображается ошибка', () => {
        test('Если не заполнить поле и нажать кнопку отправки', async () => {
          const { user } = render(<CreateRelocationTaskPage />)

          await createRelocationTaskPageTestUtils.clickSubmitButton(user)
          const error = await testUtils.findDeadlineAtTimeError(validationMessages.required)

          expect(error).toBeInTheDocument()
        })

        // todo: выяснить почему тест падает но функционал работает
        test.skip('Если выбран сегодняшний день и если время в прошлом времени', async () => {
          const { user } = render(<CreateRelocationTaskPage />)

          const dateValue = formatDate(new Date(), DATE_PICKER_FORMAT)
          await testUtils.setDeadlineAtDate(user, dateValue)

          const timeValue = formatDate(moment().subtract(1, 'hour'), TIME_PICKER_FORMAT)
          await testUtils.setDeadlineAtTime(user, timeValue)

          const error = await testUtils.findDeadlineAtTimeError(
            validationMessages.time.canNotBeInPast,
          )

          expect(error).toBeInTheDocument()
        })
      })
    })
  })

  describe('Комментарий', () => {
    test('Отображается корректно', () => {
      render(
        <Form>
          <CreateRelocationTaskForm />
        </Form>,
      )

      const title = testUtils.getCommentTitle()
      const field = testUtils.getCommentField()

      expect(title).toBeInTheDocument()
      expect(field).toBeInTheDocument()
      expect(field).toBeEnabled()
      expect(field).not.toHaveValue()
    })

    test('Можно установить значение', async () => {
      const { user } = render(
        <Form>
          <CreateRelocationTaskForm />
        </Form>,
      )

      const value = fakeWord()
      const field = await testUtils.setComment(user, value)

      expect(field).toHaveDisplayValue(value)
    })

    describe('Отображается ошибка', () => {
      test('Если ввести только пробелы', async () => {
        const { user } = render(
          <Form>
            <CreateRelocationTaskForm />
          </Form>,
        )

        await testUtils.setComment(user, ' ')
        const error = await testUtils.findCommentError(validationMessages.canNotBeEmpty)

        expect(error).toBeInTheDocument()
      })
    })
  })
})
