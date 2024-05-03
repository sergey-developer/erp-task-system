import { useBoolean, useSetState } from 'ahooks'
import { Flex, Space } from 'antd'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useState } from 'react'

import InventorizationTable from 'modules/warehouse/components/InventorizationTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/InventorizationTable/sort'
import { InventorizationTableProps } from 'modules/warehouse/components/InventorizationTable/types'
import {
  InventorizationsFilterFormFields,
  InventorizationsFilterProps,
} from 'modules/warehouse/components/InventorizationsFilter/types'
import {
  InventorizationStatusEnum,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { useGetInventorizations } from 'modules/warehouse/hooks/inventorization'
import { GetInventorizationsQueryArgs } from 'modules/warehouse/models'

import FilterButton from 'components/Buttons/FilterButton'
import ModalFallback from 'components/Modals/ModalFallback'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { useDrawerHeightByTable } from 'shared/hooks/useDrawerHeightByTable'
import { IdType } from 'shared/types/common'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const InventorizationsFilter = React.lazy(
  () => import('modules/warehouse/components/InventorizationsFilter'),
)

const InventorizationDetails = React.lazy(
  () => import('modules/warehouse/components/InventorizationDetails'),
)

const initialFilterValues: Pick<InventorizationsFilterFormFields, 'types' | 'statuses'> = {
  types: [InventorizationTypeEnum.External, InventorizationTypeEnum.Internal],
  statuses: [
    InventorizationStatusEnum.New,
    InventorizationStatusEnum.InProgress,
    InventorizationStatusEnum.Completed,
    InventorizationStatusEnum.Closed,
  ],
}

const initialGetInventorizationsQueryArgs: Partial<
  Pick<GetInventorizationsQueryArgs, 'ordering' | 'types' | 'statuses' | 'offset' | 'limit'>
> = {
  ...getInitialPaginationParams(),
  ordering: 'deadline_at',
  ...initialFilterValues,
}

const InventorizationsPage: FC = () => {
  const { tableRef, drawerHeight } = useDrawerHeightByTable()

  const [filterOpened, { toggle: toggleOpenFilter }] = useBoolean(false)
  const debouncedToggleOpenFilter = useDebounceFn(toggleOpenFilter)
  const [filterValues, setFilterValues] = useState<InventorizationsFilterFormFields>()

  const [inventorizationDetailsOpened, { toggle: toggleOpenInventorizationDetails }] =
    useBoolean(false)
  const debouncedToggleOpenInventorizationDetails = useDebounceFn(toggleOpenInventorizationDetails)

  const [inventorizationId, setInventorizationId] = useState<IdType>()

  const [getInventorizationsQueryArgs, setGetInventorizationsQueryArgs] =
    useSetState<GetInventorizationsQueryArgs>(initialGetInventorizationsQueryArgs)

  const { currentData: inventorizations, isFetching: inventorizationsIsFetching } =
    useGetInventorizations(getInventorizationsQueryArgs)

  const onTablePagination = useCallback(
    (pagination: Parameters<InventorizationTableProps['onChange']>[0]) => {
      setGetInventorizationsQueryArgs(calculatePaginationParams(pagination))
    },
    [setGetInventorizationsQueryArgs],
  )

  const onTableSort = useCallback(
    (sorter: Parameters<InventorizationTableProps['onChange']>[2]) => {
      if (sorter) {
        const { field, order } = Array.isArray(sorter) ? sorter[0] : sorter
        if (field && (field as string) in sortableFieldToSortValues) {
          setGetInventorizationsQueryArgs({
            ordering: order ? getSort(field as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetInventorizationsQueryArgs],
  )

  const onChangeTable = useCallback<InventorizationTableProps['onChange']>(
    (pagination, _, sorter) => {
      onTablePagination(pagination)
      onTableSort(sorter)
    },
    [onTablePagination, onTableSort],
  )

  const onClickTableRow = useCallback<InventorizationTableProps['onRow']>(
    (record) => ({
      onClick: debounce(() => {
        setInventorizationId(record.id)
        toggleOpenInventorizationDetails()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [toggleOpenInventorizationDetails],
  )

  const onApplyFilter = useCallback<InventorizationsFilterProps['onApply']>(
    (values) => {
      setFilterValues(values)
      setGetInventorizationsQueryArgs({
        types: values.types,
        statuses: values.statuses,
        offset: initialGetInventorizationsQueryArgs.offset,
      })
      toggleOpenFilter()
    },
    [setGetInventorizationsQueryArgs, toggleOpenFilter],
  )

  return (
    <>
      <Flex data-testid='inventorizations-page' vertical gap='middle'>
        <Space size='middle'>
          <FilterButton onClick={debouncedToggleOpenFilter} />
        </Space>

        <InventorizationTable
          ref={tableRef}
          dataSource={extractPaginationResults(inventorizations)}
          pagination={extractPaginationParams(inventorizations)}
          loading={inventorizationsIsFetching}
          sort={getInventorizationsQueryArgs.ordering}
          onChange={onChangeTable}
          onRow={onClickTableRow}
        />
      </Flex>

      {filterOpened && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка фильтров' />}>
          <InventorizationsFilter
            open={filterOpened}
            values={filterValues}
            initialValues={initialFilterValues}
            onClose={debouncedToggleOpenFilter}
            onApply={onApplyFilter}
          />
        </React.Suspense>
      )}

      {inventorizationDetailsOpened && inventorizationId && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка карточки инвентаризации' />}>
          <InventorizationDetails
            open={inventorizationDetailsOpened}
            onClose={debouncedToggleOpenInventorizationDetails}
            height={drawerHeight}
            inventorizationId={inventorizationId}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default InventorizationsPage
