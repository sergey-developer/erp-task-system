import { FC } from 'react'
import { Link } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

import CatalogListItem from './CatalogListItem'

const WarehouseCatalogListPage: FC = () => {
  return (
    <CatalogListItem>
      <Link to={RouteEnum.WarehouseList}>Склады</Link>
    </CatalogListItem>
  )
}

export default WarehouseCatalogListPage
