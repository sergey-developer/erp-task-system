import { Col, Row, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, useMemo } from 'react'

import LabeledData from 'components/LabeledData'
import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'
import { TaskDetailsModel } from 'modules/task/features/TaskView/models'
import getOlaStatusTextType from 'modules/task/utils/getOlaStatusTextType'

import { DetailsContainerStyled } from '../styles'
import { RecordIdStyled } from './styles'
import { getCompleteAt } from './utils'

const { Text, Title } = Typography

export type MainDetailsProps = Pick<
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
  olaStatus,
  olaNextBreachTime,
  olaEstimatedTime,
}) => {
  const breakpoints = useBreakpoint()

  const completeAtTime = useMemo(() => {
    const olaStatusTextType = getOlaStatusTextType(olaStatus)
    const completeAt = getCompleteAt({
      olaStatus,
      olaEstimatedTime,
      olaNextBreachTime,
    })
    console.log({ completeAt })
    return (
      <Typography.Text type={olaStatusTextType}>{completeAt}</Typography.Text>
    )
  }, [olaEstimatedTime, olaStatus, olaNextBreachTime])

  return (
    <DetailsContainerStyled
      data-testid='task-details-main'
      $breakpoints={breakpoints}
    >
      <Space direction='vertical' size='middle' $block>
        <SeparatedText>
          <RecordIdStyled type='secondary' ellipsis={{ tooltip: recordId }}>
            {recordId}
          </RecordIdStyled>

          {olaNextBreachTime && completeAtTime}
        </SeparatedText>

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

              {!!address && <Text>{address}</Text>}
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
    </DetailsContainerStyled>
  )
}

export default MainDetails
