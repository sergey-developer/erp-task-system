import {
  TeamOutlined,
  ToolOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { Col, Layout, Row } from 'antd'
import { MenuProps } from 'antd/lib/menu'
import React, { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

import Avatar from 'components/Avatar'
import Logo from 'components/Logo'
import Navigation from 'components/Navigation'
import NotificationCounter from 'components/NotificationCounter'
import { RoutesEnum } from 'configs/routes/constants'
import { taskListDefaultRoute } from 'modules/tasks/taskList/components/TaskListPage/constants'

const { Header } = Layout

enum NavItemKeysEnum {
  Tasks = 'tasks',
  WorkingGroups = 'working-groups',
  AdminPanel = 'admin-panel',
}

const defaultSelectedMenuKeys = [NavItemKeysEnum.Tasks]

const defaultMenuItems: MenuProps['items'] = [
  {
    label: <Link to={taskListDefaultRoute}>Заявки</Link>,
    icon: <UnorderedListOutlined className='font-s-18' />,
    key: NavItemKeysEnum.Tasks,
  },
  {
    label: <Link to={RoutesEnum.WorkingGroups}>Рабочие группы</Link>,
    icon: <TeamOutlined className='font-s-18' />,
    key: NavItemKeysEnum.WorkingGroups,
  },
]

const PrivateHeader: FC = () => {
  const menuItems: MenuProps['items'] = useMemo(() => {
    return defaultMenuItems.concat({
      label: <Link to={RoutesEnum.AdminPanel}>Админ-панель</Link>,
      icon: <ToolOutlined className='font-s-18' />,
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
