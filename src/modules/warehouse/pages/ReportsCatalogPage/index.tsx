import { FC } from 'react'

import CatalogList, { CatalogListProps } from 'modules/warehouse/components/CatalogList'
import { WarehouseRouteEnum } from 'modules/warehouse/constants/routes'

const items: CatalogListProps['items'] = [
  {
    link: WarehouseRouteEnum.EmployeesActions,
    text: 'Действия сотрудников',
  },
]

const ReportsCatalogPage: FC = () => {
  return (
    <div data-testid='reports-page'>
      <CatalogList data-testid='reports' items={items} />
    </div>
  )
}

export default ReportsCatalogPage
