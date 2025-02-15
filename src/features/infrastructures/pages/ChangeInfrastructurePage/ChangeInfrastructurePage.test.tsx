import { waitFor, within } from '@testing-library/react'
import { InfrastructureStatusEnum } from 'features/infrastructures/api/constants'
import { UpdateInfrastructureStatusResponse } from 'features/infrastructures/api/schemas'
import { infrastructureStatusDict } from 'features/infrastructures/constants'
import { InfrastructuresRoutesEnum } from 'features/infrastructures/routes/routes'
import TasksPage from 'features/tasks/pages/TasksPage'
import { TasksRoutesEnum } from 'features/tasks/routes/routes'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { getFullUserName } from 'features/users/helpers'
import * as reactRouterDom from 'react-router-dom'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'
import { formatDate } from 'shared/utils/date'

import { infrastructureStatusHistoryModalTestUtils } from '_tests_/features/infrastructure/components/InfrastructureStatusHistoryModal/testUtils'
import { changeInfrastructurePageTestUtils as testUtils } from '_tests_/features/infrastructure/pages/ChangeInfrastructurePage/testUtils'
import { taskAssigneeTestUtils } from '_tests_/features/tasks/components/TaskAssignee/testUtils'
import {
  activeChangeInfrastructureButton,
  showChangeInfrastructureButton,
} from '_tests_/features/tasks/components/TaskDetails/constants'
import { taskDetailsTestUtils } from '_tests_/features/tasks/components/TaskDetails/testUtils'
import { taskTableTestUtils } from '_tests_/features/tasks/components/TaskTable/testUtils'
import { tasksPageTestUtils } from '_tests_/features/tasks/pages/TasksPage/testUtils'
import commonFixtures from '_tests_/fixtures/common'
import infrastructuresFixtures from '_tests_/fixtures/infrastructures'
import taskFixtures from '_tests_/fixtures/task'
import { fakeUseLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetInfrastructureOrdersFormsSuccess,
  mockGetInfrastructureStatusHistorySuccess,
  mockGetInfrastructureSuccess,
  mockGetTaskCountersSuccess,
  mockGetTasksSuccess,
  mockGetTaskSuccess,
  mockGetUserActionsSuccess,
  mockUpdateInfrastructureStatusSuccess,
  mockUpdateInfrastructureSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  fakeDateString,
  fakeId,
  getStoreWithAuth,
  render,
  renderWithRouter,
  setupApiTests,
} from '_tests_/utils'

import ChangeInfrastructurePage from './index'
import { getChangeInfrastructurePageLocationState } from './utils'

const infrastructureId = fakeId()

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}))

setupApiTests()

