import { useBoolean } from 'ahooks'
import { Button, Col, Drawer, Image, Row, Typography } from 'antd'
import { RcFile } from 'antd/es/upload'
import React, { FC, useCallback, useEffect, useState } from 'react'

import { useMatchUserPermissions } from 'modules/user/hooks'
import AttachmentList from 'modules/attachment/components/AttachmentList'
import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { equipmentConditionDict } from 'modules/warehouse/constants/equipment'
import { defaultGetNomenclatureListParams } from 'modules/warehouse/constants/nomenclature'
import { RelocationTaskStatusEnum } from 'modules/warehouse/constants/relocationTask'
import { useLazyGetCustomerList } from 'modules/warehouse/hooks/customer'
import {
  useGetEquipment,
  useGetEquipmentAttachmentList,
  useGetEquipmentCategoryList,
  useGetEquipmentRelocationHistory,
  useUpdateEquipment,
} from 'modules/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatureList } from 'modules/warehouse/hooks/nomenclature'
import { useGetWarehouseList } from 'modules/warehouse/hooks/warehouse'
import { useGetWorkTypeList } from 'modules/warehouse/hooks/workType'
import { EquipmentCategoryListItemModel } from 'modules/warehouse/models'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'

import { EditIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { getErrorDetailStr, isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { getYesNoWord, printImage, valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

import { EquipmentFormModalProps } from '../EquipmentFormModal/types'
import { DrawerExtraStyled } from './style'
import { EquipmentDetailsProps, FieldsMaybeHidden } from './types'
import { getEquipmentFormInitialValues, getHiddenFieldsByCategory } from './utils'

const AttachmentListModal = React.lazy(
  () => import('modules/attachment/components/AttachmentListModal'),
)

const EquipmentFormModal = React.lazy(() => import('../EquipmentFormModal'))

const EquipmentRelocationHistoryModal = React.lazy(
  () => import('../EquipmentRelocationHistoryModal'),
)

const { Text } = Typography

const EquipmentDetails: FC<EquipmentDetailsProps> = ({ equipmentId, ...props }) => {
  const userPermissions = useMatchUserPermissions(['EQUIPMENTS_READ', 'RELOCATION_TASKS_READ'])

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  const [relocationHistoryModalOpened, { toggle: toggleOpenRelocationHistoryModal }] =
    useBoolean(false)

  const debouncedToggleOpenRelocationHistoryModal = useDebounceFn(toggleOpenRelocationHistoryModal)

  const [
    editEquipmentModalOpened,
    { setTrue: openEditEquipmentModal, setFalse: closeEditEquipmentModal },
  ] = useBoolean(false)

  const debouncedOpenEditEquipmentModal = useDebounceFn(openEditEquipmentModal)

  const handleCloseEditEquipmentModal = useDebounceFn(() => {
    closeEditEquipmentModal()
    setSelectedNomenclatureId(undefined)
    setSelectedCategory(undefined)
  }, [closeEditEquipmentModal])

  const [imageListModalOpened, { toggle: toggleOpenImageListModal }] = useBoolean(false)
  const debouncedToggleOpenImageListModal = useDebounceFn(toggleOpenImageListModal)

  const { currentData: equipment, isFetching: equipmentIsFetching } = useGetEquipment({
    equipmentId,
  })

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
    useGetNomenclatureList(
      categoryIsConsumable
        ? { ...defaultGetNomenclatureListParams, equipmentHasSerialNumber: false }
        : defaultGetNomenclatureListParams,
      { skip: !editEquipmentModalOpened || !selectedCategory },
    )

  const { currentData: nomenclature } = useGetNomenclature(selectedNomenclatureId!, {
    skip: !selectedNomenclatureId || !editEquipmentModalOpened,
  })

  const {
    currentData: equipmentAttachmentList,
    isFetching: equipmentAttachmentListIsFetching,
    refetch: refetchEquipmentAttachmentList,
  } = useGetEquipmentAttachmentList({ equipmentId, limit: 4 })

  const {
    currentData: totalEquipmentAttachmentList,
    isFetching: totalEquipmentAttachmentListIsFetching,
  } = useGetEquipmentAttachmentList(
    { equipmentId, limit: equipmentAttachmentList?.pagination?.total! },
    { skip: !imageListModalOpened || !equipmentAttachmentList?.pagination?.total },
  )

  const [updateEquipmentMutation, { isLoading: updateEquipmentIsLoading }] = useUpdateEquipment()

  const [createAttachmentMutation] = useCreateAttachment()
  const [deleteAttachmentMutation, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

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

  const [getCustomerList, { data: customerList = [], isFetching: customerListIsFetching }] =
    useLazyGetCustomerList()

  useEffect(() => {
    if (
      editEquipmentModalOpened &&
      !!selectedCategory &&
      !categoryIsConsumable &&
      !!selectedNomenclatureId
    ) {
      getCustomerList()
    }
  }, [
    editEquipmentModalOpened,
    categoryIsConsumable,
    getCustomerList,
    selectedCategory,
    selectedNomenclatureId,
  ])

  const { currentData: relocationHistory = [], isFetching: relocationHistoryIsFetching } =
    useGetEquipmentRelocationHistory(
      {
        equipmentId,
        statuses: [
          RelocationTaskStatusEnum.New,
          RelocationTaskStatusEnum.Completed,
          RelocationTaskStatusEnum.Returned,
          RelocationTaskStatusEnum.Closed,
        ],
      },
      { skip: !relocationHistoryModalOpened },
    )

  const handleChangeCategory: EquipmentFormModalProps['onChangeCategory'] = (category) => {
    setSelectedCategory(category)
    setSelectedNomenclatureId(undefined)
  }

  const handleCreateAttachment = useCallback<EquipmentFormModalProps['onUploadImage']>(
    async ({ file, onSuccess, onError }) => {
      try {
        const createdAttachment = await createAttachmentMutation({
          file: file as RcFile,
          type: AttachmentTypeEnum.EquipmentImage,
        }).unwrap()

        onSuccess && onSuccess({ id: createdAttachment.id })
      } catch (error) {
        if (isErrorResponse(error)) {
          if (isBadRequestError(error)) {
            onError && onError({ name: '', message: getErrorDetailStr(error) || '' })
          }
        }
      }
    },
    [createAttachmentMutation],
  )

  const handleDeleteAttachment: EquipmentFormModalProps['onDeleteImage'] = useCallback(
    async (file) => {
      /* поле response это то что передаётся в колбэк onSuccess при создании */
      await deleteAttachmentMutation({ attachmentId: file.response.id }).unwrap()
    },
    [deleteAttachmentMutation],
  )

  const handleEditEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      try {
        await updateEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          equipmentId,
        }).unwrap()

        handleCloseEditEquipmentModal()
        refetchEquipmentAttachmentList()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }
      }
    },
    [
      updateEquipmentMutation,
      equipmentId,
      handleCloseEditEquipmentModal,
      refetchEquipmentAttachmentList,
    ],
  )

  const hiddenFields: FieldsMaybeHidden[] = equipment?.category
    ? getHiddenFieldsByCategory(equipment.category)
    : []

  return (
    <>
      <Drawer
        {...props}
        data-testid='equipment-details'
        title={equipment?.title}
        width={500}
        extra={
          <DrawerExtraStyled>
            <EditIcon $size='large' onClick={debouncedOpenEditEquipmentModal} />
          </DrawerExtraStyled>
        }
      >
        <LoadingArea data-testid='equipment-details-loading' isLoading={equipmentIsFetching}>
          {equipment && (
            <Space $block direction='vertical' size='middle'>
              <Row data-testid='title'>
                <Col span={8}>
                  <Text type='secondary'>Наименование:</Text>
                </Col>

                <Col span={16}>{equipment.title}</Col>
              </Row>

              <Row data-testid='category'>
                <Col span={8}>
                  <Text type='secondary'>Категория:</Text>
                </Col>

                <Col span={16}>{equipment.category.title}</Col>
              </Row>

              <Row data-testid='nomenclature'>
                <Col span={8}>
                  <Text type='secondary'>Номенклатура:</Text>
                </Col>

                <Col span={16}>{equipment.nomenclature.title}</Col>
              </Row>

              {!hiddenFields.includes('customerInventoryNumber') && (
                <Row data-testid='customer-inventory-number'>
                  <Col span={8}>
                    <Text type='secondary'>Инвентарный номер заказчика:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.customerInventoryNumber)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('inventoryNumber') && (
                <Row data-testid='inventory-number'>
                  <Col span={8}>
                    <Text type='secondary'>Инвентарный номер:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.inventoryNumber)}</Col>
                </Row>
              )}

              {equipment.nomenclature.equipmentHasSerialNumber && (
                <Row data-testid='serial-number'>
                  <Col span={8}>
                    <Text type='secondary'>Серийный номер:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.serialNumber)}</Col>
                </Row>
              )}

              <Row data-testid='warehouse'>
                <Col span={8}>
                  <Text type='secondary'>Склад:</Text>
                </Col>

                <Col span={16}>{valueOrHyphen(equipment.warehouse?.title)}</Col>
              </Row>

              <Row data-testid='relocation-history'>
                <Col>
                  <Button
                    disabled={
                      !userPermissions?.equipmentsRead || !userPermissions?.relocationTasksRead
                    }
                    onClick={debouncedToggleOpenRelocationHistoryModal}
                  >
                    История перемещений
                  </Button>
                </Col>
              </Row>

              <Row data-testid='condition'>
                <Col span={8}>
                  <Text type='secondary'>Состояние:</Text>
                </Col>

                <Col span={16}>{equipmentConditionDict[equipment.condition]}</Col>
              </Row>

              <Row data-testid='created-at'>
                <Col span={8}>
                  <Text type='secondary'>Дата оприходования:</Text>
                </Col>

                <Col span={16}>{formatDate(equipment.createdAt, DATE_FORMAT)}</Col>
              </Row>

              <Row data-testid='created-by'>
                <Col span={8}>
                  <Text type='secondary'>Кем оприходовано:</Text>
                </Col>

                <Col span={16}>{equipment.createdBy.fullName}</Col>
              </Row>

              <Row data-testid='quantity'>
                <Col span={8}>
                  <Text type='secondary'>Количество:</Text>
                </Col>

                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={6}>{valueOrHyphen(equipment.quantity)}</Col>

                    <Col span={18}>
                      <Row>
                        <Col span={6}>
                          <Text type='secondary'>Ед. изм:</Text>
                        </Col>

                        <Col span={18}>
                          <Text>{equipment.measurementUnit.title}</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row data-testid='price'>
                <Col span={8}>
                  <Text type='secondary'>Стоимость:</Text>
                </Col>

                <Col span={16}>
                  <Row gutter={16}>
                    <Col span={6}>{valueOrHyphen(equipment.price)}</Col>

                    <Col span={18}>
                      <Row>
                        <Col span={6}>
                          <Text type='secondary'>Валюта:</Text>
                        </Col>

                        <Col span={18}>
                          <Text>{valueOrHyphen(equipment.currency?.title)}</Text>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {!hiddenFields.includes('isNew') && (
                <Row data-testid='is-new'>
                  <Col span={8}>
                    <Text type='secondary'>Новое:</Text>
                  </Col>

                  <Col span={16}>{getYesNoWord(equipment.isNew)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('isWarranty') && (
                <Row data-testid='is-warranty'>
                  <Col span={8}>
                    <Text type='secondary'>На гарантии:</Text>
                  </Col>

                  <Col span={16}>{getYesNoWord(equipment.isWarranty)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('isRepaired') && (
                <Row data-testid='is-repaired'>
                  <Col span={8}>
                    <Text type='secondary'>Отремонтированное:</Text>
                  </Col>

                  <Col span={16}>{getYesNoWord(equipment.isRepaired)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('usageCounter') && (
                <Row data-testid='usage-counter'>
                  <Col span={8}>
                    <Text type='secondary'>Счётчик пробега текущий:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.usageCounter)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('owner') && (
                <Row data-testid='owner'>
                  <Col span={8}>
                    <Text type='secondary'>Владелец оборудования:</Text>
                  </Col>

                  <Col span={16}>{valueOrHyphen(equipment.owner?.title)}</Col>
                </Row>
              )}

              <Row data-testid='purpose'>
                <Col span={8}>
                  <Text type='secondary'>Назначение оборудования:</Text>
                </Col>

                <Col span={16}>{equipment.purpose.title}</Col>
              </Row>

              <Row data-testid='comment'>
                <Col span={8}>
                  <Text type='secondary'>Комментарий:</Text>
                </Col>

                <Col span={16}>{valueOrHyphen(equipment.comment)}</Col>
              </Row>

              <Row data-testid='images' gutter={[8, 8]}>
                <Col span={24}>
                  <Text type='secondary'>Изображения оборудования:</Text>
                </Col>

                <Col span={24}>
                  <LoadingArea
                    data-testid='equipment-image-list-loading'
                    isLoading={equipmentAttachmentListIsFetching}
                    tip='Загрузка изображений...'
                  >
                    <Space $block direction='vertical'>
                      <AttachmentList
                        data-testid='equipment-image-list'
                        data={equipmentAttachmentList?.results || []}
                      />

                      <Button
                        onClick={debouncedToggleOpenImageListModal}
                        loading={totalEquipmentAttachmentListIsFetching}
                      >
                        Просмотреть все фото ({equipmentAttachmentList?.pagination?.total})
                      </Button>
                    </Space>
                  </LoadingArea>
                </Col>
              </Row>

              {equipment.qrCode && (
                <Row data-testid='qr-code' gutter={[8, 8]}>
                  <Col span={24}>
                    <Text type='secondary'>QR-код:</Text>
                  </Col>

                  <Col span={24}>
                    <Space size='middle' align='start'>
                      <Image
                        width={135}
                        height={155}
                        src={equipment.qrCode}
                        preview={false}
                        alt='QR-code'
                      />

                      <Button type='link' onClick={() => printImage(equipment.qrCode!)}>
                        Печать
                      </Button>
                    </Space>
                  </Col>
                </Row>
              )}
            </Space>
          )}
        </LoadingArea>
      </Drawer>

      {editEquipmentModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={editEquipmentModalOpened}
              onCancel={handleCloseEditEquipmentModal}
              tip='Загрузка данных для формы оборудования'
            />
          }
        >
          <EquipmentFormModal
            open={editEquipmentModalOpened}
            mode='edit'
            title='Редактирование оборудования'
            okText='Сохранить'
            isLoading={updateEquipmentIsLoading}
            initialValues={getEquipmentFormInitialValues(equipment, nomenclature)}
            categoryList={equipmentCategoryList}
            categoryListIsLoading={equipmentCategoryListIsFetching}
            selectedCategory={selectedCategory}
            onChangeCategory={handleChangeCategory}
            warehouseList={warehouseList}
            warehouseListIsLoading={warehouseListIsFetching}
            currencyList={currencyList}
            currencyListIsFetching={currencyListIsFetching}
            ownerList={customerList}
            ownerListIsFetching={customerListIsFetching}
            workTypeList={workTypeList}
            workTypeListIsFetching={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureList={extractPaginationResults(nomenclatureList)}
            nomenclatureListIsLoading={nomenclatureListIsFetching}
            onChangeNomenclature={setSelectedNomenclatureId}
            onCancel={handleCloseEditEquipmentModal}
            onSubmit={handleEditEquipment}
            onUploadImage={handleCreateAttachment}
            onDeleteImage={handleDeleteAttachment}
            deleteImageIsLoading={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}

      {relocationHistoryModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={relocationHistoryModalOpened}
              onCancel={debouncedToggleOpenRelocationHistoryModal}
              tip='Загрузка данных для истории перемещений'
            />
          }
        >
          <EquipmentRelocationHistoryModal
            open={relocationHistoryModalOpened}
            onCancel={debouncedToggleOpenRelocationHistoryModal}
            dataSource={relocationHistory}
            loading={relocationHistoryIsFetching}
          />
        </React.Suspense>
      )}

      {imageListModalOpened && !totalEquipmentAttachmentListIsFetching && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={imageListModalOpened}
              onCancel={debouncedToggleOpenImageListModal}
              tip='Загрузка данных для изображений оборудования'
            />
          }
        >
          <AttachmentListModal
            open={imageListModalOpened}
            title='Изображения оборудования'
            data={totalEquipmentAttachmentList?.results || []}
            onCancel={debouncedToggleOpenImageListModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EquipmentDetails
