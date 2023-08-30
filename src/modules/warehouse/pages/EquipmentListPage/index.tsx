import { useSetState } from 'ahooks'
import defaultTo from 'lodash/defaultTo'
import { FC, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import Equipment from 'modules/warehouse/components/Equipment'
import { FieldsDependOnCategory } from 'modules/warehouse/components/Equipment/types'
import { useEquipmentPageContext } from 'modules/warehouse/components/EquipmentPageLayout/context'
import EquipmentTable from 'modules/warehouse/components/EquipmentTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/EquipmentTable/sort'
import { EquipmentTableProps } from 'modules/warehouse/components/EquipmentTable/types'
import { useGetEquipmentList } from 'modules/warehouse/hooks'
import { EquipmentModel, GetEquipmentListQueryArgs } from 'modules/warehouse/models'
import { equipmentFilterToParams } from 'modules/warehouse/utils'

import { useDebounceFn } from 'shared/hooks'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

import { EquipmentConditionEnum } from '../../constants'

const fieldsByCategory: Record<string, FieldsDependOnCategory[]> = {
  CONSUMABLE: [
    'customerInventoryNumber',
    'inventoryNumber',
    'isNew',
    'isWarranty',
    'isRepaired',
    'usageCounter',
    'owner',
  ],
}

const fakeEquipment: EquipmentModel = {
  id: 1,
  title: 'title 1',
  quantity: 1234,
  condition: EquipmentConditionEnum.Working,
  category: {
    id: 1,
    title: 'category',
    code: 'CONSUMABLE',
  },
  purpose: {
    id: 1,
    title: 'purpose',
  },
  warehouse: {
    id: 1,
    title: 'warehouse',
  },
  currency: {
    id: 1,
    title: 'руб',
  },
  measurementUnit: {
    id: 1,
    title: 'шт',
  },
  createdBy: {
    id: 1,
    fullName: 'user name',
  },
  createdAt: new Date().toISOString(),
  nomenclature: {
    id: 1,
    title: 'nomenclature',
    equipmentHasSerialNumber: true,
  },
  isNew: true,
  isRepaired: true,
  isWarranty: true,
  owner: {
    id: 1,
    title: 'owner',
  },
  usageCounter: null,
  customerInventoryNumber: null,
  comment: null,
  price: null,
  serialNumber: null,
  inventoryNumber: null,
}

const EquipmentListPage: FC = () => {
  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const nomenclatureId = defaultTo(Number(params?.id), undefined)

  const context = useEquipmentPageContext()

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number>()
  const debouncedSetSelectedEquipmentId = useDebounceFn(setSelectedEquipmentId)

  const [getEquipmentListParams, setGetEquipmentListParams] =
    useSetState<GetEquipmentListQueryArgs>({
      ...getInitialPaginationParams(),
      ...(context.filter && equipmentFilterToParams(context.filter)),
      search: context.search,
      nomenclatureId,
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

        if (columnKey && columnKey in sortableFieldToSortValues) {
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
      onClick: () => debouncedSetSelectedEquipmentId(record.id),
    }),
    [debouncedSetSelectedEquipmentId],
  )

  const isShowEquipment = Boolean(selectedEquipmentId)

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
          visible={isShowEquipment}
          title={fakeEquipment.title}
          equipment={fakeEquipment}
          displayableFields={
            fakeEquipment.category.code ? fieldsByCategory[fakeEquipment.category.code] : []
          }
          onClose={() => debouncedSetSelectedEquipmentId(undefined)}
        />
      )}
    </div>
  )
}

export default EquipmentListPage
