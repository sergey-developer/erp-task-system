import { Button, Card, Col, Drawer, DrawerProps, Flex, Row, Typography } from 'antd'
import Attachments from 'features/attachments/components/Attachments'
import { useIdBelongAuthUser } from 'features/auth/hooks'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'features/inventorizations/constants'
import { useGetInventorization } from 'features/inventorizations/hooks'
import { UserPermissionsEnum } from 'features/users/api/constants'
import { useUserPermissions } from 'features/users/hooks'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import LoadingArea from 'components/LoadingArea'

import { valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { RequestWithInventorization } from '../../api/types'
import {
  checkInventorizationStatusIsInProgress,
  checkInventorizationStatusIsNew,
  makeExecuteInventorizationPageLink,
  makeExecuteInventorizationPageLocationState,
  mapInventorizationWarehousesTitles,
} from '../../helpers'
import { cardBodyStyles } from './styles'
import { groupNomenclatures } from './utils'

const { Text } = Typography

export type InventorizationDetailsProps = Required<Pick<DrawerProps, 'onClose' | 'open'>> &
  Pick<RequestWithInventorization, 'inventorizationId'> & {
    height?: number
  }

const InventorizationDetails: FC<InventorizationDetailsProps> = ({
  height,
  inventorizationId,
  ...props
}) => {
  const navigate = useNavigate()
  const permissions = useUserPermissions([UserPermissionsEnum.InventorizationUpdate])

  const { currentData: inventorization, isFetching: inventorizationIsFetching } =
    useGetInventorization({ inventorizationId })

  const nomenclatures = inventorization ? groupNomenclatures(inventorization.nomenclatures) : {}

  const executorIsCurrentUser = useIdBelongAuthUser(inventorization?.executor.id)

  const onClickExecuteInventorization = () =>
    navigate(makeExecuteInventorizationPageLink({ inventorizationId }), {
      state: makeExecuteInventorizationPageLocationState(inventorization!),
    })

  const drawerFooter = (
    <Row justify='end'>
      <Col>
        <Button
          type='primary'
          disabled={
            !(
              !!inventorization &&
              permissions.inventorizationUpdate &&
              executorIsCurrentUser &&
              (checkInventorizationStatusIsNew(inventorization.status) ||
                checkInventorizationStatusIsInProgress(inventorization.status))
            )
          }
          onClick={onClickExecuteInventorization}
        >
          Провести инвентаризацию
        </Button>
      </Col>
    </Row>
  )

  return (
    <Drawer
      {...props}
      width={530}
      data-testid='inventorizationDetail-details'
      title='Поручение на инвентаризацию'
      styles={height ? { wrapper: { top: 'unset', height } } : undefined}
      mask={false}
      footer={drawerFooter}
    >
      <LoadingArea
        data-testid='inventorizationDetail-details-loading'
        isLoading={inventorizationIsFetching}
      >
        {inventorization && (
          <Flex vertical gap='middle'>
            <Flex vertical gap='middle'>
              <Row>
                <Col span={10}>
                  <Text type='secondary'>Тип:</Text>
                </Col>

                <Col span={14}>{inventorizationTypeDict[inventorization.type]}</Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Text type='secondary'>Описание:</Text>
                </Col>

                <Col span={14}>{valueOr(inventorization.description)}</Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Text type='secondary'>Вложения:</Text>
                </Col>

                <Col span={14}>
                  {valueOr(inventorization.attachments, (value) => (
                    <Attachments data={value} />
                  ))}
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Text type='secondary'>Склады:</Text>
                </Col>

                <Col span={14}>
                  {mapInventorizationWarehousesTitles(inventorization.warehouses)}
                </Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Text type='secondary'>Срок выполнения:</Text>
                </Col>

                <Col span={14}>{formatDate(inventorization.deadlineAt)}</Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Text type='secondary'>Исполнитель:</Text>
                </Col>

                <Col span={14}>{inventorization.executor.fullName}</Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Text type='secondary'>Статус:</Text>
                </Col>

                <Col span={14}>{inventorizationStatusDict[inventorization.status]}</Col>
              </Row>

              <Row>
                <Col span={10}>
                  <Text type='secondary'>Автор:</Text>
                </Col>

                <Col span={14}>{inventorization.createdBy.fullName}</Col>
              </Row>

              <Row>
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
