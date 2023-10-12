import { useBoolean, useSetState } from 'ahooks'
import debounce from 'lodash/debounce'
import { FC, useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import EquipmentDetails from 'modules/warehouse/components/EquipmentDetails'
import { getHiddenFieldsByCategory } from 'modules/warehouse/components/EquipmentDetails/utils'
import EquipmentFormModal from 'modules/warehouse/components/EquipmentFormModal'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { useEquipmentPageContext } from 'modules/warehouse/components/EquipmentPageLayout/context'
import EquipmentTable from 'modules/warehouse/components/EquipmentTable'
import {
  getSort,
  SortableField,
  sortableFieldToSortValues,
} from 'modules/warehouse/components/EquipmentTable/sort'
import { EquipmentTableProps } from 'modules/warehouse/components/EquipmentTable/types'
import { EquipmentCategoryEnum } from 'modules/warehouse/constants/equipment'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useGetEquipment,
  useGetEquipmentCategoryList,
  useGetEquipmentList,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetWarehouseList } from 'modules/warehouse/hooks/warehouse'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel, GetEquipmentListQueryArgs } from 'modules/warehouse/models'
import { useUpdateEquipmentMutation } from 'modules/warehouse/services/equipmentApi.service'
import { equipmentFilterToParams } from 'modules/warehouse/utils/equipment'

import { DEFAULT_DEBOUNCE_VALUE } from 'shared/constants/common'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

