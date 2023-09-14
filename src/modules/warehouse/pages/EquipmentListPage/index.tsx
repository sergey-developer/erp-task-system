import { useSetState } from 'ahooks'
import defaultTo from 'lodash/defaultTo'
import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Equipment from 'modules/warehouse/components/Equipment'
import { getHiddenFieldsByCategory } from 'modules/warehouse/components/Equipment/utils'
import { useEquipmentPageContext } from 'modules/warehouse/components/EquipmentPageLayout/context'
import EquipmentTable from 'modules/warehouse/components/EquipmentTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/EquipmentTable/sort'
import { EquipmentTableProps } from 'modules/warehouse/components/EquipmentTable/types'
import { useGetEquipment, useGetEquipmentList } from 'modules/warehouse/hooks/equipment'
import { GetEquipmentListQueryArgs } from 'modules/warehouse/models'
import { equipmentFilterToParams } from 'modules/warehouse/utils/equipment'

import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const EquipmentListPage: FC = () => {
  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const nomenclatureId = defaultTo(Number(params?.id), undefined)

  const context = useEquipmentPageContext()

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<IdType>()
  const debouncedSetSelectedEquipmentId = useDebounceFn(setSelectedEquipmentId)
  const isShowEquipment = Boolean(selectedEquipmentId)

  const [getEquipmentListParams, setGetEquipmentListParams] =
    useSetState<GetEquipmentListQueryArgs>({
      ...getInitialPaginationParams(),
      ...(context.filter && equipmentFilterToParams(context.filter)),
      search: context.search,
      nomenclature: nomenclatureId,
      ordering: 'title',
    })

  const { currentData: equipmentList, isFetching: equipmentListIsFetching } =
    useGetEquipmentList(getEquipmentListParams)

  const {
    currentData: equipment,
    isFetching: equipmentIsFetching,
    isError: isGetEquipmentError,
  } = useGetEquipment({ equipmentId: selectedEquipmentId! }, { skip: !isShowEquipment })

  useEffect(() => {
    if (isGetEquipmentError) {
      setSelectedEquipmentId(undefined)
    }
  }, [isGetEquipmentError])

  const handleTablePagination = useCallback(
    (pagination: Parameters<EquipmentTableProps['onChange']>[0]) => {
      setGetEquipmentListParams(calculatePaginationParams(pagination))
    },
    [setGetEquipmentListParams],
  )

  const handleTableSort = useCallback(
    (sorter: Parameters<EquipmentTableProps['onChange']>[2]) => {
      if (sorter) {
        const { columnKey, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (columnKey && columnKey in sortableFieldToSortValues) {
          setGetEquipmentListParams({
            ordering: order ? getSort(columnKey as SortableField, order) : undefined,
          })
        }
      }
    },
    [setGetEquipmentListParams],
  )

  const handleChangeTable = useCallback<EquipmentTableProps['onChange']>(
    (pagination, _, sorter) => {
      handleTablePagination(pagination)
      handleTableSort(sorter)
    },
    [handleTablePagination, handleTableSort],
  )

  const handleTableRowClick = useCallback<EquipmentTableProps['onRow']>(
    (record) => ({
      onClick: () => debouncedSetSelectedEquipmentId(record.id),
    }),
    [debouncedSetSelectedEquipmentId],
  )

  return (
    <div data-testid='equipment-list-page'>
      <EquipmentTable
        dataSource={equipmentList?.results || []}
        pagination={equipmentList?.pagination || false}
        loading={equipmentListIsFetching}
        sort={getEquipmentListParams.ordering}
        onChange={handleChangeTable}
        onRow={handleTableRowClick}
      />

      {isShowEquipment && (
        <Equipment
          visible={isShowEquipment}
          title={equipment?.title}
          equipment={equipment}
          equipmentIsLoading={equipmentIsFetching}
          hiddenFields={equipment?.category && getHiddenFieldsByCategory(equipment.category)}
          onClose={() => debouncedSetSelectedEquipmentId(undefined)}
        />
      )}
    </div>
  )
}

export default EquipmentListPage
