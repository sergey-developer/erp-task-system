import { screen, waitFor } from '@testing-library/react'

import { testUtils as confirmExecuteTaskReclassificationTasksModalTestUtils } from 'modules/task/components/ConfirmExecuteTaskReclassificationTasksModal/ConfirmExecuteTaskReclassificationTasksModal.test'
import { testUtils as confirmExecuteTaskRegistrationFNModalTestUtils } from 'modules/task/components/ConfirmExecuteTaskRegistrationFNModal/ConfirmExecuteTaskRegistrationFNModal.test'
import { testUtils as createRegistrationFNRequestModalTestUtils } from 'modules/task/components/CreateRegistrationFNRequestModal/CreateRegistrationFNRequestModal.test'
import { testUtils as executeTaskModalTestUtils } from 'modules/task/components/ExecuteTaskModal/ExecuteTaskModal.test'
import { testUtils as assigneeBlockTestUtils } from 'modules/task/components/TaskDetails/AssigneeBlock/AssigneeBlock.test'
import { testUtils as workGroupBlockTestUtils } from 'modules/task/components/TaskDetails/WorkGroupBlock/WorkGroupBlock.test'
import { TaskExtendedStatusEnum, TaskStatusEnum } from 'modules/task/constants/task'

import catalogsFixtures from '_tests_/fixtures/catalogs'
import taskFixtures from '_tests_/fixtures/task'
import userFixtures from '_tests_/fixtures/user'
import {
  mockCreateTaskAttachmentSuccess,
  mockCreateTaskRegistrationFNRequestSuccess,
  mockGetFaChangeTypesSuccess,
  mockGetTaskReclassificationRequestSuccess,
  mockGetTaskRegistrationRequestRecipientsFNSuccess,
  mockGetTaskSuccess,
  mockGetUserActionsSuccess,
  mockResolveTaskSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeId,
  fakeWord,
  getStoreWithAuth,
  menuTestUtils,
  render,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import {
  canExecuteTaskProps,
  canRegisterFNItemProps,
  testUtils as cardTitleTestUtils,
} from './TaskDetailsTitle/TaskDetailsTitle.test'
import TaskDetails, { TaskDetailsProps } from './index'

const props: TaskDetailsProps = {
  taskId: fakeId(),

  additionalInfoExpanded: false,
  onExpandAdditionalInfo: jest.fn(),

  activeTab: undefined,
  onClose: jest.fn(),
}

const findContainer = () => screen.findByTestId('task-details')
const getContainer = () => screen.getByTestId('task-details')

// loading
const expectTaskLoadingStarted = spinnerTestUtils.expectLoadingStarted('task-loading')
const expectTaskLoadingFinished = spinnerTestUtils.expectLoadingFinished('task-loading')

const expectReclassificationRequestLoadingStarted = spinnerTestUtils.expectLoadingStarted(
  'task-reclassification-request-loading',
)
const expectReclassificationRequestLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'task-reclassification-request-loading',
)

export const testUtils = {
  getContainer,
  findContainer,

  expectTaskLoadingStarted,
  expectTaskLoadingFinished,
  expectReclassificationRequestLoadingStarted,
  expectReclassificationRequestLoadingFinished,
}

setupApiTests()

