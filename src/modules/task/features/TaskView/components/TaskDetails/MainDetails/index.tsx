import { Col, Row, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import getOlaStatusMap from 'modules/task/utils/getOlaStatusMap'
import getOlaStatusTextType from 'modules/task/utils/getOlaStatusTextType'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import formatDate from 'shared/utils/date/formatDate'
import makeString from 'shared/utils/string/makeString'

import { DetailsContainerStyled } from '../styles'
import { RecordIdStyled } from './styles'
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
  | 'contactPhone'
  | 'portablePhone'
>

const MainDetails: FC<MainDetailsProps> = ({
  recordId,
  title,
  createdAt,
  name,
  address,
  contactService,
  contactPhone,
  portablePhone,
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
    <DetailsContainerStyled $breakpoints={breakpoints}>
      <Space direction='vertical' size='middle' $block>
        <SeparatedText>
          <RecordIdStyled type='secondary' ellipsis={{ tooltip: recordId }}>
            {recordId}
          </RecordIdStyled>

          {rawOlaNextBreachTime && olaNextBreachTime}
        </SeparatedText>

        <Space direction='vertical' size={4} $block>
          <Title level={4} ellipsis title={title}>
            {title}
          </Title>

          <Text>{formatDate(createdAt, DATE_TIME_FORMAT)}</Text>
        </Space>

        <Row justify='space-between'>
          <Col span={11}>
            <LabeledData label='Адрес' block>
              <Text strong ellipsis>
                {name}
              </Text>

              {!!address && <Text ellipsis>{address}</Text>}
            </LabeledData>
          </Col>

          <Col span={11}>
            <LabeledData label='Заявитель' block>
              <Text strong>{contactService}</Text>

              <Text>{contactPhone}</Text>

              <Text>{portablePhone}</Text>
            </LabeledData>
          </Col>
        </Row>
      </Space>
    </DetailsContainerStyled>
  )
}

export default MainDetails
