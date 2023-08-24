import { useSetState } from 'ahooks'
import { TablePaginationConfig } from 'antd'
import { FC, useCallback } from 'react'

import EquipmentNomenclatureTable from 'modules/warehouse/components/EquipmentNomenclatureTable'
import { EquipmentNomenclatureTableProps } from 'modules/warehouse/components/EquipmentNomenclatureTable/types'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks'
import { GetEquipmentNomenclatureListQueryArgs } from 'modules/warehouse/models'

import { calculatePaginationParams } from 'shared/utils/pagination'

const EquipmentNomenclatureListPage: FC = () => {
  const [
    getEquipmentNomenclatureListParams,
    setGetEquipmentNomenclatureListParams,
  ] = useSetState<GetEquipmentNomenclatureListQueryArgs>({
    limit: 10,
    offset: 0,
  })

  const {
    currentData: equipmentNomenclatureList,
    isFetching: equipmentNomenclatureListIsFetching,
  } = useGetEquipmentNomenclatureList(getEquipmentNomenclatureListParams)

  const handleTablePagination = useCallback(
    (pagination: TablePaginationConfig) => {
      setGetEquipmentNomenclatureListParams(
        calculatePaginationParams(pagination),
      )
    },
    [setGetEquipmentNomenclatureListParams],
  )

  const handleChangeTable = useCallback<
    EquipmentNomenclatureTableProps['onChange']
  >(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

  return (
    <div data-testid='equipment-nomenclature-list-page'>
      <EquipmentNomenclatureTable
        dataSource={equipmentNomenclatureList?.results || []}
        pagination={equipmentNomenclatureList?.pagination || false}
        loading={equipmentNomenclatureListIsFetching}
        onChange={handleChangeTable}
      />
    </div>
  )
}

export default EquipmentNomenclatureListPage
