import { within } from '@testing-library/react'
import { testUtils as attachmentsTestUtils } from 'features/attachments/components/Attachments/Attachments.test'
import { InventorizationStatusEnum } from 'features/inventorizations/api/constants'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'features/inventorizations/constants'
import {
  makeExecuteInventorizationPageLocationState,
  mapInventorizationWarehousesTitles,
} from 'features/inventorizations/helpers'
import ExecuteInventorizationPage from 'features/inventorizations/pages/ExecuteInventorizationPage'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import * as reactRouterDom from 'react-router-dom'

import { formatDate } from 'shared/utils/date'

import { props } from '_tests_/features/warehouses/components/InventorizationDetails/constants'
import { inventorizationDetailsTestUtils } from '_tests_/features/warehouses/components/InventorizationDetails/testUtils'
import { executeInventorizationPageTestUtils } from '_tests_/features/warehouses/pages/ExecuteInventorizationPage/testUtils'
import inventorizationsFixtures from '_tests_/fixtures/api/data/inventorizations'
import userFixtures from '_tests_/fixtures/api/data/users'
import { fakeUseLocationResult } from '_tests_/fixtures/hooks/useLocation'
import { getStoreWithAuth } from '_tests_/fixtures/store/auth'
import { getUserMeQueryMock } from '_tests_/fixtures/store/users'
import { render, renderWithRouter, setupApiTests } from '_tests_/helpers'
import { mockGetInventorizationSuccess } from '_tests_/mocks/api'

import InventorizationDetails from './index'

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}))

setupApiTests()

