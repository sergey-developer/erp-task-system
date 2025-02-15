import { useBoolean, useSetState } from 'ahooks'
import WarehouseTable from 'features/warehouses/components/WarehouseTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'features/warehouses/components/WarehouseTable/sort'
import { WarehouseTableProps } from 'features/warehouses/components/WarehouseTable/types'
import WarehousesFilter from 'features/warehouses/components/WarehousesFilter'
import {
  WarehousesFilterFormFields,
  WarehousesFilterProps,
} from 'features/warehouses/components/WarehousesFilter/types'
import { useGetWarehouses } from 'features/warehouses/hooks'
import { FC, useCallback, useState } from 'react'

import FilterButton from 'components/Buttons/FilterButton'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'

import { GetWarehousesRequest } from '../../api/schemas'

const WarehousesPage: FC = () => {
  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean()
  const debouncedToggleFilterOpened = useDebounceFn(toggleFilterOpened)

  const [requestArgs, setRequestArgs] = useSetState<NonNullable<GetWarehousesRequest>>({})

  const [filterFormValues, setFilterFormValues] = useState<WarehousesFilterFormFields>()

  const { isFetching: warehousesIsFetching, currentData: warehouses = [] } =
    useGetWarehouses(requestArgs)

  const handleApplyFilter = useCallback<WarehousesFilterProps['onApply']>(
    (values) => {
      toggleFilterOpened()
      setFilterFormValues(values)
      setRequestArgs(values)
    },
    [setRequestArgs, toggleFilterOpened],
  )

  const handleTableSort = useCallback(
    (sorter: Parameters<WarehouseTableProps['onChange']>[2]) => {
      if (sorter) {
        const { columnKey, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
          setRequestArgs({
            ordering: order ? getSort(columnKey as SortableField, order) : undefined,
          })
        }
      }
    },
    [setRequestArgs],
  )

  const handleChangeTable = useCallback<WarehouseTableProps['onChange']>(
    (_, __, sorter) => {
      handleTableSort(sorter)
    },
    [handleTableSort],
  )

  return (
    <Space data-testid='warehouse-list-page' $block direction='vertical' size='large'>
      <FilterButton onClick={debouncedToggleFilterOpened} />

      <WarehouseTable
        dataSource={warehouses}
        loading={warehousesIsFetching}
        onChange={handleChangeTable}
        sort={requestArgs?.ordering}
      />

      {filterOpened && (
        <WarehousesFilter
          visible={filterOpened}
          formValues={filterFormValues}
          onApply={handleApplyFilter}
          onClose={debouncedToggleFilterOpened}
        />
      )}
    </Space>
  )
}

export default WarehousesPage
