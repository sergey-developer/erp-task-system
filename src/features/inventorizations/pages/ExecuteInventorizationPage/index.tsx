import { Button, Col, Flex, Row, Typography } from 'antd'
import ExecuteInventorizationReviseTab from 'features/inventorizations/components/ExecuteInventorizationReviseTab'
import {
  inventorizationStatusDict,
  inventorizationTypeDict,
} from 'features/inventorizations/constants'
import {
  makeInventorizationsPageLink,
  mapInventorizationWarehousesTitles,
} from 'features/inventorizations/helpers'
import { useCompleteInventorization } from 'features/inventorizations/hooks'
import { useLazyGetInventorizationReport } from 'features/reports/hooks'
import React, { FC } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'

import Spinner from 'components/Spinner'

import { MimetypeEnum } from 'shared/constants/mimetype'
import { MaybeNull } from 'shared/types/utils'
import { base64ToBytes, extractLocationState } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'
import { extractFileNameFromHeaders } from 'shared/utils/extractFileNameFromHeaders'
import { downloadFile } from 'shared/utils/file'

import { ExecuteInventorizationPageLocationState } from '../../types'
import { executeInventorizationPageTabNames, ExecuteInventorizationPageTabsEnum } from './constants'
import { TabsStyled } from './styles'

const ExecuteInventorizationDiscrepanciesTab = React.lazy(
  () => import('features/inventorizations/components/ExecuteInventorizationDiscrepanciesTab'),
)

const ExecuteInventorizationRelocationsTab = React.lazy(
  () => import('features/inventorizations/components/ExecuteInventorizationRelocationsTab'),
)

const { Text } = Typography

const ExecuteInventorizationPage: FC = () => {
  const params = useParams<'inventorizationId'>()
  const inventorizationId = Number(params.inventorizationId!)

  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const currentTab = searchParams.get('tab') as MaybeNull<ExecuteInventorizationPageTabsEnum>
  const relocationTaskDraftId = Number(searchParams.get('relocationTaskDraftId')) || undefined

  const location = useLocation()
  const locationState = extractLocationState<ExecuteInventorizationPageLocationState>(location)
  const inventorization = locationState?.inventorization

  const [getInventorizationReport, { isFetching: getInventorizationReportIsFetching }] =
    useLazyGetInventorizationReport()

  const [completeInventorizationMutation, { isLoading: completeInventorizationIsLoading }] =
    useCompleteInventorization()

  const onReturnToInventorizationDetails = () => {
    navigate(makeInventorizationsPageLink({ inventorizationId }))
  }

  const onCompleteInventorization = async () => {
    try {
      await completeInventorizationMutation({ inventorizationId }).unwrap()
      onReturnToInventorizationDetails()
    } catch {}
  }

  const onMakeReport = async () => {
    const { data } = await getInventorizationReport({ inventorizationId })

    if (data?.value && data?.meta?.response) {
      const fileName = extractFileNameFromHeaders(data.meta.response.headers)
      downloadFile(base64ToBytes(data.value), MimetypeEnum.Xlsx, fileName)
    }
  }

  return (
    <Flex data-testid='execute-inventorizationDetail-page' vertical gap='large'>
      {inventorization ? (
        <>
          <Row gutter={16}>
            <Col span={6}>
              <Flex vertical gap='small'>
                <Row>
                  <Col span={9}>
                    <Text type='secondary'>Тип:</Text>
                  </Col>

                  <Col span={15}>{inventorizationTypeDict[inventorization.type]}</Col>
                </Row>

                <Row>
                  <Col span={9}>
                    <Text type='secondary'>Статус:</Text>
                  </Col>

                  <Col span={15}>{inventorizationStatusDict[inventorization.status]}</Col>
                </Row>

                <Row>
                  <Col span={9}>
                    <Text type='secondary'>Срок выполнения:</Text>
                  </Col>

                  <Col span={15}>{formatDate(inventorization.deadlineAt)}</Col>
                </Row>
              </Flex>
            </Col>

            <Col span={7}>
              <Flex vertical gap='small'>
                <Row>
                  <Col span={6}>
                    <Text type='secondary'>Создано:</Text>
                  </Col>

                  <Col span={18}>{formatDate(inventorization.createdAt)}</Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <Text type='secondary'>Исполнитель:</Text>
                  </Col>

                  <Col span={18}>{inventorization.executor.fullName}</Col>
                </Row>

                <Row>
                  <Col span={6}>
                    <Text type='secondary'>Автор:</Text>
                  </Col>

                  <Col span={18}>{inventorization.createdBy.fullName}</Col>
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
                    {mapInventorizationWarehousesTitles(inventorization.warehouses)}
                  </Col>
                </Row>
              </Flex>
            </Col>

            <Col span={4}>
              <Flex vertical gap='small'>
                <Button
                  type='primary'
                  onClick={onCompleteInventorization}
                  loading={completeInventorizationIsLoading}
                >
                  Завершить инвентаризацию
                </Button>

                <Button onClick={onReturnToInventorizationDetails}>Вернуться в карточку</Button>

                <Button onClick={onMakeReport} loading={getInventorizationReportIsFetching}>
                  Сформировать отчет
                </Button>
              </Flex>
            </Col>
          </Row>

          <TabsStyled
            type='card'
            destroyInactiveTabPane
            defaultActiveKey={currentTab || ExecuteInventorizationPageTabsEnum.Revise}
            items={[
              {
                key: ExecuteInventorizationPageTabsEnum.Revise,
                label:
                  executeInventorizationPageTabNames[ExecuteInventorizationPageTabsEnum.Revise],
                children: <ExecuteInventorizationReviseTab inventorization={inventorization} />,
              },
              {
                key: ExecuteInventorizationPageTabsEnum.Discrepancies,
                label:
                  executeInventorizationPageTabNames[
                    ExecuteInventorizationPageTabsEnum.Discrepancies
                  ],
                children: (
                  <React.Suspense fallback={<Spinner tip='Загрузка вкладки расхождений' />}>
                    <ExecuteInventorizationDiscrepanciesTab inventorization={inventorization} />
                  </React.Suspense>
                ),
              },
              {
                key: ExecuteInventorizationPageTabsEnum.Relocations,
                label:
                  executeInventorizationPageTabNames[
                    ExecuteInventorizationPageTabsEnum.Relocations
                  ],
                children: (
                  <React.Suspense fallback={<Spinner tip='Загрузка вкладки перемещений' />}>
                    <ExecuteInventorizationRelocationsTab
                      inventorization={inventorization}
                      defaultRelocationTaskId={relocationTaskDraftId}
                    />
                  </React.Suspense>
                ),
              },
            ]}
          />
        </>
      ) : (
        <Text type='danger'>Отсутствуют данные об инвентаризации</Text>
      )}
    </Flex>
  )
}
export default ExecuteInventorizationPage
