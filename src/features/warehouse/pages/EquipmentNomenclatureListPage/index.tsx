import { useSetState } from 'ahooks'
import { equipmentsFilterToRequestParams } from 'features/equipments/helpers'
import { useGetEquipmentNomenclatures } from 'features/equipments/hooks'
import EquipmentNomenclatureTable from 'features/warehouse/components/EquipmentNomenclatureTable'
import { EquipmentNomenclatureTableProps } from 'features/warehouse/components/EquipmentNomenclatureTable/types'
import { useEquipmentPageContext } from 'features/warehouse/components/EquipmentPageLayout/context'
import { GetEquipmentNomenclaturesRequest } from 'features/warehouse/models'
import { FC, useCallback, useEffect } from 'react'

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
    useSetState<GetEquipmentNomenclaturesRequest>({
      ...initialPaginationParams,
      ...(context?.filter && equipmentsFilterToRequestParams(context.filter)),
      search: context?.search,
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
        ...equipmentsFilterToRequestParams(context.filter),
        offset: initialPaginationParams.offset,
      })
    }
  }, [context?.filter, setEquipmentNomenclatureListParams])

  const { currentData: equipmentNomenclatures, isFetching: equipmentNomenclatureListIsFetching } =
    useGetEquipmentNomenclatures(equipmentNomenclatureListParams)

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
        dataSource={extractPaginationResults(equipmentNomenclatures)}
        pagination={extractPaginationParams(equipmentNomenclatures)}
        loading={equipmentNomenclatureListIsFetching}
        onChange={handleChangeTable}
      />
    </div>
  )
}

export default EquipmentNomenclatureListPage
