import { useSetState } from 'ahooks'
import { FC, useCallback, useEffect } from 'react'

import EquipmentNomenclatureTable from 'modules/warehouse/components/EquipmentNomenclatureTable'
import { EquipmentNomenclatureTableProps } from 'modules/warehouse/components/EquipmentNomenclatureTable/types'
import { useEquipmentPageContext } from 'modules/warehouse/components/EquipmentPageLayout/context'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks/equipment'
import { GetEquipmentNomenclatureListQueryArgs } from 'modules/warehouse/models'
import { equipmentFilterToParams } from 'modules/warehouse/utils'

import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const initialPaginationParams = getInitialPaginationParams()

const EquipmentNomenclatureListPage: FC = () => {
  const context = useEquipmentPageContext()

  const [getEquipmentNomenclatureListParams, setGetEquipmentNomenclatureListParams] =
    useSetState<GetEquipmentNomenclatureListQueryArgs>({
      ...initialPaginationParams,
      ...(context.filter && equipmentFilterToParams(context.filter)),
      search: context.search,
    })

  useEffect(() => {
    setGetEquipmentNomenclatureListParams({
      search: context.search || undefined,
      offset: initialPaginationParams.offset,
    })
  }, [context.search, setGetEquipmentNomenclatureListParams])

  useEffect(() => {
    if (context.filter) {
      setGetEquipmentNomenclatureListParams({
        ...equipmentFilterToParams(context.filter),
        offset: initialPaginationParams.offset,
      })
    }
  }, [context.filter, setGetEquipmentNomenclatureListParams])

  const {
    currentData: equipmentNomenclatureList,
    isFetching: equipmentNomenclatureListIsFetching,
  } = useGetEquipmentNomenclatureList(getEquipmentNomenclatureListParams)

  const handleTablePagination = useCallback(
    (pagination: Parameters<EquipmentNomenclatureTableProps['onChange']>[0]) => {
      setGetEquipmentNomenclatureListParams(calculatePaginationParams(pagination))
    },
    [setGetEquipmentNomenclatureListParams],
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
        dataSource={equipmentNomenclatureList?.results || []}
        pagination={equipmentNomenclatureList?.pagination || false}
        loading={equipmentNomenclatureListIsFetching}
        onChange={handleChangeTable}
      />
    </div>
  )
}

export default EquipmentNomenclatureListPage
