import { screen, within } from '@testing-library/react'

import { mockGetInventorizationEquipmentsSuccess } from '_tests_/mocks/api'
import { fakeId, render } from '_tests_/utils'

import { testUtils as reviseEquipmentTableTestUtils } from '../ReviseEquipmentTable/ReviseEquipmentTable.test'
import ExecuteInventorizationReviseTab, { ExecuteInventorizationReviseTabProps } from './index'

const props: ExecuteInventorizationReviseTabProps = {
  inventorizationId: fakeId(),
}

const getContainer = () => screen.getByTestId('execute-inventorization-revise-tab')

export const testUtils = {
  getContainer,
}

describe('Вкладка списка оборудования с расхождением', () => {
  test('Отображает заголовок и таблицу', () => {
    mockGetInventorizationEquipmentsSuccess({ inventorizationId: props.inventorizationId })

    render(<ExecuteInventorizationReviseTab {...props} />)

    const container = testUtils.getContainer()
    const title = within(container).getByText('Перечень оборудования для сверки')
    const table = reviseEquipmentTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })
})
