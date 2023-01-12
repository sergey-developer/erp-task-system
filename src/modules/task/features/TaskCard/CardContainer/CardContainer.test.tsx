import head from 'lodash/head'

import {
  mockDeleteTaskWorkGroupBadRequestError,
  mockDeleteTaskWorkGroupForbiddenError,
  mockDeleteTaskWorkGroupNotFoundError,
  mockDeleteTaskWorkGroupServerError,
  mockDeleteTaskWorkGroupSuccess,
  mockGetTaskSuccess,
  mockGetWorkGroupListSuccess,
  mockUpdateTaskWorkGroupForbiddenError,
  mockUpdateTaskWorkGroupNotFoundError,
  mockUpdateTaskWorkGroupServerError,
  mockUpdateTaskWorkGroupSuccess,
} from '_tests_/mocks/api'
import {
  findNotification,
  generateId,
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
import taskFixtures from 'fixtures/task'
import workGroupFixtures from 'fixtures/workGroup'
import { UserRoleEnum } from 'shared/constants/roles'
import { UNKNOWN_ERROR_MSG } from 'shared/constants/validation'

import { UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG } from '../../../constants/messages'
import {
  activeSecondLineButtonProps,
  showSecondLineButtonProps,
  testUtils as workGroupTestUtils,
} from '../../TaskCard/WorkGroupBlock/WorkGroupBlock.test'
import { testUtils as taskCardTestUtils } from '../Card/Card.test'
import taskFirstLineModalTestUtils from '../TaskFirstLineModal/_tests_/utils'
import { TaskFirstLineFormErrors } from '../TaskFirstLineModal/interfaces'
import taskSecondLineModalTestUtils from '../TaskSecondLineModal/_tests_/utils'
import TaskCardContainer, { TaskCardContainerProps } from './index'

const requiredProps: TaskCardContainerProps = {
  taskId: generateId(),
  closeTaskCard: jest.fn(),
  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),
}

setupApiTests()

describe('Контейнер детальной карточки заявки', () => {
  describe('Перевод заявки на 1-ю линию', () => {
    describe('Роль - старший инженер', () => {
      describe('При успешный запросе', () => {
        test('Закрывается модалка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })

          mockDeleteTaskWorkGroupSuccess(requiredProps.taskId)

          const store = getStoreWithAuth({
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

          const firstLineButton = await workGroupTestUtils.findFirstLineButton()
          await user.click(firstLineButton)

          await taskFirstLineModalTestUtils.findModal()
          const description = taskFirstLineModalTestUtils.getDescriptionField()
          await user.type(description, generateWord())

          const submitButton = taskFirstLineModalTestUtils.getSubmitButton()
          await user.click(submitButton)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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
        test('Закрывается модалка', async () => {
          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({ id: requiredProps.taskId, workGroup }),
          })
          mockDeleteTaskWorkGroupSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.SeniorEngineer,
            }),
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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
            userRole: UserRoleEnum.SeniorEngineer,
          })

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store,
          })

          const taskCard = taskCardTestUtils.getContainer()
          await loadingFinishedByCard(taskCard)

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

  describe('Перевод заявки на 2-ю линию', () => {
    describe('Роль - первая линия поддержки', () => {
      describe('При успешный запросе', () => {
        test('Закрывается модалка', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupSuccess(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupTestUtils.userClickSecondLineButton(user)
          const modal = await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
          })
        })
      })

      describe('При не успешный запросе', () => {
        setupNotifications()

        test('Корректно обрабатывается ошибка 404', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupNotFoundError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupTestUtils.userClickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          expect(
            await findNotification(UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG),
          ).toBeInTheDocument()
        })

        test('Корректно обрабатывается ошибка 500', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupServerError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupTestUtils.userClickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          expect(
            await findNotification(UPDATE_TASK_WORK_GROUP_COMMON_ERROR_MSG),
          ).toBeInTheDocument()
        })

        test('Корректно обрабатывается неизвестная ошибка', async () => {
          mockGetTaskSuccess(requiredProps.taskId, {
            body: taskFixtures.getTask({
              id: requiredProps.taskId,
              workGroup: showSecondLineButtonProps.workGroup,
              status: activeSecondLineButtonProps.status,
              extendedStatus: activeSecondLineButtonProps.extendedStatus,
            }),
          })

          const workGroup = workGroupFixtures.getWorkGroup()
          mockGetWorkGroupListSuccess({ body: [workGroup] })

          mockUpdateTaskWorkGroupForbiddenError(requiredProps.taskId)

          const { user } = render(<TaskCardContainer {...requiredProps} />, {
            store: getStoreWithAuth({
              userRole: UserRoleEnum.FirstLineSupport,
            }),
          })

          await taskCardTestUtils.expectLoadingFinished()
          await workGroupTestUtils.userClickSecondLineButton(user)
          await taskSecondLineModalTestUtils.findContainer()
          await taskSecondLineModalTestUtils.userOpenWorkGroup(user)
          await taskSecondLineModalTestUtils.userSelectWorkGroup(
            user,
            workGroup.name,
          )
          await taskSecondLineModalTestUtils.userClickSubmitButton(user)

          expect(await findNotification(UNKNOWN_ERROR_MSG)).toBeInTheDocument()
        })
      })
    })
  })
})
