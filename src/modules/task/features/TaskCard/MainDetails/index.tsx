import { Col, Row, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import { taskStatusDict } from 'modules/task/constants/dictionary'
import TaskStatus from 'modules/task/features/TaskStatus'
import {
  badgeByTaskStatus,
  iconByTaskStatus,
} from 'modules/task/features/TaskStatus/constants'
import { TaskModel } from 'modules/task/models'
import getOlaStatusTextType from 'modules/task/utils/getOlaStatusTextType'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'

import { RecordIdStyled } from './styles'
import { getCompleteAt, parseResponseTime } from './utils'

const { Text, Title } = Typography

export type MainDetailsProps = Pick<
  TaskModel,
  | 'recordId'
  | 'title'
  | 'status'
  | 'createdAt'
  | 'name'
  | 'address'
  | 'contactService'
  | 'olaStatus'
  | 'olaNextBreachTime'
  | 'olaEstimatedTime'
  | 'contactPhone'
  | 'portablePhone'
  | 'responseTime'
  | 'workGroup'
>

const MainDetails: FC<MainDetailsProps> = ({
  recordId,
  status,
  title,
  createdAt,
  name,
  address,
  contactService,
  contactPhone,
  portablePhone,
  olaStatus,
  olaNextBreachTime,
  olaEstimatedTime,
  responseTime: rawResponseTime,
  workGroup,
}) => {
  const { olaStatusTextType, completeAt } = useMemo(() => {
    const olaStatusTextType = getOlaStatusTextType(olaStatus)
    const completeAt = getCompleteAt({
      olaStatus,
      olaEstimatedTime,
      olaNextBreachTime,
    })

    return { olaStatusTextType, completeAt }
  }, [olaEstimatedTime, olaStatus, olaNextBreachTime])

  const responseTime = useMemo(
    () => parseResponseTime(rawResponseTime, workGroup),
    [rawResponseTime, workGroup],
  )
  console.log({ rawResponseTime, workGroup, responseTime })
  return (
    <Space
      data-testid='task-card-main-details'
      direction='vertical'
      size='middle'
      $block
    >
      <Space direction='vertical' $block>
        <SeparatedText>
          <RecordIdStyled type='secondary' ellipsis={{ tooltip: recordId }}>
            {recordId}
          </RecordIdStyled>

          <Space>
            {olaNextBreachTime && (
              <Text type={olaStatusTextType}>{completeAt}</Text>
            )}

            <TaskStatus
              status={status}
              text={taskStatusDict[status]}
              icon={iconByTaskStatus[status]}
              badge={badgeByTaskStatus[status]}
            />
          </Space>
        </SeparatedText>

        {responseTime && (
          <Space>
            <Text>
              Срок реакции:{' '}
              <Text type={responseTime.type}>{responseTime.value}</Text>
            </Text>
          </Space>
        )}
      </Space>

      <Space direction='vertical' size={4} $block>
        <Title level={4} ellipsis title={title}>
          {title}
        </Title>

        <Text>{createdAt}</Text>
      </Space>

      <Row justify='space-between'>
        <Col span={11}>
          <LabeledData label='Адрес'>
            <Text strong>{name}</Text>

            <Text>{address ? address : 'Не определено'}</Text>
          </LabeledData>
        </Col>

        <Col span={11}>
          <LabeledData label='Заявитель'>
            <Text strong>{contactService}</Text>

            {contactPhone && <Text>{contactPhone}</Text>}

            {portablePhone && <Text>{portablePhone}</Text>}
          </LabeledData>
        </Col>
      </Row>
    </Space>
  )
}

export default MainDetails
