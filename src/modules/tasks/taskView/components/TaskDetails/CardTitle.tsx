import { CloseOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, MenuProps, Row, Space, Typography } from 'antd'
import React, { FC, useMemo } from 'react'

import { TaskDetailsModel } from 'modules/tasks/taskView/models'

type CardTitleProps = Pick<TaskDetailsModel, 'id'> & {
  menuItems: MenuProps['items']
  onClose: () => void
}

const CardTitle: FC<CardTitleProps> = (props) => {
  const { id, menuItems, onClose } = props

  const actionMenu = useMemo(() => <Menu items={menuItems} />, [menuItems])

  return (
    <Row justify='space-between' align='middle'>
      <Typography.Text>{id}</Typography.Text>

      <Space>
        <Dropdown.Button overlay={actionMenu} type='text' />

        <Button type='text' icon={<CloseOutlined />} onClick={onClose} />
      </Space>
    </Row>
  )
}

export default CardTitle
