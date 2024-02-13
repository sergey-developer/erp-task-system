import { useBoolean, useSetState } from 'ahooks'
import debounce from 'lodash/debounce'
import isNumber from 'lodash/isNumber'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

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
import { equipmentsFilterToParams } from 'modules/warehouse/utils/equipment'

import ModalFallback from 'components/Modals/ModalFallback'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import {
  calculatePaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const EquipmentDetails = React.lazy(() => import('modules/warehouse/components/EquipmentDetails'))

const initialPaginationParams = getInitialPaginationParams()

const EquipmentListPage: FC = () => {
  const [searchParams] = useSearchParams()
  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const nomenclatureId = Number(params?.id) || undefined
  const viewEquipmentId = Number(searchParams.get('viewEquipmentId')) || undefined

  const context = useEquipmentPageContext()

  const [selectedEquipmentId, setSelectedEquipmentId] =
    useState<MaybeUndefined<IdType>>(viewEquipmentId)

  const [equipmentDetailsOpened, { toggle: toggleOpenEquipmentDetails }] = useBoolean(
    !!selectedEquipmentId,
  )
  const debouncedToggleOpenEquipmentDetails = useDebounceFn(toggleOpenEquipmentDetails)

  const [equipmentListParams, setEquipmentListParams] = useSetState<GetEquipmentListQueryArgs>({
    ...initialPaginationParams,
    ...(context?.filter && equipmentsFilterToParams(context.filter)),
    search: context?.search,
    nomenclature: nomenclatureId,
    ordering: 'title',
  })

  const { currentData: equipmentList, isFetching: equipmentListIsFetching } =
    useGetEquipmentList(equipmentListParams)

  useEffect(() => {
    if (isNumber(equipmentListParams.nomenclature)) {
      context?.setEquipmentsXlsxParams({ nomenclature: equipmentListParams.nomenclature })
    }

    return () => {
      context?.setEquipmentsXlsxParams({ nomenclature: undefined })
    }
  }, [context?.setEquipmentsXlsxParams, equipmentListParams.nomenclature])

  useEffect(() => {
    if (equipmentListParams.ordering) {
      context?.setEquipmentsXlsxParams({ ordering: equipmentListParams.ordering })
    }

    return () => {
      context?.setEquipmentsXlsxParams({ ordering: undefined })
    }
  }, [context?.setEquipmentsXlsxParams, equipmentListParams.ordering])

  const handleTablePagination = useCallback(
    (pagination: Parameters<EquipmentTableProps['onChange']>[0]) => {
      setEquipmentListParams(calculatePaginationParams(pagination))
    },
    [setEquipmentListParams],
  )

  const handleTableSort = useCallback(
    (sorter: Parameters<EquipmentTableProps['onChange']>[2]) => {
      if (sorter) {
        const { columnKey, order } = Array.isArray(sorter) ? sorter[0] : sorter

        if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
          const ordering = order ? getSort(columnKey as SortableField, order) : undefined
          setEquipmentListParams({ ordering })
        }
      }
    },
    [setEquipmentListParams],
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
        sort={equipmentListParams.ordering}
        onChange={handleChangeTable}
        onRow={handleTableRowClick}
      />

      {equipmentDetailsOpened && selectedEquipmentId && (
        <React.Suspense fallback={<ModalFallback open tip='Загрузка данных для оборудования' />}>
          <EquipmentDetails
            open={equipmentDetailsOpened}
            onClose={debouncedToggleOpenEquipmentDetails}
            equipmentId={selectedEquipmentId}
          />
        </React.Suspense>
      )}
    </div>
  )
}

export default EquipmentListPage
