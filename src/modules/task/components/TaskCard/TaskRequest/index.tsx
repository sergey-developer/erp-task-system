import { Button, ButtonProps, Typography } from 'antd'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import React, { FC, ReactElement } from 'react'

import { BaseUserModel } from 'modules/user/models'
import { getShortUserName } from 'modules/user/utils'

import SeparatedText from 'components/SeparatedText'
import Space from 'components/Space'

import { commonEllipsisConfig } from 'shared/constants/text'
import { MaybeNull } from 'shared/types/utils'
import { renderStringWithLineBreak } from 'shared/utils/string'

import { WrapperStyled } from './styles'

const { Text, Title, Paragraph } = Typography

export type TaskRequestProps = {
  title: string
  comment: string
  user: MaybeNull<Pick<BaseUserModel, 'firstName' | 'lastName' | 'middleName'>>
  date: string
  actions: Array<
    Pick<ButtonProps, 'onClick' | 'disabled' | 'loading'> & { text: string }
  >
  icon: ReactElement
}

const TaskRequest: FC<TaskRequestProps> = ({
  user,
  title,
  comment,
  date,
  actions,
  icon,
  ...props
}) => {
  const breakpoints = useBreakpoint()

  return (
    <WrapperStyled $breakpoints={breakpoints} $stretch {...props}>
      <Space size='middle' align='baseline' $block>
        {icon}

        <Space direction='vertical' size='middle'>
          <Space direction='vertical' size={4}>
            <Title level={5}>{title}</Title>

            <Paragraph ellipsis={commonEllipsisConfig}>
              {renderStringWithLineBreak(comment)}
            </Paragraph>

            <SeparatedText>
              {user && <Text type='secondary'>{getShortUserName(user)}</Text>}
              <Text type='secondary'>{date}</Text>
            </SeparatedText>
          </Space>

          <Space>
            {actions.map(({ onClick, disabled, loading, text }, index) => (
              <Button
                key={index}
                type='link'
                onClick={onClick}
                disabled={disabled}
                loading={loading}
              >
                {text}
              </Button>
            ))}
          </Space>
        </Space>
      </Space>
    </WrapperStyled>
  )
}

export default TaskRequest
