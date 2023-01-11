import { Button, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC } from 'react'

import { QuestionCircleIcon } from 'components/Icons'
import Space from 'components/Space'
import SeparatedText from 'components/Texts/SeparatedText'
import { UserModel } from 'modules/user/models'
import { getShortUserName } from 'modules/user/utils'
import { DATE_TIME_FORMAT } from 'shared/constants/dateTime'
import { commonEllipsisConfig } from 'shared/constants/text'
import formatDate from 'shared/utils/date/formatDate'
import { renderStringWithLineBreak } from 'shared/utils/string'

import { WrapperStyled } from './styles'

const { Text, Title, Paragraph } = Typography

export type TaskReclassificationRequestProps = {
  user: Pick<UserModel, 'firstName' | 'lastName' | 'middleName'>
  title: string
  createdAt: string
  comment: string
  actionText: string
  onAction: () => void
  actionDisabled: boolean
}

const TaskReclassificationRequest: FC<TaskReclassificationRequestProps> = ({
  user,
  title,
  comment,
  createdAt,
  actionText,
  onAction,
  actionDisabled,
}) => {
  const breakpoints = useBreakpoint()

  return (
    <WrapperStyled
      data-testid='task-card-reclassification-request'
      $breakpoints={breakpoints}
      $stretch
    >
      <Space size='middle' align='baseline' $block>
        <QuestionCircleIcon $size='large' />

        <Space direction='vertical' size='middle'>
          <Space direction='vertical' size={4}>
            <Title level={5}>{title}</Title>

            <Paragraph ellipsis={commonEllipsisConfig}>
              {renderStringWithLineBreak(comment)}
            </Paragraph>

            <SeparatedText>
              <Text type='secondary'>{getShortUserName(user)}</Text>

              <Text type='secondary'>
                {formatDate(createdAt, DATE_TIME_FORMAT)}
              </Text>
            </SeparatedText>
          </Space>

          <Button type='link' onClick={onAction} disabled={actionDisabled}>
            {actionText}
          </Button>
        </Space>
      </Space>
    </WrapperStyled>
  )
}

export default TaskReclassificationRequest
