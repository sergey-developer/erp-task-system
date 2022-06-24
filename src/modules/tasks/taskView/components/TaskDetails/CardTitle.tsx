import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from '../../models'

type CardTitleProps = Pick<TaskDetailsModel, 'id'> & {
  onClose: () => void
}

const menuItems = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: 'Выполнить заявку',
    icon: <CheckCircleOutlined />,
    key: '3',
  },
]

const actionMenu = <Menu items={menuItems} />

const CardTitle: FC<CardTitleProps> = ({ id, onClose }) => {
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
