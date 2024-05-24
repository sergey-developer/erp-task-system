import { screen, within } from '@testing-library/react'
import * as reactRouterDom from 'react-router-dom'

import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import {
  getExecuteInventorizationPageLocationState,
  mapInventorizationWarehousesTitles,
} from 'modules/warehouse/utils/inventorization'

import { formatDate } from 'shared/utils/date'

import { useLocationResult } from '_tests_/fixtures/useLocation'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { render } from '_tests_/utils'

import ExecuteInventorizationPage from './index'

const getContainer = () => screen.getByTestId('execute-inventorization-page')

export const testUtils = {
  getContainer,
}

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}))

describe('Страница проведения инвентаризации', () => {
  test('Информации об инвентаризации отображается', () => {
    const inventorization = getExecuteInventorizationPageLocationState(
      warehouseFixtures.inventorization(),
    )

    jest
      .spyOn(reactRouterDom, 'useLocation')
      .mockReturnValue(useLocationResult({ state: inventorization }))

    render(<ExecuteInventorizationPage />)

    const container = testUtils.getContainer()

    const typeLabel = within(container).getByText('Тип:')
    const typeValue = within(container).getByText(inventorizationTypeDict[inventorization.type])

    const statusLabel = within(container).getByText('Статус:')
    const statusValue = within(container).getByText(
      inventorizationStatusDict[inventorization.status],
    )

    const deadlineAtLabel = within(container).getByText('Срок выполнения:')
    const deadlineAtValue = within(container).getByText(formatDate(inventorization.deadlineAt))

    const createdAtLabel = within(container).getByText('Создано:')
    const createdAtValue = within(container).getByText(formatDate(inventorization.createdAt))

    const executorLabel = within(container).getByText('Исполнитель:')
    const executorValue = within(container).getByText(inventorization.executor.fullName)

    const createdByLabel = within(container).getByText('Автор:')
    const createdByValue = within(container).getByText(inventorization.createdBy.fullName)

    const warehousesLabel = within(container).getByText('Склады:')
    const warehousesValue = within(container).getByText(
      mapInventorizationWarehousesTitles(inventorization.warehouses),
    )

    expect(typeLabel).toBeInTheDocument()
    expect(typeValue).toBeInTheDocument()

    expect(statusLabel).toBeInTheDocument()
    expect(statusValue).toBeInTheDocument()

    expect(deadlineAtLabel).toBeInTheDocument()
    expect(deadlineAtValue).toBeInTheDocument()

    expect(createdAtLabel).toBeInTheDocument()
    expect(createdAtValue).toBeInTheDocument()

    expect(executorLabel).toBeInTheDocument()
    expect(executorValue).toBeInTheDocument()

    expect(createdByLabel).toBeInTheDocument()
    expect(createdByValue).toBeInTheDocument()

    expect(warehousesLabel).toBeInTheDocument()
    expect(warehousesValue).toBeInTheDocument()
  })

  test.todo('Отображается верная вкладка по умолчанию')
  test.todo('Вкладка расхождения открывается')
})
