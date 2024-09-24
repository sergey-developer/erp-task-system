import { nomenclatureListItem, props } from '_tests_/features/warehouse/NomenclatureTable/constants'
import { nomenclatureTableTestUtils } from '_tests_/features/warehouse/NomenclatureTable/testUtils'
import { render } from '_tests_/utils'

import NomenclatureTable from './index'

// todo: написать тесты на пагинацию
describe('Таблица номенклатуры', () => {
  test('Отображается корректно', () => {
    render(<NomenclatureTable {...props} />)

    const table = nomenclatureTableTestUtils.getContainer()

    expect(table).toBeInTheDocument()

    props.dataSource.forEach((item) => {
      const row = nomenclatureTableTestUtils.getRow(item.id)
      expect(row).toBeInTheDocument()
    })
  })

  describe('Колонка', () => {
    describe('Наименование', () => {
      test('Отображается корректно', () => {
        render(<NomenclatureTable {...props} />)

        const title = nomenclatureTableTestUtils.getColTitle('Наименование')
        const value = nomenclatureTableTestUtils.getColValue(
          nomenclatureListItem.id,
          nomenclatureListItem.title,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })

      test.todo('При клике открывается модалка')
    })

    describe('Юридическое лицо', () => {
      test('Отображается корректно', () => {
        render(<NomenclatureTable {...props} />)

        const title = nomenclatureTableTestUtils.getColTitle('Артикул')
        const value = nomenclatureTableTestUtils.getColValue(
          nomenclatureListItem.id,
          nomenclatureListItem.vendorCode,
        )

        expect(title).toBeInTheDocument()
        expect(value).toBeInTheDocument()
      })
    })
  })
})
