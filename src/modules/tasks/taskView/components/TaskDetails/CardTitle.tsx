import { CloseOutlined } from '@ant-design/icons'
import { Button, Dropdown, Menu, Row, Space, Typography } from 'antd'
import React, { FC } from 'react'

import { TaskDetailsModel } from '../../models'

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

type CardTitleProps = Pick<TaskDetailsModel, 'id'> & {
  onClose: () => void
}

const CardTitle: FC<CardTitleProps> = ({ id, onClose }) => {
  return (
    <Row justify='space-between' align='middle'>
      <Typography.Text>{id}</Typography.Text>

      <Space>
        {false && <Dropdown.Button overlay={actionMenu} type='text' />}

        <Button type='text' icon={<CloseOutlined />} onClick={onClose} />
      </Space>
    </Row>
  )
}

export default CardTitle
