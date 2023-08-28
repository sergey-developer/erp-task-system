import { useSetState } from 'ahooks'
import { FC, useCallback, useEffect } from 'react'

import { useEquipmentNomenclatureContext } from 'modules/warehouse/components/EquipmentNomenclatureLayout/context'
import EquipmentNomenclatureTable from 'modules/warehouse/components/EquipmentNomenclatureTable'
import { EquipmentNomenclatureTableProps } from 'modules/warehouse/components/EquipmentNomenclatureTable/types'
import { useGetEquipmentNomenclatureList } from 'modules/warehouse/hooks'
import { GetEquipmentNomenclatureListQueryArgs } from 'modules/warehouse/models'

import {
  calculatePaginationParams,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const initialPaginationParams = getInitialPaginationParams()

const EquipmentNomenclatureListPage: FC = () => {
  const { search } = useEquipmentNomenclatureContext()

  const [
    getEquipmentNomenclatureListParams,
    setGetEquipmentNomenclatureListParams,
  ] = useSetState<GetEquipmentNomenclatureListQueryArgs>({
    ...initialPaginationParams,
    search,
  })

  useEffect(() => {
    setGetEquipmentNomenclatureListParams((prevState) => {
      if (prevState.search !== search) {
        return {
          ...prevState,
          search: search || undefined,
          offset: initialPaginationParams.offset,
        }
      }

      return prevState
    })
  }, [search, setGetEquipmentNomenclatureListParams])

  const {
    currentData: equipmentNomenclatureList,
    isFetching: equipmentNomenclatureListIsFetching,
  } = useGetEquipmentNomenclatureList(getEquipmentNomenclatureListParams)

  const handleTablePagination = useCallback(
    (
      pagination: Parameters<EquipmentNomenclatureTableProps['onChange']>[0],
    ) => {
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
