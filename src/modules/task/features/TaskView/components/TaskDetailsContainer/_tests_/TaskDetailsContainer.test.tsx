import head from 'lodash/head'

import {
  mockDeleteTaskWorkGroupBadRequestError,
  mockDeleteTaskWorkGroupForbiddenError,
  mockDeleteTaskWorkGroupNotFoundError,
  mockDeleteTaskWorkGroupServerError,
  mockDeleteTaskWorkGroupSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  generateWord,
  getStoreWithAuth,
  loadingFinishedByButton,
  loadingFinishedByCard,
  loadingStartedByButton,
  render,
  setupApiTests,
  setupNotifications,
} from '_tests_/utils'
import { waitFor, within } from '@testing-library/react'
import { taskFixtures } from 'fixtures/task'
import { workGroupFixtures } from 'fixtures/workGroup'
import { UserRolesEnum } from 'shared/constants/roles'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'

import taskDetailsTestUtils from '../../TaskDetails/_tests_/utils'
import workGroupTestUtils from '../../TaskDetails/WorkGroupBlock/_tests_/utils'
import TaskDetailsContainer from '../../TaskDetailsContainer'
import taskFirstLineModalTestUtils from '../../TaskFirstLineModal/_tests_/utils'
import { TaskFirstLineFormErrors } from '../../TaskFirstLineModal/interfaces'
import { requiredProps } from './constants'

setupApiTests()
jest.setTimeout(5000)

describe('Контейнер детальной карточки заявки', () => {
  describe('Перевод заявки на 1-ю линию', () => {
    describe('Роль - старший инженер', () => {
      describe('При успешный запросе', () => {
        test('Закрывается модальное окно и карточка заявки', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupSuccess(requiredProps.taskId)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingFinishedByButton(firstLineButton)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
          expect(requiredProps.closeTaskDetails).toBeCalledTimes(1)
        })
      })

      describe('При не успешном запросе', () => {
        setupNotifications()

        test('Корректно обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const badRequestErrorResponse = { description: [generateWord()] }
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(
            requiredProps.taskId,
            { body: badRequestErrorResponse },
          )

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          // await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const descriptionContainer =
            taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(
            head(badRequestErrorResponse.description)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const notFoundErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupNotFoundError(requiredProps.taskId, {
            body: notFoundErrorResponse,
          })

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          // await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(notFoundErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const serverErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupServerError(requiredProps.taskId, {
            body: serverErrorResponse,
          })

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(serverErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupForbiddenError(requiredProps.taskId)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(UNKNOWN_ERROR_MSG)
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })

    describe('Роль - глава отдела', () => {
      describe('При успешный запросе', () => {
        test('Закрывается модальное окно и карточка заявки', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })
          mockDeleteTaskWorkGroupSuccess(requiredProps.taskId)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          const modal = await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingFinishedByButton(firstLineButton)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
          expect(requiredProps.closeTaskDetails).toBeCalledTimes(1)
        })
      })

      describe('При не успешном запросе', () => {
        setupNotifications()

        test('Корректно обрабатывается ошибка 400', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const badRequestErrorResponse = { description: [generateWord()] }
          mockDeleteTaskWorkGroupBadRequestError<TaskFirstLineFormErrors>(
            requiredProps.taskId,
            { body: badRequestErrorResponse },
          )

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const descriptionContainer =
            taskFirstLineModalTestUtils.getDescriptionFieldContainer()

          const errorMsg = await within(descriptionContainer).findByText(
            head(badRequestErrorResponse.description)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 404', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const notFoundErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupNotFoundError(requiredProps.taskId, {
            body: notFoundErrorResponse,
          })

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(notFoundErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 500', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          const serverErrorResponse = { detail: [generateWord()] }
          mockDeleteTaskWorkGroupServerError(requiredProps.taskId, {
            body: serverErrorResponse,
          })

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(
            head(serverErrorResponse.detail)!,
          )
          expect(errorMsg).toBeInTheDocument()
        })

        test('Корректно обрабатывается неизвестная ошибка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupForbiddenError(requiredProps.taskId)

          const store = getStoreWithAuth({
            userRole: UserRolesEnum.SeniorEngineer,
          })

          const { user } = render(<TaskDetailsContainer {...requiredProps} />, {
            store,
          })

          const taskDetails = taskDetailsTestUtils.getContainer()
          await loadingFinishedByCard(taskDetails)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

          await loadingStartedByButton(firstLineButton)
          await loadingFinishedByButton(firstLineButton)

          const errorMsg = await findNotification(UNKNOWN_ERROR_MSG)
          expect(errorMsg).toBeInTheDocument()
        })
      })
    })
  })
})
