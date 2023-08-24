import { useSetState } from 'ahooks'
import { TablePaginationConfig } from 'antd'
import { FC, useCallback } from 'react'

import EquipmentTable from 'modules/warehouse/components/EquipmentTable'
import { EquipmentTableProps } from 'modules/warehouse/components/EquipmentTable/types'
import { useGetEquipmentList } from 'modules/warehouse/hooks'
import { GetEquipmentListQueryArgs } from 'modules/warehouse/models'

import { calculatePaginationParams } from 'shared/utils/pagination'

const EquipmentListPage: FC = () => {
  const [getEquipmentListParams, setGetEquipmentListParams] =
    useSetState<GetEquipmentListQueryArgs>({ limit: 10, offset: 0 })

  const { currentData: equipmentList, isFetching: equipmentListIsFetching } =
    useGetEquipmentList(getEquipmentListParams)

  const handleTablePagination = useCallback(
    (pagination: TablePaginationConfig) => {
      setGetEquipmentListParams(calculatePaginationParams(pagination))
    },
    [setGetEquipmentListParams],
  )

  const handleChangeTable = useCallback<EquipmentTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

  return (
    <div data-testid='equipment-list-page'>
      <EquipmentTable
        dataSource={equipmentList?.results || []}
        pagination={equipmentList?.pagination || false}
        loading={equipmentListIsFetching}
        onChange={handleChangeTable}
      />
    </div>
  )
}

export default EquipmentListPage
