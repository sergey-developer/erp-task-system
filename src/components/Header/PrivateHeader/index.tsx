import {
  BellOutlined,
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Avatar, Col, Layout, Row } from 'antd'
import { MenuProps } from 'antd/lib/menu'
import React, { FC, useMemo } from 'react'

import Logo from 'components/Logo'
import Menu from 'components/Menu'

const { Header } = Layout

enum NavItemKeysEnum {
  Requests = 'requests',
  WorkingGroups = 'working-groups',
  AdminPanel = 'admin-panel',
}

const PrivateHeader: FC = () => {
  const items: MenuProps['items'] = useMemo(
    () => [
      {
        label: 'Заявки',
        icon: <UnorderedListOutlined style={{ fontSize: '18px' }} />,
        key: NavItemKeysEnum.Requests,
      },
      {
        label: 'Рабочие группы',
        icon: <TeamOutlined style={{ fontSize: '18px' }} />,
        key: NavItemKeysEnum.WorkingGroups,
      },
      {
        label: 'Админ-панель',
        icon: <ToolOutlined style={{ fontSize: '18px' }} />,
        key: NavItemKeysEnum.AdminPanel,
      },
    ],
    [],
  )

  return (
    <Header>
      <Row justify='space-between' align='middle'>
        <Col span={4}>
          <Logo />
        </Col>

        <Col span={18}>
          <Menu
            mode='horizontal'
            defaultSelectedKeys={[NavItemKeysEnum.Requests]}
            items={items}
          />
        </Col>

        <Col span={2}>
          <Row justify='end' align='middle'>
            <BellOutlined style={{ fontSize: '18px' }} />
            <Avatar size='large' className='margin-l-20' />
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default PrivateHeader
