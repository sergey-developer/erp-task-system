import { Button, Col, Flex, Row, Tabs, Typography } from 'antd'
import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import ChangeInfrastructureOrdersFormsTab from 'modules/infrastructures/components/ChangeInfrastructureOrdersFormsTab'
import { infrastructureStatusDict } from 'modules/infrastructures/constants'
import { useGetInfrastructure } from 'modules/infrastructures/hooks'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import GoBackButton from 'components/Buttons/GoBackButton'
import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { MaybeUndefined } from 'shared/types/utils'
import { valueOr } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import { changeInfrastructurePageTabNames, ChangeInfrastructurePageTabsEnum } from './constants'
import { ChangeInfrastructurePageLocationState } from './types'

const { Title, Text } = Typography

const ChangeInfrastructurePage: FC = () => {
  const location = useLocation()
  const locationState: MaybeUndefined<ChangeInfrastructurePageLocationState> = location.state
  const task = locationState?.task

  const params = useParams<'id'>()
  const infrastructureId = Number(params?.id) || undefined

  const { currentData: infrastructure, isFetching: infrastructureIsFetching } =
    useGetInfrastructure({ infrastructureId: infrastructureId! }, { skip: !infrastructureId })

  return (
    <div data-testid='change-infrastructure-page'>
      <LoadingArea data-testid='infrastructure-loading' isLoading={infrastructureIsFetching}>
        {infrastructure && (
          <Space $block direction='vertical' size='large'>
            <Space $block direction='vertical' size='large'>
              <Flex gap='small' align='end'>
                <Title level={4}>Изменение инфраструктуры по заявке</Title>

                {task?.recordId && (
                  <Button type='link' size='large'>
                    {task.recordId}
                  </Button>
                )}
              </Flex>

              <Row>
                <Col span={10}>
                  <Space $block direction='vertical' size='middle'>
                    <ReadonlyField
                      data-testid='executor'
                      label='Исполнитель'
                      value={valueOr(
                        task?.assignee,
                        (value) => (
                          <TaskAssignee
                            {...value}
                            showAvatar={false}
                            showPhone={false}
                            hasPopover
                          />
                        ),
                        'Не назначен',
                      )}
                    />

                    <ReadonlyField
                      data-testid='manager'
                      label='Менеджер по сопровождению'
                      value={valueOr(
                        infrastructure?.manager,
                        (value) => (
                          <TaskAssignee
                            {...value}
                            position={value.position?.title}
                            showAvatar={false}
                            showPhone={false}
                            hasPopover
                          />
                        ),
                        'Не назначен',
                      )}
                    />

                    <ReadonlyField
                      data-testid='status'
                      label='Статус'
                      value={valueOr(infrastructure.status, (value) => (
                        <Flex vertical gap='small'>
                          <Text>{infrastructureStatusDict[value.status]}</Text>

                          <Text type='secondary'>Установлен: {formatDate(value.createdAt)}</Text>
                        </Flex>
                      ))}
                    />
                  </Space>
                </Col>

                <Col span={3}>
                  <GoBackButton text='Вернуться' />
                </Col>
              </Row>
            </Space>

            <Tabs
              type='card'
              destroyInactiveTabPane
              defaultActiveKey={ChangeInfrastructurePageTabsEnum.OrderForm}
              items={[
                {
                  key: ChangeInfrastructurePageTabsEnum.OrderForm,
                  label:
                    changeInfrastructurePageTabNames[ChangeInfrastructurePageTabsEnum.OrderForm],
                  children: (
                    <ChangeInfrastructureOrdersFormsTab
                      infrastructureId={infrastructure.id}
                      manager={infrastructure.manager}
                    />
                  ),
                },
              ]}
            />
          </Space>
        )}
      </LoadingArea>
    </div>
  )
}

export default ChangeInfrastructurePage
