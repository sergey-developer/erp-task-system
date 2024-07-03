import { Button, Col, Flex, Row, Typography } from 'antd'
import { FC } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { infrastructureStatusDict } from 'modules/infrastructures/constants'
import { useGetInfrastructure } from 'modules/infrastructures/hooks'
import TaskAssignee from 'modules/task/components/TaskAssignee'
import ReadonlyField from 'modules/warehouse/components/RelocationTaskDetails/ReadonlyField'

import LoadingArea from 'components/LoadingArea'
import Space from 'components/Space'

import { MaybeUndefined } from 'shared/types/utils'
import { valueOrHyphen } from 'shared/utils/common'
import { formatDate } from 'shared/utils/date'

import GoBackButton from '../../../../components/Buttons/GoBackButton'
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
                    value={valueOrHyphen(task?.assignee, (value) => (
                      <TaskAssignee {...value} showAvatar={false} showPhone={false} hasPopover />
                    ))}
                  />

                  <ReadonlyField
                    data-testid='status'
                    label='Статус'
                    value={valueOrHyphen(infrastructure.status, (value) => (
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
        )}
      </LoadingArea>
    </div>
  )
}

export default ChangeInfrastructurePage
