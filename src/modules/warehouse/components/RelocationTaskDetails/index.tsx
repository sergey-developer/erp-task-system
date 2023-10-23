import { useBoolean, useSetState } from 'ahooks'
import {
  Button,
  Col,
  Drawer,
  DrawerProps,
  Dropdown,
  DropdownProps,
  MenuProps,
  Row,
  Typography,
} from 'antd'
import React, { FC, useCallback } from 'react'

import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import AttachmentList from 'modules/task/components/AttachmentList'
import { useMatchUserPermissions } from 'modules/user/hooks'
import {
  relocationTaskStatusDict,
  returnRelocationTaskToReworkMessages,
} from 'modules/warehouse/constants/relocationTask'
import {
  useGetRelocationEquipmentList,
  useGetRelocationTask,
  useLazyGetRelocationTaskWaybillM15,
  useRelocationTaskStatus,
} from 'modules/warehouse/hooks/relocationTask'
import { GetRelocationEquipmentListQueryArgs } from 'modules/warehouse/models'
import { useReturnRelocationTaskToReworkMutation } from 'modules/warehouse/services/relocationTaskApi.service'
import { getWaybillM15Filename } from 'modules/warehouse/utils/relocationTask'

import { MenuIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import ModalFallback from 'components/Modals/ModalFallback'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

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
import { getFieldsErrors } from 'shared/utils/form'
import { showErrorNotification } from 'shared/utils/notifications'
import { calculatePaginationParams, getInitialPaginationParams } from 'shared/utils/pagination'

import RelocationEquipmentTable from '../RelocationEquipmentTable'
import { RelocationEquipmentTableProps } from '../RelocationEquipmentTable/types'
import { ReturnRelocationTaskToReworkModalProps } from '../ReturnRelocationTaskToReworkModal/types'
import { RelocationTaskDetailsProps } from './types'

const ReturnRelocationTaskToReworkModal = React.lazy(
  () => import('../ReturnRelocationTaskToReworkModal'),
)

const { Text } = Typography

const dropdownTrigger: DropdownProps['trigger'] = ['click']
const initialRelocationEquipmentListParams = getInitialPaginationParams()

const RelocationTaskDetails: FC<RelocationTaskDetailsProps> = ({ relocationTaskId, ...props }) => {
  const userPermissions = useMatchUserPermissions([
    'RELOCATION_TASKS_READ',
    'RELOCATION_TASKS_UPDATE',
  ])

  const [returnToReworkModalOpened, { toggle: toggleOpenReturnToReworkModal }] = useBoolean()
  const debouncedToggleOpenReturnToReworkModal = useDebounceFn(toggleOpenReturnToReworkModal)

  const [relocationEquipmentListParams, setRelocationEquipmentListParams] = useSetState<
    Omit<GetRelocationEquipmentListQueryArgs, 'relocationTaskId'>
  >(initialRelocationEquipmentListParams)

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId: relocationTaskId! }, { skip: !relocationTaskId })

  const { currentData: relocationEquipmentList, isFetching: relocationEquipmentListIsFetching } =
    useGetRelocationEquipmentList(
      { relocationTaskId: relocationTaskId!, ...relocationEquipmentListParams },
      { skip: !relocationTaskId },
    )

  const [getWaybillM15, { isFetching: getWaybillM15IsFetching }] =
    useLazyGetRelocationTaskWaybillM15()

  const [returnToReworkMutation, { isLoading: returnToReworkIsLoading }] =
    useReturnRelocationTaskToReworkMutation()

  const executorIsCurrentUser = useCheckUserAuthenticated(relocationTask?.executor?.id)
  const relocationTaskStatus = useRelocationTaskStatus(relocationTask?.status)

  const handleGetWaybillM15 = useDebounceFn(async () => {
    if (!relocationTaskId) return

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

  const handleTablePagination = useCallback(
    (pagination: Parameters<RelocationEquipmentTableProps['onChange']>[0]) => {
      setRelocationEquipmentListParams(calculatePaginationParams(pagination))
    },
    [setRelocationEquipmentListParams],
  )

  const handleChangeTable = useCallback<RelocationEquipmentTableProps['onChange']>(
    (pagination) => {
      handleTablePagination(pagination)
    },
    [handleTablePagination],
  )

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
        disabled: !userPermissions?.relocationTasksRead,
        onClick: handleGetWaybillM15,
      },
      {
        key: 4,
        label: 'Вернуть на доработку',
        disabled:
          !userPermissions?.relocationTasksUpdate ||
          !executorIsCurrentUser ||
          !relocationTaskStatus.isCompleted,
        onClick: debouncedToggleOpenReturnToReworkModal,
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

                    <Col span={16}>{valueOrHyphen(relocationTask.relocateFrom?.title)}</Col>
                  </Row>

                  <Row data-testid='relocate-to'>
                    <Col span={8}>
                      <Text type='secondary'>Объект прибытия:</Text>
                    </Col>

                    <Col span={16}>{valueOrHyphen(relocationTask.relocateTo?.title)}</Col>
                  </Row>

                  <Row data-testid='executor'>
                    <Col span={8}>
                      <Text type='secondary'>Исполнитель:</Text>
                    </Col>

                    <Col span={16}>{valueOrHyphen(relocationTask.executor?.fullName)}</Col>
                  </Row>

                  <Row data-testid='status'>
                    <Col span={8}>
                      <Text type='secondary'>Статус:</Text>
                    </Col>

                    <Col span={16}>{relocationTaskStatusDict[relocationTask.status]}</Col>
                  </Row>

                  <Row data-testid='created-by'>
                    <Col span={8}>
                      <Text type='secondary'>Инициатор:</Text>
                    </Col>

                    <Col span={16}>{valueOrHyphen(relocationTask.createdBy?.fullName)}</Col>
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

                    <Col span={16}>{valueOrHyphen(relocationTask.comment)}</Col>
                  </Row>

                  <Row data-testid='documents'>
                    <Col span={8}>
                      <Text type='secondary'>Документы:</Text>
                    </Col>

                    <Col span={16}>
                      {!!relocationTask.documents?.length && (
                        <AttachmentList attachments={relocationTask.documents} />
                      )}
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
                dataSource={relocationEquipmentList?.results || []}
                pagination={relocationEquipmentList?.pagination || false}
                loading={relocationEquipmentListIsFetching}
                onChange={handleChangeTable}
              />
            </Space>
          </Col>
        </Row>
      </Drawer>

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
    </>
  )
}

export default RelocationTaskDetails
