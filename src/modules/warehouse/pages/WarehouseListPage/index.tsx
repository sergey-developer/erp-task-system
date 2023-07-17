import { TableProps } from 'antd'
import { SorterResult } from 'antd/es/table/interface'
import isArray from 'lodash/isArray'
import { FC, useCallback, useEffect, useState } from 'react'

import { getWarehouseListMessages } from 'modules/warehouse/constants'
import WarehouseTable from 'modules/warehouse/features/WarehouseTable'
import { WarehouseTableItem } from 'modules/warehouse/features/WarehouseTable/interfaces'
import {
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/features/WarehouseTable/sort'
import { getSort } from 'modules/warehouse/features/WarehouseTable/utils'
import { GetWarehouseListQueryArgs } from 'modules/warehouse/models'
import { useGetWarehouseListQuery } from 'modules/warehouse/services/warehouseApi.service'

import FilterButton from 'components/Buttons/FilterButton'
import Space from 'components/Space'

import { showErrorNotification } from 'shared/utils/notifications'

const WarehouseListPage: FC = () => {
  const [queryArgs, setQueryArgs] = useState<GetWarehouseListQueryArgs>()

  const {
    isFetching: warehouseListIsFetching,
    currentData: warehouseList = [],
    isError: isGetWarehouseListError,
  } = useGetWarehouseListQuery(queryArgs)

  useEffect(() => {
    if (isGetWarehouseListError) {
      showErrorNotification(getWarehouseListMessages.commonError)
    }
  }, [isGetWarehouseListError])

  const handleTableSort = (
    sorter:
      | SorterResult<WarehouseTableItem>
      | SorterResult<WarehouseTableItem>[],
  ) => {
    if (sorter) {
      const { columnKey, order } = isArray(sorter) ? sorter[0] : sorter

      if (columnKey && columnKey in sortableFieldToSortValues) {
        setQueryArgs((prevState) => ({
          ...prevState,
          ordering: order
            ? getSort(columnKey as SortableField, order)
            : undefined,
        }))
      }
    }
  }

  const handleChangeTable = useCallback<
    NonNullable<TableProps<WarehouseTableItem>['onChange']>
  >((_, __, sorter) => {
    handleTableSort(sorter)
  }, [])

  return (
    <Space
      data-testid='warehouse-list-page'
      $block
      direction='vertical'
      size='large'
    >
      <FilterButton />

      <WarehouseTable
        dataSource={warehouseList}
        loading={warehouseListIsFetching}
        onChange={handleChangeTable}
        sort={queryArgs?.ordering}
      />
    </Space>
  )
}

export default WarehouseListPage
