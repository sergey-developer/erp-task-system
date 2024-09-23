import { within } from '@testing-library/react'

import { props } from '_tests_/features/inventorizationEquipments/CheckInventorizationEquipmentsModal/constants'
import { checkInventorizationEquipmentsModalTestUtils as testUtils } from '_tests_/features/inventorizationEquipments/CheckInventorizationEquipmentsModal/utils'
import { checkInventorizationEquipmentsTableTestUtils } from '_tests_/features/inventorizationEquipments/CheckInventorizationEquipmentsTable/utils'
import { render } from '_tests_/utils'

import CheckInventorizationEquipmentsModal from './index'

describe('Модалка', () => {
  test('Отображает заголовок и таблицу', () => {
    render(<CheckInventorizationEquipmentsModal {...props} />)

    const container = testUtils.getContainer()
    const titleText = 'Результаты загрузки оборудования из Excel'
    const title = within(container).getByText(titleText)
    const table = checkInventorizationEquipmentsTableTestUtils.getContainer()

    expect(title).toBeInTheDocument()
    expect(table).toBeInTheDocument()
  })
})
