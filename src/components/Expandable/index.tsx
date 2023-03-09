import { Button, Typography } from 'antd'
import { BaseType } from 'antd/es/typography/Base'
import React from 'react'
import { DefaultTheme } from 'styled-components'

import { DownIcon, UpIcon } from 'components/Icons'
import Space, { SpaceProps } from 'components/Space'

import { FCWithChildren } from 'shared/interfaces/utils'

const { Text } = Typography

type ExpandableProps = {
  btnText: string
  expanded: boolean
  onClick: () => void
  btnTextType?: BaseType
  btnTextUnderline?: boolean
  showArrow?: boolean
  arrowColor?: keyof DefaultTheme['colors']
  gap?: SpaceProps['size']
}

const Expandable: FCWithChildren<ExpandableProps> = ({
  children,
  btnText,
  btnTextType,
  btnTextUnderline,
  gap,
  expanded,
  onClick,
  showArrow,
  arrowColor,
  ...props
}) => {
  return (
    <Space $block direction='vertical' size={gap} {...props}>
      <Button type='text' onClick={onClick}>
        <Text type={btnTextType} underline={btnTextUnderline}>
          {btnText}
        </Text>

        {showArrow ? (
          expanded ? (
            <UpIcon $size='small' $color={arrowColor} />
          ) : (
            <DownIcon $size='small' $color={arrowColor} />
          )
        ) : null}
      </Button>

      {expanded && children}
    </Space>
  )
}

Expandable.defaultProps = {
  showArrow: true,
}

export default Expandable
