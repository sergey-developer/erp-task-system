import { useBoolean } from 'ahooks'
import {
  Button,
  Col,
  Drawer,
  Dropdown,
  DropdownProps,
  MenuProps,
  Row,
  Tooltip,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import React, { FC, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useIdBelongAuthUser } from 'modules/auth/hooks'
import AttachmentList from 'modules/task/components/AttachmentList'
import { getTaskListPageLink } from 'modules/task/utils/task'
import { useMatchUserPermissions } from 'modules/user/hooks'
import { ExecuteRelocationTaskModalProps } from 'modules/warehouse/components/ExecuteRelocationTaskModal/types'
import RelocationEquipmentTable from 'modules/warehouse/components/RelocationEquipmentTable'
import {
  RelocationEquipmentTableItem,
  RelocationEquipmentTableProps,
} from 'modules/warehouse/components/RelocationEquipmentTable/types'
import { ReturnRelocationTaskToReworkModalProps } from 'modules/warehouse/components/ReturnRelocationTaskToReworkModal/types'
import {
  cancelRelocationTaskMessages,
  closeRelocationTaskMessages,
  executeRelocationTaskMessages,
  relocationTaskStatusDict,
  relocationTaskTypeDict,
  returnRelocationTaskToReworkMessages,
} from 'modules/warehouse/constants/relocationTask'
import { useGetRelocationEquipmentAttachmentList } from 'modules/warehouse/hooks/relocationEquipment'
import {
  useCreateRelocationTaskAttachment,
  useGetRelocationEquipmentList,
  useGetRelocationTask,
  useLazyGetRelocationTaskWaybillM15,
  useRelocationTaskStatus,
} from 'modules/warehouse/hooks/relocationTask'
import {
  useCancelRelocationTaskMutation,
  useCloseRelocationTaskMutation,
  useExecuteRelocationTaskMutation,
  useReturnRelocationTaskToReworkMutation,
} from 'modules/warehouse/services/relocationTaskApi.service'
import {
  getEditRelocationTaskPageLink,
  getRelocationTaskTitle,
  getWaybillM15Filename,
} from 'modules/warehouse/utils/relocationTask'

import UploadButton from 'components/Buttons/UploadButton'
import { MenuIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { DATE_FORMAT } from 'shared/constants/dateTime'
import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import {
  isBadRequestError,
  isErrorResponse,
  isForbiddenError,
  isNotFoundError,
} from 'shared/services/baseApi'
import { base64ToArrayBuffer, clickDownloadLink, valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { extractOriginFiles } from 'shared/utils/file'
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'

import { RelocationTaskDetailsProps } from './types'

const AttachmentListModal = React.lazy(
  () => import('modules/attachment/components/AttachmentListModal'),
)

const CancelRelocationTaskModal = React.lazy(
  () => import('modules/warehouse/components/CancelRelocationTaskModal'),
)

const ExecuteRelocationTaskModal = React.lazy(
  () => import('modules/warehouse/components/ExecuteRelocationTaskModal'),
)

const ReturnRelocationTaskToReworkModal = React.lazy(
  () => import('modules/warehouse/components/ReturnRelocationTaskToReworkModal'),
)

const ConfirmExecutionRelocationTaskModal = React.lazy(
  () => import('modules/warehouse/components/ConfirmExecutionRelocationTaskModal'),
)

const { Text } = Typography

const dropdownTrigger: DropdownProps['trigger'] = ['click']
const showUploadListConfig: UploadProps['showUploadList'] = { showRemoveIcon: false }

const RelocationTaskDetails: FC<RelocationTaskDetailsProps> = ({ relocationTaskId, ...props }) => {
  const navigate = useNavigate()

  const permissions = useMatchUserPermissions(['RELOCATION_TASKS_READ', 'RELOCATION_TASKS_UPDATE'])

  const [cancelTaskModalOpened, { toggle: toggleOpenCancelTaskModal }] = useBoolean()
  const debouncedToggleOpenCancelTaskModal = useDebounceFn(toggleOpenCancelTaskModal)

  const [returnToReworkModalOpened, { toggle: toggleOpenReturnToReworkModal }] = useBoolean()
  const debouncedToggleOpenReturnToReworkModal = useDebounceFn(toggleOpenReturnToReworkModal)

  const [executeTaskModalOpened, { toggle: toggleOpenExecuteTaskModal }] = useBoolean()
  const debouncedToggleOpenExecuteTaskModal = useDebounceFn(toggleOpenExecuteTaskModal)

  const [confirmExecutionModalOpened, { toggle: toggleOpenConfirmExecutionModal }] = useBoolean()
  const debouncedToggleOpenConfirmExecutionModal = useDebounceFn(toggleOpenConfirmExecutionModal)

  const [activeEquipmentRow, setActiveEquipmentRow] = useState<RelocationEquipmentTableItem>()
  const [
    equipmentImagesModalOpened,
    { setTrue: openEquipmentImagesModal, setFalse: closeEquipmentImagesModal },
  ] = useBoolean()

  const handleOpenEquipmentImagesModal: RelocationEquipmentTableProps['onClickImages'] =
    useDebounceFn((event, equipment) => {
      event.stopPropagation()
      openEquipmentImagesModal()
      setActiveEquipmentRow(equipment)
    })

  const handleCloseEquipmentImagesModal = useDebounceFn(() => {
    closeEquipmentImagesModal()
    setActiveEquipmentRow(undefined)
  })

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId })

  const { currentData: relocationEquipments = [], isFetching: relocationEquipmentsIsFetching } =
    useGetRelocationEquipmentList({ relocationTaskId })

  const {
    currentData: relocationEquipmentAttachmentList = [],
    isFetching: relocationEquipmentAttachmentListIsFetching,
  } = useGetRelocationEquipmentAttachmentList(
    { relocationEquipmentId: activeEquipmentRow?.relocationEquipmentId! },
    { skip: !equipmentImagesModalOpened || !activeEquipmentRow },
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

  const creatorIsCurrentUser = useIdBelongAuthUser(relocationTask?.createdBy?.id)
  const executorIsCurrentUser = useIdBelongAuthUser(relocationTask?.executor?.id)
  const controllerIsCurrentUser = useIdBelongAuthUser(relocationTask?.controller?.id)
  const relocationTaskStatus = useRelocationTaskStatus(relocationTask?.status)

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
      clickDownloadLink(
        base64ToArrayBuffer(data),
        MimetypeEnum.Pdf,
        getWaybillM15Filename(relocationTaskId),
      )
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

  const menuProps: MenuProps = {
    items: [
      {
        key: 1,
        label: (
          <Space>
            {getWaybillM15IsFetching && <Spinner />}
            <Text>Сформировать накладную М-15</Text>
          </Space>
        ),
        disabled: !permissions?.relocationTasksRead,
        onClick: handleGetWaybillM15,
      },
      {
        key: 2,
        label: 'Изменить заявку',
        disabled:
          !permissions?.relocationTasksUpdate ||
          !creatorIsCurrentUser ||
          relocationTaskStatus.isCanceled ||
          relocationTaskStatus.isClosed ||
          relocationTaskStatus.isCompleted,
        onClick: () => navigate(getEditRelocationTaskPageLink(relocationTaskId)),
      },
      {
        key: 3,
        label: 'Выполнить заявку',
        disabled:
          !permissions?.relocationTasksUpdate ||
          !executorIsCurrentUser ||
          relocationTaskStatus.isCanceled ||
          relocationTaskStatus.isClosed ||
          relocationTaskStatus.isCompleted,
        onClick: debouncedToggleOpenExecuteTaskModal,
      },
      {
        key: 4,
        label: 'Вернуть на доработку',
        disabled:
          !permissions?.relocationTasksUpdate ||
          !controllerIsCurrentUser ||
          !relocationTaskStatus.isCompleted,
        onClick: debouncedToggleOpenReturnToReworkModal,
      },
      {
        key: 5,
        label: 'Отменить заявку',
        disabled:
          !permissions?.relocationTasksUpdate ||
          !creatorIsCurrentUser ||
          relocationTaskStatus.isCanceled ||
          relocationTaskStatus.isClosed ||
          relocationTaskStatus.isCompleted,
        onClick: debouncedToggleOpenCancelTaskModal,
      },
      {
        key: 6,
        label: 'Подтвердить выполнение',
        disabled:
          !permissions?.relocationTasksUpdate ||
          !controllerIsCurrentUser ||
          !relocationTaskStatus.isCompleted,
        onClick: debouncedToggleOpenConfirmExecutionModal,
      },
    ],
  }

  return (
    <>
      <Drawer
        {...props}
        data-testid='relocation-task-details'
        placement='bottom'
        title={
          <Space>
            <Text>{getRelocationTaskTitle(relocationTask)}</Text>
            {relocationTaskIsFetching && <Spinner centered={false} />}
          </Space>
        }
        extra={
          <Dropdown menu={menuProps} trigger={dropdownTrigger}>
            <Button type='text' icon={<MenuIcon />} />
          </Dropdown>
        }
      >
        <Row gutter={40}>
          <Col span={8}>
            <LoadingArea
              data-testid='relocation-task-details-loading'
              isLoading={relocationTaskIsFetching}
              tip='Загрузка заявки на перемещение оборудования...'
              area='block'
            >
              {relocationTask && (
                <Space $block direction='vertical' size='middle'>
                  <Row data-testid='type' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Тип заявки:</Text>
                    </Col>

                    <Col span={16}>{relocationTaskTypeDict[relocationTask.type]}</Col>
                  </Row>

                  <Row data-testid='deadline-at' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Срок выполнения:</Text>
                    </Col>

                    <Col span={16}>{formatDate(relocationTask.deadlineAt)}</Col>
                  </Row>

                  <Row data-testid='relocate-from' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Объект выбытия:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.relocateFrom?.title)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='relocate-to' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Объект прибытия:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.relocateTo?.title)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='executor' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Исполнитель:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.executor?.fullName)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='controller' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Контролер:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.controller?.fullName)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='status' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Статус:</Text>
                    </Col>

                    <Col span={16}>{relocationTaskStatusDict[relocationTask.status]}</Col>
                  </Row>

                  {relocationTask.revision && (
                    <Row data-testid='return-reason'>
                      <Col span={8}>
                        <Text type='secondary'>Причина возврата:</Text>
                      </Col>

                      <Col span={16}>
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
                      </Col>
                    </Row>
                  )}

                  <Row data-testid='created-by' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Инициатор:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.createdBy?.fullName)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='created-at' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Создано:</Text>
                    </Col>

                    <Col span={16}>{formatDate(relocationTask.createdAt)}</Col>
                  </Row>

                  <Row data-testid='task' align='middle'>
                    <Col span={8}>
                      <Text type='secondary'>Заявка ITSM:</Text>
                    </Col>

                    {relocationTask.task ? (
                      <Col span={16}>
                        <Link to={getTaskListPageLink({ viewTaskId: relocationTask.task.id })}>
                          {relocationTask.task.recordId}
                        </Link>
                      </Col>
                    ) : (
                      valueOrHyphen(relocationTask.task)
                    )}
                  </Row>

                  <Row data-testid='comment'>
                    <Col span={8}>
                      <Text type='secondary'>Комментарий:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.comment)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='documents'>
                    <Col span={8}>
                      <Text type='secondary'>Документы:</Text>
                    </Col>

                    <Col span={16}>
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
                          <AttachmentList data={relocationTask.documents} />
                        )}
                      </Space>
                    </Col>
                  </Row>
                </Space>
              )}
            </LoadingArea>
          </Col>

          <Col span={16}>
            <Space direction='vertical'>
              <Text strong>Перечень оборудования</Text>

              <RelocationEquipmentTable
                dataSource={relocationEquipments}
                loading={relocationEquipmentsIsFetching}
                onClickImages={handleOpenEquipmentImagesModal}
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

      {equipmentImagesModalOpened && (
        <React.Suspense
          fallback={
            <ModalFallback
              open
              onCancel={handleCloseEquipmentImagesModal}
              tip='Загрузка модалки изображений оборудования'
            />
          }
        >
          <AttachmentListModal
            open={equipmentImagesModalOpened}
            title='Изображения оборудования'
            data={relocationEquipmentAttachmentList}
            onCancel={handleCloseEquipmentImagesModal}
            isLoading={relocationEquipmentAttachmentListIsFetching}
          />
        </React.Suspense>
      )}
    </>
  )
}

export default RelocationTaskDetails
