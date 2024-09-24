import { within } from '@testing-library/react'

import { discrepanciesEquipmentTableTestUtils } from '_tests_/features/warehouse/components/DiscrepanciesEquipmentTable/testUtils'
import { props } from '_tests_/features/warehouse/components/ExecuteInventorizationDiscrepanciesTab/constants'
import { mockGetInventorizationEquipmentsSuccess } from '_tests_/mocks/api'
import { render } from '_tests_/utils'

import ExecuteInventorizationDiscrepanciesTab from './index'

describe('Вкладка списка оборудования с расхождением', () => {
  test('Отображает заголовок и таблицу', () => {
    mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorization.id })

    render(<ExecuteInventorizationDiscrepanciesTab {...props} />)

    const container = executeInventorizationDiscrepanciesTabTestUtils.getContainer()
    const title = within(container).getByText('Список оборудования с расхождением')
    const table = discrepanciesEquipmentTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })
})
