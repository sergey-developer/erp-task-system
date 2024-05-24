import { screen, within } from '@testing-library/react'

import { mockGetInventorizationEquipmentsSuccess } from '_tests_/mocks/api'
import { fakeId, render } from '_tests_/utils'

import { testUtils as discrepanciesEquipmentTableTestUtils } from '../DiscrepanciesEquipmentTable/DiscrepanciesEquipmentTable.test'
import ExecuteInventorizationDiscrepanciesTab, {
  ExecuteInventorizationDiscrepanciesProps,
} from './index'

const props: ExecuteInventorizationDiscrepanciesProps = {
  inventorizationId: fakeId(),
}

const getContainer = () => screen.getByTestId('execute-inventorization-discrepancies-tab')

export const testUtils = {
  getContainer,
}

describe('Вкладка списка оборудования с расхождением', () => {
  test('Отображает заголовок и таблицу', () => {
    mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorizationId })

    render(<ExecuteInventorizationDiscrepanciesTab {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText('Список оборудования с расхождением')
    const table = discrepanciesEquipmentTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })
})