describe('Карточка инвентаризации', () => {
  test('Заголовок отображается', () => {
    mockGetInventorizationSuccess({ inventorizationId: props.inventorizationId })

    render(<InventorizationDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ ...userFixtures.userDetail() }) },
      }),
    })

    const title = within(inventorizationDetailsTestUtils.getContainer()).getByText(
      'Поручение на инвентаризацию',
    )
    expect(title).toBeInTheDocument()
  })

  test('При успешном запросе отображается информация', async () => {
    const inventorization = inventorizationsFixtures.inventorizationDetail()
    mockGetInventorizationSuccess(
      { inventorizationId: props.inventorizationId },
      { body: inventorization },
    )

    render(<InventorizationDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ ...userFixtures.userDetail() }) },
      }),
    })

    await inventorizationDetailsTestUtils.expectLoadingFinished()

    const container = inventorizationDetailsTestUtils.getContainer()

    const typeLabel = within(container).getByText('Тип:')
    const typeValue = within(container).getByText(inventorizationTypeDict[inventorization.type])

    const descriptionLabel = within(container).getByText('Описание:')
    const descriptionValue = within(container).getByText(inventorization.description!)

    const attachmentsLabel = within(container).getByText('Вложения:')
    const attachmentsValue = attachmentsTestUtils.getContainerIn(container)

    const warehousesLabel = within(container).getByText('Склады:')
    const warehousesValue = within(container).getByText(
      mapInventorizationWarehousesTitles(inventorization.warehouses),
    )

    const deadlineAtLabel = within(container).getByText('Срок выполнения:')
    const deadlineAtValue = within(container).getByText(formatDate(inventorization.deadlineAt))

    const executorLabel = within(container).getByText('Исполнитель:')
    const executorValue = within(container).getByText(inventorization.executor.fullName)

    const statusLabel = within(container).getByText('Статус:')
    const statusValue = within(container).getByText(
      inventorizationStatusDict[inventorization.status],
    )

    const createdByLabel = within(container).getByText('Автор:')
    const createdByValue = within(container).getByText(inventorization.createdBy.fullName)

    const createdAtLabel = within(container).getByText('Создано:')
    const createdAtValue = within(container).getByText(formatDate(inventorization.createdAt))

    const nomenclaturesLabel = within(container).getByText('Номенклатура')

    expect(typeLabel).toBeInTheDocument()
    expect(typeValue).toBeInTheDocument()

    expect(descriptionLabel).toBeInTheDocument()
    expect(descriptionValue).toBeInTheDocument()

    expect(attachmentsLabel).toBeInTheDocument()
    expect(attachmentsValue).toBeInTheDocument()

    expect(warehousesLabel).toBeInTheDocument()
    expect(warehousesValue).toBeInTheDocument()

    expect(deadlineAtLabel).toBeInTheDocument()
    expect(deadlineAtValue).toBeInTheDocument()

    expect(executorLabel).toBeInTheDocument()
    expect(executorValue).toBeInTheDocument()

    expect(statusLabel).toBeInTheDocument()
    expect(statusValue).toBeInTheDocument()

    expect(createdByLabel).toBeInTheDocument()
    expect(createdByValue).toBeInTheDocument()

    expect(createdAtLabel).toBeInTheDocument()
    expect(createdAtValue).toBeInTheDocument()

    expect(nomenclaturesLabel).toBeInTheDocument()
    inventorization.nomenclatures.forEach((n) => {
      const nomenclatureGroupTitle = within(container).getByText(n.group.title)
      const nomenclatureTitle = within(container).getByText(n.title)
      expect(nomenclatureGroupTitle).toBeInTheDocument()
      expect(nomenclatureTitle).toBeInTheDocument()
    })
  })

  describe('Провести инвентаризацию', () => {
    test('Кнопка отображается', () => {
      mockGetInventorizationSuccess({ inventorizationId: props.inventorizationId })

      render(<InventorizationDetails {...props} />, {
        store: getStoreWithAuth(undefined, undefined, undefined, {
          queries: { ...getUserMeQueryMock({ ...userFixtures.userDetail() }) },
        }),
      })

      const button = inventorizationDetailsTestUtils.getExecuteInventorizationButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    test('Кнопка активная если условия соблюдены', async () => {
      const inventorization = inventorizationsFixtures.inventorizationDetail({
        status: InventorizationStatusEnum.New,
      })
      mockGetInventorizationSuccess(
        { inventorizationId: props.inventorizationId },
        { body: inventorization },
      )

      render(<InventorizationDetails {...props} />, {
        store: getStoreWithAuth(inventorization.executor, undefined, undefined, {
          queries: {
            ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
          },
        }),
      })

      await inventorizationDetailsTestUtils.expectLoadingFinished()
      const button = inventorizationDetailsTestUtils.getExecuteInventorizationButton()

      expect(button).toBeEnabled()
    })

    describe('Кнопка не активна если условия соблюдены', () => {
      test(`Но статус не ${InventorizationStatusEnum.New} или ${InventorizationStatusEnum.InProgress}`, async () => {
        const inventorization = inventorizationsFixtures.inventorizationDetail({
          status: InventorizationStatusEnum.Closed,
        })
        mockGetInventorizationSuccess(
          { inventorizationId: props.inventorizationId },
          { body: inventorization },
        )

        render(<InventorizationDetails {...props} />, {
          store: getStoreWithAuth(inventorization.executor, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
            },
          }),
        })

        await inventorizationDetailsTestUtils.expectLoadingFinished()
        const button = inventorizationDetailsTestUtils.getExecuteInventorizationButton()

        expect(button).toBeDisabled()
      })

      test('Но исполнитель не текущий пользователь', async () => {
        const inventorization = inventorizationsFixtures.inventorizationDetail({
          status: InventorizationStatusEnum.New,
        })
        mockGetInventorizationSuccess(
          { inventorizationId: props.inventorizationId },
          { body: inventorization },
        )

        render(<InventorizationDetails {...props} />, {
          store: getStoreWithAuth(undefined, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
            },
          }),
        })

        await inventorizationDetailsTestUtils.expectLoadingFinished()
        const button = inventorizationDetailsTestUtils.getExecuteInventorizationButton()

        expect(button).toBeDisabled()
      })

      test(`Но нет прав ${UserPermissionsEnum.InventorizationUpdate}`, async () => {
        const inventorization = inventorizationsFixtures.inventorizationDetail({
          status: InventorizationStatusEnum.New,
        })
        mockGetInventorizationSuccess(
          { inventorizationId: props.inventorizationId },
          { body: inventorization },
        )

        render(<InventorizationDetails {...props} />, {
          store: getStoreWithAuth(inventorization.executor, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ ...userFixtures.userDetail() }) },
          }),
        })

        await inventorizationDetailsTestUtils.expectLoadingFinished()
        const button = inventorizationDetailsTestUtils.getExecuteInventorizationButton()

        expect(button).toBeDisabled()
      })
    })

    test('При клике переходил на страницу выполнения инвентаризации', async () => {
      const inventorization = inventorizationsFixtures.inventorizationDetail({
        status: InventorizationStatusEnum.New,
      })
      mockGetInventorizationSuccess(
        { inventorizationId: props.inventorizationId },
        { body: inventorization },
      )

      const inventorizationState = makeExecuteInventorizationPageLocationState(inventorization)
      jest
        .spyOn(reactRouterDom, 'useLocation')
        .mockReturnValue(fakeUseLocationResult({ state: inventorizationState }))

      jest.spyOn(reactRouterDom, 'useParams').mockReturnValue({ id: String(inventorization.id) })

      const { user } = renderWithRouter(
        [
          {
            path: WarehousesRoutesEnum.Inventorizations,
            element: <InventorizationDetails {...props} />,
          },
          {
            path: WarehousesRoutesEnum.ExecuteInventorization,
            element: <ExecuteInventorizationPage />,
          },
        ],
        { initialEntries: [WarehousesRoutesEnum.Inventorizations], initialIndex: 0 },
        {
          store: getStoreWithAuth(inventorization.executor, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
            },
          }),
        },
      )

      await inventorizationDetailsTestUtils.expectLoadingFinished()
      await inventorizationDetailsTestUtils.clickExecuteInventorizationButton(user)
      const page = executeInventorizationPageTestUtils.getContainer()

      expect(page).toBeEnabled()
    })
  })
})
