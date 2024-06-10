import { Card, Col, Drawer, DrawerProps, Flex, Row, Typography } from 'antd'
import React, { FC } from 'react'

import AttachmentList from 'modules/task/components/AttachmentList'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { useGetInventorization } from 'modules/warehouse/hooks/inventorization'

import LoadingArea from 'components/LoadingArea'

import { IdType } from 'shared/types/common'
import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { cardBodyStyles } from './styles'
import { groupNomenclatures } from './utils'

const { Text } = Typography

export type InventorizationDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> & {
  inventorizationId: IdType
  height?: number
}

const InventorizationDetails: FC<InventorizationDetailsProps> = ({
  height,
  inventorizationId,
  ...props
}) => {
  const { currentData: inventorization, isFetching: inventorizationIsFetching } =
    useGetInventorization({ inventorizationId })

  const nomenclatures = inventorization ? groupNomenclatures(inventorization.nomenclatures) : {}

  return (
    <Drawer
      {...props}
      width={530}
      data-testid='inventorization-details'
      title='Поручение на инвентаризацию'
      styles={height ? { wrapper: { top: 'unset', height } } : undefined}
      mask={false}
    >
      <LoadingArea
        data-testid='inventorization-details-loading'
        isLoading={inventorizationIsFetching}
      >
        {inventorization && (
          <Flex vertical gap='middle'>
            <Flex vertical gap='middle'>
              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Тип:</Text>
                </Col>

                <Col span={14}>{inventorizationTypeDict[inventorization.type]}</Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Описание:</Text>
                </Col>

                <Col span={14}>{valueOrHyphen(inventorization.description)}</Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Вложения:</Text>
                </Col>

                <Col span={14}>
                  {valueOrHyphen(inventorization.attachments, (value) => (
                    <AttachmentList data={value} />
                  ))}
                </Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Склады:</Text>
                </Col>

                <Col span={14}>{inventorization.warehouses.map((w) => w.title).join(', ')}</Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Срок выполнения:</Text>
                </Col>

                <Col span={14}>{formatDate(inventorization.deadlineAt)}</Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Исполнитель:</Text>
                </Col>

                <Col span={14}>{inventorization.executor.fullName}</Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Статус:</Text>
                </Col>

                <Col span={14}>{inventorizationStatusDict[inventorization.status]}</Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Автор:</Text>
                </Col>

                <Col span={14}>{inventorization.createdBy.fullName}</Col>
              </Row>

              <Row align='middle'>
                <Col span={10}>
                  <Text type='secondary'>Создано:</Text>
                </Col>

                <Col span={14}>{formatDate(inventorization.createdAt)}</Col>
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
        )}
      </LoadingArea>
    </Drawer>
  )
}

export default InventorizationDetails
