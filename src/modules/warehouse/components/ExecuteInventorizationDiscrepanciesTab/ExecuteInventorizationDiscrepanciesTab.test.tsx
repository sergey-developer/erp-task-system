import { screen, within } from '@testing-library/react'
import pick from 'lodash/pick'

import { discrepanciesEquipmentTableTestUtils } from '_tests_/features/warehouse/DiscrepanciesEquipmentTable/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { mockGetInventorizationEquipmentsSuccess } from '_tests_/mocks/api'
import { render } from '_tests_/utils'

import ExecuteInventorizationDiscrepanciesTab, {
  ExecuteInventorizationDiscrepanciesProps,
} from './index'

const props: ExecuteInventorizationDiscrepanciesProps = {
  inventorization: pick(warehouseFixtures.inventorization(), 'id'),
}

const getContainer = () => screen.getByTestId('execute-inventorization-discrepancies-tab')

export const testUtils = {
  getContainer,
}

describe('Вкладка списка оборудования с расхождением', () => {
  test('Отображает заголовок и таблицу', () => {
    mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorization.id })

    render(<ExecuteInventorizationDiscrepanciesTab {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText('Список оборудования с расхождением')
    const table = discrepanciesEquipmentTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })
})
