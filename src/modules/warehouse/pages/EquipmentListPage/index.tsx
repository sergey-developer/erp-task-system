import { useBoolean, useSetState } from 'ahooks'
import debounce from 'lodash/debounce'
import { FC, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import EquipmentDetails from 'modules/warehouse/components/EquipmentDetails'
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
import { IdType } from 'shared/types/common'
import {
  calculatePaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const EquipmentListPage: FC = () => {
  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const nomenclatureId = Number(params?.id) || undefined

  const context = useEquipmentPageContext()

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<IdType>()

  const [equipmentDetailsOpened, { toggle: toggleOpenEquipmentDetails }] = useBoolean(false)
  const debouncedToggleOpenEquipmentDetails = useDebounceFn(toggleOpenEquipmentDetails)

  const [getEquipmentListParams, setGetEquipmentListParams] =
    useSetState<GetEquipmentListQueryArgs>({
      ...getInitialPaginationParams(),
      ...(context?.filter && equipmentFilterToParams(context.filter)),
      search: context?.search,
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
      onClick: debounce(() => {
        setSelectedEquipmentId(record.id)
        toggleOpenEquipmentDetails()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [toggleOpenEquipmentDetails],
  )

  return (
    <div data-testid='equipment-list-page'>
      <EquipmentTable
        dataSource={extractPaginationResults(equipmentList)}
        pagination={equipmentList?.pagination || false}
        loading={equipmentListIsFetching}
        sort={getEquipmentListParams.ordering}
        onChange={handleChangeTable}
        onRow={handleTableRowClick}
      />

      {equipmentDetailsOpened && selectedEquipmentId && (
        <EquipmentDetails
          open={equipmentDetailsOpened}
          onClose={debouncedToggleOpenEquipmentDetails}
          equipmentId={selectedEquipmentId}
        />
      )}
    </div>
  )
}

export default EquipmentListPage
