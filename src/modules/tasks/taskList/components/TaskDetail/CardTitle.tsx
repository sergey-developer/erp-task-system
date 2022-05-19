import { CloseOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

const actionMenu = (
  <Menu
    onClick={() => {}}
    items={[
      {
        label: '1st menu item',
        key: '1',
      },
      {
        label: '2nd menu item',
        key: '2',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
)

type CardTitleProps = {
  onClose: () => void
}

const CardTitle: FC<CardTitleProps> = ({ onClose }) => {
  return (
    <Row justify='space-between' align='middle'>
      <Typography.Text>REQ0000007898</Typography.Text>

      <Space>
        <Dropdown.Button overlay={actionMenu} type='text' />

        <Button type='text' icon={<CloseOutlined />} onClick={onClose} />
      </Space>
    </Row>
  )
}

export default CardTitle
