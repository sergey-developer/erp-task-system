import { screen, within } from '@testing-library/react'
import { UserEvent } from '@testing-library/user-event/setup/setup'

import { testUtils as attachmentsTestUtils } from 'modules/attachment/components/Attachments/Attachments.test'
import { UserPermissionsEnum } from 'modules/user/constants'
import {
  inventorizationStatusDict,
  InventorizationStatusEnum,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'
import ExecuteInventorizationPage from 'modules/warehouse/pages/ExecuteInventorizationPage'
import { testUtils as executeInventorizationPageTestUtils } from 'modules/warehouse/pages/ExecuteInventorizationPage/ExecuteInventorizationPage.test'
import { mapInventorizationWarehousesTitles } from 'modules/warehouse/utils/inventorization'

import { formatDate } from 'shared/utils/date'

import userFixtures from '_tests_/fixtures/user'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetInventorizationSuccess } from '_tests_/mocks/api'
import { getUserMeQueryMock } from '_tests_/mocks/state/user'
import {
  buttonTestUtils,
  fakeId,
  getStoreWithAuth,
  render,
  renderInRoute_latest,
  setupApiTests,
  spinnerTestUtils,
} from '_tests_/utils'

import InventorizationDetails, { InventorizationDetailsProps } from './index'

const props: InventorizationDetailsProps = {
  open: true,
  inventorizationId: fakeId(),
  onClose: jest.fn(),
}

const getContainer = () => screen.getByTestId('inventorization-details')
const findContainer = () => screen.findByTestId('inventorization-details')

const expectLoadingFinished = spinnerTestUtils.expectLoadingFinished(
  'inventorization-details-loading',
)

const getExecuteInventorizationButton = () =>
  buttonTestUtils.getButtonIn(getContainer(), 'Провести инвентаризацию')
const clickExecuteInventorizationButton = async (user: UserEvent) => {
  const button = getExecuteInventorizationButton()
  await user.click(button)
}

export const testUtils = {
  getContainer,
  findContainer,

  expectLoadingFinished,

  getExecuteInventorizationButton,
  clickExecuteInventorizationButton,
}

setupApiTests()

describe('Карточка инвентаризации', () => {
  test('Заголовок отображается', () => {
    mockGetInventorizationSuccess({ inventorizationId: props.inventorizationId })

    render(<InventorizationDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ ...userFixtures.user() }) },
      }),
    })

    const title = within(getContainer()).getByText('Поручение на инвентаризацию')
    expect(title).toBeInTheDocument()
  })

  test('При успешном запросе отображается информация', async () => {
    const inventorization = warehouseFixtures.inventorization()
    mockGetInventorizationSuccess(
      { inventorizationId: props.inventorizationId },
      { body: inventorization },
    )

    render(<InventorizationDetails {...props} />, {
      store: getStoreWithAuth(undefined, undefined, undefined, {
        queries: { ...getUserMeQueryMock({ ...userFixtures.user() }) },
      }),
    })

    await testUtils.expectLoadingFinished()

    const container = getContainer()

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
          queries: { ...getUserMeQueryMock({ ...userFixtures.user() }) },
        }),
      })

      const button = testUtils.getExecuteInventorizationButton()

      expect(button).toBeInTheDocument()
      expect(button).toBeDisabled()
    })

    test('Кнопка активная если условия соблюдены', async () => {
      const inventorization = warehouseFixtures.inventorization({
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

      await testUtils.expectLoadingFinished()
      const button = testUtils.getExecuteInventorizationButton()

      expect(button).toBeEnabled()
    })

    describe('Кнопка не активна если условия соблюдены', () => {
      test(`Но статус не ${InventorizationStatusEnum.New} или ${InventorizationStatusEnum.InProgress}`, async () => {
        const inventorization = warehouseFixtures.inventorization({
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

        await testUtils.expectLoadingFinished()
        const button = testUtils.getExecuteInventorizationButton()

        expect(button).toBeDisabled()
      })

      test('Но исполнитель не текущий пользователь', async () => {
        const inventorization = warehouseFixtures.inventorization({
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

        await testUtils.expectLoadingFinished()
        const button = testUtils.getExecuteInventorizationButton()

        expect(button).toBeDisabled()
      })

      test(`Но нет прав ${UserPermissionsEnum.InventorizationUpdate}`, async () => {
        const inventorization = warehouseFixtures.inventorization({
          status: InventorizationStatusEnum.New,
        })
        mockGetInventorizationSuccess(
          { inventorizationId: props.inventorizationId },
          { body: inventorization },
        )

        render(<InventorizationDetails {...props} />, {
          store: getStoreWithAuth(inventorization.executor, undefined, undefined, {
            queries: { ...getUserMeQueryMock({ ...userFixtures.user() }) },
          }),
        })

        await testUtils.expectLoadingFinished()
        const button = testUtils.getExecuteInventorizationButton()

        expect(button).toBeDisabled()
      })
    })

    test('При клике переходил на страницу выполнения инвентаризации', async () => {
      const inventorization = warehouseFixtures.inventorization({
        status: InventorizationStatusEnum.New,
      })
      mockGetInventorizationSuccess(
        { inventorizationId: props.inventorizationId },
        { body: inventorization },
      )

      const { user } = renderInRoute_latest(
        [
          {
            path: WarehouseRouteEnum.Inventorizations,
            element: <InventorizationDetails {...props} />,
          },
          {
            path: WarehouseRouteEnum.ExecuteInventorization,
            element: <ExecuteInventorizationPage />,
          },
        ],
        { initialEntries: [WarehouseRouteEnum.Inventorizations], initialIndex: 0 },
        {
          store: getStoreWithAuth(inventorization.executor, undefined, undefined, {
            queries: {
              ...getUserMeQueryMock({ permissions: [UserPermissionsEnum.InventorizationUpdate] }),
            },
          }),
        },
      )

      await testUtils.expectLoadingFinished()
      await testUtils.clickExecuteInventorizationButton(user)
      const page = executeInventorizationPageTestUtils.getContainer()

      expect(page).toBeEnabled()
    })
  })
})
