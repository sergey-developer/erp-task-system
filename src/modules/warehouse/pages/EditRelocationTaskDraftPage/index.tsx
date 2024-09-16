import { useBoolean, useMount, usePrevious } from 'ahooks'
import { Button, Col, Form, Modal, Row, Typography, UploadProps } from 'antd'
import concat from 'lodash/concat'
import isNumber from 'lodash/isNumber'
import moment from 'moment-timezone'
import React, { FC, Key, useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { attachmentsToFiles } from 'modules/attachment/utils'
import { useAuthUser } from 'modules/auth/hooks'
import { UserGroupCategoryEnum, UserPermissionsEnum } from 'modules/user/constants'
import { useGetUsers, useGetUsersGroups, useUserPermissions } from 'modules/user/hooks'
import RelocationEquipmentDraftEditableTable from 'modules/warehouse/components/RelocationEquipmentDraftEditableTable'
import {
  ActiveEquipmentTableRow,
  InventorizationEquipmentTableRow,
  RelocationEquipmentDraftEditableTableProps,
} from 'modules/warehouse/components/RelocationEquipmentDraftEditableTable/types'
import RelocationTaskForm from 'modules/warehouse/components/RelocationTaskForm'
import {
  LocationOption,
  RelocationTaskFormProps,
  UserGroupOptionGroup,
} from 'modules/warehouse/components/RelocationTaskForm/types'
import { makeUserGroupOptions } from 'modules/warehouse/components/RelocationTaskForm/utils'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'
import {
  useGetInventorizationEquipments,
  useLazyGetInventorizationEquipment,
} from 'modules/warehouse/hooks/inventorization'
import { useGetRelocationEquipmentAttachmentList } from 'modules/warehouse/hooks/relocationEquipment'
import {
  useGetRelocationEquipmentList,
  useUpdateRelocationTask,
} from 'modules/warehouse/hooks/relocationTask'
import { useGetWarehouse } from 'modules/warehouse/hooks/warehouse'
import {
  getRelocateFromLocationsParams,
  getRelocateToLocationsParams,
} from 'modules/warehouse/pages/CreateRelocationTaskPage/utils'
import { ExecuteInventorizationPageTabsEnum } from 'modules/warehouse/pages/ExecuteInventorizationPage/constants'
import { RelocationTaskDraftFormFields } from 'modules/warehouse/types'
import { EditRelocationTaskDraftPageLocationState } from 'modules/warehouse/types/relocationTask'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'
import {
  getExecuteInventorizationPageLink,
  GetExecuteInventorizationPageLinkParams,
  makeExecuteInventorizationPageLocationState,
} from 'modules/warehouse/utils/inventorization'
import {
  checkRelocationTaskTypeIsEnteringBalances,
  checkRelocationTaskTypeIsReturnWrittenOff,
  checkRelocationTaskTypeIsWriteOff,
} from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { CANCEL_TEXT, SAVE_TEXT } from 'shared/constants/common'
import { useLazyGetLocations } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { mapIds } from 'shared/utils/array/mapIds'
import { checkLocationTypeIsWarehouse } from 'shared/utils/catalogs/location/checkLocationType'
import { extractLocationState } from 'shared/utils/common'
import { mergeDateTime } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { extractPaginationResults } from 'shared/utils/pagination'

const CreateAttachmentsModal = React.lazy(
  () => import('modules/attachment/components/CreateAttachmentListModal'),
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
    useGetRelocationEquipmentList(
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
  } = useGetRelocationEquipmentAttachmentList(
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
    permissions: [UserPermissionsEnum.ControlRelocationTask],
  })

  const { currentData: executorsUsersGroups = [], isFetching: executorsUsersGroupsIsFetching } =
    useGetUsersGroups({ category: UserGroupCategoryEnum.ExecuteRelocation })

  const { currentData: controllersUsersGroups = [], isFetching: controllersUsersGroupsIsFetching } =
    useGetUsersGroups({ category: UserGroupCategoryEnum.ControlRelocation })

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

  const inventorizationEquipments = extractPaginationResults(inventorizationEquipmentsResponse)

  const [
    getRelocateFromLocations,
    { currentData: relocateFromLocations = [], isFetching: relocateFromLocationsIsFetching },
  ] = useLazyGetLocations()

  const [
    getRelocateToLocations,
    { currentData: relocateToLocations = [], isFetching: relocateToLocationsIsFetching },
  ] = useLazyGetLocations()

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

  const { currentData: currencies = [], isFetching: currenciesIsFetching } = useGetCurrencyList(
    undefined,
    { skip: !getEquipmentsFormValue().length },
  )

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
        controllers: values.controllers,
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

        try {
          const equipment = await getEquipment({ equipmentId: value }).unwrap()
          const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)
          const newEquipment: InventorizationEquipmentTableRow = {
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
                ? equipment.quantity.diff
                : undefined
              : 1,
            category: equipment.category,
          }

          form.setFieldValue(path, newEquipment)
        } catch (error) {
          if (isErrorResponse(error) && isForbiddenError(error)) {
            form.setFieldValue(path, { rowId: currentEquipment.rowId })
          }
        }
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
        controllers: relocationTask.controllers ? mapIds(relocationTask.controllers) : undefined,
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

  const controllersOptions: UserGroupOptionGroup[] = useMemo(() => {
    return authUser ? makeUserGroupOptions(controllers, controllersUsersGroups, [authUser.id]) : []
  }, [authUser, controllers, controllersUsersGroups])

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
            <RelocationTaskForm
              permissions={permissions}
              isLoading={updateTaskIsLoading}
              relocateFromLocations={relocateFromLocations}
              relocateFromLocationsIsLoading={relocateFromLocationsIsFetching}
              relocateToLocations={relocateToLocations}
              relocateToLocationsIsLoading={relocateToLocationsIsFetching}
              executorsOptions={executorsOptions}
              executorsIsLoading={executorsIsFetching || executorsUsersGroupsIsFetching}
              controllersOptions={controllersOptions}
              controllersIsLoading={controllersIsFetching || controllersUsersGroupsIsFetching}
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
