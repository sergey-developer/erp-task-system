import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { useBoolean } from 'ahooks'
import { Button, Typography } from 'antd'
import { EllipsisConfig } from 'antd/es/typography/Base'
import React, { FC } from 'react'

import Space from 'components/Space'

const { Paragraph } = Typography

type ExpandableTextProps = Pick<EllipsisConfig, 'rows'> & {
  text: string
  expandText: string
  collapseText: string
}

const ExpandableText: FC<ExpandableTextProps> = ({
  text,
  rows,
  expandText,
  collapseText,
}) => {
  const [expandable, { toggle: toggleExpandable }] = useBoolean(false)
  const [expanded, { toggle: toggleExpanded }] = useBoolean(false)

  return (
    <Space $block direction='vertical'>
      <Paragraph
        ellipsis={
          expanded
            ? false
            : {
                rows,
                onEllipsis: toggleExpandable,
              }
        }
      >
        {text}
      </Paragraph>

      {expandable && (
        <Button type={expanded ? 'text' : 'link'} onClick={toggleExpanded}>
          {expanded ? collapseText : expandText}
          {expanded ? (
            <UpOutlined className='fs-10' />
          ) : (
            <DownOutlined className='fs-10' />
          )}
        </Button>
      )}
    </Space>
  )
}

ExpandableText.defaultProps = {
  rows: 2,
}

export default ExpandableText
