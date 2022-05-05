import { TeamOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Col, Layout, Row } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import Avatar from 'components/Avatar'
import Logo from 'components/Logo'
import Navigation from 'components/Navigation'
import NotificationCounter from 'components/NotificationCounter'
import { RoutesEnum } from 'configs/routes'
import { taskListDefaultRoute } from 'modules/tasks/taskList/components/TaskListPage/constants'
import { adminNavMenu } from 'shared/constants/navMenu'
import useMatchedRoute from 'shared/hooks/useMatchedRoute'

const { Header } = Layout

const menuItems: ItemType[] = [
  {
    label: <Link to={taskListDefaultRoute}>Заявки</Link>,
    icon: <UnorderedListOutlined className='font-s-18' />,
    key: RoutesEnum.TaskList,
  },
  {
    label: <Link to={RoutesEnum.WorkingGroups}>Рабочие группы</Link>,
    icon: <TeamOutlined className='font-s-18' />,
    key: RoutesEnum.WorkingGroups,
  },
  ...adminNavMenu,
]

const PrivateHeader: FC = () => {
  const matchedRoute = useMatchedRoute([
    RoutesEnum.TaskList,
    RoutesEnum.WorkingGroups,
    RoutesEnum.AdminPanel,
  ])

  const activeNavKey = matchedRoute?.pathnameBase

  return (
    <Header>
      <Row justify='space-between' align='middle'>
        <Col span={4}>
          <Logo />
        </Col>

        <Col span={18}>
          <Navigation
            selectedKeys={activeNavKey ? [activeNavKey] : undefined}
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
