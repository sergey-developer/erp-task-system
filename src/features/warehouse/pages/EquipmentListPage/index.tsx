import { useBoolean, useSetState } from 'ahooks'
import { useEquipmentPageContext } from 'features/warehouse/components/EquipmentPageLayout/context'
import EquipmentTable from 'features/warehouse/components/EquipmentTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'features/warehouse/components/EquipmentTable/sort'
import { EquipmentTableProps } from 'features/warehouse/components/EquipmentTable/types'
import { useGetEquipments } from 'features/warehouse/hooks/equipment'
import { GetEquipmentListQueryArgs } from 'features/warehouse/models'
import { equipmentsFilterToParams } from 'features/warehouse/utils/equipment'
import debounce from 'lodash/debounce'
import isNumber from 'lodash/isNumber'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import ModalFallback from 'components/Modals/ModalFallback'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import {
  calculatePaginationParams,
  extractPaginationParams,
  extractPaginationResults,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

const EquipmentDetails = React.lazy(() => import('features/warehouse/components/EquipmentDetails'))

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

  const [equipmentsParams, setEquipmentListParams] = useSetState<GetEquipmentListQueryArgs>({
    ...initialPaginationParams,
    ...(context?.filter && equipmentsFilterToParams(context.filter)),
    search: context?.search,
    nomenclature: nomenclatureId,
    ordering: 'title',
  })

  const { currentData: equipments, isFetching: equipmentsIsFetching } =
    useGetEquipments(equipmentsParams)

  useEffect(() => {
    if (isNumber(equipmentsParams.nomenclature)) {
      context?.setEquipmentsXlsxParams({ nomenclature: equipmentsParams.nomenclature })
    }

    return () => {
      context?.setEquipmentsXlsxParams({ nomenclature: undefined })
    }
  }, [context?.setEquipmentsXlsxParams, equipmentsParams.nomenclature])

  useEffect(() => {
    if (equipmentsParams.ordering) {
      context?.setEquipmentsXlsxParams({ ordering: equipmentsParams.ordering })
    }

    return () => {
      context?.setEquipmentsXlsxParams({ ordering: undefined })
    }
  }, [context?.setEquipmentsXlsxParams, equipmentsParams.ordering])

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
        dataSource={extractPaginationResults(equipments)}
        pagination={extractPaginationParams(equipments)}
        loading={equipmentsIsFetching}
        sort={equipmentsParams.ordering}
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
