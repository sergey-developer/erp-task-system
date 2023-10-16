import { FC } from 'react'

import { RouteEnum } from 'configs/routes'

import CatalogList, { CatalogListProps } from 'modules/warehouse/components/CatalogList'

const items: CatalogListProps['items'] = [
  {
    link: RouteEnum.EquipmentNomenclatureList,
    text: 'Оборудование',
    permissions: ['EQUIPMENTS_READ'],
  },
  {
    link: RouteEnum.RelocationTaskList,
    text: 'Заявки на перемещение оборудования',
    permissions: ['RELOCATION_TASKS_READ'],
  },
]

const ReserveCatalogListPage: FC = () => {
  return (
    <div data-testid='reserve-catalog-list-page'>
      <CatalogList data-testid='reserve-catalog-list' items={items} />
    </div>
  )
}

export default ReserveCatalogListPage
