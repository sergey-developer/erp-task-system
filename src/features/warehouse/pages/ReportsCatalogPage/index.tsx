import { FC } from 'react'

import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'

import Catalogs, { CatalogsProps } from 'components/Catalogs'

const items: CatalogsProps['items'] = [
  {
    link: WarehouseRouteEnum.HistoryNomenclatureOperations,
    text: 'История операций по номенклатуре',
  },
  {
    link: WarehouseRouteEnum.EmployeesActions,
    text: 'Действия сотрудников',
  },
  {
    link: WarehouseRouteEnum.AmountEquipmentSpent,
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
