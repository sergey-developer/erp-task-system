import { useBoolean } from 'ahooks'
import { Button, Col, Drawer, Dropdown, Image, MenuProps, Row, Typography, UploadProps } from 'antd'
import { AttachmentTypeEnum } from 'features/attachments/api/constants'
import AttachmentImages from 'features/attachments/components/AttachmentImages'
import { attachmentsToFiles } from 'features/attachments/helpers'
import { useCreateAttachment, useDeleteAttachment } from 'features/attachments/hooks'
import {
  useGetTechnicalExaminations,
  useLazyGetTechnicalExaminationPdf,
} from 'features/technicalExaminations/hooks'
import { GetTechnicalExaminationPdfTransformedSuccessResponse } from 'features/technicalExaminations/types'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useUserPermissions } from 'features/users/hooks'
import { CreateEquipmentTechnicalExaminationModalProps } from 'features/warehouse/components/CreateEquipmentTechnicalExaminationModal/types'
import { EquipmentFormModalProps } from 'features/warehouse/components/EquipmentFormModal/types'
import { getEquipmentFormInitialValues } from 'features/warehouse/components/EquipmentFormModal/utils'
import { EquipmentRelocationHistoryModalProps } from 'features/warehouse/components/EquipmentRelocationHistoryModal/types'
import {
  equipmentConditionDict,
  EquipmentConditionEnum,
} from 'features/warehouse/constants/equipment'
import { defaultGetNomenclaturesParams } from 'features/warehouse/constants/nomenclature'
import { RelocationTaskStatusEnum } from 'features/warehouse/constants/relocationTask'
import { useLazyGetCustomers } from 'features/warehouse/hooks/customer'
import {
  useCreateEquipmentTechnicalExamination,
  useGetEquipment,
  useGetEquipmentAttachments,
  useGetEquipmentCategories,
  useGetEquipmentRelocationHistory,
  useUpdateEquipment,
} from 'features/warehouse/hooks/equipment'
import { useGetNomenclature, useGetNomenclatures } from 'features/warehouse/hooks/nomenclature'
import { useGetWarehouses } from 'features/warehouse/hooks/warehouse'
import { useGetWorkTypes } from 'features/warehouse/hooks/workType'
import {
  CreateEquipmentTechnicalExaminationSuccessResponse,
  EquipmentCategoryListItemModel,
} from 'features/warehouse/models'
import { checkEquipmentCategoryIsConsumable } from 'features/warehouse/utils/equipment'
import debounce from 'lodash/debounce'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'

import { MenuIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { isBadRequestError, isErrorResponse } from 'shared/api/baseApi'
import { useGetCurrenciesCatalog } from 'shared/catalogs/hooks/currencies'
import { useGetMacroregionsCatalog } from 'shared/catalogs/hooks/macroregions'
import { DEFAULT_DEBOUNCE_VALUE, SAVE_TEXT } from 'shared/constants/common'
import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { IdType } from 'shared/types/common'
import { MaybeUndefined } from 'shared/types/utils'
import { base64ToBytes, getYesNoWord, printImage, valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { extractFileNameFromHeaders } from 'shared/utils/extractFileNameFromHeaders'
import { downloadFile, extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'
import { makeString } from 'shared/utils/string'

import { EquipmentDetailsProps, FieldsMaybeHidden } from './types'
import { getHiddenFieldsByCategory } from './utils'

const AttachmentsModal = React.lazy(
  () => import('features/attachments/components/AttachmentsModal'),
)

const EquipmentFormModal = React.lazy(
  () => import('features/warehouse/components/EquipmentFormModal'),
)

const EquipmentRelocationHistoryModal = React.lazy(
  () => import('features/warehouse/components/EquipmentRelocationHistoryModal'),
)

const RelocationTaskDetails = React.lazy(
  () => import('features/warehouse/components/RelocationTaskDetails'),
)

const TechnicalExaminationsHistoryModal = React.lazy(
  () => import('features/technicalExaminations/components/TechnicalExaminationsHistoryModal'),
)

const CreateEquipmentTechnicalExaminationModal = React.lazy(
  () => import('features/warehouse/components/CreateEquipmentTechnicalExaminationModal'),
)

const { Text } = Typography

const EquipmentDetails: FC<EquipmentDetailsProps> = ({ equipmentId, ...props }) => {
  const permissions = useUserPermissions([
    UserPermissionsEnum.EquipmentsRead,
    UserPermissionsEnum.RelocationTasksRead,
  ])

  const [selectedOwnerId, setSelectedOwnerId] = useState<IdType>()
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<IdType>()

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
    setSelectedOwnerId(undefined)
    setSelectedWarehouseId(undefined)
    resetUserChangedNomenclature()
    setSelectedCategory(undefined)
  }, [closeEditEquipmentModal])

  const [imageListModalOpened, { toggle: toggleOpenImageListModal }] = useBoolean(false)
  const onToggleOpenImageListModal = useDebounceFn(toggleOpenImageListModal)

  const [
    createEquipmentTechnicalExaminationModalOpened,
    {
      setTrue: openCreateEquipmentTechnicalExaminationModal,
      setFalse: closeCreateEquipmentTechnicalExaminationModal,
    },
  ] = useBoolean(false)

  const onOpenCreateEquipmentTechnicalExaminationModal = useDebounceFn(
    openCreateEquipmentTechnicalExaminationModal,
  )

  const onCloseCreateEquipmentTechnicalExaminationModal = () => {
    closeCreateEquipmentTechnicalExaminationModal()
    resetCreatedTechnicalExamination()
  }

  const [
    technicalExaminationsHistoryModalOpened,
    { toggle: toggleTechnicalExaminationsHistoryModal },
  ] = useBoolean(false)

  const onToggleTechnicalExaminationsHistoryModal = useDebounceFn(
    toggleTechnicalExaminationsHistoryModal,
  )

  const { currentData: technicalExaminations = [], isFetching: technicalExaminationsIsFetching } =
    useGetTechnicalExaminations(
      { ordering: '-created_at', equipments: [equipmentId] },
      { skip: !technicalExaminationsHistoryModalOpened },
    )

  const { currentData: equipment, isFetching: equipmentIsFetching } = useGetEquipment({
    equipmentId,
  })

  const { currentData: warehouses = [], isFetching: warehousesIsFetching } = useGetWarehouses(
    { ordering: 'title' },
    { skip: !editEquipmentModalOpened },
  )

  const { currentData: equipmentCategories = [], isFetching: equipmentCategoriesIsFetching } =
    useGetEquipmentCategories(undefined, { skip: !editEquipmentModalOpened })

  const { currentData: currencies = [], isFetching: currenciesIsFetching } =
    useGetCurrenciesCatalog(undefined, { skip: !editEquipmentModalOpened })

  const { currentData: workTypes = [], isFetching: workTypesIsFetching } = useGetWorkTypes(
    undefined,
    { skip: !editEquipmentModalOpened },
  )

  const { currentData: nomenclatures, isFetching: nomenclaturesIsFetching } = useGetNomenclatures(
    categoryIsConsumable
      ? { ...defaultGetNomenclaturesParams, equipmentHasSerialNumber: false }
      : defaultGetNomenclaturesParams,
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
  } = useGetEquipmentAttachments({ equipmentId, limit: 4 })

  const {
    currentData: totalEquipmentAttachmentList,
    isFetching: totalEquipmentAttachmentListIsFetching,
  } = useGetEquipmentAttachments(
    { equipmentId, limit: equipmentAttachmentList?.pagination?.total! },
    {
      skip:
        !equipmentAttachmentList?.pagination?.total ||
        (!imageListModalOpened && !editEquipmentModalOpened),
    },
  )

  const { currentData: macroregions = [], isFetching: macroregionsIsFetching } =
    useGetMacroregionsCatalog(
      {
        ...(!!selectedOwnerId && { customers: [selectedOwnerId] }),
        ...(!!selectedWarehouseId && { warehouses: [selectedWarehouseId] }),
      },
      { skip: !editEquipmentModalOpened || (!selectedOwnerId && !selectedWarehouseId) },
    )

  const [
    getTechnicalExaminationPdf,
    {
      isFetching: getTechnicalExaminationPdfIsFetching,
      isError: isGetTechnicalExaminationPdfError,
    },
  ] = useLazyGetTechnicalExaminationPdf()

  const [
    createTechnicalExaminationMutation,
    {
      isLoading: createTechnicalExaminationIsLoading,
      data: createdTechnicalExamination,
      reset: resetCreatedTechnicalExamination,
    },
  ] = useCreateEquipmentTechnicalExamination()

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

  useEffect(() => {
    if (equipment?.owner?.id && editEquipmentModalOpened) {
      setSelectedOwnerId(equipment.owner.id)
    }
  }, [editEquipmentModalOpened, equipment?.owner?.id])

  useEffect(() => {
    if (equipment?.warehouse?.id && editEquipmentModalOpened) {
      setSelectedWarehouseId(equipment.warehouse.id)
    }
  }, [editEquipmentModalOpened, equipment?.warehouse?.id])

  const [getCustomers, { data: customers = [], isFetching: customersIsFetching }] =
    useLazyGetCustomers()

  useEffect(() => {
    if (
      editEquipmentModalOpened &&
      !!selectedCategory &&
      !categoryIsConsumable &&
      !!selectedNomenclatureId
    ) {
      getCustomers()
    }
  }, [
    editEquipmentModalOpened,
    categoryIsConsumable,
    getCustomers,
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
    async ({ images, ...values }, form) => {
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
          form.setFields(getFieldsErrors(error.data))
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

  const downloadTechnicalExamination = useCallback(
    (response: GetTechnicalExaminationPdfTransformedSuccessResponse) => {
      if (response?.value && response?.meta?.response) {
        const fileName = extractFileNameFromHeaders(response.meta.response.headers)
        downloadFile(base64ToBytes(response.value), MimetypeEnum.Pdf, fileName)
      } else {
        throw new Error(`Response is not correct for downloading: ${JSON.stringify(response)}`)
      }
    },
    [],
  )

  const onGetTechnicalExaminationPdf = async () => {
    if (!createdTechnicalExamination) return

    try {
      const response = await getTechnicalExaminationPdf({
        technicalExaminationId: createdTechnicalExamination.id,
      }).unwrap()

      downloadTechnicalExamination(response)
      onCloseCreateEquipmentTechnicalExaminationModal()
    } catch (error) {
      console.error(error)
    }
  }

  const onCreateTechnicalExamination: CreateEquipmentTechnicalExaminationModalProps['onSubmit'] =
    async (values, setFields) => {
      let createdTechnicalExamination: MaybeUndefined<CreateEquipmentTechnicalExaminationSuccessResponse>

      try {
        createdTechnicalExamination = await createTechnicalExaminationMutation({
          ...values,
          equipment: equipmentId,
        }).unwrap()
      } catch (error) {
        if (isErrorResponse(error) && isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))
        }

        return
      }

      try {
        const response = await getTechnicalExaminationPdf({
          technicalExaminationId: createdTechnicalExamination.id,
        }).unwrap()

        downloadTechnicalExamination(response)
        onCloseCreateEquipmentTechnicalExaminationModal()
      } catch (error) {
        console.error(error)
      }
    }

  const dropdownMenuItems = useMemo<Pick<MenuProps, 'items'>>(
    () => ({
      items: [
        {
          key: 'edit',
          label: 'Редактировать',
          onClick: onOpenEditEquipmentModal,
        },
        {
          key: 'relocationHistory',
          label: 'История перемещений',
          disabled: !permissions.equipmentsRead || !permissions.relocationTasksRead,
          onClick: onToggleOpenRelocationHistoryModal,
        },
        {
          key: 'technicalExaminationsHistory',
          label: 'История АТЭ',
          onClick: onToggleTechnicalExaminationsHistoryModal,
        },
        {
          key: 'createEquipmentTechnicalExamination',
          label: 'Сформировать АТЭ',
          onClick: onOpenCreateEquipmentTechnicalExaminationModal,
          disabled:
            !permissions.equipmentsRead ||
            (equipment
              ? !(
                  equipment.condition === EquipmentConditionEnum.Broken ||
                  equipment.condition === EquipmentConditionEnum.NonRepairable
                )
              : true),
        },
      ],
    }),
    [
      onOpenEditEquipmentModal,
      permissions.equipmentsRead,
      permissions.relocationTasksRead,
      onToggleOpenRelocationHistoryModal,
      onToggleTechnicalExaminationsHistoryModal,
      onOpenCreateEquipmentTechnicalExaminationModal,
      equipment,
    ],
  )

  return (
    <>
      <Drawer
        {...props}
        data-testid='equipment-details'
        width={500}
        extra={
          <Dropdown menu={dropdownMenuItems}>
            <Button type='text' icon={<MenuIcon />} />
          </Dropdown>
        }
        title={equipment?.title}
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

                  <Col span={16}>{valueOr(equipment.inventoryNumber)}</Col>
                </Row>
              )}

              {equipment.nomenclature.equipmentHasSerialNumber && (
                <Row data-testid='serial-number'>
                  <Col span={8}>
                    <Text type='secondary'>Серийный номер:</Text>
                  </Col>

                  <Col span={16}>{valueOr(equipment.serialNumber)}</Col>
                </Row>
              )}

              <Row data-testid='location'>
                <Col span={8}>
                  <Text type='secondary'>Местонахождение:</Text>
                </Col>

                <Col span={16}>{valueOr(equipment.location?.title)}</Col>
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
                    <Col span={6}>{valueOr(equipment.quantity)}</Col>

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
                    <Col span={6}>{valueOr(equipment.price)}</Col>

                    <Col span={18}>
                      <Row>
                        <Col span={6}>
                          <Text type='secondary'>Валюта:</Text>
                        </Col>

                        <Col span={18}>
                          <Text>{valueOr(equipment.currency?.title)}</Text>
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

                  <Col span={16}>{valueOr(equipment.usageCounter)}</Col>
                </Row>
              )}

              {!hiddenFields.includes('owner') && (
                <Row data-testid='owner'>
                  <Col span={8}>
                    <Text type='secondary'>Владелец оборудования:</Text>
                  </Col>

                  <Col span={16}>
                    {equipment.owner
                      ? makeString(', ', equipment.owner.title, equipment.macroregion?.title)
                      : 'Obermeister'}
                  </Col>
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

                <Col span={16}>{valueOr(equipment.comment)}</Col>
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
            categories={equipmentCategories}
            categoriesIsLoading={equipmentCategoriesIsFetching}
            category={selectedCategory}
            onChangeCategory={onChangeCategory}
            warehouses={warehouses}
            warehousesIsLoading={warehousesIsFetching}
            currencies={currencies}
            currenciesIsLoading={currenciesIsFetching}
            owners={customers}
            ownersIsLoading={customersIsFetching}
            onChangeOwner={setSelectedOwnerId}
            macroregions={macroregions}
            macroregionsIsLoading={macroregionsIsFetching}
            workTypes={workTypes}
            workTypesIsLoading={workTypesIsFetching}
            nomenclature={nomenclature}
            nomenclatureIsLoading={nomenclatureIsFetching}
            nomenclatures={extractPaginationResults(nomenclatures)}
            nomenclaturesIsLoading={nomenclaturesIsFetching}
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
          <AttachmentsModal
            open={imageListModalOpened}
            title='Изображения оборудования'
            data={extractPaginationResults(totalEquipmentAttachmentList)}
            onCancel={onToggleOpenImageListModal}
          />
        </React.Suspense>
      )}

      {technicalExaminationsHistoryModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={technicalExaminationsHistoryModalOpened}
              onCancel={onToggleTechnicalExaminationsHistoryModal}
              tip='Загрузка модалки истории актов технической экспертизы'
            />
          }
        >
          <TechnicalExaminationsHistoryModal
            open={technicalExaminationsHistoryModalOpened}
            onCancel={onToggleTechnicalExaminationsHistoryModal}
            loading={technicalExaminationsIsFetching}
            dataSource={technicalExaminations}
          />
        </React.Suspense>
      )}

      {createEquipmentTechnicalExaminationModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={createEquipmentTechnicalExaminationModalOpened}
              onCancel={onCloseCreateEquipmentTechnicalExaminationModal}
              tip='Загрузка модалки формирования актов технической экспертизы'
            />
          }
        >
          <CreateEquipmentTechnicalExaminationModal
            open={createEquipmentTechnicalExaminationModalOpened}
            onCancel={onCloseCreateEquipmentTechnicalExaminationModal}
            isLoading={createTechnicalExaminationIsLoading || getTechnicalExaminationPdfIsFetching}
            onSubmit={
              isGetTechnicalExaminationPdfError && createdTechnicalExamination
                ? onGetTechnicalExaminationPdf
                : onCreateTechnicalExamination
            }
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EquipmentDetails
