import { useSetState } from 'ahooks'
import { TablePaginationConfig } from 'antd'
import { GetComponentProps } from 'rc-table/es/interface'
import { FC, useCallback, useState } from 'react'

import Equipment from 'modules/warehouse/components/Equipment'
import { FieldsDependOnCategory } from 'modules/warehouse/components/Equipment/types'
import EquipmentTable from 'modules/warehouse/components/EquipmentTable'
import {
  EquipmentTableItem,
  EquipmentTableProps,
} from 'modules/warehouse/components/EquipmentTable/types'
import { useGetEquipmentList } from 'modules/warehouse/hooks'
import {
  EquipmentModel,
  GetEquipmentListQueryArgs,
} from 'modules/warehouse/models'

import { useDebounceFn } from 'shared/hooks'
import { calculatePaginationParams } from 'shared/utils/pagination'

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
    title: 'owner'
  },
  usageCounter: null,
  customerInventoryNumber: null,
  comment: null,
  price: null,
  serialNumber: null,
  inventoryNumber: null,
}

const EquipmentListPage: FC = () => {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number>()
  const debouncedSetSelectedEquipmentId = useDebounceFn(setSelectedEquipmentId)
  const isShowEquipment = Boolean(selectedEquipmentId)

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

  const handleTableRowClick: GetComponentProps<EquipmentTableItem> =
    useCallback(
      (record: EquipmentTableItem) => ({
        onClick: () => debouncedSetSelectedEquipmentId(record.id),
      }),
      [debouncedSetSelectedEquipmentId],
    )

  return (
    <div data-testid='equipment-list-page'>
      <EquipmentTable
        dataSource={[
          {
            id: 1,
            title: 'title 1',
            quantity: 1234,
            condition: EquipmentConditionEnum.Working,
            category: {
              id: 1,
              title: 'category',
            },
            purpose: {
              id: 1,
              title: 'purpose',
            },
            warehouse: null,
            serialNumber: null,
            inventoryNumber: null,
          },
        ]}
        pagination={equipmentList?.pagination || false}
        loading={equipmentListIsFetching}
        onChange={handleChangeTable}
        onRow={handleTableRowClick}
      />

      {isShowEquipment && (
        <Equipment
          visible={isShowEquipment}
          title={fakeEquipment.title}
          equipment={fakeEquipment}
          displayableFields={fieldsByCategory[fakeEquipment.category.code]}
          onClose={() => debouncedSetSelectedEquipmentId(undefined)}
        />
      )}
    </div>
  )
}

export default EquipmentListPage
