import { Card, Col, Drawer, DrawerProps, Flex, Row, Typography } from 'antd'
import React, { FC } from 'react'

import {
  inventorizationStatusDict,
  InventorizationStatusEnum,
  inventorizationTypeDict,
  InventorizationTypeEnum,
} from 'modules/warehouse/constants/inventorization'
import { InventorizationModel } from 'modules/warehouse/models'

import LoadingArea from 'components/LoadingArea'

import { IdType } from 'shared/types/common'
import { formatDate } from 'shared/utils/date'

import { cardBodyStyles } from './styles'
import { groupNomenclatures } from './utils'

const { Text } = Typography

export type InventorizationDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> & {
  inventorizationId: IdType
  height?: number
}

const response: InventorizationModel = {
  id: 1,
  status: InventorizationStatusEnum.New,
  createdAt: new Date().toISOString(),
  createdBy: { id: 1, fullName: 'createdBy' },
  deadlineAt: new Date().toISOString(),
  type: InventorizationTypeEnum.Internal,
  completedAt: new Date().toISOString(),
  executor: { id: 1, fullName: 'createdBy' },
  warehouses: [
    { id: 1, title: 'warehouse 1' },
    { id: 2, title: 'warehouse 2' },
  ],
  nomenclatures: [
    {
      id: 1,
      title: 'nomenclature 1',
      nomenclaturesGroup: { id: 1, title: 'nomenclaturesGroup 1' },
    },
    {
      id: 2,
      title: 'nomenclature 2',
      nomenclaturesGroup: { id: 2, title: 'nomenclaturesGroup 2' },
    },
    {
      id: 3,
      title: 'nomenclature 3',
      nomenclaturesGroup: { id: 2, title: 'nomenclaturesGroup 2' },
    },
    {
      id: 4,
      title: 'nomenclature 4',
      nomenclaturesGroup: { id: 1, title: 'nomenclaturesGroup 1' },
    },
    {
      id: 5,
      title: 'nomenclature 5',
      nomenclaturesGroup: { id: 1, title: 'nomenclaturesGroup 1' },
    },
    {
      id: 6,
      title: 'nomenclature 6',
      nomenclaturesGroup: { id: 1, title: 'nomenclaturesGroup 1' },
    },
    {
      id: 7,
      title: 'nomenclature 7',
      nomenclaturesGroup: { id: 1, title: 'nomenclaturesGroup 1' },
    },
  ],
}

const InventorizationDetails: FC<InventorizationDetailsProps> = ({
  height,
  inventorizationId,
  ...props
}) => {
  const nomenclatures = groupNomenclatures(response.nomenclatures)

  return (
    <Drawer
      {...props}
      width={530}
      data-testid='inventorization-details'
      title='Поручение на инвентаризацию'
      styles={height ? { wrapper: { top: 'unset', height } } : undefined}
      mask={false}
    >
      <LoadingArea isLoading={false}>
        <Flex vertical gap='middle'>
          <Flex vertical gap='middle'>
            <Row align='middle'>
              <Col span={10}>
                <Text type='secondary'>Тип:</Text>
              </Col>

              <Col span={14}>{inventorizationTypeDict[response.type]}</Col>
            </Row>

            <Row align='middle'>
              <Col span={10}>
                <Text type='secondary'>Склады:</Text>
              </Col>

              <Col span={14}>{response.warehouses.map((w) => w.title).join(', ')}</Col>
            </Row>

            <Row align='middle'>
              <Col span={10}>
                <Text type='secondary'>Срок выполнения:</Text>
              </Col>

              <Col span={14}>{formatDate(response.deadlineAt)}</Col>
            </Row>

            <Row align='middle'>
              <Col span={10}>
                <Text type='secondary'>Исполнитель:</Text>
              </Col>

              <Col span={14}>{response.executor.fullName}</Col>
            </Row>

            <Row align='middle'>
              <Col span={10}>
                <Text type='secondary'>Статус:</Text>
              </Col>

              <Col span={14}>{inventorizationStatusDict[response.status]}</Col>
            </Row>

            <Row align='middle'>
              <Col span={10}>
                <Text type='secondary'>Автор:</Text>
              </Col>

              <Col span={14}>{response.createdBy.fullName}</Col>
            </Row>

            <Row align='middle'>
              <Col span={10}>
                <Text type='secondary'>Создано:</Text>
              </Col>

              <Col span={14}>{formatDate(response.createdAt)}</Col>
            </Row>
          </Flex>

          <Card bodyStyle={cardBodyStyles}>
            <Flex vertical gap='middle'>
              <Text strong>Номенклатура</Text>

              {Object.keys(nomenclatures).map((groupName, index) => (
                <Row key={index}>
                  <Col span={10}>
                    <Text type='secondary'>{groupName}</Text>
                  </Col>

                  <Col span={14}>
                    <Flex vertical gap='small'>
                      {nomenclatures[groupName].map((nom, index) => (
                        <Text key={index}>{nom.title}</Text>
                      ))}
                    </Flex>
                  </Col>
                </Row>
              ))}
            </Flex>
          </Card>
        </Flex>
      </LoadingArea>
    </Drawer>
  )
}

export default InventorizationDetails
