import { Button, Col, Drawer, Dropdown, DropdownProps, MenuProps, Row, Typography } from 'antd'
import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useCheckUserAuthenticated } from 'modules/auth/hooks'
import AttachmentList from 'modules/task/components/AttachmentList'
import { getTaskListPageLink } from 'modules/task/utils/task'
import { useMatchUserPermissions } from 'modules/user/hooks'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'
import {
  useGetRelocationEquipmentList,
  useGetRelocationTask,
  useLazyGetRelocationTaskWaybillM15,
  useRelocationTaskStatus,
} from 'modules/warehouse/hooks/relocationTask'
import {
  getEditRelocationTaskPageLink,
  getRelocationTaskTitle,
  getWaybillM15Filename,
} from 'modules/warehouse/utils/relocationTask'

import { MenuIcon } from 'components/Icons'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { useDebounceFn } from 'shared/hooks/useDebounceFn'
import { base64ToArrayBuffer, clickDownloadLink, valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import RelocationEquipmentTable from '../RelocationEquipmentTable'
import { RelocationTaskDetailsProps } from './types'

const { Text } = Typography

const dropdownTrigger: DropdownProps['trigger'] = ['click']

const RelocationTaskDetails: FC<RelocationTaskDetailsProps> = ({ relocationTaskId, ...props }) => {
  const navigate = useNavigate()

  const userPermissions = useMatchUserPermissions([
    'RELOCATION_TASKS_READ',
    'RELOCATION_TASKS_UPDATE',
  ])

  const { currentData: relocationTask, isFetching: relocationTaskIsFetching } =
    useGetRelocationTask({ relocationTaskId })

  const {
    currentData: relocationEquipmentList = [],
    isFetching: relocationEquipmentListIsFetching,
  } = useGetRelocationEquipmentList({ relocationTaskId })

  const [getWaybillM15, { isFetching: getWaybillM15IsFetching }] =
    useLazyGetRelocationTaskWaybillM15()

  const creatorIsCurrentUser = useCheckUserAuthenticated(relocationTask?.createdBy?.id)
  const relocationTaskStatus = useRelocationTaskStatus(relocationTask?.status)

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
        key: 2,
        label: 'Изменить заявку',
        disabled:
          !userPermissions?.relocationTasksUpdate ||
          !creatorIsCurrentUser ||
          relocationTaskStatus.isCanceled ||
          relocationTaskStatus.isClosed ||
          relocationTaskStatus.isCompleted,
        onClick: () => navigate(getEditRelocationTaskPageLink(relocationTaskId)),
      },
    ],
  }

  return (
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

                <Row data-testid='task'>
                  <Col span={8}>
                    <Text type='secondary'>Заявка ITSM:</Text>
                  </Col>

                  {relocationTask.task && (
                    <Col span={16}>
                      <Link to={getTaskListPageLink(relocationTask.task.id)}>
                        {relocationTask.task.recordId}
                      </Link>
                    </Col>
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

                  {!!relocationTask.documents?.length && (
                    <Col span={16}>
                      <AttachmentList data={relocationTask.documents} />
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
              dataSource={relocationEquipmentList}
              loading={relocationEquipmentListIsFetching}
            />
          </Space>
        </Col>
      </Row>
    </Drawer>
  )
}

export default RelocationTaskDetails
