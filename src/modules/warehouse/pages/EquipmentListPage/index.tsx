import { useSetState } from 'ahooks'
import defaultTo from 'lodash/defaultTo'
import { FC, useCallback, useState } from 'react'
import { useParams } from 'react-router-dom'

import Equipment from 'modules/warehouse/components/Equipment'
import { FieldsDependOnCategory } from 'modules/warehouse/components/Equipment/types'
import { useEquipmentNomenclatureContext } from 'modules/warehouse/components/EquipmentNomenclatureLayout/context'
import EquipmentTable from 'modules/warehouse/components/EquipmentTable'
import { EquipmentTableProps } from 'modules/warehouse/components/EquipmentTable/types'
import { useGetEquipmentList } from 'modules/warehouse/hooks'
import {
  EquipmentModel,
  GetEquipmentListQueryArgs,
} from 'modules/warehouse/models'

import { useDebounceFn } from 'shared/hooks'
import {
  calculatePaginationParams,
  getInitialPaginationParams,
} from 'shared/utils/pagination'

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
  const params = useParams<'id'>()
  const nomenclatureId = defaultTo(Number(params?.id), undefined)

  const { search } = useEquipmentNomenclatureContext()

  const [selectedEquipmentId, setSelectedEquipmentId] = useState<number>()
  const debouncedSetSelectedEquipmentId = useDebounceFn(setSelectedEquipmentId)

  const [getEquipmentListParams, setGetEquipmentListParams] =
    useSetState<GetEquipmentListQueryArgs>({
      ...getInitialPaginationParams(),
      search,
      nomenclature: nomenclatureId,
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

  const handleChangeTable = useCallback<EquipmentTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
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
