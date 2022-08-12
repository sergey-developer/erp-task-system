import { Col, Row, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'

import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'
import { TaskDetailsModel } from 'modules/task/components/TaskView/models'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'
import getOlaStatusTextType from 'modules/task/utils/getOlaStatusTextType'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'
import makeString from 'shared/utils/string/makeString'

import { DetailContainerStyled } from '../styles'
import { getTaskRemainingTime } from './utils'

const { Text, Title } = Typography

type MainDetailsProps = Pick<
  TaskDetailsModel,
  | 'recordId'
  | 'title'
  | 'createdAt'
  | 'name'
  | 'address'
  | 'contactService'
  | 'olaStatus'
  | 'olaNextBreachTime'
  | 'olaEstimatedTime'
>

const MainDetails: FC<MainDetailsProps> = ({
  recordId,
  title,
  createdAt,
  name,
  address,
  contactService,
  olaStatus: rawOlaStatus,
  olaNextBreachTime: rawOlaNextBreachTime,
  olaEstimatedTime,
}) => {
  const breakpoints = useBreakpoint()

  const olaNextBreachTime = useMemo(() => {
    const olaStatus = getOlaStatusMap(rawOlaStatus)

    const formattedOlaNextBreachTime = formatDate(
      rawOlaNextBreachTime,
      DATE_TIME_FORMAT,
    )

    const taskRemainingTime = olaStatus.isHalfExpired
      ? getTaskRemainingTime(olaEstimatedTime)
      : null

    const olaNextBreachTimeText = makeString(
      ' ',
      'до',
      formattedOlaNextBreachTime,
      taskRemainingTime,
    )

    const olaStatusTextType = getOlaStatusTextType(rawOlaStatus)

    return (
      <Typography.Text type={olaStatusTextType}>
        {olaNextBreachTimeText}
      </Typography.Text>
    )
  }, [olaEstimatedTime, rawOlaStatus, rawOlaNextBreachTime])

  return (
    <DetailContainerStyled $breakpoints={breakpoints}>
      <Space direction='vertical' size='middle' $block>
        <SeparatedText>
          <Text type='secondary' ellipsis className='break-text'>
            {recordId}
          </Text>

          {rawOlaNextBreachTime && olaNextBreachTime}
        </SeparatedText>

        <Space direction='vertical' size={4}>
          <Title level={4} ellipsis className='break-text'>
            {title}
          </Title>

          <Text>{formatDate(createdAt, DATE_TIME_FORMAT)}</Text>
        </Space>

        <Row justify='space-between'>
          <Col span={12}>
            <Space direction='vertical'>
              <Text type='secondary'>Адрес</Text>

              <Text strong ellipsis className='break-text'>
                {name}
              </Text>

              {address && (
                <Text ellipsis className='break-text'>
                  {address}
                </Text>
              )}
            </Space>
          </Col>

          <Col span={10}>
            <Space direction='vertical'>
              <Text type='secondary'>Заявитель</Text>

              <Text strong ellipsis className='break-text'>
                {contactService}
              </Text>
            </Space>
          </Col>
        </Row>
      </Space>
    </DetailContainerStyled>
  )
}

export default MainDetails
