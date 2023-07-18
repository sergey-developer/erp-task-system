import { useBoolean, useSetState } from 'ahooks'
import { FC, useCallback, useState } from 'react'

import WarehouseListFilter from 'modules/warehouse/features/WarehouseListFilter'
import {
  WarehouseListFilterFormFields,
  WarehouseListFilterProps,
} from 'modules/warehouse/features/WarehouseListFilter/interfaces'
import WarehouseTable from 'modules/warehouse/features/WarehouseTable'
import { WarehouseTableProps } from 'modules/warehouse/features/WarehouseTable/interfaces'
import {
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/features/WarehouseTable/sort'
import { getSort } from 'modules/warehouse/features/WarehouseTable/utils'
import { useGetWarehouseList } from 'modules/warehouse/hooks'
import { GetWarehouseListQueryArgs } from 'modules/warehouse/models'

import FilterButton from 'components/Buttons/FilterButton'
import Space from 'components/Space'

import { useDebounceFn } from 'shared/hooks'

const WarehouseListPage: FC = () => {
  const [filterOpened, { toggle: toggleFilterOpened }] = useBoolean()
  const debouncedToggleFilterOpened = useDebounceFn(toggleFilterOpened)

  const [queryArgs, setQueryArgs] = useSetState<
    NonNullable<GetWarehouseListQueryArgs>
  >({})

  const [filterFormValues, setFilterFormValues] =
    useState<WarehouseListFilterFormFields>()

  const {
    isFetching: warehouseListIsFetching,
    currentData: warehouseList = [],
  } = useGetWarehouseList(queryArgs)

  const handleApplyFilter = useCallback<WarehouseListFilterProps['onApply']>(
    (values) => {
      toggleFilterOpened()
      setFilterFormValues(values)
      setQueryArgs(values)
    },
    [setQueryArgs, toggleFilterOpened],
  )

  const handleTableSort = useCallback(
    (sorter: Parameters<WarehouseTableProps['onChange']>[2]) => {
      if (sorter) {
        const { columnKey, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (columnKey && columnKey in sortableFieldToSortValues) {
          setQueryArgs({
            ordering: order
              ? getSort(columnKey as SortableField, order)
              : undefined,
          })
        }
      }
    },
    [setQueryArgs],
  )

  const handleChangeTable = useCallback<WarehouseTableProps['onChange']>(
    (_, __, sorter) => {
      handleTableSort(sorter)
    },
    [handleTableSort],
  )

  return (
    <Space
      data-testid='warehouse-list-page'
      $block
      direction='vertical'
      size='large'
    >
      <FilterButton onClick={debouncedToggleFilterOpened} />

      <WarehouseTable
        dataSource={warehouseList}
        loading={warehouseListIsFetching}
        onChange={handleChangeTable}
        sort={queryArgs?.ordering}
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
