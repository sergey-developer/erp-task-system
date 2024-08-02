import { useBoolean, usePrevious } from 'ahooks'
import { Col, Form, FormProps, Modal, Row, Typography, UploadProps } from 'antd'
import isNumber from 'lodash/isNumber'
import moment from 'moment-timezone'
import { NamePath } from 'rc-field-form/es/interface'
import React, { FC, Key, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { AttachmentTypeEnum } from 'modules/attachment/constants'
import { useCreateAttachment, useDeleteAttachment } from 'modules/attachment/hooks'
import { useAuthUser } from 'modules/auth/hooks'
import { useGetUsers, useGetUsersGroups } from 'modules/user/hooks'
import RelocationEquipmentDraftEditableTable from 'modules/warehouse/components/RelocationEquipmentDraftEditableTable'
import {
  ActiveEquipmentTableRow,
  InventorizationEquipmentTableRow,
} from 'modules/warehouse/components/RelocationEquipmentDraftEditableTable/types'
import {
  LocationOption,
  RelocationTaskFormProps,
} from 'modules/warehouse/components/RelocationTaskForm/types'
import { EquipmentConditionEnum } from 'modules/warehouse/constants/equipment'
import { RelocationTaskTypeEnum } from 'modules/warehouse/constants/relocationTask'
import { WarehouseTypeEnum } from 'modules/warehouse/constants/warehouse'
import { useGetEquipmentsCatalog } from 'modules/warehouse/hooks/equipment'
import { useLazyGetInventorizationEquipment } from 'modules/warehouse/hooks/inventorization'
import { useCreateRelocationTask } from 'modules/warehouse/hooks/relocationTask'
import { useGetWarehouse } from 'modules/warehouse/hooks/warehouse'
import { RelocationTaskDraftFormFields } from 'modules/warehouse/types'
import { checkEquipmentCategoryIsConsumable } from 'modules/warehouse/utils/equipment'
import {
  checkRelocationTaskTypeIsEnteringBalances,
  checkRelocationTaskTypeIsWriteOff,
  getRelocationTasksPageLink,
} from 'modules/warehouse/utils/relocationTask'

import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'

import { useLazyGetLocations } from 'shared/hooks/catalogs/location'
import { useGetCurrencyList } from 'shared/hooks/currency'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { isBadRequestError, isErrorResponse, isForbiddenError } from 'shared/services/baseApi'
import { checkLocationTypeIsWarehouse } from 'shared/utils/catalogs/location/checkLocationType'
import { extractLocationState } from 'shared/utils/common'
import { mergeDateTime } from 'shared/utils/date'
import { extractIdsFromFilesResponse } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'

import {
  getEquipmentCatalogListParams,
  getRelocateFromLocationListParams,
  getRelocateToLocationListParams,
} from './utils'

const CreateAttachmentsModal = React.lazy(
  () => import('modules/attachment/components/CreateAttachmentListModal'),
)

const { Text } = Typography

const equipmentTableNamePath: NamePath = 'equipments'
const deadlineAtDate = moment().add(24, 'hours')

const initialValues: Pick<
  RelocationTaskDraftFormFields,
  'equipments' | 'type' | 'deadlineAtDate' | 'deadlineAtTime'
> = {
  type: RelocationTaskTypeEnum.Relocation,
  equipments: [],
  deadlineAtDate,
  deadlineAtTime: deadlineAtDate.clone(),
}

const CreateRelocationTaskDraftPage: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const authUser = useAuthUser()

  const [form] = Form.useForm<RelocationTaskDraftFormFields>()

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<ActiveEquipmentTableRow>()

  const [
    createRelocationEquipmentImagesModalOpened,
    {
      setTrue: openCreateRelocationEquipmentImagesModal,
      setFalse: closeCreateRelocationEquipmentImagesModal,
    },
  ] = useBoolean(false)

  const handleOpenCreateRelocationEquipmentImagesModal = useDebounceFn(
    (row: ActiveEquipmentTableRow) => {
      setActiveEquipmentRow(row)
      openCreateRelocationEquipmentImagesModal()
    },
  )

  const handleCloseCreateRelocationEquipmentImagesModal = useDebounceFn(() => {
    closeCreateRelocationEquipmentImagesModal()
    setActiveEquipmentRow(undefined)
  })

  const [confirmModalOpened, { toggle: toggleConfirmModal }] = useBoolean(false)

  const [editableTableRowKeys, setEditableTableRowKeys] = useState<Key[]>([])

  const [selectedType, setSelectedType] = useState<RelocationTaskDraftFormFields['type']>(
    RelocationTaskTypeEnum.Relocation,
  )
  const typeIsWriteOff = checkRelocationTaskTypeIsWriteOff(selectedType)
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

  const { currentData: users = [], isFetching: usersIsFetching } = useGetUsers({
    isManager: false,
  })

  const { currentData: usersGroups = [], isFetching: usersGroupsIsFetching } = useGetUsersGroups()

  const [
    getRelocateFromLocationList,
    { currentData: relocateFromLocationList = [], isFetching: relocateFromLocationListIsFetching },
  ] = useLazyGetLocations()

  const [
    getRelocateToLocationList,
    { currentData: relocateToLocationList = [], isFetching: relocateToLocationListIsFetching },
  ] = useLazyGetLocations()

  /* сделано через lazy т.к. по каким-то причинам запрос не отправляется снова если один из параметров не изменился */
  useEffect(() => {
    getRelocateFromLocationList(getRelocateFromLocationListParams(selectedType))
  }, [getRelocateFromLocationList, selectedType])

  useEffect(() => {
    if (!typeIsWriteOff) {
      getRelocateToLocationList(getRelocateToLocationListParams(selectedType))
    }
  }, [getRelocateToLocationList, selectedType, typeIsWriteOff])

  const { currentData: currencies = [], isFetching: currenciesIsFetching } = useGetCurrencyList()

  const { currentData: equipmentsCatalog = [], isFetching: equipmentsCatalogIsFetching } =
    useGetEquipmentsCatalog(
      {
        locationId: selectedRelocateFrom?.value || selectedRelocateTo?.value,
        ...getEquipmentCatalogListParams(selectedType),
      },
      { skip: !selectedRelocateFrom?.value && !selectedRelocateTo?.value },
    )

  const [getEquipment, { isFetching: equipmentIsFetching }] = useLazyGetInventorizationEquipment()

  const [createAttachment, { isLoading: createAttachmentIsLoading }] = useCreateAttachment()
  const [deleteAttachment, { isLoading: deleteAttachmentIsLoading }] = useDeleteAttachment()

  const [createTaskMutation, { isLoading: createTaskIsLoading }] = useCreateRelocationTask()

  const createRelocationEquipmentImage: NonNullable<UploadProps['customRequest']> = async (
    options,
  ) => {
    await createAttachment({ type: AttachmentTypeEnum.RelocationEquipmentImage }, options)
  }

  const createTask = async (values: RelocationTaskDraftFormFields) => {
    try {
      const createdTask = await createTaskMutation({
        type: values.type,
        deadlineAt: mergeDateTime(values.deadlineAtDate, values.deadlineAtTime).toISOString(),
        equipments: values.equipments.map((eqp) => ({
          id: eqp.id,
          quantity: eqp.quantity,
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
        controller: values.controller,
        comment: values.comment,
      }).unwrap()

      const fromPath = extractLocationState(location)?.from

      fromPath
        ? navigate(fromPath)
        : navigate(getRelocationTasksPageLink({ viewRelocationTask: createdTask.id }))
    } catch (error) {
      if (isErrorResponse(error) && isBadRequestError(error)) {
        form.setFields(getFieldsErrors(error.data))
      }
    }
  }

  const pickEquipment: FormProps<RelocationTaskDraftFormFields>['onValuesChange'] = async (
    changedValues,
    values,
  ) => {
    if (changedValues.equipments && !Array.isArray(changedValues.equipments)) {
      const [index, changes] = Object.entries(changedValues.equipments)[0] as [
        string,
        Partial<InventorizationEquipmentTableRow>,
      ]

      if (changes.id) {
        const equipmentPath: NamePath = [equipmentTableNamePath, index]
        const currentEquipment = values.equipments[Number(index)]

        try {
          const equipment = await getEquipment({ equipmentId: changes.id }).unwrap()
          const isConsumable = checkEquipmentCategoryIsConsumable(equipment.category.code)
          const newEquipment: InventorizationEquipmentTableRow = {
            ...currentEquipment,
            serialNumber: equipment.serialNumber || undefined,
            condition: typeIsWriteOff ? EquipmentConditionEnum.WrittenOff : equipment.condition,
            price: isNumber(equipment.price) ? equipment.price : undefined,
            currency: equipment.currency?.id,
            quantity: isConsumable
              ? isNumber(equipment.quantity.diff)
                ? equipment.quantity.diff
                : undefined
              : 1,
            category: equipment.category,
          }

          form.setFieldValue(equipmentPath, newEquipment)
        } catch (error) {
          if (isErrorResponse(error) && isForbiddenError(error)) {
            form.setFieldValue(equipmentPath, { rowId: currentEquipment.rowId })
          }
        }
      }
    }
  }

  const handleChangeRelocateFrom = useCallback<RelocationTaskFormProps['onChangeRelocateFrom']>(
    (value, option) => {
      const equipments: InventorizationEquipmentTableRow[] =
        form.getFieldValue(equipmentTableNamePath) || []
      const relocateFrom = form.getFieldValue('relocateFrom')
      const isShowConfirmation = !!equipments.length && !!relocateFrom
      form.setFieldValue('relocateFrom', value)
      setSelectedRelocateFrom(option)
      if (isShowConfirmation) toggleConfirmModal()
    },
    [form, toggleConfirmModal],
  )

  const handleChangeType = useCallback<RelocationTaskFormProps['onChangeType']>(
    (value) => {
      setSelectedType(value)

      if (checkRelocationTaskTypeIsEnteringBalances(value)) {
        const relocateFromValue = undefined
        form.setFieldValue('relocateFrom', relocateFromValue)
        setSelectedRelocateFrom(relocateFromValue)
      }

      if (checkRelocationTaskTypeIsWriteOff(value)) {
        const relocateToValue = undefined
        form.setFieldValue('relocateTo', relocateToValue)
        setSelectedRelocateTo(relocateToValue)

        const equipments: InventorizationEquipmentTableRow[] =
          form.getFieldValue(equipmentTableNamePath) || []
        const newEquipments = equipments.map((eqp) => ({
          ...eqp,
          condition: EquipmentConditionEnum.WrittenOff,
        }))
        form.setFieldValue(equipmentTableNamePath, newEquipments)
      }
    },
    [form],
  )

  /* Установка значений формы */
  useEffect(() => {
    if (authUser && users.length) {
      form.setFieldsValue({ executors: [authUser.id] })
    }
  }, [form, authUser, users.length])

  const isRelocationFromMainToMsi =
    relocateFromWarehouse?.type === WarehouseTypeEnum.Main &&
    relocateToWarehouse?.type === WarehouseTypeEnum.Msi

  const controllerIsRequired =
    relocateToWarehouse && relocateFromWarehouse ? !isRelocationFromMainToMsi : true

  const equipmentImagesFormPath =
    createRelocationEquipmentImagesModalOpened && activeEquipmentRow
      ? [equipmentTableNamePath, activeEquipmentRow.rowIndex, 'attachments']
      : undefined

  return (
    <>
      <Form<RelocationTaskDraftFormFields>
        data-testid='create-relocation-task-draft-page'
        form={form}
        layout='vertical'
        onFinish={createTask}
        onValuesChange={pickEquipment}
        initialValues={initialValues}
      >
        <Row gutter={[40, 40]}>
          {/*<Col span={24}>*/}
          {/*  <RelocationTaskForm*/}
          {/*    authUser={authUser}*/}
          {/*    permissions={permissions}*/}
          {/*    isLoading={createTaskIsLoading}*/}
          {/*    relocateFromLocationList={relocateFromLocationList}*/}
          {/*    relocateFromLocationListIsLoading={relocateFromLocationListIsFetching}*/}
          {/*    relocateToLocationList={relocateToLocationList}*/}
          {/*    relocateToLocationListIsLoading={relocateToLocationListIsFetching}*/}
          {/*    users={users}*/}
          {/*    usersIsLoading={usersIsFetching}*/}
          {/*    usersGroups={usersGroups}*/}
          {/*    usersGroupsIsLoading={usersGroupsIsFetching}*/}
          {/*    controllerIsRequired={controllerIsRequired}*/}
          {/*    type={selectedType}*/}
          {/*    onChangeType={handleChangeType}*/}
          {/*    onChangeRelocateFrom={handleChangeRelocateFrom}*/}
          {/*    onChangeRelocateTo={setSelectedRelocateTo}*/}
          {/*    onUploadImage={createCommonRelocationEquipmentImage}*/}
          {/*    imageIsUploading={createAttachmentIsLoading}*/}
          {/*    onDeleteImage={deleteAttachment}*/}
          {/*    imageIsDeleting={deleteAttachmentIsLoading}*/}
          {/*  />*/}
          {/*</Col>*/}

          <Col span={24}>
            <Space $block direction='vertical' size='middle'>
              <Text strong>Перечень оборудования</Text>

              <RelocationEquipmentDraftEditableTable
                name={equipmentTableNamePath}
                editableKeys={editableTableRowKeys}
                setEditableKeys={setEditableTableRowKeys}
                isLoading={createTaskIsLoading}
                equipmentIsLoading={equipmentIsFetching}
                currencies={currencies}
                currenciesIsLoading={currenciesIsFetching}
                equipmentsCatalog={equipmentsCatalog}
                equipmentsCatalogIsLoading={equipmentsCatalogIsFetching}
                equipmentsCatalogDisabled={!selectedRelocateFrom}
                onClickCreateImage={handleOpenCreateRelocationEquipmentImagesModal}
              />
            </Space>
          </Col>

          {/*<Col span={24}>*/}
          {/*  <Row justify='end' gutter={8}>*/}
          {/*    <Col>*/}
          {/*      <Button>*/}
          {/*        <Link to={WarehouseRouteEnum.RelocationTasks}>{CANCEL_TEXT}</Link>*/}
          {/*      </Button>*/}
          {/*    </Col>*/}

          {/*    <Col>*/}
          {/*      <Button*/}
          {/*        type='primary'*/}
          {/*        htmlType='submit'*/}
          {/*        loading={createTaskIsLoading}*/}
          {/*        disabled={relocateFromWarehouseIsFetching || relocateToWarehouseIsFetching}*/}
          {/*      >*/}
          {/*        Создать заявку*/}
          {/*      </Button>*/}
          {/*    </Col>*/}
          {/*  </Row>*/}
          {/*</Col>*/}
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
              onCancel={handleCloseCreateRelocationEquipmentImagesModal}
              tip='Загрузка модалки добавления изображений оборудования'
            />
          }
        >
          <CreateAttachmentsModal
            form={form}
            formItemName={equipmentImagesFormPath}
            open={createRelocationEquipmentImagesModalOpened}
            title='Добавить изображения оборудования'
            onCancel={handleCloseCreateRelocationEquipmentImagesModal}
            onCreate={createRelocationEquipmentImage}
            onDelete={deleteAttachment}
            isDeleting={deleteAttachmentIsLoading}
            defaultFileList={form.getFieldValue(equipmentImagesFormPath)}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default CreateRelocationTaskDraftPage
