import { within } from '@testing-library/react'

import { props } from '_tests_/features/inventorizations/components/CheckInventorizationEquipmentsModal/constants'
import { checkInventorizationEquipmentsModalTestUtils as testUtils } from '_tests_/features/inventorizations/components/CheckInventorizationEquipmentsModal/testUtils'
import { checkInventorizationEquipmentsTableTestUtils } from '_tests_/features/inventorizations/components/CheckInventorizationEquipmentsTable/testUtils'
import warehouseFixtures from '_tests_/fixtures/warehouse'
import { iconTestUtils, render } from '_tests_/helpers'

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

  describe('Оборудование требующее оприходования', () => {
    test('Если есть в списке, отображается иконка, текст и чекбокс', () => {
      const checkInventorizationEquipmentsTableRow =
        warehouseFixtures.checkInventorizationEquipmentsTableRow({ isCredited: false })

      render(
        <CheckInventorizationEquipmentsModal
          {...props}
          data={[checkInventorizationEquipmentsTableRow]}
        />,
      )

      const isCreditedBlock = testUtils.getIsCreditedBlock()

      const text = 'В списке результатов загрузки есть оборудование, требующее оприходования'
      const textEl = within(isCreditedBlock).getByText(text)
      const icon = iconTestUtils.getIconByNameIn(isCreditedBlock, 'exclamation-circle')
      const checkbox = testUtils.getIsCreditedCheckbox()

      expect(textEl).toBeInTheDocument()
      expect(icon).toBeInTheDocument()
      expect(checkbox).toBeInTheDocument()
      expect(checkbox).toBeEnabled()
    })

    test('Если нет в списке, то блок в котором иконка, текст и чекбокс не отображается и отображается всё оборудование', () => {
      const checkInventorizationEquipmentsTableRow1 =
        warehouseFixtures.checkInventorizationEquipmentsTableRow({ isCredited: true })

      const checkInventorizationEquipmentsTableRow2 =
        warehouseFixtures.checkInventorizationEquipmentsTableRow({ isCredited: true })

      render(
        <CheckInventorizationEquipmentsModal
          {...props}
          data={[checkInventorizationEquipmentsTableRow1, checkInventorizationEquipmentsTableRow2]}
        />,
      )

      const isCreditedBlock = testUtils.queryIsCreditedBlock()
      const row1 = checkInventorizationEquipmentsTableTestUtils.getRow(
        checkInventorizationEquipmentsTableRow1.rowId,
      )
      const row2 = checkInventorizationEquipmentsTableTestUtils.getRow(
        checkInventorizationEquipmentsTableRow2.rowId,
      )

      expect(isCreditedBlock).not.toBeInTheDocument()
      expect(row1).toBeInTheDocument()
      expect(row2).toBeInTheDocument()
    })

    test('Если есть в списке, по умолчанию, в таблице отображается всё оборудование', () => {
      const checkInventorizationEquipmentsTableRow1 =
        warehouseFixtures.checkInventorizationEquipmentsTableRow({ isCredited: false })

      const checkInventorizationEquipmentsTableRow2 =
        warehouseFixtures.checkInventorizationEquipmentsTableRow({ isCredited: true })

      const data = [
        checkInventorizationEquipmentsTableRow1,
        checkInventorizationEquipmentsTableRow2,
      ]

      render(<CheckInventorizationEquipmentsModal {...props} data={data} />)

      data.forEach((item) => {
        const row = checkInventorizationEquipmentsTableTestUtils.getRow(item.rowId)
        expect(row).toBeInTheDocument()
      })
    })

    test('Если есть в списке и выбрано что отображается только оборудование требующее оприходования, то отображается только оно', async () => {
      const checkInventorizationEquipmentsTableRow1 =
        warehouseFixtures.checkInventorizationEquipmentsTableRow({ isCredited: false })

      const checkInventorizationEquipmentsTableRow2 =
        warehouseFixtures.checkInventorizationEquipmentsTableRow({ isCredited: true })

      const data = [
        checkInventorizationEquipmentsTableRow1,
        checkInventorizationEquipmentsTableRow2,
      ]

      const { user } = render(<CheckInventorizationEquipmentsModal {...props} data={data} />)

      const checkbox = testUtils.getIsCreditedCheckbox()
      await user.click(checkbox)

      const row1 = checkInventorizationEquipmentsTableTestUtils.getRow(
        checkInventorizationEquipmentsTableRow1.rowId,
      )
      const getRow2 = () =>
        checkInventorizationEquipmentsTableTestUtils.getRow(
          checkInventorizationEquipmentsTableRow2.rowId,
        )

      expect(row1).toBeInTheDocument()
      expect(getRow2).toThrow()
    })
  })
})
