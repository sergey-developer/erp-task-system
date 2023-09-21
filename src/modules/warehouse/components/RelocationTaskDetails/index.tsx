import { Col, Drawer, DrawerProps, Row, Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import { relocationTaskStatusDict } from 'modules/warehouse/constants/relocationTask'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'
import Spinner from 'components/Spinner'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import RelocationEquipmentTable from '../RelocationEquipmentTable'
import { RelocationTaskDetailsProps } from './types'

const { Text } = Typography

const RelocationTaskDetails: FC<RelocationTaskDetailsProps> = ({
  relocationTask,
  relocationTaskIsLoading,

  relocationEquipmentList,
  relocationEquipmentListIsLoading,
  onChangeEquipmentTable,

  ...props
}) => {
  const title: DrawerProps['title'] = relocationTaskIsLoading ? (
    <Space>
      <Text>Заявка на перемещение оборудования</Text>
      <Spinner centered={false} />
    </Space>
  ) : (
    `Заявка на перемещение оборудования ${valueOrHyphen(relocationTask?.relocateFrom?.title)} 🠖 ${
      relocationTask?.relocateTo?.title
    }`
  )

  return (
    <Drawer {...props} data-testid='relocation-task-details' placement='bottom' title={title}>
      <Row>
        <Col span={8}>
          <LoadingArea
            data-testid='relocation-task-details-loading'
            isLoading={relocationTaskIsLoading}
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
                    {<AttachmentList attachments={relocationTask.documents || []} />}
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
              dataSource={relocationEquipmentList}
              loading={relocationEquipmentListIsLoading}
              pagination={false}
              onChange={onChangeEquipmentTable}
            />
          </Space>
        </Col>
      </Row>
    </Drawer>
  )
}

export default RelocationTaskDetails
