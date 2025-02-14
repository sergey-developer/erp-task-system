import { useBoolean, useSetState } from 'ahooks'
import WarehouseListFilter from 'features/warehouse/components/WarehouseListFilter'
import {
  WarehouseListFilterFormFields,
  WarehouseListFilterProps,
} from 'features/warehouse/components/WarehouseListFilter/types'
import WarehouseTable from 'features/warehouse/components/WarehouseTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'features/warehouse/components/WarehouseTable/sort'
import { WarehouseTableProps } from 'features/warehouse/components/WarehouseTable/types'
import { useGetWarehouses } from 'features/warehouse/hooks/warehouse'
import { GetWarehouseListRequest } from 'features/warehouse/models'
import { FC, useCallback, useState } from 'react'

import FilterButton from 'components/Buttons/FilterButton'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'

const WarehouseListPage: FC = () => {
  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean()
  const debouncedToggleFilterOpened = useDebounceFn(toggleFilterOpened)

  const [requestArgs, setRequestArgs] = useSetState<NonNullable<GetWarehouseListRequest>>({})

  const [filterFormValues, setFilterFormValues] = useState<WarehouseListFilterFormFields>()

  const { isFetching: warehousesIsFetching, currentData: warehouses = [] } =
    useGetWarehouses(requestArgs)

  const handleApplyFilter = useCallback<WarehouseListFilterProps['onApply']>(
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
        <WarehouseListFilter
          visible={filterOpened}
          formValues={filterFormValues}
          onApply={handleApplyFilter}
          onClose={debouncedToggleFilterOpened}
        />
      )}
    </Space>
  )
}

export default WarehouseListPage