describe('Карточка заявки', () => {
  test('Блок информации о рабочей группе отображается', async () => {
    const task = taskFixtures.task({ id: props.taskId })
    mockGetTaskSuccess(props.taskId, { body: task })

    const userId = fakeId()
    mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

    render(<TaskDetails {...props} />, {
      store: getStoreWithAuth({ userId }, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await testUtils.expectTaskLoadingFinished()
    const container = workGroupBlockTestUtils.getContainer()

    expect(container).toBeInTheDocument()
  })

  test('Блок информации о исполнителе отображается', async () => {
    const task = taskFixtures.task({ id: props.taskId })
    mockGetTaskSuccess(props.taskId, { body: task })

    const userId = fakeId()
    mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

    render(<TaskDetails {...props} />, {
      store: getStoreWithAuth({ userId }, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ permissions: [] }) },
      }),
    })

    await testUtils.expectTaskLoadingFinished()
    const container = assigneeBlockTestUtils.getContainer()

    expect(container).toBeInTheDocument()
  })

  describe('Выполнить заявку', () => {
    test('Кнопка активная если условия соблюдены', async () => {
      const task = taskFixtures.task({ id: props.taskId, ...canExecuteTaskProps })
      mockGetTaskSuccess(props.taskId, { body: task })

      const userId = task.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await cardTitleTestUtils.openMenu(user)
      const menuItem = cardTitleTestUtils.getExecuteTaskMenuItem()

      expect(menuItem).toBeInTheDocument()
      menuTestUtils.expectMenuItemNotDisabled(menuItem)
    })

    describe('Кнопка не активна если условия соблюдены', () => {
      test('Но пользователь не является исполнителем заявки', async () => {
        const task = taskFixtures.task({ id: props.taskId, ...canExecuteTaskProps })
        mockGetTaskSuccess(props.taskId, { body: task })

        const userId = fakeId()
        mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth({ userId }, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.expectTaskLoadingFinished()
        await cardTitleTestUtils.openMenu(user)
        const menuItem = cardTitleTestUtils.getExecuteTaskMenuItem()

        menuTestUtils.expectMenuItemDisabled(menuItem)
      })

      test(`Но статус заявки не ${TaskStatusEnum.InProgress}`, async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          ...canExecuteTaskProps,
          status: TaskStatusEnum.New,
        })
        mockGetTaskSuccess(props.taskId, { body: task })

        const userId = task.assignee!.id
        mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth({ userId }, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.expectTaskLoadingFinished()
        await cardTitleTestUtils.openMenu(user)
        const menuItem = cardTitleTestUtils.getExecuteTaskMenuItem()

        menuTestUtils.expectMenuItemDisabled(menuItem)
      })

      test(`Но расширенный статус заявки ${TaskExtendedStatusEnum.InReclassification}`, async () => {
        const task = taskFixtures.task({
          id: props.taskId,
          ...canExecuteTaskProps,
          extendedStatus: TaskExtendedStatusEnum.InReclassification,
        })
        mockGetTaskSuccess(props.taskId, { body: task })
        mockGetTaskReclassificationRequestSuccess(props.taskId)

        const userId = task.assignee!.id
        mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

        const { user } = render(<TaskDetails {...props} />, {
          store: getStoreWithAuth({ userId }, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.expectTaskLoadingFinished()
        await cardTitleTestUtils.openMenu(user)
        const menuItem = cardTitleTestUtils.getExecuteTaskMenuItem()

        menuTestUtils.expectMenuItemDisabled(menuItem)
      })
    })

    test('Модалка выполнения заявки открывается после показа всех предупреждений', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...canExecuteTaskProps,
        hasRelocationTasks: false,
        fiscalAccumulator: {
          isRequestSent: true,
          isRequestApproved: false,
        },
      })
      mockGetTaskSuccess(props.taskId, { body: task })

      const userId = task.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await cardTitleTestUtils.openMenu(user)
      await cardTitleTestUtils.clickExecuteTaskMenuItem(user)

      const confirmExecuteTaskRegistrationFNModal =
        await confirmExecuteTaskRegistrationFNModalTestUtils.findContainer()
      expect(confirmExecuteTaskRegistrationFNModal).toBeInTheDocument()
      await confirmExecuteTaskRegistrationFNModalTestUtils.clickConfirmButton(user)

      const confirmExecuteTaskReclassificationTasksModal =
        await confirmExecuteTaskReclassificationTasksModalTestUtils.findContainer()
      expect(confirmExecuteTaskReclassificationTasksModal).toBeInTheDocument()
      await confirmExecuteTaskReclassificationTasksModalTestUtils.clickConfirmButton(user)

      const executeTaskDrawer = await executeTaskModalTestUtils.findContainer()
      expect(executeTaskDrawer).toBeInTheDocument()
    })

    test('После успешного запроса закрывается модалка и вызывается обработчик закрытия карточки заявки', async () => {
      const task = taskFixtures.task({
        id: props.taskId,
        ...canExecuteTaskProps,
        hasRelocationTasks: true,
      })
      mockGetTaskSuccess(props.taskId, { body: task })
      mockResolveTaskSuccess(props.taskId)

      const userId = task.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await cardTitleTestUtils.openMenu(user)
      await cardTitleTestUtils.clickExecuteTaskMenuItem(user)

      await executeTaskModalTestUtils.findContainer()
      await executeTaskModalTestUtils.setTechResolution(user, fakeWord())
      await executeTaskModalTestUtils.setUserResolution(user, fakeWord())
      await executeTaskModalTestUtils.clickSubmitButton(user)
      await waitFor(() => expect(props.onClose).toBeCalledTimes(1))
    })
  })

  describe('Зарегистрировать ФН', () => {
    test('После успешного запроса закрывается модалка', async () => {
      const task = taskFixtures.task({ id: props.taskId, ...canRegisterFNItemProps })
      mockGetTaskSuccess(props.taskId, { body: task, once: false })

      const faChangeTypeListItem = catalogsFixtures.faChangeTypeListItem()
      mockGetFaChangeTypesSuccess({ body: [faChangeTypeListItem] })

      mockGetTaskRegistrationRequestRecipientsFNSuccess(props.taskId, {
        body: taskFixtures.registrationRequestRecipientsFN(),
      })

      mockCreateTaskAttachmentSuccess(props.taskId)
      mockCreateTaskRegistrationFNRequestSuccess(props.taskId)

      const userId = canRegisterFNItemProps.assignee!.id
      mockGetUserActionsSuccess(userId, { body: userFixtures.userActions() })

      const { user } = render(<TaskDetails {...props} />, {
        store: getStoreWithAuth({ userId }, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ permissions: [] }) },
        }),
      })

      await testUtils.expectTaskLoadingFinished()
      await cardTitleTestUtils.openMenu(user)
      await cardTitleTestUtils.clickRegisterFNMenuItem(user)

      const modal = await createRegistrationFNRequestModalTestUtils.findContainer()
      await createRegistrationFNRequestModalTestUtils.openChangeTypeSelect(user)
      await createRegistrationFNRequestModalTestUtils.setChangeType(
        user,
        faChangeTypeListItem.title,
      )
      await createRegistrationFNRequestModalTestUtils.setAttachment(user)
      await createRegistrationFNRequestModalTestUtils.clickSubmitButton(user)

      await waitFor(() => expect(modal).not.toBeInTheDocument())
    })
  })

  describe('Переклассификация заявки', () => {
    describe('Отмена запроса', () => {
      // todo: поправить
      test.skip('При нажатии на кнопку отмены в заявке открывается модалка подтверждения', async () => {
        mockGetTaskSuccess(props.taskId, {
          body: taskFixtures.task({
            id: props.taskId,
            extendedStatus: TaskExtendedStatusEnum.InReclassification,
          }),
        })

        mockGetTaskReclassificationRequestSuccess(props.taskId, {
          body: taskFixtures.reclassificationRequest(),
        })

        render(<TaskDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ permissions: [] }) },
          }),
        })

        await testUtils.expectTaskLoadingStarted()
        await testUtils.expectTaskLoadingFinished()
        // await testUtils.expectReclassificationRequestLoadingStarted()
        // await testUtils.expectReclassificationRequestLoadingFinished()
        // await taskReclassificationRequestTestUtils.findContainer()
      })
    })
  })
})
