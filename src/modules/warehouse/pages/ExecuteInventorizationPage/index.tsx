import { Button, Col, Flex, Row, Typography } from 'antd'
import React, { FC } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useIdBelongAuthUser } from 'modules/auth/hooks'
import { UserPermissionsEnum } from 'modules/user/constants'
import { useUserPermissions } from 'modules/user/hooks'
import ExecuteInventorizationReviseTab from 'modules/warehouse/components/ExecuteInventorizationReviseTab'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'modules/warehouse/constants/inventorization'
import { useCompleteInventorization } from 'modules/warehouse/hooks/inventorization'
import { ExecuteInventorizationPageLocationState } from 'modules/warehouse/types'
import {
  checkInventorizationStatusIsInProgress,
  checkInventorizationStatusIsNew,
  getInventorizationsPageLink,
  mapInventorizationWarehousesTitles,
} from 'modules/warehouse/utils/inventorization'

import Spinner from 'components/Spinner'

import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { TabsStyled } from './styles'

const ExecuteInventorizationDiscrepanciesTab = React.lazy(
  () => import('modules/warehouse/components/ExecuteInventorizationDiscrepanciesTab'),
)

const { Text } = Typography

enum ExecuteInventorizationPageTabsEnum {
  Revise = 'Revise',
  Discrepancies = 'Discrepancies',
  Relocations = 'Relocations',
}

const ExecuteInventorizationPage: FC = () => {
  const params = useParams<'id'>()
  const location = useLocation()
  const navigate = useNavigate()
  const inventorization = location.state as ExecuteInventorizationPageLocationState
  const inventorizationId = Number(params.id!)

  const permissions = useUserPermissions([UserPermissionsEnum.InventorizationUpdate])
  const executorIsCurrentUser = useIdBelongAuthUser(inventorization?.executor.id)

  const [completeInventorizationMutation, { isLoading: completeInventorizationIsLoading }] =
    useCompleteInventorization()

  const onReturnToInventorizationDetails = () => {
    navigate(getInventorizationsPageLink({ inventorizationId }))
  }

  const onCompleteInventorization = async () => {
    try {
      await completeInventorizationMutation({ inventorizationId }).unwrap()
      onReturnToInventorizationDetails()
    } catch {}
  }

  return (
    <Flex data-testid='execute-inventorization-page' vertical gap='large'>
      <Row gutter={16}>
        <Col span={6}>
          <Flex vertical gap='small'>
            <Row>
              <Col span={9}>
                <Text type='secondary'>Тип:</Text>
              </Col>

              <Col span={15}>
                {valueOrHyphen(inventorization?.type, (value) => inventorizationTypeDict[value])}
              </Col>
            </Row>

            <Row>
              <Col span={9}>
                <Text type='secondary'>Статус:</Text>
              </Col>

              <Col span={15}>
                {valueOrHyphen(
                  inventorization?.status,
                  (value) => inventorizationStatusDict[value],
                )}
              </Col>
            </Row>

            <Row>
              <Col span={9}>
                <Text type='secondary'>Срок выполнения:</Text>
              </Col>

              <Col span={15}>
                {valueOrHyphen(inventorization?.deadlineAt, (value) => formatDate(value))}
              </Col>
            </Row>
          </Flex>
        </Col>

        <Col span={7}>
          <Flex vertical gap='small'>
            <Row>
              <Col span={6}>
                <Text type='secondary'>Создано:</Text>
              </Col>

              <Col span={18}>
                {valueOrHyphen(inventorization?.createdAt, (value) => formatDate(value))}
              </Col>
            </Row>

            <Row>
              <Col span={6}>
                <Text type='secondary'>Исполнитель:</Text>
              </Col>

              <Col span={18}>{valueOrHyphen(inventorization?.executor.fullName)}</Col>
            </Row>

            <Row>
              <Col span={6}>
                <Text type='secondary'>Автор:</Text>
              </Col>

              <Col span={18}>{valueOrHyphen(inventorization?.createdBy.fullName)}</Col>
            </Row>
          </Flex>
        </Col>

        <Col span={7}>
          <Flex vertical gap='small'>
            <Row>
              <Col span={6}>
                <Text type='secondary'>Склады:</Text>
              </Col>

              <Col span={18}>
                {valueOrHyphen(inventorization?.warehouses, (value) =>
                  mapInventorizationWarehousesTitles(value),
                )}
              </Col>
            </Row>
          </Flex>
        </Col>

        <Col span={4}>
          <Flex vertical gap='small'>
            {inventorization &&
              permissions.inventorizationUpdate &&
              executorIsCurrentUser &&
              (checkInventorizationStatusIsNew(inventorization.status) ||
                checkInventorizationStatusIsInProgress(inventorization.status)) && (
                <Button
                  type='primary'
                  onClick={onCompleteInventorization}
                  loading={completeInventorizationIsLoading}
                >
                  Завершить инвентаризацию
                </Button>
              )}

            <Button onClick={onReturnToInventorizationDetails}>Вернуться в карточку</Button>
          </Flex>
        </Col>
      </Row>

      <TabsStyled
        type='card'
        destroyInactiveTabPane
        defaultActiveKey={ExecuteInventorizationPageTabsEnum.Revise}
        items={[
          {
            key: ExecuteInventorizationPageTabsEnum.Revise,
            label: 'Сверка',
            children: <ExecuteInventorizationReviseTab inventorizationId={inventorizationId} />,
          },
          {
            key: ExecuteInventorizationPageTabsEnum.Discrepancies,
            label: 'Расхождения',
            children: (
              <React.Suspense fallback={<Spinner tip='Загрузка вкладки расхождений' />}>
                <ExecuteInventorizationDiscrepanciesTab inventorizationId={inventorizationId} />
              </React.Suspense>
            ),
          },
        ]}
      />
    </Flex>
  )
}

export default ExecuteInventorizationPage
