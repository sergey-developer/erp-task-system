import { useBoolean } from 'ahooks'
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Dropdown,
  DropdownProps,
  MenuProps,
  Row,
  Tooltip,
  Typography,
} from 'antd'
import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import AttachmentList from 'modules/task/components/AttachmentList'
import { useMatchUserPermissions } from 'modules/user/hooks'
import {
  cancelRelocationTaskMessages,
  closeRelocationTaskMessages,
  executeRelocationTaskMessages,
  relocationTaskStatusDict,
  returnRelocationTaskToReworkMessages,
} from 'modules/warehouse/constants/relocationTask'
import { useGetRelocationEquipmentAttachmentList } from 'modules/warehouse/hooks/relocationEquipment'
import {
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
  getWaybillM15Filename,
} from 'modules/warehouse/utils/relocationTask'

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

import { ExecuteRelocationTaskModalProps } from '../ExecuteRelocationTaskModal/types'
import RelocationEquipmentTable from '../RelocationEquipmentTable'
import { RelocationEquipmentTableItem } from '../RelocationEquipmentTable/types'
import { ReturnRelocationTaskToReworkModalProps } from '../ReturnRelocationTaskToReworkModal/types'
import { RelocationTaskDetailsProps } from './types'

const AttachmentListModal = React.lazy(
  () => import('modules/attachment/components/AttachmentListModal'),
)

const CancelRelocationTaskModal = React.lazy(() => import('../CancelRelocationTaskModal'))

const ConfirmExecutionRelocationTaskModal = React.lazy(
  () => import('../ConfirmExecutionRelocationTaskModal'),
)

const ReturnRelocationTaskToReworkModal = React.lazy(
  () => import('../ReturnRelocationTaskToReworkModal'),
)

const ExecuteRelocationTaskModal = React.lazy(() => import('../ExecuteRelocationTaskModal'))

const { Text } = Typography

const dropdownTrigger: DropdownProps['trigger'] = ['click']

