import { useBoolean } from 'ahooks'
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  DropdownProps,
  Flex,
  Input,
  MenuProps,
  Row,
  Select,
  Tooltip,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import Attachments from 'features/attachments/components/Attachments'
import { useIdBelongAuthUser } from 'features/auth/hooks'
import { getTasksPageLink } from 'features/task/utils/task'
import { UserPermissionsEnum } from 'features/user/constants'
import { useUserPermissions } from 'features/user/hooks'
import { ExecuteRelocationTaskModalProps } from 'features/warehouse/components/ExecuteRelocationTaskModal/types'
import RelocationEquipmentTable from 'features/warehouse/components/RelocationEquipmentTable'
import {
  RelocationEquipmentTableItem,
  RelocationEquipmentTableProps,
} from 'features/warehouse/components/RelocationEquipmentTable/types'
import { ReturnRelocationTaskToReworkModalProps } from 'features/warehouse/components/ReturnRelocationTaskToReworkModal/types'
import {
  cancelRelocationTaskMessages,
  closeRelocationTaskMessages,
  executeRelocationTaskMessages,
  externalRelocationStatusDict,
  externalRelocationStatusOptions,
  relocationTaskStatusDict,
  relocationTaskTypeDict,
  returnRelocationTaskToReworkMessages,
} from 'features/warehouse/constants/relocationTask'
import { WarehouseRouteEnum } from 'features/warehouse/constants/routes'
import { useGetRelocationEquipmentAttachments } from 'features/warehouse/hooks/relocationEquipment'
import {
  useCreateRelocationTaskAttachment,
  useGetRelocationEquipments,
  useGetRelocationTask,
  useGetRelocationTaskAttachments,
  useLazyGetRelocationTaskWaybillM15,
  useMoveRelocationTaskDraftToWork,
  useRelocationTaskStatus,
  useUpdateExternalRelocation,
} from 'features/warehouse/hooks/relocationTask'
import { UpdateExternalRelocationMutationArgs } from 'features/warehouse/models'
import {
  useCancelRelocationTaskMutation,
  useCloseRelocationTaskMutation,
  useExecuteRelocationTaskMutation,
  useReturnRelocationTaskToReworkMutation,
} from 'features/warehouse/services/relocationTaskApi.service'
import {
  getRelocateFromToTitle,
  getWaybillM15Filename,
  makeEditRelocationTaskDraftPageLink,
  makeEditRelocationTaskDraftPageLocationState,
  makeEditRelocationTaskPageLink,
  makeRelocationTasksPageLink,
} from 'features/warehouse/utils/relocationTask'
import isUndefined from 'lodash/isUndefined'
import React, { FC, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import UploadButton from 'components/Buttons/UploadButton'
import { DoubleRightArrowIcon, MenuIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/api/baseApi'
import { HEADER_HEIGHT } from 'shared/constants/common'
import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { base64ToBytes, valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { downloadFile, extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import EditableField from './EditableField'
import ReadonlyField from './ReadonlyField'
import { RelocationTaskDetailsProps } from './types'

const AttachmentListModal = React.lazy(
  () => import('features/attachments/components/AttachmentListModal'),
)

const CancelRelocationTaskModal = React.lazy(
  () => import('features/warehouse/components/CancelRelocationTaskModal'),
)

const ExecuteRelocationTaskModal = React.lazy(
  () => import('features/warehouse/components/ExecuteRelocationTaskModal'),
)

const ReturnRelocationTaskToReworkModal = React.lazy(
  () => import('features/warehouse/components/ReturnRelocationTaskToReworkModal'),
)

const ConfirmExecutionRelocationTaskModal = React.lazy(
  () => import('features/warehouse/components/ConfirmExecutionRelocationTaskModal'),
)

const ConfirmMoveRelocationTaskDraftToWorkModal = React.lazy(
  () => import('features/warehouse/components/ConfirmMoveRelocationTaskDraftToWorkModal'),
)

const { Text } = Typography

const dropdownTrigger: DropdownProps['trigger'] = ['click']
const showUploadListConfig: UploadProps['showUploadList'] = { showRemoveIcon: false }

const RelocationTaskDetails: FC<RelocationTaskDetailsProps> = ({
  relocationTaskId,
  refetchRelocationTasks,
  inventorization,
  ...props
}) => {
  const navigate = useNavigate()

  const permissions = useUserPermissions([
    UserPermissionsEnum.RelocationTasksRead,
    UserPermissionsEnum.RelocationTasksUpdate,
    UserPermissionsEnum.InventorizationUpdate,
  ])

  const inventorizationExecutorIsCurrentUser = useIdBelongAuthUser(inventorization?.executor.id)

  const [detailsStretched, { toggle: toggleStretchDetails }] = useBoolean(false)

  const [cancelTaskModalOpened, { toggle: toggleOpenCancelTaskModal }] = useBoolean()
  const debouncedToggleOpenCancelTaskModal = useDebounceFn(toggleOpenCancelTaskModal)

  const [returnToReworkModalOpened, { toggle: toggleOpenReturnToReworkModal }] = useBoolean()
  const debouncedToggleOpenReturnToReworkModal = useDebounceFn(toggleOpenReturnToReworkModal)

  const [executeTaskModalOpened, { toggle: toggleOpenExecuteTaskModal }] = useBoolean()
  const debouncedToggleOpenExecuteTaskModal = useDebounceFn(toggleOpenExecuteTaskModal)

  const [confirmExecutionModalOpened, { toggle: toggleOpenConfirmExecutionModal }] = useBoolean()
  const debouncedToggleOpenConfirmExecutionModal = useDebounceFn(toggleOpenConfirmExecutionModal)

  // move relocation task draft to work
  const [confirmMoveDraftToWorkModalOpened, { toggle: toggleOpenConfirmMoveDraftToWorkModal }] =
    useBoolean()

  const debouncedToggleOpenConfirmMoveDraftToWorkModal = useDebounceFn(
    toggleOpenConfirmMoveDraftToWorkModal,
  )

  const [
    moveRelocationTaskDraftToWorkMutation,
    { isLoading: moveRelocationTaskDraftToWorkIsLoading },
  ] = useMoveRelocationTaskDraftToWork()

  const onMoveRelocationTaskDraftToWork = async () => {
    try {
      await moveRelocationTaskDraftToWorkMutation({ relocationTaskId: relocationTaskId }).unwrap()
      toggleOpenConfirmMoveDraftToWorkModal()
      refetchRelocationTasks && refetchRelocationTasks()
    } catch (error) {
      console.error('Move relocation task draft to work error: ', { error, relocationTaskId })
    }
  }
  // move relocation task draft to work

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<RelocationEquipmentTableItem>()
  const [
    equipmentImagesModalOpened,
    { setTrue: openEquipmentImagesModal, setFalse: closeEquipmentImagesModal },
  ] = useBoolean()

  const onOpenEquipmentImagesModal: RelocationEquipmentTableProps['onClickImages'] = useDebounceFn(
    (event, equipment) => {
      event.stopPropagation()
      openEquipmentImagesModal()
      setActiveEquipmentRow(equipment)
    },
  )

  const onCloseEquipmentImagesModal = useDebounceFn(() => {
    closeEquipmentImagesModal()
    setActiveEquipmentRow(undefined)
  })

  const [
    relocationTaskAttachmentsModalOpened,
    { setTrue: openRelocationTaskAttachmentsModal, setFalse: closeRelocationTaskAttachmentsModal },
  ] = useBoolean()

  const onOpenRelocationTaskAttachmentsModal = useDebounceFn(openRelocationTaskAttachmentsModal)
  const onCloseRelocationTaskAttachmentsModal = useDebounceFn(closeRelocationTaskAttachmentsModal)

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId })

  const { currentData: relocationEquipments = [], isFetching: relocationEquipmentsIsFetching } =
    useGetRelocationEquipments({ relocationTaskId })

  const {
    currentData: relocationEquipmentAttachments = [],
    isFetching: relocationEquipmentAttachmentListIsFetching,
  } = useGetRelocationEquipmentAttachments(
    { relocationEquipmentId: activeEquipmentRow?.relocationEquipmentId! },
    { skip: !equipmentImagesModalOpened || !activeEquipmentRow },
  )

  const {
    currentData: relocationTaskAttachments = [],
    isFetching: relocationTaskAttachmentsIsFetching,
  } = useGetRelocationTaskAttachments(
    { relocationTaskId },
    { skip: !relocationTaskAttachmentsModalOpened },
  )

  const [getWaybillM15, { isFetching: getWaybillM15IsFetching }] =
    useLazyGetRelocationTaskWaybillM15()

  const [executeTaskMutation, { isLoading: executeTaskIsLoading }] =
    useExecuteRelocationTaskMutation()

  const [returnToReworkMutation, { isLoading: returnToReworkIsLoading }] =
    useReturnRelocationTaskToReworkMutation()

  const [cancelTaskMutation, { isLoading: cancelTaskIsLoading }] = useCancelRelocationTaskMutation()

  const [closeTaskMutation, { isLoading: closeTaskIsLoading }] = useCloseRelocationTaskMutation()

  const [createAttachment] = useCreateRelocationTaskAttachment()

  const [
    updateExternalRelocationMutation,
    { isLoading: updateExternalRelocationIsLoading, data: updatedExternalRelocation },
  ] = useUpdateExternalRelocation()

  const creatorIsCurrentUser = useIdBelongAuthUser(relocationTask?.createdBy?.id)
  const currentUserInExecutors = useIdBelongAuthUser(relocationTask?.executors)
  const completedByIsCurrentUser = useIdBelongAuthUser(relocationTask?.completedBy?.id)
  const controllerIsCurrentUser = useIdBelongAuthUser(relocationTask?.controller?.id)
  const relocationTaskStatus = useRelocationTaskStatus(relocationTask?.status)

  const onUpdateExternalRelocation =
    (fieldName: Extract<keyof UpdateExternalRelocationMutationArgs, 'number' | 'status'>) =>
    async (
      value:
        | UpdateExternalRelocationMutationArgs['number']
        | UpdateExternalRelocationMutationArgs['status'],
    ) => {
      await updateExternalRelocationMutation({ relocationTaskId, [fieldName]: value }).unwrap()
    }

  const handleCancelTask = async () => {
    try {
      await cancelTaskMutation({ relocationTaskId }).unwrap()
      toggleOpenCancelTaskModal()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (error.data.detail) {
          if (isBadRequestError(error)) {
            showErrorNotification(error.data.detail)
          } else if (isForbiddenError(error)) {
            showErrorNotification(error.data.detail)
          } else if (isNotFoundError(error)) {
            showErrorNotification(error.data.detail)
          } else {
            showErrorNotification(cancelRelocationTaskMessages.commonError)
          }
        }
      }
    }
  }

  const handleCloseTask = async () => {
    try {
      await closeTaskMutation({ relocationTaskId }).unwrap()
      toggleOpenConfirmExecutionModal()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (error.data.detail) {
          if (isBadRequestError(error)) {
            showErrorNotification(error.data.detail)
          } else if (isForbiddenError(error)) {
            showErrorNotification(error.data.detail)
          } else if (isNotFoundError(error)) {
            showErrorNotification(error.data.detail)
          } else {
            showErrorNotification(closeRelocationTaskMessages.commonError)
          }
        }
      }
    }
  }

  const handleGetWaybillM15 = useDebounceFn(async () => {
    const { data } = await getWaybillM15({ relocationTaskId })

    if (data) {
      downloadFile(base64ToBytes(data), MimetypeEnum.Pdf, getWaybillM15Filename(relocationTaskId))
    }
  }, [relocationTaskId])

  const handleReturnToRework: ReturnRelocationTaskToReworkModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    try {
      await returnToReworkMutation({ relocationTaskId, ...values }).unwrap()
      toggleOpenReturnToReworkModal()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))

          if (error.data.detail) {
            showErrorNotification(error.data.detail)
          }
        } else if (isForbiddenError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else if (isNotFoundError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else {
          showErrorNotification(returnRelocationTaskToReworkMessages.commonError)
        }
      }
    }
  }

  const handleExecuteTask: ExecuteRelocationTaskModalProps['onSubmit'] = async (
    values,
    setFields,
  ) => {
    try {
      await executeTaskMutation({
        relocationTaskId,
        documents: extractOriginFiles(values.documents),
      }).unwrap()

      toggleOpenExecuteTaskModal()
    } catch (error) {
      if (isErrorResponse(error)) {
        if (isBadRequestError(error)) {
          setFields(getFieldsErrors(error.data))

          if (error.data.detail) {
            showErrorNotification(error.data.detail)
          }
        } else if (isForbiddenError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else if (isNotFoundError(error) && error.data.detail) {
          showErrorNotification(error.data.detail)
        } else {
          showErrorNotification(executeRelocationTaskMessages.commonError)
        }
      }
    }
  }

  const handleCreateAttachment = useCallback<NonNullable<UploadProps['customRequest']>>(
    async (options) => {
      await createAttachment({ relocationTaskId }, options)
    },
    [createAttachment, relocationTaskId],
  )

  const draftMenuItems: MenuProps['items'] = [
    ...(permissions.relocationTasksUpdate && creatorIsCurrentUser
      ? [
          {
            key: 'Перевести черновик в работу',
            label: 'Перевести черновик в работу',
            onClick: debouncedToggleOpenConfirmMoveDraftToWorkModal,
          },
        ]
      : []),
    {
      key: 'Изменить черновик',
      label: 'Изменить черновик',
      disabled: !(
        permissions.relocationTasksUpdate &&
        permissions.inventorizationUpdate &&
        inventorizationExecutorIsCurrentUser
      ),
      onClick:
        relocationTask && inventorization
          ? () =>
              navigate(makeEditRelocationTaskDraftPageLink(relocationTaskId), {
                state: makeEditRelocationTaskDraftPageLocationState({
                  inventorization,
                  relocationTask,
                }),
              })
          : undefined,
    },
  ]

  const baseMenuItems: MenuProps['items'] = [
    {
      key: 'Сформировать накладную М-15',
      label: (
        <Space>
          {getWaybillM15IsFetching && <Spinner />}
          <Text>Сформировать накладную М-15</Text>
        </Space>
      ),
      disabled: !permissions.relocationTasksRead,
      onClick: handleGetWaybillM15,
    },
    {
      key: 'Изменить заявку',
      label: 'Изменить заявку',
      disabled:
        !permissions.relocationTasksUpdate ||
        !creatorIsCurrentUser ||
        relocationTaskStatus.isCanceled ||
        relocationTaskStatus.isClosed ||
        relocationTaskStatus.isCompleted,
      onClick: () => navigate(makeEditRelocationTaskPageLink(relocationTaskId)),
    },
    {
      key: 'Выполнить заявку',
      label: 'Выполнить заявку',
      disabled:
        !permissions.relocationTasksUpdate ||
        (!currentUserInExecutors && !completedByIsCurrentUser) ||
        relocationTaskStatus.isCanceled ||
        relocationTaskStatus.isClosed ||
        relocationTaskStatus.isCompleted,
      onClick: debouncedToggleOpenExecuteTaskModal,
    },
    {
      key: 'Вернуть на доработку',
      label: 'Вернуть на доработку',
      disabled:
        !permissions.relocationTasksUpdate ||
        !controllerIsCurrentUser ||
        !relocationTaskStatus.isCompleted,
      onClick: debouncedToggleOpenReturnToReworkModal,
    },
    {
      key: 'Отменить заявку',
      label: 'Отменить заявку',
      disabled:
        !permissions.relocationTasksUpdate ||
        !creatorIsCurrentUser ||
        relocationTaskStatus.isCanceled ||
        relocationTaskStatus.isClosed ||
        relocationTaskStatus.isCompleted,
      onClick: debouncedToggleOpenCancelTaskModal,
    },
    {
      key: 'Подтвердить выполнение',
      label: 'Подтвердить выполнение',
      disabled:
        !permissions.relocationTasksUpdate ||
        !controllerIsCurrentUser ||
        !relocationTaskStatus.isCompleted,
      onClick: debouncedToggleOpenConfirmExecutionModal,
    },
    {
      key: 'Сформировать пакет документов',
      label: 'Сформировать пакет документов',
      onClick: () =>
        navigate(WarehouseRouteEnum.CreateDocumentsPackage, {
          state: {
            relocationTask: { id: relocationTaskId },
            from: makeRelocationTasksPageLink({ viewRelocationTask: relocationTaskId }),
          },
        }),
    },
  ]

  const menuProps: MenuProps = {
    items: relocationTaskStatus.isDraft ? draftMenuItems : baseMenuItems,
  }

  return (
    <>
      <Drawer
        {...props}
        data-testid='relocation-task-details'
        placement='bottom'
        height={detailsStretched ? window.innerHeight - HEADER_HEIGHT : undefined}
        title={
          <Space>
            <Text>{getRelocateFromToTitle(relocationTask)}</Text>
            {relocationTaskIsFetching && <Spinner centered={false} />}
          </Space>
        }
        extra={
          <Space>
            <Dropdown menu={menuProps} trigger={dropdownTrigger}>
              <Button type='text' icon={<MenuIcon />} />
            </Dropdown>

            <Button
              type='text'
              icon={<DoubleRightArrowIcon rotate={detailsStretched ? -270 : 270} />}
              onClick={toggleStretchDetails}
            />
          </Space>
        }
      >
        <Row gutter={40}>
          <Col span={10}>
            <LoadingArea
              data-testid='relocation-task-details-loading'
              isLoading={relocationTaskIsFetching}
              tip='Загрузка заявки на перемещение оборудования...'
              area='block'
            >
              {relocationTask && (
                <Space $block direction='vertical' size='middle'>
                  <ReadonlyField
                    data-testid='type'
                    label='Тип заявки:'
                    value={relocationTaskTypeDict[relocationTask.type]}
                  />

                  <ReadonlyField
                    data-testid='deadline-at'
                    label='Срок выполнения:'
                    value={formatDate(relocationTask.deadlineAt)}
                  />

                  <ReadonlyField
                    data-testid='relocate-from'
                    label='Объект выбытия:'
                    value={valueOr(relocationTask.relocateFrom?.title)}
                  />

                  <ReadonlyField
                    data-testid='relocate-to'
                    label='Объект прибытия:'
                    value={valueOr(relocationTask.relocateTo?.title)}
                  />

                  <ReadonlyField
                    data-testid='executor'
                    rowProps={{ align: 'top' }}
                    label='Исполнитель:'
                    value={
                      relocationTask?.completedBy?.fullName || (
                        <Flex vertical gap={4}>
                          {relocationTask?.executors.map((e) => (
                            <Text key={e.id}>{e.fullName}</Text>
                          ))}
                        </Flex>
                      )
                    }
                  />

                  <ReadonlyField
                    data-testid='controller'
                    label='Контролер:'
                    value={valueOr(relocationTask.controller?.fullName)}
                  />

                  <ReadonlyField
                    data-testid='status'
                    label='Статус:'
                    value={relocationTaskStatusDict[relocationTask.status]}
                  />

                  {relocationTask.revision && (
                    <ReadonlyField
                      data-testid='return-reason'
                      label='Причина возврата:'
                      value={relocationTask.revision}
                      displayValue={
                        <Tooltip
                          title={
                            <Space direction='vertical'>
                              {formatDate(relocationTask.revision.createdAt, DATE_FORMAT)}

                              <Space>
                                {relocationTask.revision.user.fullName}
                                {relocationTask.revision.user.phone}
                              </Space>
                            </Space>
                          }
                        >
                          <Text type='warning'>{relocationTask.revision.text}</Text>
                        </Tooltip>
                      }
                    />
                  )}

                  <EditableField
                    data-testid='external-relocation-number'
                    label='Номер перемещения на портале заказчика:'
                    value={
                      isUndefined(updatedExternalRelocation?.number)
                        ? relocationTask.externalRelocation?.number
                        : updatedExternalRelocation?.number
                    }
                    forceDisplayValue
                    renderEditable={({ value, onChange }) => (
                      <Input allowClear value={value} onChange={(e) => onChange(e.target.value)} />
                    )}
                    onSave={onUpdateExternalRelocation('number')}
                    isLoading={updateExternalRelocationIsLoading}
                  />

                  <EditableField
                    data-testid='external-relocation-status'
                    label='Статус перемещения на портале заказчика:'
                    value={
                      updatedExternalRelocation?.status || relocationTask.externalRelocation?.status
                    }
                    forceDisplayValue
                    displayValue={
                      updatedExternalRelocation?.status
                        ? externalRelocationStatusDict[updatedExternalRelocation.status]
                        : relocationTask.externalRelocation?.status
                        ? externalRelocationStatusDict[relocationTask.externalRelocation.status]
                        : null
                    }
                    renderEditable={({ value, onChange }) => (
                      <Select
                        allowClear
                        popupMatchSelectWidth={200}
                        value={value}
                        onChange={(value) => onChange(value)}
                        options={externalRelocationStatusOptions}
                      />
                    )}
                    editButtonDisabled={
                      !relocationTask.externalRelocation && !updatedExternalRelocation?.number
                    }
                    onSave={onUpdateExternalRelocation('status')}
                    isLoading={updateExternalRelocationIsLoading}
                  />

                  <ReadonlyField
                    data-testid='created-by'
                    label='Инициатор:'
                    value={valueOr(relocationTask.createdBy?.fullName)}
                  />

                  <ReadonlyField
                    data-testid='created-at'
                    label='Создано:'
                    value={formatDate(relocationTask.createdAt)}
                  />

                  <ReadonlyField
                    data-testid='task'
                    label='Заявка ITSM:'
                    value={relocationTask.task}
                    displayValue={
                      relocationTask.task && (
                        <Link to={getTasksPageLink({ viewTask: relocationTask.task.id })}>
                          {relocationTask.task.recordId}
                        </Link>
                      )
                    }
                  />

                  <ReadonlyField
                    data-testid='comment'
                    label='Комментарий:'
                    value={valueOr(relocationTask.comment)}
                  />

                  <ReadonlyField
                    data-testid='documents'
                    label='Документы:'
                    value={relocationTask.documents}
                    displayValue={
                      <Space direction='vertical'>
                        <Upload
                          multiple
                          customRequest={handleCreateAttachment}
                          showUploadList={showUploadListConfig}
                          itemRender={(originNode, file) => (file.error ? null : originNode)}
                        >
                          <UploadButton label='Добавить вложение' />
                        </Upload>

                        {!!relocationTask.documents?.length && (
                          <Attachments data={relocationTask.documents} />
                        )}
                      </Space>
                    }
                  />

                  <Button onClick={onOpenRelocationTaskAttachmentsModal}>
                    Посмотреть общие фото
                  </Button>
                </Space>
              )}
            </LoadingArea>
          </Col>

          <Col span={14}>
            <Space direction='vertical'>
              <Text strong>Перечень оборудования</Text>

              <RelocationEquipmentTable
                dataSource={relocationEquipments}
                loading={relocationEquipmentsIsFetching}
                onClickImages={onOpenEquipmentImagesModal}
              />
            </Space>
          </Col>
        </Row>
      </Drawer>

      {executeTaskModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={executeTaskModalOpened}
              onCancel={debouncedToggleOpenExecuteTaskModal}
            />
          }
        >
          <ExecuteRelocationTaskModal
            open={executeTaskModalOpened}
            isLoading={executeTaskIsLoading}
            onCancel={debouncedToggleOpenExecuteTaskModal}
            onSubmit={handleExecuteTask}
          />
        </React.Suspense>
      )}

      {returnToReworkModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={returnToReworkModalOpened}
              onCancel={debouncedToggleOpenReturnToReworkModal}
            />
          }
        >
          <ReturnRelocationTaskToReworkModal
            open={returnToReworkModalOpened}
            isLoading={returnToReworkIsLoading}
            onCancel={debouncedToggleOpenReturnToReworkModal}
            onSubmit={handleReturnToRework}
          />
        </React.Suspense>
      )}

      {cancelTaskModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={cancelTaskModalOpened}
              onCancel={debouncedToggleOpenCancelTaskModal}
            />
          }
        >
          <CancelRelocationTaskModal
            open={cancelTaskModalOpened}
            isLoading={cancelTaskIsLoading}
            onCancel={debouncedToggleOpenCancelTaskModal}
            onConfirm={handleCancelTask}
          />
        </React.Suspense>
      )}

      {confirmExecutionModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open={confirmExecutionModalOpened}
              onCancel={debouncedToggleOpenConfirmExecutionModal}
            />
          }
        >
          <ConfirmExecutionRelocationTaskModal
            open={confirmExecutionModalOpened}
            isLoading={closeTaskIsLoading}
            onCancel={debouncedToggleOpenConfirmExecutionModal}
            onConfirm={handleCloseTask}
          />
        </React.Suspense>
      )}

      {confirmMoveDraftToWorkModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback open onCancel={debouncedToggleOpenConfirmMoveDraftToWorkModal} />
          }
        >
          <ConfirmMoveRelocationTaskDraftToWorkModal
            open={confirmMoveDraftToWorkModalOpened}
            isLoading={moveRelocationTaskDraftToWorkIsLoading}
            onCancel={debouncedToggleOpenConfirmMoveDraftToWorkModal}
            onConfirm={onMoveRelocationTaskDraftToWork}
          />
        </React.Suspense>
      )}

      {equipmentImagesModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={onCloseEquipmentImagesModal}
              tip='Загрузка модалки изображений оборудования'
            />
          }
        >
          <AttachmentListModal
            open={equipmentImagesModalOpened}
            title='Изображения оборудования'
            data={relocationEquipmentAttachments}
            onCancel={onCloseEquipmentImagesModal}
            isLoading={relocationEquipmentAttachmentListIsFetching}
          />
        </React.Suspense>
      )}

      {relocationTaskAttachmentsModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={onCloseRelocationTaskAttachmentsModal}
              tip='Загрузка модалки общих фотографий к перемещению'
            />
          }
        >
          <AttachmentListModal
            open={relocationTaskAttachmentsModalOpened}
            title='Общие фотографии к перемещению'
            data={relocationTaskAttachments}
            onCancel={onCloseRelocationTaskAttachmentsModal}
            isLoading={relocationTaskAttachmentsIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default RelocationTaskDetails