describe('Страница изменения инфраструктуры заявки', () => {
  test('Заголовок и recordId заявки отображаются', async () => {
    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

    const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: locationState }))

    const infrastructure = infrastructuresFixtures.infrastructure()
    mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
    mockGetInfrastructureOrdersFormsSuccess()

    const currentUser = userFixtures.user()

    render(<ChangeInfrastructurePage />, {
      store: getStoreWithAuth(currentUser, undefined, undefined, {
        queries: { ...getUserMeQueryMock(currentUser) },
      }),
    })

    await testUtils.expectLoadingFinished()

    const container = testUtils.getContainer()
    const title = within(container).getByText('Изменение инфраструктуры по заявке')
    const recordId = within(container).getByText(locationState.task.recordId)

    expect(title).toBeInTheDocument()
    expect(recordId).toBeInTheDocument()
  })

  test('Исполнитель отображается', async () => {
    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

    const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(fakeUseLocationResult({ state: locationState }))

    const infrastructure = infrastructuresFixtures.infrastructure()
    mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
    mockGetInfrastructureOrdersFormsSuccess()

    const currentUser = userFixtures.user()

    render(<ChangeInfrastructurePage />, {
      store: getStoreWithAuth(currentUser, undefined, undefined, {
        queries: { ...getUserMeQueryMock(currentUser) },
      }),
    })

    await testUtils.expectLoadingFinished()

    const executorBlock = testUtils.getExecutorBlock()
    const label = within(executorBlock).getByText('Исполнитель')
    const taskAssignee = taskAssigneeTestUtils.getContainerIn(executorBlock)

    expect(label).toBeInTheDocument()
    expect(taskAssignee).toBeInTheDocument()
  })

  describe('Менеджер по сопровождению', () => {
    test('Отображается если он есть', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const infrastructure = infrastructuresFixtures.infrastructure()
      mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
      mockGetInfrastructureOrdersFormsSuccess()

      const currentUser = userFixtures.user()

      render(<ChangeInfrastructurePage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.expectLoadingFinished()

      const managerBlock = testUtils.getManagerBlock()
      const label = within(managerBlock).getByText('Менеджер по сопровождению')
      const taskAssignee = taskAssigneeTestUtils.getContainerIn(managerBlock)

      expect(label).toBeInTheDocument()
      expect(taskAssignee).toBeInTheDocument()
    })

    test('Соответствующий текст отображается если нет менеджера', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const infrastructure = infrastructuresFixtures.infrastructure({ manager: null })
      mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
      mockGetInfrastructureOrdersFormsSuccess()

      const currentUser = userFixtures.user()

      render(<ChangeInfrastructurePage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.expectLoadingFinished()
      const managerBlock = testUtils.getManagerBlock()
      const noAssigneeText = within(managerBlock).getByText(NO_ASSIGNEE_TEXT)

      expect(noAssigneeText).toBeInTheDocument()
    })

    describe('Кнопка назначить на себя', () => {
      test(`Отображается если есть права ${UserPermissionsEnum.InfrastructureProjectLeading}`, async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

        const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
        jest
          .spyOn(reactRouterDom, 'useLocation')
          .mockReturnValue(fakeUseLocationResult({ state: locationState }))

        const infrastructure = infrastructuresFixtures.infrastructure()
        mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
        mockGetInfrastructureOrdersFormsSuccess()

        const currentUser = userFixtures.user({
          permissions: [UserPermissionsEnum.InfrastructureProjectLeading],
        })

        render(<ChangeInfrastructurePage />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await testUtils.expectLoadingFinished()
        const button = testUtils.getAssigneeOnMeButton()

        expect(button).toBeInTheDocument()
      })

      test(`Не отображается если нет прав ${UserPermissionsEnum.InfrastructureProjectLeading}`, async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

        const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
        jest
          .spyOn(reactRouterDom, 'useLocation')
          .mockReturnValue(fakeUseLocationResult({ state: locationState }))

        const infrastructure = infrastructuresFixtures.infrastructure()
        mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
        mockGetInfrastructureOrdersFormsSuccess()

        const currentUser = userFixtures.user({ permissions: [] })

        render(<ChangeInfrastructurePage />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await testUtils.expectLoadingFinished()
        const button = testUtils.queryAssigneeOnMeButton()

        expect(button).not.toBeInTheDocument()
      })

      test('После назначения отображает нового менеджера', async () => {
        jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

        const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
        jest
          .spyOn(reactRouterDom, 'useLocation')
          .mockReturnValue(fakeUseLocationResult({ state: locationState }))

        const infrastructure = infrastructuresFixtures.infrastructure({
          id: infrastructureId,
          manager: null,
        })
        mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure, once: false })
        mockGetInfrastructureOrdersFormsSuccess({ body: [], once: false })

        const currentUser = userFixtures.user({
          permissions: [UserPermissionsEnum.InfrastructureProjectLeading],
        })

        mockUpdateInfrastructureSuccess({ infrastructureId: infrastructure.id })

        const { user } = render(<ChangeInfrastructurePage />, {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        })

        await testUtils.expectLoadingFinished()

        const newInfrastructure = infrastructuresFixtures.infrastructure({ id: infrastructureId })
        mockGetInfrastructureSuccess({ infrastructureId }, { body: newInfrastructure })

        await testUtils.clickAssigneeOnMeButton(user)
        await testUtils.expectLoadingStarted()
        await testUtils.expectLoadingFinished()
        const assignee = taskAssigneeTestUtils.getContainerIn(testUtils.getManagerBlock())

        expect(assignee).toHaveTextContent(getFullUserName(newInfrastructure.manager!))
      })
    })
  })

  describe('Статус', () => {
    test('Отображается', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const infrastructure = infrastructuresFixtures.infrastructure()
      mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
      mockGetInfrastructureOrdersFormsSuccess()

      const currentUser = userFixtures.user()

      render(<ChangeInfrastructurePage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.expectLoadingFinished()

      const statusBlock = testUtils.getStatusBlock()
      const label = within(statusBlock).getByText(
        infrastructureStatusDict[infrastructure.status!.status],
      )
      const createdAt = within(statusBlock).getByText(
        `Установлен: ${formatDate(infrastructure.status!.createdAt)}`,
      )

      expect(label).toBeInTheDocument()
      expect(createdAt).toBeInTheDocument()
    })

    test('После изменения статуса он отображается в карточке вместе с датой изменения', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const currentUser = userFixtures.user()

      const infrastructure = infrastructuresFixtures.infrastructure({
        manager: { ...currentUser, position: null },
      })
      mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
      mockGetInfrastructureOrdersFormsSuccess({ body: [] })

      const updateInfrastructureStatusResponse: UpdateInfrastructureStatusResponse = {
        id: fakeId(),
        status: InfrastructureStatusEnum.Suspended,
        changedAt: fakeDateString(),
      }
      mockUpdateInfrastructureStatusSuccess({ body: updateInfrastructureStatusResponse })

      const { user } = render(<ChangeInfrastructurePage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.expectLoadingFinished()
      await testUtils.clickEditStatusHistory(user)
      await testUtils.openStatusSelect(user)
      await testUtils.setStatus(user, InfrastructureStatusEnum.Suspended)
      await testUtils.clickSaveStatus(user)
      const statusBlock = testUtils.getStatusBlock()
      const updatedStatusLabel = await within(statusBlock).findByText(
        infrastructureStatusDict[updateInfrastructureStatusResponse.status],
      )
      const updatedCreatedAt = await within(statusBlock).findByText(
        `Установлен: ${formatDate(updateInfrastructureStatusResponse.changedAt)}`,
      )

      expect(updatedStatusLabel).toBeInTheDocument()
      expect(updatedCreatedAt).toBeInTheDocument()
    })

    test('Модалка просмотра истории изменения статуса открывается и закрывается', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const infrastructure = infrastructuresFixtures.infrastructure()
      mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
      mockGetInfrastructureOrdersFormsSuccess({ body: [] })
      mockGetInfrastructureStatusHistorySuccess()

      const currentUser = userFixtures.user()

      const { user } = render(<ChangeInfrastructurePage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.expectLoadingFinished()
      await testUtils.openStatusHistoryModal(user)
      const modal = await infrastructureStatusHistoryModalTestUtils.findContainer()
      expect(modal).toBeInTheDocument()
      await infrastructureStatusHistoryModalTestUtils.clickCloseButton(user)
      await waitFor(() => expect(modal).not.toBeInTheDocument())
    })
  })

  describe('Кнопка вернуться', () => {
    test('Отображается и активна', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const infrastructure = infrastructuresFixtures.infrastructure()
      mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
      mockGetInfrastructureOrdersFormsSuccess()

      const currentUser = userFixtures.user()

      render(<ChangeInfrastructurePage />, {
        store: getStoreWithAuth(currentUser, undefined, undefined, {
          queries: { ...getUserMeQueryMock(currentUser) },
        }),
      })

      await testUtils.expectLoadingFinished()
      const button = testUtils.getGoBackButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeEnabled()
    })

    test.skip('При клике возвращается на предыдущую страницу', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: locationState }))

      const infrastructure = infrastructuresFixtures.infrastructure()
      mockGetInfrastructureSuccess({ infrastructureId }, { body: infrastructure })
      mockGetInfrastructureOrdersFormsSuccess({ body: [] })

      const taskListItem = taskFixtures.taskListItem()
      mockGetTasksSuccess({
        body: commonFixtures.paginatedListResponse([taskListItem]),
        once: false,
      })
      mockGetTaskCountersSuccess({ once: false })

      mockGetTaskSuccess(taskListItem.id, {
        body: taskFixtures.task({ ...showChangeInfrastructureButton.task }),
      })

      const currentUser = userFixtures.user({
        permissions: activeChangeInfrastructureButton.permissions,
      })
      mockGetUserActionsSuccess(currentUser.id, { body: userFixtures.userActions() })

      const { user } = renderWithRouter(
        [
          {
            path: TasksRoutesEnum.DesktopTasks,
            element: <TasksPage />,
          },
          {
            path: InfrastructuresRoutesEnum.DesktopChangeInfrastructure,
            element: <ChangeInfrastructurePage />,
          },
        ],
        { initialEntries: [TasksRoutesEnum.DesktopTasks], initialIndex: 0 },
        {
          store: getStoreWithAuth(currentUser, undefined, undefined, {
            queries: { ...getUserMeQueryMock(currentUser) },
          }),
        },
      )

      await taskTableTestUtils.expectLoadingFinished()
      await taskTableTestUtils.clickRow(user, taskListItem.id)
      await taskDetailsTestUtils.expectTaskLoadingStarted()
      await taskDetailsTestUtils.expectTaskLoadingFinished()
      await taskDetailsTestUtils.clickChangeInfrastructureButton(user)
      await testUtils.expectLoadingFinished()
      await testUtils.clickGoBackButton(user)
      const tasksPage = tasksPageTestUtils.getContainer()
      expect(tasksPage).toBeInTheDocument()
    })
  })
})
