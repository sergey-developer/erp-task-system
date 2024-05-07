import { screen, within } from '@testing-library/react'

import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'

import { formatDate } from 'shared/utils/date'

import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetInventorizationSuccess } from '_tests_/mocks/api'
import { fakeId, render, setupApiTests, spinnerTestUtils } from '_tests_/utils'

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

export const testUtils = {
  getContainer,
  findContainer,

  expectLoadingFinished,
}

setupApiTests()

describe('Карточка инвентаризации', () => {
  test('Заголовок отображается', () => {
    mockGetInventorizationSuccess(props.inventorizationId)

    render(<InventorizationDetails {...props} />)

    const title = within(getContainer()).getByText('Поручение на инвентаризацию')
    expect(title).toBeInTheDocument()
  })

  test('При успешном запросе отображается информация', async () => {
    const inventorization = warehouseFixtures.inventorization()
    mockGetInventorizationSuccess(props.inventorizationId, { body: inventorization })

    render(<InventorizationDetails {...props} />)

    await testUtils.expectLoadingFinished()

    const container = getContainer()

    const typeLabel = within(container).getByText('Тип:')
    const typeValue = within(container).getByText(inventorizationTypeDict[inventorization.type])

    const warehousesLabel = within(container).getByText('Склады:')
    const warehousesValue = within(container).getByText(
      inventorization.warehouses.map((w) => w.title).join(', '),
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
})
