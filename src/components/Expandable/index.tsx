import { Button, Typography } from 'antd'
import React from 'react'

import { DownIcon, UpIcon } from 'components/Icons'
import Space, { SpaceProps } from 'components/Space'
import { FCWithChildren } from 'shared/interfaces/utils'

const { Text } = Typography

type ExpandableProps = {
  buttonText: string

  expanded: boolean
  onClickExpand: () => void

  gap?: SpaceProps['size']
}

const Expandable: FCWithChildren<ExpandableProps> = ({
  children,
  buttonText,
  gap,
  expanded,
  onClickExpand,
  ...props
}) => {
  return (
    <Space $block direction='vertical' size={gap} {...props}>
      <Button type='text' onClick={onClickExpand}>
        <Text type='secondary' underline>
          {buttonText}
        </Text>

        {expanded ? <UpIcon $size='small' /> : <DownIcon $size='small' />}
      </Button>

      {expanded && children}
    </Space>
  )
}

export default Expandable