const RelocationTaskDetails: FC<RelocationTaskDetailsProps> = ({ relocationTaskId, ...props }) => {
  const navigate = useNavigate()

  const permissions = useMatchUserPermissions(['RELOCATION_TASKS_READ', 'RELOCATION_TASKS_UPDATE'])

  const [executeTaskModalOpened, { toggle: toggleOpenExecuteTaskModal }] = useBoolean()
  const debouncedToggleOpenExecuteTaskModal = useDebounceFn(toggleOpenExecuteTaskModal)

  const [cancelTaskModalOpened, { toggle: toggleOpenCancelTaskModal }] = useBoolean()
  const debouncedToggleOpenCancelTaskModal = useDebounceFn(toggleOpenCancelTaskModal)

  const [returnToReworkModalOpened, { toggle: toggleOpenReturnToReworkModal }] = useBoolean()
  const debouncedToggleOpenReturnToReworkModal = useDebounceFn(toggleOpenReturnToReworkModal)

  const [confirmExecutionModalOpened, { toggle: toggleOpenConfirmExecutionModal }] = useBoolean()
  const debouncedToggleOpenConfirmExecutionModal = useDebounceFn(toggleOpenConfirmExecutionModal)

  const [activeEquipment, setActiveEquipment] = useState<RelocationEquipmentTableItem>()
  const [
    equipmentImagesModalOpened,
    { setTrue: openEquipmentImagesModal, setFalse: closeEquipmentImagesModal },
  ] = useBoolean()

  const handleOpenEquipmentImagesModal = useDebounceFn((event, equipment) => {
    event.stopPropagation()
    openEquipmentImagesModal()
    setActiveEquipment(equipment)
  })

  const handleCloseEquipmentImagesModal = useDebounceFn(() => {
    closeEquipmentImagesModal()
    setActiveEquipment(undefined)
  })

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId })

  const { currentData: relocationEquipments = [], isFetching: relocationEquipmentsIsFetching } =
    useGetRelocationEquipmentList({ relocationTaskId })

  const {
    currentData: relocationEquipmentAttachmentList = [],
    isFetching: relocationEquipmentAttachmentListIsFetching,
  } = useGetRelocationEquipmentAttachmentList(
    { relocationEquipmentId: activeEquipment?.id! },
    { skip: !equipmentImagesModalOpened || !activeEquipment },
  )

  const [getWaybillM15, { isFetching: getWaybillM15IsFetching }] =
    useLazyGetRelocationTaskWaybillM15()

  const [closeRelocationTaskMutation, { isLoading: closeRelocationTaskIsLoading }] =
    useCloseRelocationTaskMutation()

  const [returnToReworkMutation, { isLoading: returnToReworkIsLoading }] =
    useReturnRelocationTaskToReworkMutation()

  const [cancelRelocationTaskMutation, { isLoading: cancelRelocationTaskIsLoading }] =
    useCancelRelocationTaskMutation()

  const [executeRelocationTaskMutation, { isLoading: executeRelocationTaskIsLoading }] =
    useExecuteRelocationTaskMutation()

  const creatorIsCurrentUser = useCheckUserAuthenticated(relocationTask?.createdBy?.id)
  const executorIsCurrentUser = useCheckUserAuthenticated(relocationTask?.executor?.id)
  const relocationTaskStatus = useRelocationTaskStatus(relocationTask?.status)

  const handleCloseTask = async () => {
    try {
      await closeRelocationTaskMutation({ relocationTaskId }).unwrap()
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

  const handleCancelTask = async () => {
    try {
      await cancelRelocationTaskMutation({ relocationTaskId }).unwrap()
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

  const handleGetWaybillM15 = useDebounceFn(async () => {
    try {
      const waybillM15 = await getWaybillM15({ relocationTaskId }).unwrap()

      if (waybillM15) {
        clickDownloadLink(
          base64ToArrayBuffer(waybillM15),
          MimetypeEnum.Pdf,
          getWaybillM15Filename(relocationTaskId),
        )
      }
    } catch {}
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
      await executeRelocationTaskMutation({
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

  const title: DrawerProps['title'] = relocationTaskIsFetching ? (
    <Space>
      <Text>Заявка на перемещение оборудования</Text>
      <Spinner centered={false} />
    </Space>
  ) : (
    `Заявка на перемещение оборудования ${valueOrHyphen(
      relocationTask?.relocateFrom?.title,
    )} 🠖 ${valueOrHyphen(relocationTask?.relocateTo?.title)}`
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
          !creatorIsCurrentUser ||
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
          !executorIsCurrentUser ||
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
          !executorIsCurrentUser ||
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
        title={title}
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
                  <Row data-testid='deadline-at'>
                    <Col span={8}>
                      <Text type='secondary'>Срок выполнения:</Text>
                    </Col>

                    <Col span={16}>{formatDate(relocationTask.deadlineAt)}</Col>
                  </Row>

                  <Row data-testid='relocate-from'>
                    <Col span={8}>
                      <Text type='secondary'>Объект выбытия:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.relocateFrom?.title)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='relocate-to'>
                    <Col span={8}>
                      <Text type='secondary'>Объект прибытия:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.relocateTo?.title)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='executor'>
                    <Col span={8}>
                      <Text type='secondary'>Исполнитель:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.executor?.fullName)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='status'>
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

                  <Row data-testid='created-by'>
                    <Col span={8}>
                      <Text type='secondary'>Инициатор:</Text>
                    </Col>

                    <Col span={16}>
                      <Text>{valueOrHyphen(relocationTask.createdBy?.fullName)}</Text>
                    </Col>
                  </Row>

                  <Row data-testid='created-at'>
                    <Col span={8}>
                      <Text type='secondary'>Создано:</Text>
                    </Col>

                    <Col span={16}>{formatDate(relocationTask.createdAt)}</Col>
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

                    {!!relocationTask.documents?.length && (
                      <Col span={16}>
                        <AttachmentList attachments={relocationTask.documents} />
                      </Col>
                    )}
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
            isLoading={closeRelocationTaskIsLoading}
            onCancel={debouncedToggleOpenConfirmExecutionModal}
            onConfirm={handleCloseTask}
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
            isLoading={cancelRelocationTaskIsLoading}
            onCancel={debouncedToggleOpenCancelTaskModal}
            onConfirm={handleCancelTask}
          />
        </React.Suspense>
      )}

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
            isLoading={executeRelocationTaskIsLoading}
            onCancel={debouncedToggleOpenExecuteTaskModal}
            onSubmit={handleExecuteTask}
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
