import { WarehousesRoutesEnum } from 'features/warehouses/routes/routes'
import { FC } from 'react'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

const items: CatalogsProps['items'] = [
  {
    link: WarehousesRoutesEnum.HistoryNomenclatureOperations,
    text: 'История операций по номенклатуре',
  },
  {
    link: WarehousesRoutesEnum.EmployeesActions,
    text: 'Действия сотрудников',
  },
  {
    link: WarehousesRoutesEnum.AmountEquipmentSpent,
    text: 'Количество потраченного оборудования',
  },
]

const ReportsCatalogPage: FC = () => {
  return (
    <div data-testid='reports-page'>
      <Catalogs data-testid='reports' items={items} />
    </div>
  )
}

export default ReportsCatalogPage
