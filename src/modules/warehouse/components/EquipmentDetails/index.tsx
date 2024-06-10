import { useBoolean } from 'ahooks'
import { Button, Col, Drawer, Image, Row, Typography, UploadProps } from 'antd'
import debounce from 'lodash/debounce'
import defaultTo from 'lodash/defaultTo'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import AttachmentImages from 'modules/attachment/components/AttachmentImages'
import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { attachmentsToFiles } from 'modules/attachment/utils'
import { UserPermissionsEnum } from 'modules/user/constants'
import { useMatchUserPermissions } from 'modules/user/hooks'
import { EquipmentFormModalProps } from 'modules/warehouse/components/EquipmentFormModal/types'
import { EquipmentRelocationHistoryModalProps } from 'modules/warehouse/components/EquipmentRelocationHistoryModal/types'
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

import { DEFAULT_DEBOUNCE_VALUE, SAVE_TEXT } from 'shared/constants/common'
import { DATE_FORMAT } from 'shared/constants/dateTime'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse } from 'shared/services/baseApi'
import { IdType } from 'shared/types/common'
import { getYesNoWord, printImage, valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

import { EquipmentDetailsProps, FieldsMaybeHidden } from './types'
import { getEquipmentFormInitialValues, getHiddenFieldsByCategory } from './utils'

const AttachmentListModal = React.lazy(
  () => import('modules/attachment/components/AttachmentListModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentFormModal'),
)

const EquipmentRelocationHistoryModal = React.lazy(
  () => import('modules/warehouse/components/EquipmentRelocationHistoryModal'),
)

const RelocationTaskDetails = React.lazy(
  () => import('modules/warehouse/components/RelocationTaskDetails'),
)

const { Text } = Typography

const EquipmentDetails: FC<EquipmentDetailsProps> = ({ equipmentId, ...props }) => {
  const permissions = useMatchUserPermissions([
    UserPermissionsEnum.EquipmentsRead,
    UserPermissionsEnum.RelocationTasksRead,
  ])

  const [selectedNomenclatureId, setSelectedNomenclatureId] = useState<IdType>()
  const [
    userChangedNomenclature,
    { setTrue: setUserChangedNomenclature, setFalse: resetUserChangedNomenclature },
  ] = useBoolean(false)

  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategoryListItemModel>()
  const categoryIsConsumable = checkEquipmentCategoryIsConsumable(selectedCategory?.code)

  const [relocationHistoryModalOpened, { toggle: toggleOpenRelocationHistoryModal }] =
    useBoolean(false)

  const onToggleOpenRelocationHistoryModal = useDebounceFn(toggleOpenRelocationHistoryModal)

  const [relocationTaskId, setRelocationTaskId] = useState<IdType>()
  const [relocationTaskOpened, { setTrue: openRelocationTask, setFalse: closeRelocationTask }] =
    useBoolean(false)

  const onOpenRelocationTask = useCallback(
    (id: IdType) => {
      openRelocationTask()
      setRelocationTaskId(id)
    },
    [openRelocationTask],
  )

  const onCloseRelocationTask = useDebounceFn(() => {
    closeRelocationTask()
    setRelocationTaskId(undefined)
  })

  const [
    editEquipmentModalOpened,
    { setTrue: openEditEquipmentModal, setFalse: closeEditEquipmentModal },
  ] = useBoolean(false)

  const onOpenEditEquipmentModal = useDebounceFn(openEditEquipmentModal)

  const onCloseEditEquipmentModal = useDebounceFn(() => {
    closeEditEquipmentModal()
    setSelectedNomenclatureId(undefined)
    resetUserChangedNomenclature()
    setSelectedCategory(undefined)
  }, [closeEditEquipmentModal])

  const [imageListModalOpened, { toggle: toggleOpenImageListModal }] = useBoolean(false)
  const onToggleOpenImageListModal = useDebounceFn(toggleOpenImageListModal)

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

  const { currentData: nomenclature, isFetching: nomenclatureIsFetching } = useGetNomenclature(
    selectedNomenclatureId!,
    {
      skip: !selectedNomenclatureId || !editEquipmentModalOpened,
    },
  )

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
    {
      skip:
        !equipmentAttachmentList?.pagination?.total ||
        (!imageListModalOpened && !editEquipmentModalOpened),
    },
  )

  const [updateEquipmentMutation, { isLoading: updateEquipmentIsLoading }] = useUpdateEquipment()

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

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

  const onChangeCategory = useCallback<EquipmentFormModalProps['onChangeCategory']>(
    (category) => {
      setSelectedCategory(category)
      setSelectedNomenclatureId(undefined)
      resetUserChangedNomenclature()
    },
    [resetUserChangedNomenclature],
  )

  const onChangeNomenclature = useCallback<EquipmentFormModalProps['onChangeNomenclature']>(
    (id) => {
      setSelectedNomenclatureId(id)
      setUserChangedNomenclature()
    },
    [setUserChangedNomenclature],
  )

  const createEquipmentImage = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ type: AttachmentTypeEnum.EquipmentImage }, options)
    },
    [createAttachment],
  )

  const onEditEquipment: EquipmentFormModalProps['onSubmit'] = useCallback(
    async ({ images, ...values }, setFields) => {
      try {
        await updateEquipmentMutation({
          ...values,
          images: images?.length ? extractIdsFromFilesResponse(images) : undefined,
          equipmentId,
        }).unwrap()

        onCloseEditEquipmentModal()
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
      onCloseEditEquipmentModal,
      refetchEquipmentAttachmentList,
    ],
  )

  const onClickEquipmentRelocationHistoryRow = useCallback<
    EquipmentRelocationHistoryModalProps['onRow']
  >(
    (record) => ({
      onClick: debounce(() => onOpenRelocationTask(record.id), DEFAULT_DEBOUNCE_VALUE),
    }),
    [onOpenRelocationTask],
  )

  const hiddenFields: FieldsMaybeHidden[] = equipment?.category
    ? getHiddenFieldsByCategory(equipment.category)
    : []

  const equipmentFormValues = useMemo(
    () => ({
      title: userChangedNomenclature ? nomenclature?.title : equipment?.title,
      images:
        editEquipmentModalOpened && totalEquipmentAttachmentList?.results.length
          ? attachmentsToFiles(totalEquipmentAttachmentList.results)
          : undefined,
    }),
    [
      editEquipmentModalOpened,
      equipment?.title,
      nomenclature?.title,
      totalEquipmentAttachmentList?.results,
      userChangedNomenclature,
    ],
  )

  return (
    <>
      <Drawer
        {...props}
        data-testid='equipment-details'
        width={500}
        title={
          equipment && (
            <Row justify='space-between'>
              <Col>{equipment.title}</Col>

              <Col>
                <EditIcon $size='large' onClick={onOpenEditEquipmentModal} />
              </Col>
            </Row>
          )
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

              <Row data-testid='location'>
                <Col span={8}>
                  <Text type='secondary'>Местонахождение:</Text>
                </Col>

                <Col span={16}>{valueOrHyphen(equipment.location?.title)}</Col>
              </Row>

              <Row data-testid='relocation-history'>
                <Col>
                  <Button
                    disabled={!permissions.equipmentsRead || !permissions.relocationTasksRead}
                    onClick={onToggleOpenRelocationHistoryModal}
                  >
                    История перемещений
                  </Button>
                </Col>
              </Row>

              <Row data-testid='is-credited'>
                <Col span={8}>
                  <Text type='secondary'>Оприходовано:</Text>
                </Col>

                <Col span={16}>{getYesNoWord(equipment.isCredited)}</Col>
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

                  <Col span={16}>{defaultTo(equipment.owner?.title, 'Obermeister')}</Col>
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
                    data-testid='equipment-images-loading'
                    isLoading={equipmentAttachmentListIsFetching}
                    tip='Загрузка изображений...'
                  >
                    <Space $block direction='vertical'>
                      <AttachmentImages
                        data-testid='equipment-images'
                        data={extractPaginationResults(equipmentAttachmentList)}
                      />

                      <Button
                        onClick={onToggleOpenImageListModal}
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
              open
              onCancel={onCloseEditEquipmentModal}
              tip='Загрузка данных для формы оборудования'
            />
          }
        >
          <EquipmentFormModal
            open={editEquipmentModalOpened}
            mode='edit'
            title='Редактирование оборудования'
            okText={SAVE_TEXT}
            isLoading={updateEquipmentIsLoading}
            initialValues={getEquipmentFormInitialValues(equipment)}
            values={equipmentFormValues}
            categories={equipmentCategoryList}
            categoriesIsLoading={equipmentCategoryListIsFetching}
            category={selectedCategory}
            onChangeCategory={onChangeCategory}
            warehouses={warehouseList}
            warehousesIsLoading={warehouseListIsFetching}
            currencies={currencyList}
            currenciesIsLoading={currencyListIsFetching}
            owners={customerList}
            ownersIsLoading={customerListIsFetching}
            workTypes={workTypeList}
            workTypesIsLoading={workTypeListIsFetching}
            nomenclature={nomenclature}
            nomenclatureIsLoading={nomenclatureIsFetching}
            nomenclatures={extractPaginationResults(nomenclatureList)}
            nomenclaturesIsLoading={nomenclatureListIsFetching}
            onChangeNomenclature={onChangeNomenclature}
            onCancel={onCloseEditEquipmentModal}
            onSubmit={onEditEquipment}
            onUploadImage={createEquipmentImage}
            imageIsUploading={createAttachmentIsLoading}
            onDeleteImage={deleteAttachment}
            imageIsDeleting={deleteAttachmentIsLoading}
          />
        </React.Suspense>
      )}

      {relocationHistoryModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={onToggleOpenRelocationHistoryModal}
              tip='Загрузка данных для истории перемещений'
            />
          }
        >
          <EquipmentRelocationHistoryModal
            open={relocationHistoryModalOpened}
            onCancel={onToggleOpenRelocationHistoryModal}
            dataSource={relocationHistory}
            loading={relocationHistoryIsFetching}
            onRow={onClickEquipmentRelocationHistoryRow}
          />
        </React.Suspense>
      )}

      {relocationTaskOpened && relocationTaskId && (
        <React.Suspense
          fallback={<ModalFallback open tip='Загрузка карточки заявки на перемещение' />}
        >
          <RelocationTaskDetails
            open={relocationTaskOpened}
            onClose={onCloseRelocationTask}
            relocationTaskId={relocationTaskId}
          />
        </React.Suspense>
      )}

      {imageListModalOpened && !totalEquipmentAttachmentListIsFetching && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={onToggleOpenImageListModal}
              tip='Загрузка данных для изображений оборудования'
            />
          }
        >
          <AttachmentListModal
            open={imageListModalOpened}
            title='Изображения оборудования'
            data={extractPaginationResults(totalEquipmentAttachmentList)}
            onCancel={onToggleOpenImageListModal}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EquipmentDetails
