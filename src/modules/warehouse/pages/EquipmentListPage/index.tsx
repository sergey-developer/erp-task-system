import { useBoolean, useSetState } from 'ahooks'
import debounce from 'lodash/debounce'
import { FC, useCallback } from 'react'
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
import { useGetEquipmentList } from 'modules/warehouse/hooks/equipment'
import { GetEquipmentListQueryArgs } from 'modules/warehouse/models'
import { equipmentFilterToParams } from 'modules/warehouse/utils/equipment'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const EquipmentListPage: FC = () => {
  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const nomenclatureId = Number(params?.id) || undefined

  const context = useEquipmentPageContext()

  const [isShowEquipment, { toggle: toggleShowEquipment }] = useBoolean(false)
  const debouncedToggleShowEquipment = useDebounceFn(toggleShowEquipment)

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

        if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
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
      onClick: debounce(async () => {
        toggleShowEquipment()

        try {
          await context.getEquipment(record.id)
        } catch {
          toggleShowEquipment()
        }
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [context.getEquipment, toggleShowEquipment],
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
          open={isShowEquipment}
          title={context.equipment?.title}
          equipment={context.equipment}
          equipmentIsLoading={context.equipmentIsLoading}
          hiddenFields={
            context.equipment?.category && getHiddenFieldsByCategory(context.equipment.category)
          }
          onClickEdit={context.onClickEditEquipment}
          onClose={debouncedToggleShowEquipment}
        />
      )}
    </div>
  )
}

export default EquipmentListPage
