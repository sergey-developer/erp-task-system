import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { RouteEnum } from 'configs/routes'

const Breadcrumb: FC = () => {
  return <Link to={RouteEnum.WarehouseCatalogList}>Справочники</Link>
}

export default Breadcrumb
