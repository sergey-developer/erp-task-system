import { useBoolean, useMount, usePrevious } from 'ahooks'
import { Button, Col, Form, Modal, Row, Typography, UploadProps } from 'antd'
import { AttachmentTypeEnum } from 'features/attachments/api/constants'
import { attachmentsToFiles } from 'features/attachments/helpers'
import { useCreateAttachment, useDeleteAttachment } from 'features/attachments/hooks'
import { useAuthUser } from 'features/auth/hooks'
import { EquipmentConditionEnum } from 'features/equipments/api/constants'
import { checkEquipmentCategoryIsConsumable } from 'features/equipments/helpers'
import {
  useGetInventorizationEquipments,
  useLazyGetInventorizationEquipment,
} from 'features/inventorizations/hooks'
import { ExecuteInventorizationPageTabsEnum } from 'features/inventorizations/pages/ExecuteInventorizationPage/constants'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useGetUsers, useGetUsersGroups, useUserPermissions } from 'features/users/hooks'
import RelocationEquipmentDraftEditableTable from 'features/warehouse/components/RelocationEquipmentDraftEditableTable'
import {
  ActiveEquipmentTableRow,
  InventorizationEquipmentTableRow,
  RelocationEquipmentDraftEditableTableProps,
} from 'features/warehouse/components/RelocationEquipmentDraftEditableTable/types'
import RelocationTaskDraftForm from 'features/warehouse/components/RelocationTaskDraftForm'
import {
  LocationOption,
  RelocationTaskFormProps,
  UserGroupOptionGroup,
} from 'features/warehouse/components/RelocationTaskDraftForm/types'
import { makeUserGroupOptions } from 'features/warehouse/components/RelocationTaskDraftForm/utils'
import { WarehouseTypeEnum } from 'features/warehouse/constants/warehouse'
import { useGetRelocationEquipmentAttachments } from 'features/warehouse/hooks/relocationEquipment'
import {
  useGetRelocationEquipments,
  useUpdateRelocationTask,
} from 'features/warehouse/hooks/relocationTask'
import { useGetWarehouse } from 'features/warehouse/hooks/warehouse'
import {
  getRelocateFromLocationsParams,
  getRelocateToLocationsParams,
} from 'features/warehouse/pages/CreateRelocationTaskPage/utils'
import { RelocationTaskDraftFormFields } from 'features/warehouse/types'
import { EditRelocationTaskDraftPageLocationState } from 'features/warehouse/types/relocationTask'
import {
  getExecuteInventorizationPageLink,
  GetExecuteInventorizationPageLinkParams,
  makeExecuteInventorizationPageLocationState,
} from 'features/warehouse/utils/inventorization'
import {
  checkRelocationTaskTypeIsEnteringBalances,
  checkRelocationTaskTypeIsReturnWrittenOff,
  checkRelocationTaskTypeIsWriteOff,
} from 'features/warehouse/utils/relocationTask'
import concat from 'lodash/concat'
import isNumber from 'lodash/isNumber'
import moment from 'moment-timezone'
import { DefaultOptionType } from 'rc-select/lib/Select'
import React, { FC, Key, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/api/baseApi'
import { useGetCurrenciesCatalog } from 'shared/catalogs/hooks/currencies'
import { useLazyGetLocationsCatalog } from 'shared/catalogs/hooks/locations'
import { checkLocationTypeIsWarehouse } from 'shared/catalogs/locations/helpers/checkLocationType'
import { CANCEL_TEXT, SAVE_TEXT } from 'shared/constants/common'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { MaybeUndefined } from 'shared/types/utils'
import { mapIds } from 'shared/utils/array/mapIds'
import { extractLocationState } from 'shared/utils/common'
import { mergeDateTime } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

const CreateAttachmentsModal = React.lazy(
  () => import('features/attachments/components/CreateAttachmentsModal'),
)

const { Text } = Typography

const equipmentTableNamePath = 'equipments'

const relocationTaskFormDisabledFields: RelocationTaskFormProps['disabledFields'] = [
  'deadlineAtDate',
  'deadlineAtTime',
]

const initialValues: Pick<RelocationTaskDraftFormFields, 'equipments'> = {
  [equipmentTableNamePath]: [],
}

const EditRelocationTaskDraftPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const locationState = extractLocationState<EditRelocationTaskDraftPageLocationState>(location)

  useMount(() => {
    if (!locationState?.inventorization) {
      console.error('Inventorization was not provided through location state')
    }

    if (!locationState?.relocationTask)
      console.error('Relocation task was not provided through location state')
  })

  const relocationTask = locationState?.relocationTask
  const inventorization = locationState?.inventorization

  const authUser = useAuthUser()
  const permissions = useUserPermissions([UserPermissionsEnum.EnteringBalances])

  const [form] = Form.useForm<RelocationTaskDraftFormFields>()

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentTableRow>()

  const [
    createRelocationEquipmentImagesModalOpened,
    {
      setTrue: openCreateRelocationEquipmentImagesModal,
      setFalse: closeCreateRelocationEquipmentImagesModal,
    },
  ] = useBoolean(false)

  const onOpenCreateRelocationEquipmentImagesModal = useDebounceFn(
    (row: ActiveEquipmentTableRow) => {
      setActiveEquipmentRow(row)
      openCreateRelocationEquipmentImagesModal()
    },
  )

  const onCloseCreateRelocationEquipmentImagesModal = useDebounceFn(() => {
    closeCreateRelocationEquipmentImagesModal()
    setActiveEquipmentRow(undefined)
  })

  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedType, setSelectedType] = useState<RelocationTaskDraftFormFields['type']>()
  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(selectedType)
  const typeIsReturnWrittenOff = checkRelocationTaskTypeIsReturnWrittenOff(selectedType)
  const typeIsEnteringBalances = checkRelocationTaskTypeIsEnteringBalances(selectedType)

  const [selectedRelocateTo, setSelectedRelocateTo] = useState<LocationOption>()
  const [selectedRelocateFrom, setSelectedRelocateFrom] = useState<LocationOption>()
  const prevSelectedRelocateFrom = usePrevious(selectedRelocateFrom)

  const { currentData: relocateToWarehouse, isFetching: relocateToWarehouseIsFetching } =
    useGetWarehouse(selectedRelocateTo?.value!, {
      skip:
        !selectedRelocateTo ||
        !selectedRelocateFrom ||
        !checkLocationTypeIsWarehouse(selectedRelocateTo.type),
    })

  const { currentData: relocateFromWarehouse, isFetching: relocateFromWarehouseIsFetching } =
    useGetWarehouse(selectedRelocateFrom?.value!, {
      skip:
        !selectedRelocateFrom ||
        !selectedRelocateTo ||
        !checkLocationTypeIsWarehouse(selectedRelocateFrom.type),
    })

  const { currentData: relocationEquipments = [], isFetching: relocationEquipmentsIsFetching } =
    useGetRelocationEquipments(
      { relocationTaskId: relocationTask?.id! },
      { skip: !relocationTask?.id },
    )

  const activeEquipmentIsRelocationEquipment =
    createRelocationEquipmentImagesModalOpened && activeEquipmentRow && relocationEquipments.length
      ? Boolean(
          relocationEquipments.find(
            (eqp) => eqp.relocationEquipmentId === activeEquipmentRow.relocationEquipmentId,
          ),
        )
      : false

  const {
    currentData: relocationEquipmentAttachments = [],
    isFetching: relocationEquipmentAttachmentListIsFetching,
  } = useGetRelocationEquipmentAttachments(
    { relocationEquipmentId: activeEquipmentRow?.relocationEquipmentId! },
    {
      skip:
        !activeEquipmentRow?.relocationEquipmentId ||
        !activeEquipmentIsRelocationEquipment ||
        !createRelocationEquipmentImagesModalOpened,
    },
  )

  const { currentData: executors = [], isFetching: executorsIsFetching } = useGetUsers({
    isManager: false,
  })

  const { currentData: controllers = [], isFetching: controllersIsFetching } = useGetUsers({
    isManager: false,
    // permissions: [UserPermissionsEnum.ControlRelocationTask],
  })

  const { currentData: executorsUsersGroups = [], isFetching: executorsUsersGroupsIsFetching } =
    useGetUsersGroups()
  // useGetUsersGroups({ category: UserGroupCategoryEnum.ExecuteRelocation })

  // const { currentData: controllersUsersGroups = [], isFetching: controllersUsersGroupsIsFetching } =
  //   useGetUsersGroups({ category: UserGroupCategoryEnum.ControlRelocation })

  const {
    currentData: inventorizationEquipmentsResponse,
    isFetching: inventorizationEquipmentsIsFetching,
  } = useGetInventorizationEquipments(
    {
      inventorizationId: inventorization?.id!,
      locationPlan: selectedRelocateFrom?.value,
      locationFact: selectedRelocateTo?.value,
      ordering: 'title',
      isFilled: true,
      hasDiff: true,
      hasRelocationTask: false,
    },
    { skip: !inventorization?.id },
  )

  const inventorizationEquipments: RelocationEquipmentDraftEditableTableProps['equipments'] =
    useMemo(
      () => [
        ...extractPaginationResults(inventorizationEquipmentsResponse),
        ...relocationEquipments.map((eqp) => ({
          relocationEquipment: eqp,
          // главное поле - relocationEquipment из него будут подставляться значения в таблицу при выборе оборудования
          // остальные поля не важны, они заполняются т.к. они обязательные
          id: eqp.id,
          equipment: {
            id: eqp.id,
            title: eqp.title,
            category: eqp.category,
            serialNumber: eqp.serialNumber!,
            inventoryNumber: '',
          },
          isLocationFactUndefined: false,
          locationPlan: null,
          locationFact: null,
          quantity: {
            fact: null,
            plan: 0,
            diff: checkEquipmentCategoryIsConsumable(eqp.category.code) ? eqp.quantity : 1,
          },
          isFilled: false,
          hasDiff: null,
        })),
      ],
      [inventorizationEquipmentsResponse, relocationEquipments],
    )

  const [
    getRelocateFromLocations,
    { currentData: relocateFromLocations = [], isFetching: relocateFromLocationsIsFetching },
  ] = useLazyGetLocationsCatalog()

  const [
    getRelocateToLocations,
    { currentData: relocateToLocations = [], isFetching: relocateToLocationsIsFetching },
  ] = useLazyGetLocationsCatalog()

  /* сделано через lazy т.к. по каким-то причинам запрос не отправляется снова если один из параметров не изменился */
  useEffect(() => {
    if (selectedType) {
      getRelocateFromLocations({
        inventorization: inventorization?.id,
        ...getRelocateFromLocationsParams(selectedType),
      })
    }
  }, [getRelocateFromLocations, inventorization?.id, selectedType])

  useEffect(() => {
    if (selectedType && !typeIsWriteOff) {
      getRelocateToLocations({
        inventorization: inventorization?.id,
        ...getRelocateToLocationsParams(selectedType),
      })
    }
  }, [getRelocateToLocations, inventorization?.id, selectedType, typeIsWriteOff])

  const getEquipmentsFormValue = useCallback(
    (): InventorizationEquipmentTableRow[] => form.getFieldValue(equipmentTableNamePath) || [],
    [form],
  )

  const { currentData: currencies = [], isFetching: currenciesIsFetching } =
    useGetCurrenciesCatalog(undefined, { skip: !getEquipmentsFormValue().length })

  const [getEquipment, { isFetching: equipmentIsFetching }] = useLazyGetInventorizationEquipment()

  const [createAttachment] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const [updateTaskMutation, { isLoading: updateTaskIsLoading }] = useUpdateRelocationTask()

  const createRelocationEquipmentImage: NonNullable<UploadProps['customRequest']> = async (
    options,
  ) => {
    await createAttachment({ type: AttachmentTypeEnum.RelocationEquipmentImage }, options)
  }

  const goToExecuteInventorizationPage = (
    params?: Pick<GetExecuteInventorizationPageLinkParams, 'relocationTaskDraftId'>,
  ) => {
    if (!inventorization) return

    navigate(
      getExecuteInventorizationPageLink({
        inventorizationId: inventorization.id,
        tab: ExecuteInventorizationPageTabsEnum.Relocations,
        ...params,
      }),
      { state: makeExecuteInventorizationPageLocationState(inventorization) },
    )
  }

  const onCancel = () => goToExecuteInventorizationPage()

  const editTaskDraft = async (values: RelocationTaskDraftFormFields) => {
    if (!inventorization?.id || !relocationTask?.id) return

    try {
      const updatedTask = await updateTaskMutation({
        relocationTaskId: relocationTask.id,
        inventorization: inventorization.id,
        type: values.type,
        deadlineAt: mergeDateTime(values.deadlineAtDate, values.deadlineAtTime).toISOString(),
        equipments: values.equipments.map((eqp) => ({
          id: eqp.equipment.id,
          quantity: eqp.quantity!,
          condition: eqp.condition,
          currency: eqp.currency,
          price: eqp.price,
          attachments: eqp.attachments?.length
            ? extractIdsFromFilesResponse(eqp.attachments)
            : undefined,
        })),
        relocateToId: values.relocateTo,
        relocateFromId: values.relocateFrom,
        executors: values.executors,
        // controllers: values.controllers,
        controller: values.controller,
        comment: values.comment,
      }).unwrap()

      goToExecuteInventorizationPage({ relocationTaskDraftId: updatedTask.id })
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        form.setFields(getFieldsErrors(error.data))
      } else {
        console.error(error)
      }
    }
  }

  // todo: заменить pickEquipment на такую функцию в других местах
  const onChangeEquipment: RelocationEquipmentDraftEditableTableProps['onChangeEquipment'] =
    useCallback(
      async (value, option, path) => {
        form.setFieldValue([...path, 'equipment'], option.equipment)
        const currentEquipment = form.getFieldValue(path)
        let newEquipment: MaybeUndefined<InventorizationEquipmentTableRow>

        if (option.relocationEquipment) {
          newEquipment = {
            ...currentEquipment,
            serialNumber: option.relocationEquipment.serialNumber,
            condition: typeIsWriteOff
              ? EquipmentConditionEnum.WrittenOff
              : typeIsReturnWrittenOff
              ? EquipmentConditionEnum.Working
              : option.relocationEquipment.condition,
            price: isNumber(option.relocationEquipment.price)
              ? option.relocationEquipment.price
              : undefined,
            currency: option.relocationEquipment.currency?.id,
            quantity: checkEquipmentCategoryIsConsumable(option.relocationEquipment.category.code)
              ? option.relocationEquipment.quantity
              : 1,
            category: option.relocationEquipment.category,
          }
        } else {
          try {
            const equipment = await getEquipment({ equipmentId: value }).unwrap()
            const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)
            newEquipment = {
              ...currentEquipment,
              serialNumber: equipment.serialNumber || undefined,
              condition: typeIsWriteOff
                ? EquipmentConditionEnum.WrittenOff
                : typeIsReturnWrittenOff
                ? EquipmentConditionEnum.Working
                : equipment.condition,
              price: isNumber(equipment.price) ? equipment.price : undefined,
              currency: equipment.currency?.id,
              quantity: isConsumable
                ? isNumber(equipment.quantity.diff)
                  ? Math.abs(equipment.quantity.diff)
                  : undefined
                : 1,
              category: equipment.category,
            }
          } catch (error) {
            if (isErrorResponse(error) && isForbiddenError(error)) {
              form.setFieldValue(path, { rowId: currentEquipment.rowId })
            }
          }
        }

        form.setFieldValue(path, newEquipment)
      },
      [form, getEquipment, typeIsReturnWrittenOff, typeIsWriteOff],
    )

  const onChangeRelocateFrom = useCallback<RelocationTaskFormProps['onChangeRelocateFrom']>(
    (value, option) => {
      const equipments = getEquipmentsFormValue()
      const relocateFrom = form.getFieldValue('relocateFrom')
      const isShowConfirmation = !!equipments.length && !!relocateFrom
      form.setFieldValue('relocateFrom', value)
      setSelectedRelocateFrom(option)
      if (isShowConfirmation) toggleConfirmModal()
    },
    [form, getEquipmentsFormValue, toggleConfirmModal],
  )

  const onChangeTypeToReturnWrittenOff = useCallback(
    (equipments: InventorizationEquipmentTableRow[]) => {
      const newEquipments = equipments.map((eqp) => ({
        ...eqp,
        condition: EquipmentConditionEnum.Working,
      }))
      form.setFieldValue(equipmentTableNamePath, newEquipments)
    },
    [form],
  )

  const onChangeTypeToWriteOff = useCallback(
    (equipments: InventorizationEquipmentTableRow[]) => {
      const relocateToValue = undefined
      form.setFieldValue('relocateTo', relocateToValue)
      setSelectedRelocateTo(relocateToValue)
      const newEquipments = equipments.map((eqp) => ({
        ...eqp,
        condition: EquipmentConditionEnum.WrittenOff,
      }))
      form.setFieldValue(equipmentTableNamePath, newEquipments)
    },
    [form],
  )

  const onChangeTypeToEnteringBalances = useCallback(() => {
    const relocateFromValue = undefined
    form.setFieldValue('relocateFrom', relocateFromValue)
    setSelectedRelocateFrom(relocateFromValue)
  }, [form])

  const onChangeType = useCallback<RelocationTaskFormProps['onChangeType']>(
    (value) => {
      setSelectedType(value)

      if (checkRelocationTaskTypeIsReturnWrittenOff(value)) {
        return onChangeTypeToReturnWrittenOff(getEquipmentsFormValue())
      } else if (checkRelocationTaskTypeIsEnteringBalances(value)) {
        return onChangeTypeToEnteringBalances()
      } else if (checkRelocationTaskTypeIsWriteOff(value)) {
        return onChangeTypeToWriteOff(getEquipmentsFormValue())
      }
    },
    [
      getEquipmentsFormValue,
      onChangeTypeToEnteringBalances,
      onChangeTypeToReturnWrittenOff,
      onChangeTypeToWriteOff,
    ],
  )

  /* Установка значений формы из заявки */
  useEffect(() => {
    if (relocationTask) {
      setSelectedType(relocationTask.type)

      form.setFieldsValue({
        type: relocationTask.type,
        deadlineAtDate: moment(relocationTask.deadlineAt),
        deadlineAtTime: moment(relocationTask.deadlineAt),
        executors: mapIds(relocationTask.executors),
        // controllers: relocationTask.controllers ? mapIds(relocationTask.controllers) : undefined,
        controller: relocationTask.controller?.id,
        comment: relocationTask.comment || undefined,
      })
    }
  }, [form, relocationTask])

  /* Установка значения состояния объекта прибытия */
  useEffect(() => {
    if (relocationTask && relocateToLocations.length) {
      if (typeIsWriteOff) return

      const relocateToListItem = relocateToLocations.find(
        (l) => l.id === relocationTask.relocateTo?.id,
      )

      if (relocateToListItem) {
        setSelectedRelocateTo({
          label: relocateToListItem.title,
          type: relocateToListItem.type,
          value: relocateToListItem.id,
        })
        form.setFieldValue('relocateTo', relocateToListItem.id)
      }
    }
  }, [form, relocateToLocations, relocationTask, typeIsWriteOff])

  /* Установка значения состояния объекта выбытия */
  useEffect(() => {
    if (relocationTask && relocateFromLocations.length) {
      if (typeIsEnteringBalances) return

      const relocateFromListItem = relocateFromLocations.find(
        (l) => l.id === relocationTask.relocateFrom?.id,
      )

      if (relocateFromListItem) {
        setSelectedRelocateFrom({
          label: relocateFromListItem.title,
          type: relocateFromListItem.type,
          value: relocateFromListItem.id,
        })
        form.setFieldValue('relocateFrom', relocateFromListItem.id)
      }
    }
  }, [form, relocateFromLocations, relocationTask, typeIsEnteringBalances])

  /* Установка значений перечня оборудования */
  useEffect(() => {
    if (relocationTask && relocationEquipments.length) {
      const equipments: InventorizationEquipmentTableRow[] = []
      const editableTableRowKeys: Key[] = []

      relocationEquipments.forEach((eqp) => {
        editableTableRowKeys.push(eqp.id)
        const isConsumable = checkEquipmentCategoryIsConsumable(eqp.category.code)

        equipments.push({
          rowId: eqp.id,
          id: eqp.id,
          equipment: { ...eqp, inventoryNumber: null },
          relocationEquipmentId: eqp.relocationEquipmentId,
          serialNumber: eqp?.serialNumber || undefined,
          condition: typeIsWriteOff
            ? EquipmentConditionEnum.WrittenOff
            : typeIsReturnWrittenOff
            ? EquipmentConditionEnum.Working
            : eqp.condition,
          price: eqp?.price ?? undefined,
          currency: eqp?.currency?.id || undefined,
          quantity: isConsumable ? eqp.quantity : 1,
          category: eqp.category,
        })
      })

      form.setFieldValue(equipmentTableNamePath, equipments)
      setEditableTableRowKeys(editableTableRowKeys)
    }
  }, [form, relocationEquipments, relocationTask, typeIsReturnWrittenOff, typeIsWriteOff])

  const isRelocationFromMainToMsi =
    relocateFromWarehouse?.type === WarehouseTypeEnum.Main &&
    relocateToWarehouse?.type === WarehouseTypeEnum.Msi

  const controllerIsRequired =
    relocateToWarehouse && relocateFromWarehouse ? !isRelocationFromMainToMsi : true

  const equipmentImagesFormPath =
    createRelocationEquipmentImagesModalOpened && activeEquipmentRow
      ? [equipmentTableNamePath, activeEquipmentRow.rowIndex, 'attachments']
      : undefined

  const executorsOptions: UserGroupOptionGroup[] = useMemo(() => {
    return makeUserGroupOptions(executors, executorsUsersGroups)
  }, [executors, executorsUsersGroups])

  // const controllersOptions: UserGroupOptionGroup[] = useMemo(() => {
  //   return authUser ? makeUserGroupOptions(controllers, controllersUsersGroups, [authUser.id]) : []
  // }, [authUser, controllers, controllersUsersGroups])

  const controllersOptions: DefaultOptionType[] = useMemo(() => {
    return authUser
      ? controllers.reduce<DefaultOptionType[]>((acc, contr) => {
          if (contr.id !== authUser.id) acc.push({ label: contr.fullName, value: contr.id })
          return acc
        }, [])
      : controllers.map((c) => ({ label: c.fullName, value: c.id }))
  }, [authUser, controllers])

  return (
    <>
      <Form<RelocationTaskDraftFormFields>
        data-testid='edit-relocation-task-draft-page'
        form={form}
        layout='vertical'
        onFinish={editTaskDraft}
        initialValues={initialValues}
      >
        <Row gutter={[40, 40]}>
          <Col span={24}>
            <RelocationTaskDraftForm
              permissions={permissions}
              isLoading={updateTaskIsLoading}
              relocateFromLocations={relocateFromLocations}
              relocateFromLocationsIsLoading={relocateFromLocationsIsFetching}
              relocateToLocations={relocateToLocations}
              relocateToLocationsIsLoading={relocateToLocationsIsFetching}
              executorsOptions={executorsOptions}
              executorsIsLoading={executorsIsFetching || executorsUsersGroupsIsFetching}
              controllersOptions={controllersOptions}
              // controllersIsLoading={controllersIsFetching || controllersUsersGroupsIsFetching}
              controllersIsLoading={controllersIsFetching}
              controllerIsRequired={controllerIsRequired}
              type={selectedType}
              onChangeType={onChangeType}
              onChangeRelocateFrom={onChangeRelocateFrom}
              onChangeRelocateTo={setSelectedRelocateTo}
              showUploadImages={false}
              disabledFields={relocationTaskFormDisabledFields}
            />
          </Col>

          <Col span={24}>
            <Space $block direction='vertical' size='middle'>
              <Text strong>Перечень оборудования</Text>

              <RelocationEquipmentDraftEditableTable
                name={equipmentTableNamePath}
                editableKeys={editableTableRowKeys}
                setEditableKeys={setEditableTableRowKeys}
                isLoading={updateTaskIsLoading}
                onChangeEquipment={onChangeEquipment}
                equipmentIsLoading={equipmentIsFetching}
                currencies={currencies}
                currenciesIsLoading={currenciesIsFetching}
                equipments={inventorizationEquipments}
                equipmentsIsLoading={inventorizationEquipmentsIsFetching}
                relocationEquipmentsIsLoading={relocationEquipmentsIsFetching}
                onClickCreateImage={onOpenCreateRelocationEquipmentImagesModal}
              />
            </Space>
          </Col>

          <Col span={24}>
            <Row justify='end' gutter={8}>
              <Col>
                <Button onClick={onCancel}>{CANCEL_TEXT}</Button>
              </Col>

              <Col>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={updateTaskIsLoading}
                  disabled={relocateFromWarehouseIsFetching || relocateToWarehouseIsFetching}
                >
                  {SAVE_TEXT}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>

      <Modal
        title='Перечень перемещаемого оборудования будет очищен'
        open={confirmModalOpened}
        onCancel={() => {
          if (prevSelectedRelocateFrom) {
            toggleConfirmModal()
            form.setFieldValue('relocateFrom', prevSelectedRelocateFrom.value)
            setSelectedRelocateFrom(prevSelectedRelocateFrom)
          }
        }}
        onOk={() => {
          toggleConfirmModal()
          form.setFieldValue(equipmentTableNamePath, [])
        }}
      >
        <Text>Вы действительно хотите сменить объект выбытия?</Text>
      </Modal>

      {createRelocationEquipmentImagesModalOpened && activeEquipmentRow && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={onCloseCreateRelocationEquipmentImagesModal}
              tip='Загрузка модалки добавления изображений оборудования'
            />
          }
        >
          <CreateAttachmentsModal
            form={form}
            formItemName={equipmentImagesFormPath}
            open={createRelocationEquipmentImagesModalOpened}
            title='Добавить изображения оборудования'
            onCancel={onCloseCreateRelocationEquipmentImagesModal}
            isLoading={relocationEquipmentAttachmentListIsFetching}
            onCreate={createRelocationEquipmentImage}
            onDelete={deleteAttachment}
            isDeleting={deleteAttachmentIsLoading}
            defaultFileList={
              equipmentImagesFormPath
                ? concat(
                    form.getFieldValue(equipmentImagesFormPath) || [],
                    attachmentsToFiles(relocationEquipmentAttachments),
                  )
                : undefined
            }
          />
        </React.Suspense>
      )}
    </>
  )
}

export default EditRelocationTaskDraftPage
