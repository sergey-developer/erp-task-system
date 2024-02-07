import { useSetState } from 'ahooks'
import { FC, useCallback, useEffect } from 'react'

import EquipmentNomenclatureTable from 'modules/warehouse/components/EquipmentNomenclatureTable'
import { EquipmentNomenclatureTableProps } from 'modules/warehouse/components/EquipmentNomenclatureTable/types'
import { useEquipmentPageContext } from 'modules/warehouse/components/EquipmentPageLayout/context'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks/equipment'
import { GetEquipmentNomenclatureListQueryArgs } from 'modules/warehouse/models'
import { equipmentFilterToParams } from 'modules/warehouse/utils/equipment'

import { LocationTypeEnum } from 'shared/constants/catalogs'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const initialPaginationParams = getInitialPaginationParams()

const EquipmentNomenclatureListPage: FC = () => {
  const context = useEquipmentPageContext()

  const [equipmentNomenclatureListParams, setEquipmentNomenclatureListParams] =
    useSetState<GetEquipmentNomenclatureListQueryArgs>({
      ...initialPaginationParams,
      ...(context?.filter && equipmentFilterToParams(context.filter)),
      search: context?.search,
      locationTypes: [LocationTypeEnum.Warehouse, LocationTypeEnum.ServiceCenter],
    })

  useEffect(() => {
    setEquipmentNomenclatureListParams({
      search: context?.search || undefined,
      offset: initialPaginationParams.offset,
    })
  }, [context?.search, setEquipmentNomenclatureListParams])

  useEffect(() => {
    if (context?.filter) {
      setEquipmentNomenclatureListParams({
        ...equipmentFilterToParams(context.filter),
        offset: initialPaginationParams.offset,
      })
    }
  }, [context?.filter, setEquipmentNomenclatureListParams])

  const {
    currentData: equipmentNomenclatureList,
    isFetching: equipmentNomenclatureListIsFetching,
  } = useGetEquipmentNomenclatureList(equipmentNomenclatureListParams)

  const handleTablePagination = useCallback(
    (pagination: Parameters<EquipmentNomenclatureTableProps['onChange']>[0]) => {
      setEquipmentNomenclatureListParams(calculatePaginationParams(pagination))
    },
    [setEquipmentNomenclatureListParams],
  )

  const handleChangeTable = useCallback<EquipmentNomenclatureTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

  return (
    <div data-testid='equipment-nomenclature-list-page'>
      <EquipmentNomenclatureTable
        dataSource={extractPaginationResults(equipmentNomenclatureList)}
        pagination={extractPaginationParams(equipmentNomenclatureList)}
        loading={equipmentNomenclatureListIsFetching}
        onChange={handleChangeTable}
      />
    </div>
  )
}

export default EquipmentNomenclatureListPage
