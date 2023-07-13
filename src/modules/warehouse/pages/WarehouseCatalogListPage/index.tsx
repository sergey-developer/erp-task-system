import { FC } from 'react'
import { Link } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import CatalogListItem from './CatalogListItem'

const WarehouseCatalogListPage: FC = () => {
  return (
    <div data-testid='warehouse-catalog-list-page'>
      <CatalogListItem>
        <Link to={RouteEnum.WarehouseList}>Склады</Link>
      </CatalogListItem>
    </div>
  )
}

export default WarehouseCatalogListPage
