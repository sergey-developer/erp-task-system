import { FC } from 'react'

import WarehouseTable from 'modules/warehouse/features/WarehouseTable'

import FilterButton from 'components/Buttons/FilterButton'
import Space from 'components/Space'

const WarehouseListPage: FC = () => {
  return (
    <Space
      data-testid='warehouse-list-page'
      $block
      direction='vertical'
      size='large'
    >
      <FilterButton />

      <WarehouseTable
        dataSource={[
          {
            id: 1,
            title: 'title',
            parent: {
              id: 1,
              title: 'parent title',
            },
            legalEntity: {
              id: 1,
              title: 'legalEntity title',
            },
            address: 'address',
          },
        ]}
        loading={false}
      />
    </Space>
  )
}

export default WarehouseListPage
