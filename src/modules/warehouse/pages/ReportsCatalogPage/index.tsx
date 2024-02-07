import { FC } from 'react'

import CatalogList, { CatalogListProps } from 'modules/warehouse/components/CatalogList'

const items: CatalogListProps['items'] = []

const ReportsCatalogPage: FC = () => {
  return (
    <div data-testid='reports-catalog-page'>
      <CatalogList data-testid='reports-catalog' items={items} />
    </div>
  )
}

export default ReportsCatalogPage