const EquipmentListPage: FC = () => {
  // todo: создать хук который будет возвращать распарсеные значения
  const params = useParams<'id'>()
  const nomenclatureId = Number(params?.id) || undefined

  const context = useEquipmentPageContext()

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<IdType>()
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()

  const [equipmentDetailsOpened, { toggle: toggleOpenEquipmentDetails }] = useBoolean(false)
  const debouncedToggleOpenEquipmentDetails = useDebounceFn(toggleOpenEquipmentDetails)

  const [
    editEquipmentModalOpened,
    { toggle: toggleEditEquipmentModal, setFalse: closeEditEquipmentModal },
  ] = useBoolean(false)

  const debouncedToggleEditEquipmentModal = useDebounceFn(toggleEditEquipmentModal)

  const handleCloseEditEquipmentModal = useCallback(() => {
    closeEditEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
  }, [closeEditEquipmentModal])

  const debouncedHandleCloseEditEquipmentModal = useDebounceFn(handleCloseEditEquipmentModal)

  const [getEquipmentListParams, setGetEquipmentListParams] =
    useSetState<GetEquipmentListQueryArgs>({
      ...getInitialPaginationParams(),
      ...(context.filter && equipmentFilterToParams(context.filter)),
      search: context.search,
      nomenclature: nomenclatureId,
      ordering: 'title',
    })

  const { currentData: equipmentList, isFetching: equipmentListIsFetching } =
    useGetEquipmentList(getEquipmentListParams)

  const { currentData: warehouseList = [], isFetching: warehouseListIsFetching } =
    useGetWarehouseList({ ordering: 'title' }, { skip: !editEquipmentModalOpened })

  const { currentData: equipmentCategoryList = [], isFetching: equipmentCategoryListIsFetching } =
    useGetEquipmentCategoryList(undefined, { skip: !editEquipmentModalOpened })

  const { currentData: currencyList = [], isFetching: currencyListIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !editEquipmentModalOpened },
  )

  const { currentData: workTypeList = [], isFetching: workTypeListIsFetching } = useGetWorkTypeList(
    undefined,
    { skip: !editEquipmentModalOpened },
  )

  const { currentData: nomenclatureList, isFetching: nomenclatureListIsFetching } =
    useGetNomenclatureList(undefined, { skip: !editEquipmentModalOpened })

  const { currentData: equipment, isFetching: equipmentIsFetching } = useGetEquipment(
    { equipmentId: selectedEquipmentId! },
    { skip: !selectedEquipmentId },
  )

  const [getCustomerList, { data: customerList = [], isFetching: customerListIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (
      editEquipmentModalOpened &&
      equipment &&
      equipment.category.code !== EquipmentCategoryEnum.Consumable
    ) {
      getCustomerList()
    }
  }, [editEquipmentModalOpened, equipment, getCustomerList])

  const { currentData: nomenclature } = useGetNomenclature(selectedNomenclatureId!, {
    skip: !selectedNomenclatureId || !editEquipmentModalOpened,
  })

  const [updateEquipmentMutation, { isLoading: updateEquipmentIsLoading }] =
    useUpdateEquipmentMutation()

  useEffect(() => {
    if (equipment?.category && editEquipmentModalOpened) {
      setSelectedCategory(equipment.category)
    }
  }, [editEquipmentModalOpened, equipment?.category])

  useEffect(() => {
    if (equipment?.nomenclature.id && editEquipmentModalOpened) {
      setSelectedNomenclatureId(equipment.nomenclature.id)
    }
  }, [editEquipmentModalOpened, equipment?.nomenclature.id])

  const handleEditEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async (values, setFields) => {
      if (!equipment) return

      try {
        await updateEquipmentMutation({ ...values, equipmentId: equipment.id }).unwrap()
        toggleEditEquipmentModal()
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            setFields(getFieldsErrors(error.data))

            if (error.data.detail) {
              showErrorNotification(error.data.detail)
            }
          } else if (isNotFoundError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          } else if (isForbiddenError(error) && error.data.detail) {
            showErrorNotification(error.data.detail)
          }
        }
      }
    },
    [equipment, toggleEditEquipmentModal, updateEquipmentMutation],
  )

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

        if (columnKey && (columnKey as string) in sortableFieldToSortValues) {
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
      onClick: debounce(() => {
        setSelectedEquipmentId(record.id)
        toggleOpenEquipmentDetails()
      }, DEFAULT_DEBOUNCE_VALUE),
    }),
    [toggleOpenEquipmentDetails],
  )

  const equipmentFormInitialValues: EquipmentFormModalProps['initialValues'] = equipment
    ? {
        nomenclature: equipment.nomenclature.id,
        condition: equipment.condition,
        category: equipment.category.id,
        purpose: equipment.purpose.id,
        isNew: equipment.isNew,
        isWarranty: equipment.isWarranty,
        isRepaired: equipment.isRepaired,
        title: nomenclature?.title,
        warehouse: equipment.warehouse?.id,
        currency: equipment.currency?.id,
        customerInventoryNumber: equipment.customerInventoryNumber || undefined,
        serialNumber: equipment.serialNumber || undefined,
        quantity: equipment.quantity || undefined,
        price: equipment.price || undefined,
        usageCounter: equipment.usageCounter || undefined,
        owner: equipment.owner?.id,
        comment: equipment.comment || undefined,
      }
    : undefined

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

      {equipmentDetailsOpened && (
        <EquipmentDetails
          open={equipmentDetailsOpened}
          title={equipment?.title}
          equipment={equipment}
          equipmentIsLoading={equipmentIsFetching}
          hiddenFields={equipment?.category && getHiddenFieldsByCategory(equipment.category)}
          onClickEdit={debouncedToggleEditEquipmentModal}
          onClose={debouncedToggleOpenEquipmentDetails}
        />
      )}

      {editEquipmentModalOpened && (
        <EquipmentFormModal
          open={editEquipmentModalOpened}
          mode='edit'
          title='Редактирование оборудования'
          okText='Сохранить'
          isLoading={updateEquipmentIsLoading}
          initialValues={equipmentFormInitialValues}
          categoryList={equipmentCategoryList}
          categoryListIsLoading={equipmentCategoryListIsFetching}
          selectedCategory={selectedCategory}
          onChangeCategory={setSelectedCategory}
          warehouseList={warehouseList}
          warehouseListIsLoading={warehouseListIsFetching}
          currencyList={currencyList}
          currencyListIsFetching={currencyListIsFetching}
          ownerList={customerList}
          ownerListIsFetching={customerListIsFetching}
          workTypeList={workTypeList}
          workTypeListIsFetching={workTypeListIsFetching}
          nomenclature={nomenclature}
          nomenclatureList={nomenclatureList?.results || []}
          nomenclatureListIsLoading={nomenclatureListIsFetching}
          onChangeNomenclature={setSelectedNomenclatureId}
          onCancel={debouncedHandleCloseEditEquipmentModal}
          onSubmit={handleEditEquipment}
        />
      )}
    </div>
  )
}

export default EquipmentListPage
