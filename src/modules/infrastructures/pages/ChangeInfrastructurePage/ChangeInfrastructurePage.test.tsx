import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'
import * as reactRouterDom from 'react-router-dom'

import {
  InfrastructuresRoutesEnum,
  infrastructureStatusDict,
} from 'modules/infrastructures/constants'
import { testUtils as taskAssigneeTestUtils } from 'modules/task/components/TaskAssignee/TaskAssignee.test'
import {
  activeChangeInfrastructureButton,
  showChangeInfrastructureButton,
  testUtils as taskDetailsTestUtils,
} from 'modules/task/components/TaskDetails/TaskDetails.test'
import { testUtils as taskTableTestUtils } from 'modules/task/components/TaskTable/TaskTable.test'
import { TasksRoutesEnum } from 'modules/task/constants/routes'
import TasksPage from 'modules/task/pages/TasksPage'
import { testUtils as tasksPageTestUtils } from 'modules/task/pages/TasksPage/TasksPage.test'
import { UserPermissionsEnum } from 'modules/user/constants'
import { getFullUserName } from 'modules/user/utils'

import { NO_ASSIGNEE_TEXT } from 'shared/constants/common'
import { formatDate } from 'shared/utils/date'

import commonFixtures from '_tests_/fixtures/common'
import infrastructuresFixtures from '_tests_/fixtures/infrastructures'
import taskFixtures from '_tests_/fixtures/task'
import { useLocationResult } from '_tests_/fixtures/useLocation'
import userFixtures from '_tests_/fixtures/user'
import {
  mockGetInfrastructureOrdersFormsSuccess,
  mockGetInfrastructureSuccess,
  mockGetTaskCountersSuccess,
  mockGetTasksSuccess,
  mockGetTaskSuccess,
  mockGetUserActionsSuccess,
  mockUpdateInfrastructureSuccess,
} from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  getStoreWithAuth,
  render,
  renderWithRouter,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import ChangeInfrastructurePage from './index'
import { getChangeInfrastructurePageLocationState } from './utils'

const getContainer = () => screen.getByTestId('change-infrastructure-page')

// loading
const expectLoadingStarted = spinnerTestUtils.expectLoadingStarted('infrastructure-loading')
const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished('infrastructure-loading')

// executor
const getExecutorBlock = () => within(getContainer()).getByTestId('executor')

// manager
const getManagerBlock = () => within(getContainer()).getByTestId('manager')

const getAssigneeOnMeButton = () =>
  buttonTestUtils.getButtonIn(getManagerBlock(), /Назначить на себя/)

const queryAssigneeOnMeButton = () =>
  buttonTestUtils.queryButtonIn(getManagerBlock(), /Назначить на себя/)

const clickAssigneeOnMeButton = async (user: UserEvent) => user.click(getAssigneeOnMeButton())

const assigneeOnMeLoadingFinished = () =>
  buttonTestUtils.expectLoadingFinished(getAssigneeOnMeButton())

// status
const getStatusBlock = () => within(getContainer()).getByTestId('status')

// go back button
const getGoBackButton = () => buttonTestUtils.getButtonIn(getContainer(), 'Вернуться')
const clickGoBackButton = async (user: UserEvent) => user.click(getGoBackButton())

export const testUtils = {
  getContainer,

  getExecutorBlock,

  getManagerBlock,
  getAssigneeOnMeButton,
  queryAssigneeOnMeButton,
  clickAssigneeOnMeButton,
  assigneeOnMeLoadingFinished,

  getStatusBlock,

  getGoBackButton,
  clickGoBackButton,

  expectLoadingStarted,
  expectLoadingFinished,
}

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
      .mockReturnValue(useLocationResult({ state: locationState }))

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
      .mockReturnValue(useLocationResult({ state: locationState }))

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
        .mockReturnValue(useLocationResult({ state: locationState }))

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
        .mockReturnValue(useLocationResult({ state: locationState }))

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
          .mockReturnValue(useLocationResult({ state: locationState }))

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
          .mockReturnValue(useLocationResult({ state: locationState }))

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
          .mockReturnValue(useLocationResult({ state: locationState }))

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

  test('Статус отображается', async () => {
    jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

    const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(useLocationResult({ state: locationState }))

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

  describe('Кнопка вернуться', () => {
    test('Отображается и активна', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: locationState }))

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

    test('При клике возвращается на предыдущую страницу', async () => {
      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(infrastructureId) })

      const locationState = getChangeInfrastructurePageLocationState(taskFixtures.task())
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(useLocationResult({ state: locationState }))

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
