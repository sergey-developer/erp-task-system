import {
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Col, Layout, Row } from 'antd'
import { MenuProps } from 'antd/lib/menu'
import React, { FC, useMemo } from 'react'

import Avatar from 'components/Avatar'
import Logo from 'components/Logo'
import Navigation from 'components/Navigation'
import NotificationCounter from 'components/NotificationCounter'

const { Header } = Layout

enum NavItemKeysEnum {
  Requests = 'requests',
  WorkingGroups = 'working-groups',
  AdminPanel = 'admin-panel',
}

const defaultSelectedMenuKeys = [NavItemKeysEnum.Requests]

const defaultMenuItems: MenuProps['items'] = [
  {
    label: 'Заявки',
    icon: <UnorderedListOutlined />,
    key: NavItemKeysEnum.Requests,
  },
  {
    label: 'Рабочие группы',
    icon: <TeamOutlined />,
    key: NavItemKeysEnum.WorkingGroups,
  },
]

const PrivateHeader: FC = () => {
  const menuItems: MenuProps['items'] = useMemo(() => {
    return defaultMenuItems.concat({
      label: 'Админ-панель',
      icon: <ToolOutlined />,
      key: NavItemKeysEnum.AdminPanel,
    })
  }, [])

  return (
    <Header>
      <Row justify='space-between' align='middle'>
        <Col span={4}>
          <Logo />
        </Col>

        <Col span={18}>
          <Navigation
            defaultSelectedKeys={defaultSelectedMenuKeys}
            items={menuItems}
          />
        </Col>

        <Col span={2}>
          <Row justify='end' align='middle'>
            <NotificationCounter />

            <Avatar className='margin-l-20' />
          </Row>
        </Col>
      </Row>
    </Header>
  )
}

export default PrivateHeader
